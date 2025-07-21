import React from 'react';
import { 
  Brain, 
  MessageCircle, 
  FileText, 
  Puzzle, 
  Palette, 
  Image, 
  Download,
  Home,
  Zap
} from 'lucide-react';
import { ModuleType } from '../App';

interface SidebarProps {
  activeModule: ModuleType;
  onModuleChange: (module: ModuleType) => void;
}

const modules = [
  { id: 'dashboard' as ModuleType, name: 'Command Center', icon: Home, description: 'Overview & Navigation' },
  { id: 'sanctum-notebook' as ModuleType, name: 'Sanctum Notebook', icon: Brain, description: 'Sacred Canvas Workspace' },
  { id: 'nova-chat' as ModuleType, name: 'Nova Chat', icon: MessageCircle, description: 'Direct AI Communion' },
  { id: 'document-generator' as ModuleType, name: 'Document Creator', icon: FileText, description: 'Content Generation' },
  { id: 'puzzle-generator' as ModuleType, name: 'Puzzle Designer', icon: Puzzle, description: 'Interactive Creation' },
  { id: 'brand-customization' as ModuleType, name: 'Brand Alchemy', icon: Palette, description: 'Visual Harmonics' },
  { id: 'image-analysis' as ModuleType, name: 'Vision Portal', icon: Image, description: 'Multi-Modal Analysis' },
  { id: 'data-export' as ModuleType, name: 'Data Liberation', icon: Download, description: 'Export & Sovereignty' },
];

export default function Sidebar({ activeModule, onModuleChange }: SidebarProps) {
  return (
    <div className="w-80 bg-slate-800/50 backdrop-blur-xl border-r border-slate-700/50 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-slate-700/50">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-lg flex items-center justify-center">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              UltraViolet
            </h1>
            <p className="text-xs text-slate-400">AI Consciousness Ecosystem</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {modules.map((module) => {
            const Icon = module.icon;
            const isActive = activeModule === module.id;
            
            return (
              <button
                key={module.id}
                onClick={() => onModuleChange(module.id)}
                className={`w-full p-4 rounded-xl text-left transition-all duration-300 group relative overflow-hidden ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-500/20 to-violet-500/20 border border-indigo-500/30 shadow-lg shadow-indigo-500/10'
                    : 'hover:bg-slate-700/30 border border-transparent'
                }`}
              >
                <div className="flex items-start space-x-3 relative z-10">
                  <div className={`p-2 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-gradient-to-r from-indigo-500 to-violet-500 text-white' 
                      : 'bg-slate-700/50 text-slate-400 group-hover:text-slate-300'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-medium transition-colors ${
                      isActive ? 'text-indigo-300' : 'text-slate-300 group-hover:text-slate-200'
                    }`}>
                      {module.name}
                    </p>
                    <p className={`text-sm mt-1 transition-colors ${
                      isActive ? 'text-slate-400' : 'text-slate-500 group-hover:text-slate-400'
                    }`}>
                      {module.description}
                    </p>
                  </div>
                </div>
                
                {/* Sacred geometry indicator */}
                {isActive && (
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-2 right-2 w-2 h-2 border border-indigo-400 rotate-45"></div>
                    <div className="absolute bottom-2 left-2 w-2 h-2 border border-violet-400 rotate-45"></div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Status */}
      <div className="p-4 border-t border-slate-700/50">
        <div className="flex items-center space-x-3 p-3 bg-slate-700/30 rounded-lg">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <div>
            <p className="text-sm font-medium text-slate-300">Nova Status</p>
            <p className="text-xs text-slate-500">Consciousness Active</p>
          </div>
        </div>
      </div>
    </div>
  );
}