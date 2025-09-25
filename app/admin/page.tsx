'use client';

import { useState } from 'react';
import { parables } from '@/data/parables';

const altitudeOrder = ['magenta', 'red', 'amber', 'orange', 'green', 'teal', 'turquoise'] as const;

export default function AdminPage() {
  const [generating, setGenerating] = useState(false);
  const [results, setResults] = useState<string[]>([]);
  const [selectedParableIds, setSelectedParableIds] = useState<string[]>([]);
  const [currentStatus, setCurrentStatus] = useState('');

  const generateNotesForParable = async (parableId: string, title: string) => {
    const results: string[] = [];
    
    for (const altitude of altitudeOrder) {
      const status = `[${altitude.toUpperCase()}] Generating note for ${title}...`;
      setCurrentStatus(status);
      
      try {
        const response = await fetch('/api/generate-notes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ parableId, altitude }),
        });

        const result = await response.json();
        
        if (response.ok) {
          results.push(`[OK] Generated ${altitude} note for ${title}`);
          setResults(prev => [...prev, results[results.length - 1]]);
        } else {
          const errorMsg = result.error || response.statusText;
          results.push(`[ERROR] Failed to generate ${altitude} note for ${title}: ${errorMsg}`);
          setResults(prev => [...prev, results[results.length - 1]]);
          // Continue with next altitude even if one fails
        }
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : String(error);
        results.push(`[ERROR] Exception while generating ${altitude} note for ${title}: ${errorMsg}`);
        setResults(prev => [...prev, results[results.length - 1]]);
        // Continue with next altitude even if one fails
      }
      
      // Add a small delay between API calls to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    setCurrentStatus('');
    return results;
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
    setCurrentStatus('Starting...');
    
    const selectedParables = parables.filter(parable => selectedParableIds.includes(parable.id));
    let successCount = 0;
    let errorCount = 0;

    try {
      for (let index = 0; index < selectedParables.length; index++) {
        const parable = selectedParables[index];
        const progress = `[${index + 1}/${selectedParables.length}]`;
        setCurrentStatus(`${progress} Processing ${parable.title}...`);
        
        setResults(prev => [...prev, `${progress} Regenerating notes for ${parable.title}`]);
        
        try {
          const results = await generateNotesForParable(parable.id, parable.title);
          const success = results.every(r => r.startsWith('[OK]'));
          
          if (success) {
            successCount++;
          } else {
            errorCount++;
          }
          
          // Add a longer delay between parables
          if (index < selectedParables.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 2000));
          }
        } catch (error) {
          errorCount++;
          const errorMsg = error instanceof Error ? error.message : String(error);
          setResults(prev => [...prev, `[ERROR] Failed to process ${parable.title}: ${errorMsg}`]);
          
          // Continue with next parable even if one fails
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
      
      const completionMessage = `[DONE] Finished processing ${selectedParables.length} parables. ` +
        `Success: ${successCount}, Errors: ${errorCount}`;
      setResults(prev => [...prev, completionMessage]);
    } finally {
      setGenerating(false);
      setCurrentStatus('');
    }
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
            {generating ? 'Generating...' : `Regenerate Notes (${selectedParableIds.length} selected)`}
          </button>
        </div>

        {results.length > 0 && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Results</h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {currentStatus && (
                <div className="text-sm font-mono p-2 bg-blue-50 border-l-4 border-blue-500 mb-4">
                  {currentStatus}
                </div>
              )}
              {results.map((result, index) => {
                const isError = result.includes('[ERROR]');
                const isSuccess = result.includes('[OK]');
                let bgColor = 'bg-gray-50';
                let borderColor = 'border-gray-200';
                
                if (isError) {
                  bgColor = 'bg-red-50';
                  borderColor = 'border-red-200';
                } else if (isSuccess) {
                  bgColor = 'bg-green-50';
                  borderColor = 'border-green-200';
                }
                
                return (
                  <div 
                    key={`${result}-${index}`} 
                    className={`text-sm font-mono p-2 ${bgColor} border-l-4 ${borderColor} rounded`}
                  >
                    {result}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

