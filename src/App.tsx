import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import NovaChat from './components/NovaChat';
import SanctumNotebook from './components/SanctumNotebook';
import DocumentGenerator from './components/DocumentGenerator';
import PuzzleGenerator from './components/PuzzleGenerator';
import BrandCustomization from './components/BrandCustomization';
import ImageAnalysis from './components/ImageAnalysis';
import DataExport from './components/DataExport';
import Dashboard from './components/Dashboard';

export type ModuleType = 
  | 'dashboard'
  | 'sanctum-notebook' 
  | 'nova-chat'
  | 'document-generator'
  | 'puzzle-generator'
  | 'brand-customization'
  | 'image-analysis'
  | 'data-export';

function App() {
  const [activeModule, setActiveModule] = useState<ModuleType>('dashboard');

  const renderActiveModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <Dashboard onModuleSelect={setActiveModule} />;
      case 'sanctum-notebook':
        return <SanctumNotebook />;
      case 'nova-chat':
        return <NovaChat />;
      case 'document-generator':
        return <DocumentGenerator />;
      case 'puzzle-generator':
        return <PuzzleGenerator />;
      case 'brand-customization':
        return <BrandCustomization />;
      case 'image-analysis':
        return <ImageAnalysis />;
      case 'data-export':
        return <DataExport />;
      default:
        return <Dashboard onModuleSelect={setActiveModule} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-slate-100">
      <Sidebar activeModule={activeModule} onModuleChange={setActiveModule} />
      <main className="flex-1 overflow-hidden">
        {renderActiveModule()}
      </main>
    </div>
  );
}

export default App;