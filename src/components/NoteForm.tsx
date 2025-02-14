import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import type { NoteFormData } from '../types';

interface NoteFormProps {
  onSubmit: (note: NoteFormData) => void;
}

export function NoteForm({ onSubmit }: NoteFormProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [note, setNote] = useState<NoteFormData>({
    title: '',
    content: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!note.content.trim()) return;
    
    onSubmit(note);
    setNote({ title: '', content: '' });
    setIsExpanded(false);
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="max-w-[600px] w-full mx-auto mb-8 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
    >
      <div className="p-4">
        {isExpanded && (
          <input
            type="text"
            placeholder="Title"
            value={note.title}
            onChange={(e) => setNote(prev => ({ ...prev, title: e.target.value }))}
            className="w-full mb-2 text-lg font-medium outline-none"
          />
        )}
        <textarea
          placeholder="Take a note..."
          value={note.content}
          onChange={(e) => setNote(prev => ({ ...prev, content: e.target.value }))}
          onClick={() => setIsExpanded(true)}
          rows={isExpanded ? 3 : 1}
          className="w-full resize-none outline-none"
        />
      </div>
      {isExpanded && (
        <div className="flex justify-end p-2 border-t">
          <button
            type="submit"
            className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100"
          >
            <Plus size={18} />
            Add Note
          </button>
        </div>
      )}
    </form>
  );
}