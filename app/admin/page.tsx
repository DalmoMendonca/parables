'use client';

import { useState } from 'react';
import { parables } from '@/data/parables';

export default function AdminPage() {
  const [generating, setGenerating] = useState(false);
  const [results, setResults] = useState<string[]>([]);
  const [selectedParableIds, setSelectedParableIds] = useState<string[]>([]);

  const generateNotesForParable = async (parableId: string, title: string) => {
    try {
      const response = await fetch('/api/generate-notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ parableId }),
      });

      if (response.ok) {
        const result = await response.json();
        setResults(prev => [...prev, `[OK] Generated ${result.notes.length} notes for ${title}`]);
      } else {
        const error = await response.text();
        setResults(prev => [...prev, `[ERROR] Failed to generate notes for ${title}: ${error}`]);
      }
    } catch (error) {
      setResults(prev => [...prev, `[ERROR] Exception while generating notes for ${title}: ${String(error)}`]);
    }
  };

  const toggleParableSelection = (id: string) => {
    if (generating) return;
    setSelectedParableIds(prev =>
      prev.includes(id) ? prev.filter(existingId => existingId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (generating) return;
    if (selectedParableIds.length === parables.length) {
      setSelectedParableIds([]);
    } else {
      setSelectedParableIds(parables.map(parable => parable.id));
    }
  };

  const regenerateSelectedNotes = async () => {
    if (selectedParableIds.length === 0) return;

    setGenerating(true);
    setResults([]);
    const selectedParables = parables.filter(parable => selectedParableIds.includes(parable.id));

    for (let index = 0; index < selectedParables.length; index += 1) {
      const parable = selectedParables[index];
      setResults(prev => [...prev, `[RUNNING] Regenerating notes for ${parable.title}`]);
      await generateNotesForParable(parable.id, parable.title);

      if (index < selectedParables.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }

    setGenerating(false);
    setResults(prev => [...prev, '[DONE] Finished regenerating selected parables.']);
  };

  const isSelected = (id: string) => selectedParableIds.includes(id);

  const selectedCount = selectedParableIds.length;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Generate AI Notes</h2>
              <p className="text-gray-600">
                Select the parables you want to regenerate. Click &quot;Select All&quot; to refresh the full library.
              </p>
            </div>

            <button
              type="button"
              onClick={handleSelectAll}
              disabled={generating}
              className="rounded-md border border-gray-300 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-100 disabled:opacity-60"
            >
              {selectedParableIds.length === parables.length ? 'Clear Selection' : 'Select All'}
            </button>
          </div>

          <p className="text-sm text-gray-500 mb-6">
            Selected: {selectedCount} of {parables.length}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
            {parables.map(parable => {
              const selected = isSelected(parable.id);

              return (
                <button
                  key={parable.id}
                  type="button"
                  onClick={() => toggleParableSelection(parable.id)}
                  disabled={generating}
                  className={`text-left border rounded-lg p-4 transition ${
                    selected
                      ? 'border-blue-600 bg-blue-50 shadow-sm'
                      : 'border-gray-200 hover:border-blue-400 hover:bg-blue-50/40'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-gray-800">{parable.title}</p>
                      <p className="text-xs text-gray-500 mt-1 uppercase tracking-wide">
                        {Object.values(parable.gospels).join(' | ')}
                      </p>
                    </div>
                    <span
                      className={`inline-flex h-5 w-5 items-center justify-center rounded border ${
                        selected ? 'bg-blue-600 border-blue-600' : 'border-gray-300'
                      }`}
                    >
                      {selected && <span className="h-2 w-2 rounded-full bg-white" />}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={regenerateSelectedNotes}
            disabled={generating || selectedParableIds.length === 0}
            className={`btn btn-primary ${
              generating || selectedParableIds.length === 0 ? 'opacity-60 cursor-not-allowed' : ''
            }`}
          >
            {generating ? 'Regenerating Notes...' : 'Regenerate Notes'}
          </button>
        </div>

        {results.length > 0 && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Results</h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {results.map((result, index) => (
                <div key={`${result}-${index}`} className="text-sm font-mono p-2 bg-gray-50 rounded">
                  {result}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

