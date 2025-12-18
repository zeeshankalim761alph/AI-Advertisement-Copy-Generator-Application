import React from 'react';
import { GeneratedResult } from '../types';
import { Copy, Check, Loader2, Sparkles } from 'lucide-react';

interface AdPreviewProps {
  result: GeneratedResult;
}

export const AdPreview: React.FC<AdPreviewProps> = ({ result }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    if (result.data) {
      const textToCopy = `${result.data.headline}\n\n${result.data.body}\n\n${result.data.callToAction}\n\n${result.data.hashtags.join(' ')}`;
      navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (result.loading) {
    return (
      <div className="flex h-full min-h-[400px] flex-col items-center justify-center rounded-2xl bg-white p-8 shadow-sm border border-slate-100 text-center">
        <Loader2 className="mb-4 h-10 w-10 animate-spin text-indigo-600" />
        <h3 className="text-lg font-semibold text-slate-800">Generating Brilliance...</h3>
        <p className="mt-2 text-sm text-slate-500 max-w-xs">
          Our AI is crafting the perfect ad copy tailored to your audience and platform.
        </p>
      </div>
    );
  }

  if (result.error) {
    return (
      <div className="flex h-full min-h-[400px] flex-col items-center justify-center rounded-2xl bg-red-50 p-8 text-center border border-red-100">
        <div className="mb-4 rounded-full bg-red-100 p-3 text-red-600">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-red-800">Generation Failed</h3>
        <p className="mt-2 text-sm text-red-600">{result.error}</p>
      </div>
    );
  }

  if (!result.data) {
    return (
      <div className="flex h-full min-h-[400px] flex-col items-center justify-center rounded-2xl bg-slate-50 p-8 text-center border-2 border-dashed border-slate-200">
        <div className="mb-4 rounded-full bg-white p-4 shadow-sm text-indigo-400">
            <Sparkles className="h-8 w-8" />
        </div>
        <h3 className="text-lg font-semibold text-slate-800">Ready to Create</h3>
        <p className="mt-2 text-sm text-slate-500 max-w-xs">
          Fill out the details on the left and click "Generate Ad Copy" to see magic happen here.
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-lg shadow-indigo-100/50 border border-slate-100">
      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 px-6 py-4">
        <h3 className="font-semibold text-slate-800">Generated Ad Copy</h3>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm ring-1 ring-slate-900/5 hover:text-indigo-600 transition-all"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? 'Copied' : 'Copy Text'}
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Headline</span>
            <h2 className="text-xl font-bold leading-tight text-slate-900">
              {result.data.headline}
            </h2>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Ad Body</span>
            <p className="whitespace-pre-line text-slate-700 leading-relaxed">
              {result.data.body}
            </p>
          </div>

          <div className="rounded-lg bg-indigo-50 p-4 border border-indigo-100">
            <span className="block text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">Call to Action</span>
            <p className="font-medium text-indigo-900">{result.data.callToAction}</p>
          </div>

          {result.data.hashtags.length > 0 && (
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Hashtags</span>
              <p className="text-sm font-medium text-slate-500">
                {result.data.hashtags.map(tag => (tag.startsWith('#') ? tag : `#${tag}`)).join(' ')}
              </p>
            </div>
          )}

          <div className="border-t border-slate-100 pt-4 mt-6">
             <span className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">AI Strategy Note</span>
             <p className="text-xs text-slate-500 italic">
                {result.data.explanation}
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};