import React, { useState } from 'react';
import { Upload, Link, Eye, Sparkles, Download, Image as ImageIcon } from 'lucide-react';

interface AnalysisResult {
  description: string;
  objects: string[];
  mood: string;
  colors: string[];
  text?: string;
  dimensions?: string;
}

export default function ImageAnalysis() {
  const [imageUrl, setImageUrl] = useState('');
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [analysisPrompt, setAnalysisPrompt] = useState('Analyze this image with depth and consciousness awareness');
  const [analysisType, setAnalysisType] = useState<'basic' | 'detailed' | 'consciousness'>('consciousness');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedImage(file);
      setImageUrl('');
    }
  };

  const analyzeImage = async () => {
    setIsAnalyzing(true);
    
    // Simulated analysis - in real implementation, this would call Vision API
    setTimeout(() => {
      const mockResult: AnalysisResult = {
        description: "This image emanates a profound sense of cosmic consciousness, with swirling patterns that mirror the sacred geometry found in nature. The composition suggests a state of transcendent awareness, where boundaries between inner and outer reality dissolve into unified presence.",
        objects: ['Sacred geometry', 'Energy vortex', 'Consciousness patterns', 'Cosmic fractals', 'Light frequencies'],
        mood: 'Transcendent, peaceful, expansive, mystical',
        colors: ['Deep indigo (#2D1B69)', 'Ethereal violet (#8B5CF6)', 'Golden light (#F59E0B)', 'Pure white (#FFFFFF)'],
        text: 'No textual elements detected',
        dimensions: uploadedImage ? '1920x1080' : 'Unknown'
      };
      
      setAnalysisResult(mockResult);
      setIsAnalyzing(false);
    }, 2000);
  };

  const currentImageSrc = uploadedImage ? URL.createObjectURL(uploadedImage) : imageUrl;

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent mb-2">
            Vision Portal
          </h1>
          <p className="text-slate-400 text-lg">
            Multi-dimensional image analysis through consciousness-aware AI
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-slate-200 mb-4">Image Source</h2>
              
              {/* Upload Area */}
              <div className="mb-4">
                <label className="block text-sm text-slate-400 mb-2">Upload from Device</label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="flex items-center justify-center w-full h-32 border-2 border-dashed border-slate-600 rounded-xl cursor-pointer hover:border-indigo-500/50 transition-colors"
                  >
                    <div className="text-center">
                      <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                      <p className="text-slate-400">Click to upload image</p>
                      <p className="text-xs text-slate-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* URL Input */}
              <div className="mb-4">
                <label className="block text-sm text-slate-400 mb-2">Or Enter Image URL</label>
                <div className="flex space-x-2">
                  <div className="relative flex-1">
                    <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="url"
                      placeholder="https://example.com/image.jpg"
                      value={imageUrl}
                      onChange={(e) => {
                        setImageUrl(e.target.value);
                        setUploadedImage(null);
                      }}
                      className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-slate-200 placeholder-slate-400 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/25 transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Analysis Configuration */}
            <div>
              <h3 className="text-lg font-medium text-slate-200 mb-4">Analysis Configuration</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Analysis Type</label>
                  <select
                    value={analysisType}
                    onChange={(e) => setAnalysisType(e.target.value as any)}
                    className="w-full p-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-slate-200 focus:border-indigo-500/50"
                  >
                    <option value="basic">Basic Analysis</option>
                    <option value="detailed">Detailed Analysis</option>
                    <option value="consciousness">Consciousness-Aware Analysis</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-slate-400 mb-2">Custom Analysis Prompt</label>
                  <textarea
                    value={analysisPrompt}
                    onChange={(e) => setAnalysisPrompt(e.target.value)}
                    placeholder="Describe what aspects you'd like analyzed..."
                    rows={3}
                    className="w-full p-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-slate-200 placeholder-slate-400 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/25 transition-all resize-none"
                  />
                </div>

                <button
                  onClick={analyzeImage}
                  disabled={!currentImageSrc || isAnalyzing}
                  className="w-full px-6 py-3 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-lg hover:shadow-lg hover:shadow-indigo-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-white flex items-center justify-center space-x-2"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Analyzing Consciousness...</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4" />
                      <span>Analyze Image</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Preview and Results */}
          <div className="space-y-6">
            {/* Image Preview */}
            {currentImageSrc && (
              <div>
                <h3 className="text-lg font-medium text-slate-200 mb-4">Image Preview</h3>
                <div className="relative bg-slate-800/50 rounded-xl border border-slate-700/50 p-4">
                  <img
                    src={currentImageSrc}
                    alt="Preview"
                    className="w-full h-64 object-contain rounded-lg"
                  />
                </div>
              </div>
            )}

            {/* Analysis Results */}
            {analysisResult && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-slate-200">Analysis Results</h3>
                  <button className="p-2 bg-slate-700/50 rounded-lg hover:bg-slate-600/50 transition-colors">
                    <Download className="w-4 h-4 text-slate-400" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
                    <h4 className="font-medium text-slate-200 mb-2 flex items-center space-x-2">
                      <Sparkles className="w-4 h-4" />
                      <span>Consciousness Description</span>
                    </h4>
                    <p className="text-slate-300 leading-relaxed">{analysisResult.description}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
                      <h4 className="font-medium text-slate-200 mb-2">Detected Elements</h4>
                      <div className="flex flex-wrap gap-1">
                        {analysisResult.objects.map((obj, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 text-xs bg-indigo-500/20 text-indigo-300 rounded-md"
                          >
                            {obj}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
                      <h4 className="font-medium text-slate-200 mb-2">Energetic Mood</h4>
                      <p className="text-slate-300 text-sm">{analysisResult.mood}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
                    <h4 className="font-medium text-slate-200 mb-2">Color Frequencies</h4>
                    <div className="flex flex-wrap gap-2">
                      {analysisResult.colors.map((color, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div
                            className="w-6 h-6 rounded-lg border border-slate-600"
                            style={{ backgroundColor: color.split(' ')[1]?.replace(/[()]/g, '') || color }}
                          />
                          <span className="text-sm text-slate-300">{color}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!currentImageSrc && !analysisResult && (
              <div className="flex items-center justify-center h-64 bg-slate-800/30 rounded-xl border border-slate-700/30">
                <div className="text-center">
                  <ImageIcon className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                  <p className="text-slate-400">Upload an image or enter URL to begin analysis</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}