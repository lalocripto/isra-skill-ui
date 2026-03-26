'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AnalyzerPage() {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [creatorName, setCreatorName] = useState('');
  const [videosToAnalyze, setVideosToAnalyze] = useState(10);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleAnalyze = async () => {
    if (!youtubeUrl) {
      setError('Por favor ingresa una URL de canal de YouTube');
      return;
    }

    setIsAnalyzing(true);
    setError('');
    setProgress(0);
    setStatus('Iniciando análisis...');

    try {
      const response = await fetch('/api/analyze-creator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          youtubeUrl,
          creatorName: creatorName || undefined,
          videosToAnalyze,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze creator');
      }

      setProgress(100);
      setStatus('¡Análisis completo! ✅');

      // Redirect to main page after 2 seconds
      setTimeout(() => {
        router.push('/');
      }, 2000);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#111111]">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/')}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ← Volver
            </button>
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                🎯 Analyze New Creator
              </h1>
              <p className="text-gray-400 mt-2 text-sm">
                Extrae automáticamente el voice, frameworks, y patterns de cualquier creator en YouTube
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Error Message */}
        {error && (
          <div className="mb-6 px-4 py-3 bg-red-500/10 border border-red-500 rounded-lg text-red-400">
            ❌ {error}
          </div>
        )}

        {/* Analyzer Form */}
        <div className="bg-gray-900 rounded-lg p-8">
          {!isAnalyzing ? (
            <div className="space-y-6">
              {/* YouTube URL */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  YouTube Channel URL <span className="text-red-400">*</span>
                </label>
                <input
                  type="url"
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  placeholder="https://youtube.com/@creator"
                  className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 border border-gray-700 
                             focus:border-[#F7B11F] focus:ring-1 focus:ring-[#F7B11F] outline-none"
                />
                <p className="mt-2 text-sm text-gray-500">
                  Ejemplo: https://youtube.com/@DanKoe
                </p>
              </div>

              {/* Creator Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Creator Name (opcional)
                </label>
                <input
                  type="text"
                  value={creatorName}
                  onChange={(e) => setCreatorName(e.target.value)}
                  placeholder="Dan Koe"
                  className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 border border-gray-700 
                             focus:border-[#F7B11F] focus:ring-1 focus:ring-[#F7B11F] outline-none"
                />
                <p className="mt-2 text-sm text-gray-500">
                  Si no lo provees, intentaremos extraerlo del canal
                </p>
              </div>

              {/* Videos to Analyze */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Videos a analizar
                </label>
                <select
                  value={videosToAnalyze}
                  onChange={(e) => setVideosToAnalyze(Number(e.target.value))}
                  className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 border border-gray-700 
                             focus:border-[#F7B11F] focus:ring-1 focus:ring-[#F7B11F] outline-none"
                >
                  <option value={5}>5 videos (~5 min)</option>
                  <option value={10}>10 videos (~10 min)</option>
                  <option value={15}>15 videos (~15 min)</option>
                </select>
                <p className="mt-2 text-sm text-gray-500">
                  Más videos = análisis más preciso, pero toma más tiempo
                </p>
              </div>

              {/* Analyze Button */}
              <button
                onClick={handleAnalyze}
                disabled={!youtubeUrl}
                className="w-full bg-[#F7B11F] hover:bg-[#e5a01e] disabled:bg-gray-700 disabled:text-gray-500 
                           text-[#111111] font-medium rounded-lg px-6 py-4 transition-colors
                           flex items-center justify-center gap-2"
              >
                <span className="text-xl">🔍</span>
                Analizar Creator
              </button>

              {/* Info */}
              <div className="mt-6 p-4 bg-gray-800/50 rounded-lg text-sm text-gray-400">
                <p className="font-medium text-gray-300 mb-2">ℹ️ Qué hace este análisis:</p>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Extrae los videos más populares del canal</li>
                  <li>Transcribe el contenido usando IA</li>
                  <li>Analiza con Claude para identificar patterns</li>
                  <li>Guarda el estilo en la base de datos</li>
                </ul>
                <p className="mt-3 text-xs text-gray-500">
                  Tiempo estimado: ~10-15 minutos para 10 videos
                </p>
              </div>
            </div>
          ) : (
            /* Progress Display */
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-6xl mb-4">🔄</div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Analizando Creator...
                </h2>
                <p className="text-gray-400">{status}</p>
              </div>

              {/* Progress Bar */}
              <div className="bg-gray-800 rounded-full h-4 overflow-hidden">
                <div
                  className="bg-[#F7B11F] h-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <p className="text-center text-sm text-gray-500">
                {progress}% completo
              </p>

              {progress === 100 && (
                <div className="text-center text-green-400 font-medium">
                  Redirigiendo al generador...
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
