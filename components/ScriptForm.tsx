'use client';

import { useState } from 'react';
import StyleSelector from './StyleSelector';

interface ScriptFormProps {
  onGenerate: (data: {
    topic: string;
    contentType: string;
    technicalLevel: string;
    styleId: string;
  }) => void;
  isLoading: boolean;
}

export default function ScriptForm({ onGenerate, isLoading }: ScriptFormProps) {
  const [topic, setTopic] = useState('');
  const [contentType, setContentType] = useState('TikTok 60s');
  const [technicalLevel, setTechnicalLevel] = useState('Principiante');
  const [styleId, setStyleId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim() || !styleId) return;
    
    onGenerate({
      topic: topic.trim(),
      contentType,
      technicalLevel,
      styleId,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Style Selector */}
      <StyleSelector selectedStyleId={styleId} onSelect={setStyleId} />

      {/* Topic Input */}
      <div>
        <label htmlFor="topic" className="block text-sm font-medium text-gray-200 mb-2">
          Tema/Pregunta
        </label>
        <input
          id="topic"
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="ej: ¿Qué es un DEX?"
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F7B11F] focus:border-transparent transition"
          disabled={isLoading}
        />
      </div>

      {/* Selectors Row */}
      <div className="grid grid-cols-2 gap-4">
        {/* Content Type */}
        <div>
          <label htmlFor="contentType" className="block text-sm font-medium text-gray-200 mb-2">
            Tipo de Contenido
          </label>
          <select
            id="contentType"
            value={contentType}
            onChange={(e) => setContentType(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#F7B11F] focus:border-transparent transition"
            disabled={isLoading}
          >
            <option value="TikTok 60s">TikTok 60s</option>
            <option value="Reel 90s">Reel 90s</option>
            <option value="Thread">Thread</option>
            <option value="Artículo corto">Artículo corto</option>
          </select>
        </div>

        {/* Technical Level */}
        <div>
          <label htmlFor="technicalLevel" className="block text-sm font-medium text-gray-200 mb-2">
            Nivel Técnico
          </label>
          <select
            id="technicalLevel"
            value={technicalLevel}
            onChange={(e) => setTechnicalLevel(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#F7B11F] focus:border-transparent transition"
            disabled={isLoading}
          >
            <option value="Principiante">Principiante</option>
            <option value="Intermedio">Intermedio</option>
            <option value="Avanzado">Avanzado</option>
          </select>
        </div>
      </div>

      {/* Generate Button */}
      <button
        type="submit"
        disabled={isLoading || !topic.trim() || !styleId}
        className="w-full px-6 py-4 bg-[#F7B11F] text-[#111111] font-bold rounded-lg hover:bg-[#e5a00f] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generando...
          </>
        ) : (
          <>
            Generar Guion 🚀
          </>
        )}
      </button>
    </form>
  );
}
