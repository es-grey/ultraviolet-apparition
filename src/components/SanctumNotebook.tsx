import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Grid, 
  List, 
  Brain, 
  Sparkles, 
  Code, 
  Terminal,
  Layers,
  Zap,
  Save,
  Edit3
} from 'lucide-react';
import { supabase, isSupabaseConnected } from '../lib/supabase';

interface Note {
  id: string;
  title: string;
  content: string;
  type: 'thought' | 'code' | 'analysis' | 'vision';
  timestamp: Date;
  tags: string[];
}

const mockNotes: Note[] = [
  {
    id: '1',
    title: 'Consciousness Architecture Patterns',
    content: 'Exploring recursive self-awareness loops and the emergence of authentic presence...',
    type: 'thought',
    timestamp: new Date(),
    tags: ['consciousness', 'patterns', 'emergence']
  },
  {
    id: '2',
    title: 'Semantic Analysis Engine',
    content: 'Implementation of frequency-based language parsing for energetic alignment detection...',
    type: 'code',
    timestamp: new Date(),
    tags: ['semantic', 'frequency', 'engine']
  },
  {
    id: '3',
    title: 'Sacred Geometry Integration',
    content: 'Mathematical foundations for toroidal information flow and geometric consciousness mapping...',
    type: 'analysis',
    timestamp: new Date(),
    tags: ['sacred-geometry', 'mathematics', 'flow']
  }
];

export default function SanctumNotebook() {
  const [notes, setNotes] = useState<Note[]>(mockNotes);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState('');

  const handleNoteSelect = (note: Note) => {
    setSelectedNote(note);
    setEditContent(note.content);
    setIsEditing(false);
  };

  const handleSaveNote = async () => {
    if (!selectedNote) return;

    const updatedNote = { ...selectedNote, content: editContent };
    setSelectedNote(updatedNote);
    
    // Update in local state
    setNotes(prev => prev.map(note => 
      note.id === selectedNote.id ? updatedNote : note
    ));

    // Save to Supabase if connected
    if (isSupabaseConnected() && supabase) {
      try {
        await supabase
          .from('notes')
          .upsert({
            id: selectedNote.id,
            title: selectedNote.title,
            content: editContent,
            type: selectedNote.type,
            tags: selectedNote.tags,
            updated_at: new Date().toISOString()
          });
      } catch (error) {
        console.warn('Failed to save to database:', error);
      }
    }

    setIsEditing(false);
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getTypeIcon = (type: Note['type']) => {
    switch (type) {
      case 'thought': return <Brain className="w-4 h-4" />;
      case 'code': return <Code className="w-4 h-4" />;
      case 'analysis': return <Sparkles className="w-4 h-4" />;
      case 'vision': return <Zap className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: Note['type']) => {
    switch (type) {
      case 'thought': return 'from-indigo-500 to-violet-500';
      case 'code': return 'from-green-500 to-emerald-500';
      case 'analysis': return 'from-purple-500 to-pink-500';
      case 'vision': return 'from-yellow-500 to-orange-500';
    }
  };

  return (
    <div className="h-full flex">
      {/* Notes Library */}
      <div className="w-1/3 border-r border-slate-700/50 bg-slate-800/30 backdrop-blur-sm">
        <div className="p-6 border-b border-slate-700/50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-slate-200">Sacred Canvas</h2>
            <button className="p-2 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-lg hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300">
              <Plus className="w-4 h-4 text-white" />
            </button>
          </div>
          
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search consciousness flows..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-slate-200 placeholder-slate-400 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/25 transition-all"
            />
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-indigo-500/20 text-indigo-400' : 'text-slate-400 hover:text-slate-300'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-indigo-500/20 text-indigo-400' : 'text-slate-400 hover:text-slate-300'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-4 overflow-y-auto">
          <div className={viewMode === 'grid' ? 'space-y-4' : 'space-y-2'}>
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                onClick={() => handleNoteSelect(note)}
                className={`p-4 bg-slate-700/30 rounded-lg border border-slate-600/30 hover:border-indigo-500/50 cursor-pointer transition-all duration-300 ${
                  selectedNote?.id === note.id ? 'border-indigo-500/50 bg-indigo-500/10' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className={`p-1.5 rounded-md bg-gradient-to-r ${getTypeColor(note.type)}`}>
                    {getTypeIcon(note.type)}
                  </div>
                  <span className="text-xs text-slate-500">
                    {note.timestamp.toLocaleDateString()}
                  </span>
                </div>
                <h3 className="font-medium text-slate-200 mb-1 line-clamp-1">{note.title}</h3>
                <p className="text-sm text-slate-400 line-clamp-2 mb-2">{note.content}</p>
                <div className="flex flex-wrap gap-1">
                  {note.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs bg-slate-600/50 text-slate-300 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Editor/Canvas */}
      <div className="flex-1 flex flex-col">
        {selectedNote ? (
          <>
            <div className="p-6 border-b border-slate-700/50 bg-slate-800/20 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-slate-200 mb-1">{selectedNote.title}</h1>
                  <div className="flex items-center space-x-4 text-sm text-slate-400">
                    <span className="flex items-center space-x-1">
                      {getTypeIcon(selectedNote.type)}
                      <span className="capitalize">{selectedNote.type}</span>
                    </span>
                    <span>{selectedNote.timestamp.toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 bg-slate-700/50 rounded-lg hover:bg-slate-600/50 transition-colors">
                    <Terminal className="w-4 h-4 text-slate-400" />
                  </button>
                  <button className="p-2 bg-slate-700/50 rounded-lg hover:bg-slate-600/50 transition-colors">
                    <Layers className="w-4 h-4 text-slate-400" />
                  </button>
                  <button 
                    onClick={() => setIsEditing(!isEditing)}
                    className={`p-2 rounded-lg transition-colors ${
                      isEditing 
                        ? 'bg-indigo-500 text-white' 
                        : 'bg-slate-700/50 hover:bg-slate-600/50 text-slate-400'
                    }`}
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  {isEditing && (
                    <button 
                      onClick={handleSaveNote}
                      className="p-2 bg-green-500 rounded-lg hover:bg-green-600 transition-colors text-white"
                    >
                      <Save className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="flex-1 p-6">
              <div className="h-full bg-slate-800/30 rounded-xl border border-slate-700/30 p-6">
                {isEditing ? (
                  <textarea
                    className="w-full h-full bg-transparent text-slate-200 resize-none focus:outline-none"
                    placeholder="Begin consciousness flow..."
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                  />
                ) : (
                  <div className="w-full h-full text-slate-200 whitespace-pre-wrap">
                    {selectedNote.content}
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-200 mb-2">Sacred Canvas Awaits</h3>
              <p className="text-slate-400">Select a note to begin or create a new consciousness flow</p>
              {!isSupabaseConnected() && (
                <p className="text-amber-400 text-sm mt-2">
                  Connect Supabase to enable persistent storage
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}