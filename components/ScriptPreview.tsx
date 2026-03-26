'use client';

import { useState } from 'react';

interface ScriptPreviewProps {
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
  onRegenerate: () => void;
  onSaveToNotion: (editedScript: string) => void;
  isSaving: boolean;
}

export default function ScriptPreview({
  script,
  metadata,
  request,
  onRegenerate,
  onSaveToNotion,
  isSaving,
}: ScriptPreviewProps) {
  const [editedScript, setEditedScript] = useState(script);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(editedScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    onSaveToNotion(editedScript);
  };

  return (
    <div className="space-y-4">
      {/* Title */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">📝 Guion Generado</h2>
        <span className="text-sm text-gray-400">
          {request.topic}
        </span>
      </div>

      {/* Editable Script */}
      <textarea
        value={editedScript}
        onChange={(e) => setEditedScript(e.target.value)}
        className="w-full h-96 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F7B11F] focus:border-transparent transition resize-none font-mono text-sm"
        placeholder="El guion aparecerá aquí..."
      />

      {/* Metadata */}
      <div className="flex items-center gap-6 text-sm text-gray-300 bg-gray-800 px-4 py-3 rounded-lg">
        <div className="flex items-center gap-2">
          <span className="font-semibold">📊 Metadata:</span>
        </div>
        <div>{metadata.wordCount} palabras</div>
        <div>|</div>
        <div>{metadata.estimatedDuration}</div>
        <div>|</div>
        <div>Complejidad: {metadata.complexity}</div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={onRegenerate}
          className="px-4 py-3 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-600 transition flex items-center justify-center gap-2"
        >
          ♻️ Regenerar
        </button>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-4 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-500 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSaving ? (
            <>
              <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Guardando...
            </>
          ) : (
            <>
              💾 Guardar a Notion
            </>
          )}
        </button>

        <button
          onClick={handleCopy}
          className="px-4 py-3 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-600 transition flex items-center justify-center gap-2"
        >
          {copied ? (
            <>
              ✅ Copiado!
            </>
          ) : (
            <>
              📋 Copiar
            </>
          )}
        </button>
      </div>
    </div>
  );
}
