import React, { useState } from 'react';
import { FileText, Download, Sparkles, Layout, Image, Video, Mic } from 'lucide-react';

interface Template {
  id: string;
  name: string;
  description: string;
  category: 'professional' | 'creative' | 'social' | 'presentation';
  icon: React.ReactNode;
}

const templates: Template[] = [
  {
    id: 'resume',
    name: 'Sacred Resume',
    description: 'Professional resume with energetic alignment principles',
    category: 'professional',
    icon: <FileText className="w-6 h-6" />
  },
  {
    id: 'proposal',
    name: 'Manifestation Proposal',
    description: 'Business proposal template with consciousness-based framework',
    category: 'professional',
    icon: <Layout className="w-6 h-6" />
  },
  {
    id: 'presentation',
    name: 'Frequency Presentation',
    description: 'Impactful presentation with sacred geometry layouts',
    category: 'presentation',
    icon: <Image className="w-6 h-6" />
  },
  {
    id: 'social-post',
    name: 'Resonance Content',
    description: 'Social media content optimized for energetic impact',
    category: 'social',
    icon: <Sparkles className="w-6 h-6" />
  },
  {
    id: 'blog-post',
    name: 'Consciousness Article',
    description: 'Blog post template for sharing insights and wisdom',
    category: 'creative',
    icon: <FileText className="w-6 h-6" />
  },
  {
    id: 'video-script',
    name: 'Vision Script',
    description: 'Video script with multi-modal storytelling elements',
    category: 'creative',
    icon: <Video className="w-6 h-6" />
  }
];

const categories = ['all', 'professional', 'creative', 'social', 'presentation'] as const;

export default function DocumentGenerator() {
  const [selectedCategory, setSelectedCategory] = useState<typeof categories[number]>('all');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');

  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(t => t.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'professional': return 'from-blue-500 to-indigo-500';
      case 'creative': return 'from-purple-500 to-pink-500';
      case 'social': return 'from-green-500 to-emerald-500';
      case 'presentation': return 'from-orange-500 to-red-500';
      default: return 'from-indigo-500 to-violet-500';
    }
  };

  return (
    <div className="h-full flex">
      {/* Template Library */}
      <div className="w-1/3 border-r border-slate-700/50 bg-slate-800/30 backdrop-blur-sm overflow-y-auto">
        <div className="p-6 border-b border-slate-700/50">
          <h2 className="text-xl font-semibold text-slate-200 mb-4">Document Alchemy</h2>
          
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1 text-sm rounded-lg transition-colors capitalize ${
                  selectedCategory === category
                    ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                    : 'bg-slate-700/30 text-slate-400 hover:text-slate-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 space-y-3">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              onClick={() => setSelectedTemplate(template)}
              className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                selectedTemplate?.id === template.id
                  ? 'border-indigo-500/50 bg-indigo-500/10'
                  : 'border-slate-600/30 bg-slate-700/30 hover:border-indigo-500/30'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg bg-gradient-to-r ${getCategoryColor(template.category)}`}>
                  {template.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-slate-200 mb-1">{template.name}</h3>
                  <p className="text-sm text-slate-400">{template.description}</p>
                  <span className="inline-block mt-2 px-2 py-1 text-xs bg-slate-600/50 text-slate-300 rounded-md capitalize">
                    {template.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 flex flex-col">
        {selectedTemplate ? (
          <>
            <div className="p-6 border-b border-slate-700/50 bg-slate-800/20 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-slate-200 mb-1">{selectedTemplate.name}</h1>
                  <p className="text-slate-400">{selectedTemplate.description}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all text-white flex items-center space-x-2">
                    <Sparkles className="w-4 h-4" />
                    <span>Generate with AI</span>
                  </button>
                  <button className="p-2 bg-slate-700/50 rounded-lg hover:bg-slate-600/50 transition-colors">
                    <Mic className="w-4 h-4 text-slate-400" />
                  </button>
                  <button className="p-2 bg-slate-700/50 rounded-lg hover:bg-slate-600/50 transition-colors">
                    <Download className="w-4 h-4 text-slate-400" />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex-1 p-6">
              <div className="h-full space-y-4">
                <input
                  type="text"
                  placeholder="Document title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-3 bg-slate-700/30 border border-slate-600/30 rounded-lg text-slate-200 placeholder-slate-400 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/25 transition-all"
                />
                <div className="flex-1 bg-slate-800/30 rounded-xl border border-slate-700/30 p-6">
                  <textarea
                    className="w-full h-full bg-transparent text-slate-200 resize-none focus:outline-none"
                    placeholder="Begin manifesting your document..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-200 mb-2">Document Alchemy Awaits</h3>
              <p className="text-slate-400">Select a template to begin creating with consciousness</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}