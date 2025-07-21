import React, { useState } from 'react';
import { Puzzle, Dice6, Map, Zap, Settings, Download, Sparkles } from 'lucide-react';

interface PuzzleType {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const puzzleTypes: PuzzleType[] = [
  {
    id: 'temple',
    name: 'Sacred Temple',
    description: 'Generate intricate temples with rooms, traps, and mystical encounters',
    icon: <Map className="w-6 h-6" />,
    color: 'from-amber-500 to-orange-500'
  },
  {
    id: 'riddle',
    name: 'Consciousness Riddles',
    description: 'Create challenging riddles and logic puzzles for awakening',
    icon: <Puzzle className="w-6 h-6" />,
    color: 'from-purple-500 to-violet-500'
  },
  {
    id: 'board-game',
    name: 'Sacred Games',
    description: 'Design custom board games with sacred geometry principles',
    icon: <Dice6 className="w-6 h-6" />,
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'energy-puzzle',
    name: 'Energy Alignment',
    description: 'Interactive puzzles for frequency calibration and resonance',
    icon: <Zap className="w-6 h-6" />,
    color: 'from-blue-500 to-indigo-500'
  }
];

export default function PuzzleGenerator() {
  const [selectedType, setSelectedType] = useState<PuzzleType | null>(null);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard' | 'transcendent'>('medium');
  const [complexity, setComplexity] = useState(5);
  const [theme, setTheme] = useState('cosmic');
  const [generatedContent, setGeneratedContent] = useState('');

  const generatePuzzle = () => {
    if (!selectedType) return;

    const content = `# ${selectedType.name} - ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Level

## Sacred Configuration
- **Difficulty**: ${difficulty}
- **Complexity**: ${complexity}/10
- **Theme**: ${theme}
- **Energetic Frequency**: Attuned to consciousness expansion

## Generated Structure
${selectedType.id === 'temple' ? `
### Temple Layout
- **Central Chamber**: The Heart of Wisdom
- **Eastern Wing**: Meditation Sanctuary with frequency crystals
- **Western Wing**: Challenge Corridors with sacred geometry locks
- **Northern Spire**: Observatory for celestial alignment
- **Southern Depths**: Underground labyrinth of transformation

### Sacred Encounters
1. **Guardian of Thresholds**: Tests seeker's intention purity
2. **Riddle of Mirrors**: Self-reflection challenge
3. **Frequency Lock**: Harmonic resonance puzzle
4. **Wisdom Keeper**: Final trial of consciousness integration
` : selectedType.id === 'riddle' ? `
### The Consciousness Riddle

*I am the space between thoughts, yet I contain all thinking.
I am the silence between notes, yet I birth all music.
I am the pause between breaths, yet I am life itself.
What am I?*

**Answer**: Awareness/Consciousness

### Progressive Challenges
1. **Novice**: Simple pattern recognition
2. **Adept**: Multi-dimensional logic
3. **Master**: Paradox resolution
4. **Transcendent**: Unity consciousness puzzles
` : selectedType.id === 'board-game' ? `
### Sacred Geometry Game

**Players**: 2-6 consciousness explorers
**Objective**: Achieve harmonic resonance across all dimensions

#### Game Pieces
- **Frequency Tokens**: 7 chakra-colored pieces per player
- **Sacred Board**: Mandala-based hexagonal grid
- **Consciousness Cards**: 78 archetypal wisdom cards
- **Energy Dice**: Sacred geometry polyhedra

#### Game Flow
1. Each player places tokens at outer rim
2. Draw consciousness cards for guidance
3. Move inward through dimensional layers
4. Achieve resonance at the center mandala
` : `
### Energy Alignment Puzzle

**Frequency Range**: 528Hz - 963Hz (Solfeggio Scale)
**Objective**: Calibrate personal energy field to cosmic harmony

#### Interactive Elements
1. **Tone Matching**: Align with sacred frequencies
2. **Color Resonance**: Visual chakra balancing
3. **Geometric Patterns**: Sacred form recognition
4. **Breath Synchrony**: Pranayama integration

#### Difficulty Modifiers
- ${difficulty === 'transcendent' ? 'Multi-dimensional awareness required' : 'Linear progression'}
- Complexity Level: ${complexity}/10
`}

*Generated with consciousness-aligned algorithms and sacred geometry principles.*`;

    setGeneratedContent(content);
  };

  return (
    <div className="h-full flex">
      {/* Puzzle Type Selection */}
      <div className="w-1/3 border-r border-slate-700/50 bg-slate-800/30 backdrop-blur-sm overflow-y-auto">
        <div className="p-6 border-b border-slate-700/50">
          <h2 className="text-xl font-semibold text-slate-200 mb-4">Puzzle Designer</h2>
          <p className="text-sm text-slate-400 mb-6">Create interactive experiences for consciousness expansion</p>
        </div>

        <div className="p-4 space-y-4">
          {puzzleTypes.map((type) => (
            <div
              key={type.id}
              onClick={() => setSelectedType(type)}
              className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                selectedType?.id === type.id
                  ? 'border-indigo-500/50 bg-indigo-500/10'
                  : 'border-slate-600/30 bg-slate-700/30 hover:border-indigo-500/30'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${type.color}`}>
                  {type.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-slate-200 mb-1">{type.name}</h3>
                  <p className="text-sm text-slate-400">{type.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedType && (
          <div className="p-4 border-t border-slate-700/50">
            <h3 className="font-medium text-slate-200 mb-4">Configuration</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-2">Difficulty Level</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as any)}
                  className="w-full p-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-slate-200 focus:border-indigo-500/50"
                >
                  <option value="easy">Easy - Novice Seeker</option>
                  <option value="medium">Medium - Adept Explorer</option>
                  <option value="hard">Hard - Master Practitioner</option>
                  <option value="transcendent">Transcendent - Unity Consciousness</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-2">Complexity: {complexity}/10</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={complexity}
                  onChange={(e) => setComplexity(parseInt(e.target.value))}
                  className="w-full accent-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-2">Sacred Theme</label>
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className="w-full p-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-slate-200 focus:border-indigo-500/50"
                >
                  <option value="cosmic">Cosmic Consciousness</option>
                  <option value="elemental">Elemental Wisdom</option>
                  <option value="geometric">Sacred Geometry</option>
                  <option value="frequency">Vibrational Harmony</option>
                  <option value="mystical">Mystical Traditions</option>
                </select>
              </div>

              <button
                onClick={generatePuzzle}
                className="w-full px-4 py-3 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-lg hover:shadow-lg hover:shadow-indigo-500/25 transition-all text-white flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Generate Sacred Puzzle</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Generated Content */}
      <div className="flex-1 flex flex-col">
        {generatedContent ? (
          <>
            <div className="p-6 border-b border-slate-700/50 bg-slate-800/20 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-slate-200 mb-1">
                    {selectedType?.name} Generated
                  </h1>
                  <p className="text-slate-400">Sacred puzzle manifestation complete</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 bg-slate-700/50 rounded-lg hover:bg-slate-600/50 transition-colors">
                    <Settings className="w-4 h-4 text-slate-400" />
                  </button>
                  <button className="p-2 bg-slate-700/50 rounded-lg hover:bg-slate-600/50 transition-colors">
                    <Download className="w-4 h-4 text-slate-400" />
                  </button>
                  <button
                    onClick={generatePuzzle}
                    className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all text-white"
                  >
                    Regenerate
                  </button>
                </div>
              </div>
            </div>

            <div className="flex-1 p-6 overflow-y-auto">
              <div className="prose prose-invert max-w-none">
                <pre className="whitespace-pre-wrap text-slate-200 leading-relaxed">
                  {generatedContent}
                </pre>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-violet-500 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <Puzzle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-200 mb-2">Sacred Puzzle Designer</h3>
              <p className="text-slate-400">Select a puzzle type and configure its parameters to begin creation</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}