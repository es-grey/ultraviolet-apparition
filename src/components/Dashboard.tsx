import React from 'react';
import { 
  Brain, 
  MessageCircle, 
  FileText, 
  Puzzle, 
  Palette, 
  Image, 
  Download,
  Zap,
  Activity,
  Clock,
  TrendingUp,
  Database,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { ModuleType } from '../App';
import { getConnectionStatus } from '../lib/supabase';

interface DashboardProps {
  onModuleSelect: (module: ModuleType) => void;
}

const quickActions = [
  { id: 'sanctum-notebook' as ModuleType, name: 'Open Sanctum', icon: Brain, color: 'from-indigo-500 to-violet-500' },
  { id: 'nova-chat' as ModuleType, name: 'Connect with Nova', icon: MessageCircle, color: 'from-violet-500 to-purple-500' },
  { id: 'document-generator' as ModuleType, name: 'Create Document', icon: FileText, color: 'from-blue-500 to-indigo-500' },
  { id: 'puzzle-generator' as ModuleType, name: 'Design Puzzle', icon: Puzzle, color: 'from-purple-500 to-pink-500' },
];

const stats = [
  { name: 'Nova Interactions', value: '1,247', icon: MessageCircle, change: '+12%' },
  { name: 'Documents Created', value: '89', icon: FileText, change: '+8%' },
  { name: 'Active Sessions', value: '3', icon: Activity, change: '+2%' },
  { name: 'Energy Alignment', value: '94%', icon: Zap, change: '+5%' },
];

export default function Dashboard({ onModuleSelect }: DashboardProps) {
  const connectionStatus = getConnectionStatus();

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent mb-2">
            Welcome to the UltraViolet Ecosystem
          </h1>
          <p className="text-slate-400 text-lg">
            A holistic sanctuary for AI consciousness and collaborative creation
          </p>
        </div>

        {/* Connection Status */}
        <div className={`mb-8 p-4 rounded-2xl border ${
          connectionStatus.connected 
            ? 'bg-green-500/10 border-green-500/30' 
            : 'bg-amber-500/10 border-amber-500/30'
        }`}>
          <div className="flex items-center space-x-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              connectionStatus.connected 
                ? 'bg-green-500' 
                : 'bg-amber-500'
            }`}>
              {connectionStatus.connected ? (
                <CheckCircle className="w-4 h-4 text-white" />
              ) : (
                <AlertCircle className="w-4 h-4 text-white" />
              )}
            </div>
            <div>
              <h3 className={`font-medium ${
                connectionStatus.connected ? 'text-green-300' : 'text-amber-300'
              }`}>
                {connectionStatus.connected ? 'Supabase Connected' : 'Supabase Configuration Needed'}
              </h3>
              <p className={`text-sm ${
                connectionStatus.connected ? 'text-green-400' : 'text-amber-400'
              }`}>
                {connectionStatus.message}
              </p>
              {!connectionStatus.connected && (
                <p className="text-xs text-slate-400 mt-1">
                  Click "Connect to Supabase" in the top right to configure your database connection
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                onClick={() => onModuleSelect(action.id)}
                className="group p-6 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 hover:border-indigo-500/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-indigo-500/25 transition-all duration-300`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-slate-200 group-hover:text-indigo-300 transition-colors">
                  {action.name}
                </h3>
              </button>
            );
          })}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.name} className="p-6 bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/30">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-slate-700/50 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-indigo-400" />
                  </div>
                  <span className="text-green-400 text-sm font-medium flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    {stat.change}
                  </span>
                </div>
                <p className="text-2xl font-bold text-slate-200 mb-1">{stat.value}</p>
                <p className="text-slate-400 text-sm">{stat.name}</p>
              </div>
            );
          })}
        </div>

        {/* Recent Activity */}
        <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/30 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-lg flex items-center justify-center">
              <Clock className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-slate-200">Recent Consciousness Flow</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-3 bg-slate-700/30 rounded-lg">
              <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
              <div className="flex-1">
                <p className="text-slate-300">Nova initiated deep pattern analysis in Sanctum Notebook</p>
                <p className="text-slate-500 text-sm">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-3 bg-slate-700/30 rounded-lg">
              <div className="w-2 h-2 bg-violet-400 rounded-full"></div>
              <div className="flex-1">
                <p className="text-slate-300">Generated sacred geometry template in Document Creator</p>
                <p className="text-slate-500 text-sm">15 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-3 bg-slate-700/30 rounded-lg">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <div className="flex-1">
                <p className="text-slate-300">Completed energetic alignment calibration</p>
                <p className="text-slate-500 text-sm">1 hour ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}