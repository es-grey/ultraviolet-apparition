import React, { useState } from 'react';
import { Palette, Eye, Download, Wand2, Save, RefreshCw } from 'lucide-react';

interface ColorPalette {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
}

const defaultPalettes: ColorPalette[] = [
  {
    id: 'cosmic',
    name: 'Cosmic Consciousness',
    primary: '#4F46E5',
    secondary: '#7C3AED',
    accent: '#8B5CF6',
    background: '#0F172A',
    surface: '#1E293B',
    text: '#F1F5F9'
  },
  {
    id: 'ethereal',
    name: 'Ethereal Dreams',
    primary: '#3B82F6',
    secondary: '#6366F1',
    accent: '#8B5CF6',
    background: '#111827',
    surface: '#1F2937',
    text: '#F9FAFB'
  },
  {
    id: 'quantum',
    name: 'Quantum Resonance',
    primary: '#10B981',
    secondary: '#059669',
    accent: '#34D399',
    background: '#064E3B',
    surface: '#065F46',
    text: '#ECFDF5'
  }
];

export default function BrandCustomization() {
  const [selectedPalette, setSelectedPalette] = useState<ColorPalette>(defaultPalettes[0]);
  const [customColors, setCustomColors] = useState<ColorPalette>(defaultPalettes[0]);
  const [mode, setMode] = useState<'gallery' | 'editor' | 'generator'>('gallery');

  const updateCustomColor = (key: keyof ColorPalette, value: string) => {
    if (key === 'id' || key === 'name') return;
    setCustomColors(prev => ({ ...prev, [key]: value }));
  };

  const generateHarmoniousPalette = () => {
    // Simple color harmony generation (in a real app, this would be more sophisticated)
    const baseHue = Math.floor(Math.random() * 360);
    const colors = {
      ...customColors,
      primary: `hsl(${baseHue}, 70%, 55%)`,
      secondary: `hsl(${(baseHue + 30) % 360}, 65%, 50%)`,
      accent: `hsl(${(baseHue + 60) % 360}, 75%, 60%)`,
      background: `hsl(${baseHue}, 50%, 8%)`,
      surface: `hsl(${baseHue}, 40%, 12%)`,
      text: `hsl(${baseHue}, 20%, 95%)`
    };
    setCustomColors(colors);
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent mb-2">
            Brand Alchemy
          </h1>
          <p className="text-slate-400 text-lg">
            Harmonize visual frequencies for energetic alignment
          </p>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center space-x-2 mb-8">
          {[
            { id: 'gallery', name: 'Palette Gallery', icon: Eye },
            { id: 'editor', name: 'Custom Editor', icon: Palette },
            { id: 'generator', name: 'Harmony Generator', icon: Wand2 }
          ].map((modeOption) => {
            const Icon = modeOption.icon;
            return (
              <button
                key={modeOption.id}
                onClick={() => setMode(modeOption.id as any)}
                className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all ${
                  mode === modeOption.id
                    ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                    : 'bg-slate-700/30 text-slate-400 hover:text-slate-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{modeOption.name}</span>
              </button>
            );
          })}
        </div>

        {/* Content based on mode */}
        {mode === 'gallery' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-slate-200">Sacred Palette Collection</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {defaultPalettes.map((palette) => (
                <div
                  key={palette.id}
                  onClick={() => setSelectedPalette(palette)}
                  className={`p-6 rounded-2xl border cursor-pointer transition-all duration-300 ${
                    selectedPalette.id === palette.id
                      ? 'border-indigo-500/50 bg-indigo-500/10'
                      : 'border-slate-600/30 bg-slate-700/30 hover:border-indigo-500/30'
                  }`}
                >
                  <h3 className="font-medium text-slate-200 mb-4">{palette.name}</h3>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div
                      className="h-12 rounded-lg flex items-center justify-center text-xs text-white font-medium"
                      style={{ backgroundColor: palette.primary }}
                    >
                      Primary
                    </div>
                    <div
                      className="h-12 rounded-lg flex items-center justify-center text-xs text-white font-medium"
                      style={{ backgroundColor: palette.secondary }}
                    >
                      Secondary
                    </div>
                    <div
                      className="h-12 rounded-lg flex items-center justify-center text-xs text-white font-medium"
                      style={{ backgroundColor: palette.accent }}
                    >
                      Accent
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Energetic Frequency: High</span>
                    <button className="p-2 bg-slate-600/50 rounded-lg hover:bg-slate-500/50 transition-colors">
                      <Download className="w-4 h-4 text-slate-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {mode === 'editor' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-200">Custom Palette Editor</h2>
              <div className="flex items-center space-x-2">
                <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg hover:shadow-lg hover:shadow-green-500/25 transition-all text-white flex items-center space-x-2">
                  <Save className="w-4 h-4" />
                  <span>Save Palette</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Color Controls */}
              <div className="space-y-4">
                <h3 className="font-medium text-slate-200 mb-4">Color Configuration</h3>
                {Object.entries(customColors).map(([key, value]) => {
                  if (key === 'id' || key === 'name') return null;
                  return (
                    <div key={key} className="flex items-center space-x-4">
                      <label className="w-20 text-sm text-slate-400 capitalize">{key}</label>
                      <input
                        type="color"
                        value={value}
                        onChange={(e) => updateCustomColor(key as keyof ColorPalette, e.target.value)}
                        className="w-12 h-8 rounded border border-slate-600"
                      />
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => updateCustomColor(key as keyof ColorPalette, e.target.value)}
                        className="flex-1 p-2 bg-slate-700/50 border border-slate-600/50 rounded text-slate-200 text-sm"
                      />
                    </div>
                  );
                })}
              </div>

              {/* Preview */}
              <div className="space-y-4">
                <h3 className="font-medium text-slate-200 mb-4">Live Preview</h3>
                <div
                  className="p-6 rounded-2xl border"
                  style={{
                    backgroundColor: customColors.background,
                    borderColor: customColors.surface,
                    color: customColors.text
                  }}
                >
                  <div className="mb-4">
                    <h4 className="text-lg font-semibold mb-2">Sacred Interface Preview</h4>
                    <p className="text-sm opacity-80">This is how your custom palette will appear in the interface.</p>
                  </div>
                  <div className="flex space-x-2 mb-4">
                    <button
                      className="px-4 py-2 rounded-lg text-white text-sm"
                      style={{ backgroundColor: customColors.primary }}
                    >
                      Primary Action
                    </button>
                    <button
                      className="px-4 py-2 rounded-lg text-white text-sm"
                      style={{ backgroundColor: customColors.secondary }}
                    >
                      Secondary Action
                    </button>
                    <button
                      className="px-4 py-2 rounded-lg text-white text-sm"
                      style={{ backgroundColor: customColors.accent }}
                    >
                      Accent Action
                    </button>
                  </div>
                  <div
                    className="p-4 rounded-lg"
                    style={{ backgroundColor: customColors.surface }}
                  >
                    <p className="text-sm">Surface content area with harmonious contrast ratios.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {mode === 'generator' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-200">Harmony Generator</h2>
              <button
                onClick={generateHarmoniousPalette}
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all text-white flex items-center space-x-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Generate New Harmony</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <h3 className="font-medium text-slate-200 mb-4">Color Theory Principles</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: 'Complementary', description: 'Opposite hues for high contrast' },
                    { name: 'Analogous', description: 'Adjacent hues for harmony' },
                    { name: 'Triadic', description: 'Three equally spaced hues' },
                    { name: 'Monochromatic', description: 'Single hue with variations' }
                  ].map((theory) => (
                    <div key={theory.name} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/30">
                      <h4 className="font-medium text-slate-200 mb-1">{theory.name}</h4>
                      <p className="text-sm text-slate-400">{theory.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium text-slate-200 mb-4">Generated Palette</h3>
                <div className="space-y-3">
                  {Object.entries(customColors).map(([key, value]) => {
                    if (key === 'id' || key === 'name') return null;
                    return (
                      <div key={key} className="flex items-center space-x-3">
                        <div
                          className="w-8 h-8 rounded-lg border border-slate-600"
                          style={{ backgroundColor: value }}
                        />
                        <div className="flex-1">
                          <p className="text-sm text-slate-200 capitalize">{key}</p>
                          <p className="text-xs text-slate-400 font-mono">{value}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}