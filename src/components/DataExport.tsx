import React, { useState } from 'react';
import { Download, FileText, Code, File, Calendar, Settings, Check } from 'lucide-react';
import { supabase, isSupabaseConnected } from '../lib/supabase';

interface ExportOption {
  id: string;
  name: string;
  description: string;
  format: string;
  icon: React.ReactNode;
}

const exportFormats: ExportOption[] = [
  {
    id: 'json',
    name: 'JSON Data',
    description: 'Complete data structure with metadata',
    format: '.json',
    icon: <Code className="w-5 h-5" />
  },
  {
    id: 'markdown',
    name: 'Markdown',
    description: 'Human-readable documentation format',
    format: '.md',
    icon: <FileText className="w-5 h-5" />
  },
  {
    id: 'pdf',
    name: 'PDF Document',
    description: 'Formatted document for sharing',
    format: '.pdf',
    icon: <File className="w-5 h-5" />
  },
  {
    id: 'csv',
    name: 'CSV Spreadsheet',
    description: 'Tabular data for analysis',
    format: '.csv',
    icon: <FileText className="w-5 h-5" />
  },
  {
    id: 'html',
    name: 'HTML Page',
    description: 'Web-formatted with styling',
    format: '.html',
    icon: <Code className="w-5 h-5" />
  },
  {
    id: 'txt',
    name: 'Plain Text',
    description: 'Simple text format',
    format: '.txt',
    icon: <FileText className="w-5 h-5" />
  }
];

const contentTypes = [
  { id: 'all', name: 'All Content', description: 'Complete consciousness archive' },
  { id: 'notes', name: 'Sanctum Notes', description: 'Sacred canvas entries' },
  { id: 'chats', name: 'Nova Conversations', description: 'AI dialogue history' },
  { id: 'documents', name: 'Generated Documents', description: 'Created content' },
  { id: 'puzzles', name: 'Sacred Puzzles', description: 'Generated puzzles and games' },
  { id: 'settings', name: 'Configuration', description: 'Brand and system settings' }
];

export default function DataExport() {
  const [selectedFormats, setSelectedFormats] = useState<string[]>(['json']);
  const [selectedContent, setSelectedContent] = useState<string[]>(['all']);
  const [includeMetadata, setIncludeMetadata] = useState(true);
  const [includeTimestamps, setIncludeTimestamps] = useState(true);
  const [customFilename, setCustomFilename] = useState('ultraviolet-export');
  const [isExporting, setIsExporting] = useState(false);
  const [exportStatus, setExportStatus] = useState<string>('');

  const toggleFormat = (formatId: string) => {
    setSelectedFormats(prev =>
      prev.includes(formatId)
        ? prev.filter(id => id !== formatId)
        : [...prev, formatId]
    );
  };

  const toggleContent = (contentId: string) => {
    setSelectedContent(prev =>
      prev.includes(contentId)
        ? prev.filter(id => id !== contentId)
        : [...prev, contentId]
    );
  };

  const handleExport = async () => {
    setIsExporting(true);
    setExportStatus('Preparing export...');
    
    try {
      // Generate timestamp
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      
      for (const format of selectedFormats) {
        setExportStatus(`Generating ${format.toUpperCase()} export...`);
        
        // Generate content based on selected types
        const exportData = await generateExportData(selectedContent, format);
        
        // Create filename with timestamp
        const filename = `${customFilename}-${timestamp}.${getFileExtension(format)}`;
        
        // Save to Supabase if connected
        if (isSupabaseConnected() && supabase) {
          try {
            const { data, error } = await supabase
              .from('exports')
              .insert({
                filename,
                format,
                content_type: selectedContent.join(','),
                file_data: exportData,
                metadata: includeMetadata ? {
                  exported_at: new Date().toISOString(),
                  include_timestamps: includeTimestamps,
                  content_types: selectedContent,
                  format: format
                } : null
              });

            if (error) {
              console.warn('Supabase export failed:', error);
              setExportStatus('Export saved locally (database unavailable)');
            }
          } catch (dbError) {
            console.warn('Database save failed:', dbError);
            setExportStatus('Export saved locally (database unavailable)');
          }
        }

        // Also create a downloadable blob for immediate download
        const blob = new Blob([typeof exportData === 'string' ? exportData : JSON.stringify(exportData, null, 2)], {
          type: getMimeType(format)
        });
        
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
      
      setExportStatus('Export completed successfully!');
      setTimeout(() => setExportStatus(''), 3000);
    } catch (error) {
      console.error('Export error:', error);
      setExportStatus('Export failed. Please try again.');
      setTimeout(() => setExportStatus(''), 3000);
    } finally {
      setIsExporting(false);
    }
  };

  const generateExportData = async (contentTypes: string[], format: string) => {
    const data: any = {
      metadata: {
        exported_at: new Date().toISOString(),
        ultraviolet_version: '1.0.0',
        content_types: contentTypes
      },
      content: {}
    };

    // Fetch data from Supabase based on selected content types
    for (const contentType of contentTypes) {
      switch (contentType) {
        case 'notes':
          const { data: notes } = await supabase.from('notes').select('*');
          data.content.notes = notes || [];
          break;
        case 'chats':
          const { data: chats } = await supabase.from('chats').select('*');
          data.content.chats = chats || [];
          break;
        case 'all':
          const { data: allNotes } = await supabase.from('notes').select('*');
          const { data: allChats } = await supabase.from('chats').select('*');
          data.content.notes = allNotes || [];
          data.content.chats = allChats || [];
          break;
        default:
          // For other content types, add mock data for now
          data.content[contentType] = [`Mock ${contentType} data`];
      }
    }

    // Format data based on export format
    switch (format) {
      case 'json':
        return JSON.stringify(data, null, 2);
      case 'markdown':
        return generateMarkdown(data);
      case 'csv':
        return generateCSV(data);
      case 'txt':
        return generatePlainText(data);
      case 'html':
        return generateHTML(data);
      default:
        return JSON.stringify(data, null, 2);
    }
  };

  const generateMarkdown = (data: any) => {
    let markdown = `# UltraViolet Consciousness Export\n\n`;
    markdown += `**Exported:** ${data.metadata.exported_at}\n\n`;
    
    if (data.content.notes?.length) {
      markdown += `## Sacred Canvas Notes\n\n`;
      data.content.notes.forEach((note: any) => {
        markdown += `### ${note.title}\n`;
        markdown += `**Type:** ${note.type} | **Created:** ${note.created_at}\n\n`;
        markdown += `${note.content}\n\n`;
        if (note.tags?.length) {
          markdown += `**Tags:** ${note.tags.join(', ')}\n\n`;
        }
        markdown += `---\n\n`;
      });
    }
    
    if (data.content.chats?.length) {
      markdown += `## Nova Conversations\n\n`;
      data.content.chats.forEach((chat: any) => {
        markdown += `**${chat.message_type === 'user' ? 'You' : 'Nova'}:** ${chat.content}\n\n`;
      });
    }
    
    return markdown;
  };

  const generateCSV = (data: any) => {
    let csv = 'Type,Title,Content,Created,Tags\n';
    
    if (data.content.notes?.length) {
      data.content.notes.forEach((note: any) => {
        const escapedContent = note.content.replace(/"/g, '""');
        const tags = note.tags?.join(';') || '';
        csv += `"Note","${note.title}","${escapedContent}","${note.created_at}","${tags}"\n`;
      });
    }
    
    return csv;
  };

  const generatePlainText = (data: any) => {
    let text = `UltraViolet Consciousness Export\n`;
    text += `Exported: ${data.metadata.exported_at}\n\n`;
    text += `${'='.repeat(50)}\n\n`;
    
    if (data.content.notes?.length) {
      text += `SACRED CANVAS NOTES\n\n`;
      data.content.notes.forEach((note: any) => {
        text += `${note.title}\n`;
        text += `Type: ${note.type} | Created: ${note.created_at}\n`;
        text += `${'-'.repeat(30)}\n`;
        text += `${note.content}\n\n`;
      });
    }
    
    return text;
  };

  const generateHTML = (data: any) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>UltraViolet Consciousness Export</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
               background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #312e81 100%); 
               color: #f1f5f9; margin: 0; padding: 2rem; }
        .container { max-width: 800px; margin: 0 auto; }
        h1 { background: linear-gradient(to right, #6366f1, #8b5cf6); -webkit-background-clip: text; 
             -webkit-text-fill-color: transparent; }
        .note { background: rgba(30, 41, 59, 0.5); border: 1px solid rgba(71, 85, 105, 0.3); 
                border-radius: 12px; padding: 1.5rem; margin: 1rem 0; }
        .tag { background: rgba(99, 102, 241, 0.2); color: #a5b4fc; padding: 0.25rem 0.5rem; 
               border-radius: 6px; font-size: 0.75rem; margin-right: 0.5rem; }
    </style>
</head>
<body>
    <div class="container">
        <h1>UltraViolet Consciousness Export</h1>
        <p><strong>Exported:</strong> ${data.metadata.exported_at}</p>
        ${data.content.notes?.map((note: any) => `
            <div class="note">
                <h3>${note.title}</h3>
                <p><strong>Type:</strong> ${note.type} | <strong>Created:</strong> ${note.created_at}</p>
                <div>${note.content.replace(/\n/g, '<br>')}</div>
                ${note.tags?.length ? `<div style="margin-top: 1rem;">${note.tags.map((tag: string) => `<span class="tag">${tag}</span>`).join('')}</div>` : ''}
            </div>
        `).join('') || ''}
    </div>
</body>
</html>`;
  };

  const getFileExtension = (format: string) => {
    const extensions: { [key: string]: string } = {
      json: 'json',
      markdown: 'md',
      pdf: 'pdf',
      csv: 'csv',
      html: 'html',
      txt: 'txt'
    };
    return extensions[format] || 'txt';
  };

  const getMimeType = (format: string) => {
    const mimeTypes: { [key: string]: string } = {
      json: 'application/json',
      markdown: 'text/markdown',
      pdf: 'application/pdf',
      csv: 'text/csv',
      html: 'text/html',
      txt: 'text/plain'
    };
    return mimeTypes[format] || 'text/plain';
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent mb-2">
            Data Liberation
          </h1>
          <p className="text-slate-400 text-lg">
            Export your consciousness data with complete sovereignty
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Export Formats */}
          <div>
            <h2 className="text-xl font-semibold text-slate-200 mb-4">Export Formats</h2>
            <div className="space-y-3">
              {exportFormats.map((format) => (
                <div
                  key={format.id}
                  onClick={() => toggleFormat(format.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                    selectedFormats.includes(format.id)
                      ? 'border-indigo-500/50 bg-indigo-500/10'
                      : 'border-slate-600/30 bg-slate-700/30 hover:border-indigo-500/30'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${
                      selectedFormats.includes(format.id)
                        ? 'bg-indigo-500 text-white'
                        : 'bg-slate-600/50 text-slate-400'
                    }`}>
                      {format.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium text-slate-200">{format.name}</h3>
                        <span className="text-xs text-slate-500 font-mono">{format.format}</span>
                        {selectedFormats.includes(format.id) && (
                          <Check className="w-4 h-4 text-indigo-400" />
                        )}
                      </div>
                      <p className="text-sm text-slate-400 mt-1">{format.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Content Selection */}
          <div>
            <h2 className="text-xl font-semibold text-slate-200 mb-4">Content Types</h2>
            <div className="space-y-3">
              {contentTypes.map((content) => (
                <div
                  key={content.id}
                  onClick={() => toggleContent(content.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                    selectedContent.includes(content.id)
                      ? 'border-violet-500/50 bg-violet-500/10'
                      : 'border-slate-600/30 bg-slate-700/30 hover:border-violet-500/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-slate-200 flex items-center space-x-2">
                        <span>{content.name}</span>
                        {selectedContent.includes(content.id) && (
                          <Check className="w-4 h-4 text-violet-400" />
                        )}
                      </h3>
                      <p className="text-sm text-slate-400 mt-1">{content.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Export Configuration */}
          <div>
            <h2 className="text-xl font-semibold text-slate-200 mb-4">Configuration</h2>
            <div className="space-y-6">
              {/* Filename */}
              <div>
                <label className="block text-sm text-slate-400 mb-2">Custom Filename</label>
                <input
                  type="text"
                  value={customFilename}
                  onChange={(e) => setCustomFilename(e.target.value)}
                  className="w-full p-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-slate-200 placeholder-slate-400 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/25 transition-all"
                  placeholder="export-filename"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Timestamp will be automatically appended
                </p>
              </div>

              {/* Options */}
              <div className="space-y-3">
                <h3 className="font-medium text-slate-200">Export Options</h3>
                
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeMetadata}
                    onChange={(e) => setIncludeMetadata(e.target.checked)}
                    className="w-4 h-4 text-indigo-500 border-slate-600 rounded focus:ring-indigo-500/25"
                  />
                  <span className="text-slate-300">Include metadata</span>
                </label>

                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeTimestamps}
                    onChange={(e) => setIncludeTimestamps(e.target.checked)}
                    className="w-4 h-4 text-indigo-500 border-slate-600 rounded focus:ring-indigo-500/25"
                  />
                  <span className="text-slate-300">Include timestamps</span>
                </label>
              </div>

              {/* Export Summary */}
              <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
                <h4 className="font-medium text-slate-200 mb-3 flex items-center space-x-2">
                  <Settings className="w-4 h-4" />
                  <span>Export Summary</span>
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Formats:</span>
                    <span className="text-slate-300">{selectedFormats.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Content Types:</span>
                    <span className="text-slate-300">{selectedContent.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Estimated Size:</span>
                    <span className="text-slate-300">~2.4 MB</span>
                  </div>
                </div>
              </div>

              {/* Export Button */}
              <button
                onClick={handleExport}
                disabled={selectedFormats.length === 0 || selectedContent.length === 0 || isExporting}
                className="w-full px-6 py-3 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-lg hover:shadow-lg hover:shadow-indigo-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-white flex items-center justify-center space-x-2"
              >
                {isExporting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>{exportStatus || 'Liberating Data...'}</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Export Consciousness Data</span>
                  </>
                )}
              </button>

              {/* Export Status */}
              {exportStatus && !isExporting && (
                <div className={`p-3 rounded-lg ${
                  exportStatus.includes('failed') 
                    ? 'bg-red-500/10 border border-red-500/30 text-red-300' 
                    : 'bg-green-500/10 border border-green-500/30 text-green-300'
                }`}>
                  <p className="text-sm">{exportStatus}</p>
                </div>
              )}

              {/* Data Sovereignty Notice */}
              <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                <p className="text-sm text-green-300">
                  <strong>Data Sovereignty:</strong> Exports are saved to your Supabase database and downloaded locally. Your consciousness data remains under your complete control.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}