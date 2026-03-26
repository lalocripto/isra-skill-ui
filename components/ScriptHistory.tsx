'use client';

interface HistoryItem {
  id: string;
  request: {
    topic: string;
    contentType: string;
    technicalLevel: string;
  };
  timestamp: number;
  savedToNotion: boolean;
}

interface ScriptHistoryProps {
  history: HistoryItem[];
  onSelect: (id: string) => void;
  currentId?: string;
}

export default function ScriptHistory({ history, onSelect, currentId }: ScriptHistoryProps) {
  if (history.length === 0) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 text-center text-gray-500">
        <p className="text-sm">No hay guiones generados aún.</p>
        <p className="text-xs mt-2">Los últimos 10 guiones aparecerán aquí.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg p-4 space-y-2">
      <h3 className="text-sm font-semibold text-gray-300 mb-3 px-2">
        📚 Historial (últimos 10)
      </h3>
      <div className="space-y-1">
        {history.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`w-full text-left px-3 py-3 rounded-lg transition ${
              currentId === item.id
                ? 'bg-[#F7B11F] text-[#111111]'
                : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{item.request.topic}</p>
                <p className={`text-xs mt-1 ${
                  currentId === item.id ? 'text-[#111111]/70' : 'text-gray-400'
                }`}>
                  {item.request.contentType}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                <span className={`text-xs ${
                  currentId === item.id ? 'text-[#111111]/70' : 'text-gray-400'
                }`}>
                  {formatTimestamp(item.timestamp)}
                </span>
                {item.savedToNotion && (
                  <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded">
                    ✓ Notion
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function formatTimestamp(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  
  if (minutes < 1) return 'Ahora';
  if (minutes < 60) return `Hace ${minutes}m`;
  if (hours < 24) return `Hace ${hours}h`;
  
  const date = new Date(timestamp);
  return date.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' });
}
