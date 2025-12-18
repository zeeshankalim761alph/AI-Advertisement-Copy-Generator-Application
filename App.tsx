import React, { useState } from 'react';
import { generateAdCopy } from './services/geminiService';
import { AdRequestData, GeneratedResult, Platform, Tone, Length } from './types';
import { InputSelect } from './components/InputSelect';
import { AdPreview } from './components/AdPreview';
import { Wand2, RotateCcw, PenTool } from 'lucide-react';

const INITIAL_FORM_STATE: AdRequestData = {
  productName: '',
  description: '',
  targetAudience: '',
  platform: Platform.Facebook,
  tone: Tone.Professional,
  length: Length.Medium,
};

const App: React.FC = () => {
  const [formData, setFormData] = useState<AdRequestData>(INITIAL_FORM_STATE);
  const [result, setResult] = useState<GeneratedResult>({
    data: null,
    loading: false,
    error: null,
  });

  const handleInputChange = (field: keyof AdRequestData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM_STATE);
    setResult({ data: null, loading: false, error: null });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.productName.trim() || !formData.description.trim()) {
        // Simple validation visualization
        setResult(prev => ({ ...prev, error: "Please provide at least a Product Name and Description." }));
        return;
    }

    setResult({ data: null, loading: true, error: null });

    try {
      const data = await generateAdCopy(formData);
      setResult({ data, loading: false, error: null });
    } catch (err: any) {
      setResult({
        data: null,
        loading: false,
        error: err.message || "Something went wrong",
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <header className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center justify-center rounded-2xl bg-indigo-600 p-3 shadow-lg shadow-indigo-600/20">
            <PenTool className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            AdCraft <span className="text-indigo-600">AI</span>
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Generate high-converting advertisement copy for any platform in seconds.
            Professional, persuasive, and perfectly tailored.
          </p>
        </header>

        <main className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-start">
          {/* Form Section */}
          <div className="rounded-2xl bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8 border border-slate-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-5">
                <div className="space-y-1">
                  <label htmlFor="productName" className="text-sm font-medium text-slate-700">
                    Product / Service Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="productName"
                    required
                    placeholder="e.g. EcoGlow Facial Serum"
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-700 transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 placeholder:text-slate-400"
                    value={formData.productName}
                    onChange={(e) => handleInputChange('productName', e.target.value)}
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="description" className="text-sm font-medium text-slate-700">
                    Product Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    required
                    rows={4}
                    placeholder="Describe key features, benefits, and unique selling points..."
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-700 transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 placeholder:text-slate-400 resize-none"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="targetAudience" className="text-sm font-medium text-slate-700">
                    Target Audience
                  </label>
                  <input
                    type="text"
                    id="targetAudience"
                    placeholder="e.g. Women aged 25-40 interested in sustainable beauty"
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-700 transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 placeholder:text-slate-400"
                    value={formData.targetAudience}
                    onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <InputSelect
                    id="platform"
                    label="Platform"
                    value={formData.platform}
                    options={Object.values(Platform)}
                    onChange={(val) => handleInputChange('platform', val)}
                  />
                  <InputSelect
                    id="tone"
                    label="Tone"
                    value={formData.tone}
                    options={Object.values(Tone)}
                    onChange={(val) => handleInputChange('tone', val)}
                  />
                </div>

                <InputSelect
                  id="length"
                  label="Length"
                  value={formData.length}
                  options={Object.values(Length)}
                  onChange={(val) => handleInputChange('length', val)}
                />
              </div>

              <div className="flex flex-col gap-4 pt-4 sm:flex-row">
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200 focus:ring-offset-2 transition-all sm:w-1/3"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset
                </button>
                <button
                  type="submit"
                  disabled={result.loading}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white shadow-lg shadow-indigo-600/25 hover:bg-indigo-700 hover:shadow-indigo-600/40 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                >
                  {result.loading ? (
                    'Generating...'
                  ) : (
                    <>
                      <Wand2 className="h-4 w-4" />
                      Generate Ad Copy
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Preview Section */}
          <div className="lg:sticky lg:top-8 h-full">
            <AdPreview result={result} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;