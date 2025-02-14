import React, { useState } from 'react';
import { Trash2, Save } from 'lucide-react';
import type { Note } from '../types';

interface NoteCardProps {
  note: Note;
  onUpdate: (id: string, title: string, content: string) => void;
  onDelete: (id: string) => void;
}

export function NoteCard({ note, onUpdate, onDelete }: NoteCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(note.title);
  const [editedContent, setEditedContent] = useState(note.content);

  const handleSave = () => {
    if (editedContent.trim()) {
      onUpdate(note.id, editedTitle, editedContent);
      setIsEditing(false);
    }
  };

  const formattedDate = new Date(note.updatedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="p-4">
        {isEditing ? (
          <>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="w-full mb-2 text-lg font-medium outline-none"
              placeholder="Title"
            />
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="w-full resize-none outline-none"
              rows={3}
              placeholder="Note content"
            />
          </>
        ) : (
          <div onClick={() => setIsEditing(true)} className="cursor-pointer">
            {note.title && (
              <h3 className="mb-2 text-lg font-medium">{note.title}</h3>
            )}
            <p className="whitespace-pre-wrap">{note.content}</p>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between p-2 border-t">
        <span className="text-xs text-gray-500">{formattedDate}</span>
        <div className="flex gap-2">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="p-2 text-gray-600 rounded-full hover:bg-gray-100"
            >
              <Save size={18} />
            </button>
          ) : (
            <button
              onClick={() => onDelete(note.id)}
              className="p-2 text-gray-600 rounded-full hover:bg-gray-100"
            >
              <Trash2 size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}