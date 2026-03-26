'use client';

import { useState } from 'react';
import ScriptForm from '@/components/ScriptForm';
import ScriptPreview from '@/components/ScriptPreview';
import ScriptHistory from '@/components/ScriptHistory';

interface GeneratedScript {
  id: string;
  script: string;
  metadata: {
    wordCount: number;
    estimatedDuration: string;
    complexity: string;
  };
  request: {
    topic: string;
    contentType: string;
    technicalLevel: string;
  };
  timestamp: number;
  savedToNotion: boolean;
  notionUrl?: string;
}

export default function Home() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [currentScript, setCurrentScript] = useState<GeneratedScript | null>(null);
  const [history, setHistory] = useState<GeneratedScript[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleGenerate = async (data: {
    topic: string;
    contentType: string;
    technicalLevel: string;
  }) => {
    setIsGenerating(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch('/api/generate-script', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to generate script');
      }

      const result = await response.json();

      const newScript: GeneratedScript = {
        id: Date.now().toString(),
        script: result.script,
        metadata: result.metadata,
        request: result.request,
        timestamp: Date.now(),
        savedToNotion: false,
      };

      setCurrentScript(newScript);
      setHistory((prev) => [newScript, ...prev].slice(0, 10)); // Keep only last 10

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRegenerate = () => {
    if (currentScript) {
      handleGenerate(currentScript.request);
    }
  };

  const handleSaveToNotion = async (editedScript: string) => {
    if (!currentScript) return;

    setIsSaving(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch('/api/save-to-notion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: currentScript.request.topic,
          content: editedScript,
          contentType: currentScript.request.contentType,
          technicalLevel: currentScript.request.technicalLevel,
          metadata: currentScript.metadata,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save to Notion');
      }

      const result = await response.json();

      // Update current script
      const updatedScript = {
        ...currentScript,
        savedToNotion: true,
        notionUrl: result.notionUrl,
      };
      setCurrentScript(updatedScript);

      // Update history
      setHistory((prev) =>
        prev.map((item) =>
          item.id === currentScript.id ? updatedScript : item
        )
      );

      setSuccessMessage('¡Guardado en Notion! 🎉');
      setTimeout(() => setSuccessMessage(null), 5000);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSelectHistory = (id: string) => {
    const selected = history.find((item) => item.id === id);
    if (selected) {
      setCurrentScript(selected);
    }
  };

  return (
    <div className="min-h-screen bg-[#111111]">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            🐸 Isra Crypto Education Generator
          </h1>
          <p className="text-gray-400 mt-2 text-sm">
            Genera guiones educativos crypto usando la metodología anti-hype de Isra
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Error/Success Messages */}
        {error && (
          <div className="mb-6 px-4 py-3 bg-red-500/10 border border-red-500 rounded-lg text-red-400">
            ❌ {error}
          </div>
        )}
        {successMessage && (
          <div className="mb-6 px-4 py-3 bg-green-500/10 border border-green-500 rounded-lg text-green-400">
            {successMessage}
            {currentScript?.notionUrl && (
              <a
                href={currentScript.notionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 underline hover:text-green-300"
              >
                Ver en Notion →
              </a>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Form + Preview */}
          <div className="lg:col-span-2 space-y-8">
            {/* Form */}
            <div className="bg-gray-900 rounded-lg p-6">
              <ScriptForm onGenerate={handleGenerate} isLoading={isGenerating} />
            </div>

            {/* Preview */}
            {currentScript && (
              <div className="bg-gray-900 rounded-lg p-6">
                <ScriptPreview
                  script={currentScript.script}
                  metadata={currentScript.metadata}
                  request={currentScript.request}
                  onRegenerate={handleRegenerate}
                  onSaveToNotion={handleSaveToNotion}
                  isSaving={isSaving}
                />
              </div>
            )}

            {/* Empty State */}
            {!currentScript && !isGenerating && (
              <div className="bg-gray-900 rounded-lg p-12 text-center text-gray-500">
                <p className="text-lg">👆 Completa el formulario para generar tu primer guion</p>
                <p className="text-sm mt-2">
                  Usa la metodología de Isra: anti-hype, honesto, y educativo
                </p>
              </div>
            )}
          </div>

          {/* Right Column: History */}
          <div className="lg:col-span-1">
            <ScriptHistory
              history={history}
              onSelect={handleSelectHistory}
              currentId={currentScript?.id}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-gray-500 text-sm">
          <p>
            Powered by{' '}
            <span className="text-[#F7B11F] font-medium">Claude Sonnet 4.5</span> +{' '}
            <span className="text-[#F7B11F] font-medium">Notion API</span>
          </p>
          <p className="mt-1">Metodología: Isra Crypto Education</p>
        </div>
      </footer>
    </div>
  );
}
