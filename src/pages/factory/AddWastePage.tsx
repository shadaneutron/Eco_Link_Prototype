import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Upload, Image as ImageIcon, Sparkles, FileCheck, Store, Loader2, CheckCircle2, X } from 'lucide-react';

type Step = 'form' | 'analyzing' | 'result';

export default function AddWastePage() {
  const { navigate } = useApp();
  const [step, setStep] = useState<Step>('form');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [form, setForm] = useState({
    wasteType: '',
    weight: '',
    quantity: '',
    location: '',
    description: '',
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = ev => setImagePreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('analyzing');
    setTimeout(() => setStep('result'), 2200);
  };

  const update = (key: string, val: string) => setForm(prev => ({ ...prev, [key]: val }));

  if (step === 'analyzing') {
    return (
      <div className="p-6 flex items-center justify-center min-h-[60vh] animate-fade-in">
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-teal-100" />
            <div className="absolute inset-0 rounded-full border-4 border-teal-500 border-t-transparent animate-spin" />
            <Sparkles size={32} className="absolute inset-0 m-auto text-teal-500" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Analyzing Waste Sample...</h3>
          <p className="text-sm text-slate-500">Our AI is identifying the material type and quality</p>
        </div>
      </div>
    );
  }

  if (step === 'result') {
    return (
      <div className="p-6 max-w-3xl mx-auto animate-slide-up">
        <div className="bg-white rounded-3xl border border-slate-100 shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-teal-600 to-emerald-600 p-6 text-white">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle2 size={24} />
              <h2 className="text-xl font-bold">AI Analysis Complete</h2>
            </div>
            <p className="text-teal-50 text-sm">Digital Product Passport ready to generate</p>
          </div>

          <div className="p-6 space-y-6">
            <div className="flex items-center gap-6">
              {imagePreview ? (
                <img src={imagePreview} alt="Waste sample" className="w-32 h-32 rounded-2xl object-cover border border-slate-200" />
              ) : (
                <div className="w-32 h-32 rounded-2xl bg-slate-100 flex items-center justify-center">
                  <ImageIcon size={32} className="text-slate-400" />
                </div>
              )}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-3 py-1 bg-teal-50 text-teal-700 text-sm font-bold rounded-full">Plastic PET</span>
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-sm font-bold rounded-full">96% Confidence</span>
                </div>
                <p className="text-sm text-slate-500 mt-2">
                  Identified as post-industrial PET plastic. High recyclability score. Suitable for food-grade reprocessing.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs text-slate-400 font-medium mb-1">Material</p>
                <p className="text-sm font-bold text-slate-800">Polyethylene Terephthalate</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs text-slate-400 font-medium mb-1">Recyclability</p>
                <p className="text-sm font-bold text-emerald-600">High (Grade A)</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs text-slate-400 font-medium mb-1">Contamination Level</p>
                <p className="text-sm font-bold text-slate-800">Low (2.1%)</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs text-slate-400 font-medium mb-1">Estimated Value</p>
                <p className="text-sm font-bold text-teal-700">$4,800 - $5,600</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => alert('Digital Product Passport generated! (demo)')}
                className="flex-1 flex items-center justify-center gap-2 bg-navy-700 hover:bg-navy-800 text-white font-semibold py-3 rounded-xl transition-all hover:shadow-lg"
              >
                <FileCheck size={18} />
                Generate Digital Product Passport
              </button>
              <button
                onClick={() => navigate('marketplace')}
                className="flex-1 flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-xl transition-all hover:shadow-lg"
              >
                <Store size={18} />
                Publish to Marketplace
              </button>
            </div>
            <button
              onClick={() => setStep('form')}
              className="w-full text-sm text-slate-500 hover:text-slate-700 font-medium pt-2"
            >
              Start over
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto animate-fade-in">
      <form onSubmit={handleAnalyze} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-6">
        {/* Image upload */}
        <div>
          <label className="text-sm font-semibold text-slate-700 mb-2 block">Waste Image</label>
          <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer hover:border-teal-400 hover:bg-teal-50/30 transition-all overflow-hidden">
            {imagePreview ? (
              <div className="relative w-full h-full">
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={(e) => { e.preventDefault(); setImagePreview(null); }}
                  className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-slate-600 hover:text-rose-500"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center mx-auto mb-3">
                  <Upload size={24} className="text-teal-500" />
                </div>
                <p className="text-sm font-semibold text-slate-700">Click to upload waste image</p>
                <p className="text-xs text-slate-400 mt-1">PNG, JPG up to 10MB</p>
              </div>
            )}
            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
          </label>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Waste Type</label>
            <select
              value={form.wasteType}
              onChange={e => update('wasteType', e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            >
              <option value="">Select type...</option>
              <option>Plastic PET</option>
              <option>HDPE Plastic</option>
              <option>Aluminum Scrap</option>
              <option>Copper Wire</option>
              <option>Cardboard</option>
              <option>Glass Cullet</option>
              <option>Steel Scrap</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Weight (kg)</label>
            <input
              type="number"
              value={form.weight}
              onChange={e => update('weight', e.target.value)}
              placeholder="e.g. 2400"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Quantity (units)</label>
            <input
              type="number"
              value={form.quantity}
              onChange={e => update('quantity', e.target.value)}
              placeholder="e.g. 120"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Location</label>
            <input
              type="text"
              value={form.location}
              onChange={e => update('location', e.target.value)}
              placeholder="e.g. Dubai Industrial City"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Description</label>
          <textarea
            value={form.description}
            onChange={e => update('description', e.target.value)}
            rows={4}
            placeholder="Describe the waste material, condition, sorting, etc."
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 hover:shadow-lg active:scale-[0.98]"
        >
          <Sparkles size={18} />
          Analyze using AI
        </button>
      </form>
    </div>
  );
}
