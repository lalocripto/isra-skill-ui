'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Style {
  id: string;
  name: string;
  youtube_url?: string;
  created_at: string;
  isPlaceholder: boolean;
}

interface StyleSelectorProps {
  selectedStyleId: string;
  onSelect: (styleId: string) => void;
}

export default function StyleSelector({ selectedStyleId, onSelect }: StyleSelectorProps) {
  const [styles, setStyles] = useState<Style[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchStyles();
  }, []);

  const fetchStyles = async () => {
    try {
      const response = await fetch('/api/styles');
      const data = await response.json();
      
      if (data.success) {
        setStyles(data.styles);
        // Auto-select Isra if nothing selected
        if (!selectedStyleId && data.styles.length > 0) {
          const isra = data.styles.find((s: Style) => s.name === 'Isra Crypto');
          if (isra) onSelect(isra.id);
        }
      }
    } catch (error) {
      console.error('Failed to fetch styles:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Estilo del Creator
        </label>
        <div className="bg-gray-800 rounded-lg p-4 text-gray-500">
          Cargando estilos...
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-300 mb-2">
        Estilo del Creator
      </label>
      
      <select
        value={selectedStyleId}
        onChange={(e) => onSelect(e.target.value)}
        className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 border border-gray-700 
                   focus:border-[#F7B11F] focus:ring-1 focus:ring-[#F7B11F] outline-none"
      >
        <option value="">Seleccionar estilo...</option>
        {styles.map((style) => (
          <option key={style.id} value={style.id}>
            {style.name}
            {style.isPlaceholder && ' (pendiente análisis)'}
          </option>
        ))}
      </select>

      {/* Analyze New Creator Button */}
      <button
        onClick={() => router.push('/analyzer')}
        className="mt-3 w-full bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg px-4 py-3 
                   border border-dashed border-gray-600 hover:border-[#F7B11F] transition-colors
                   flex items-center justify-center gap-2"
      >
        <span className="text-xl">➕</span>
        Analizar Nuevo Creator
      </button>

      {/* Selected Style Preview */}
      {selectedStyleId && (
        <div className="mt-3 p-3 bg-gray-800/50 rounded-lg text-sm">
          <p className="text-gray-400">
            Estilo seleccionado:{' '}
            <span className="text-[#F7B11F] font-medium">
              {styles.find((s) => s.id === selectedStyleId)?.name}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
