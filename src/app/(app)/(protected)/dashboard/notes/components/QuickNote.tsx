"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface QuickNote {
  id: string;
  content: string;
  createdAt: string;
}

export function QuickNotesWidget() {
  const [notes, setNotes] = useState<QuickNote[]>([
    {
      id: "1",
      content: "Remember to check walkie batteries before tomorrow's shoot",
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      content: "Camera dept needs 3 more walkies for stunt sequence",
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    },
  ]);
  const [isAdding, setIsAdding] = useState(false);
  const [newNote, setNewNote] = useState("");

  const handleAddNote = () => {
    if (newNote.trim()) {
      const note: QuickNote = {
        id: Date.now().toString(),
        content: newNote,
        createdAt: new Date().toISOString(),
      };
      setNotes([note, ...notes]);
      setNewNote("");
      setIsAdding(false);
    }
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${Math.floor(diffInHours)}h ago`;
    if (diffInHours < 48) return "Yesterday";
    return date.toLocaleDateString();
  };

  return (
    <Card className="bg-yellow-50 border-yellow-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            📌 Quick Notes
          </CardTitle>
          {!isAdding && (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsAdding(true)}
              className="h-8 w-8 p-0"
            >
              <Plus className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {isAdding && (
          <div className="space-y-2">
            <Textarea
              placeholder="Type your quick note..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className="min-h-[80px] bg-white resize-none"
              autoFocus
            />
            <div className="flex gap-2">
              <Button size="sm" onClick={handleAddNote}>
                Add Note
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setIsAdding(false);
                  setNewNote("");
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        <ScrollArea className="h-[200px]">
          <div className="space-y-2">
            {notes.map((note) => (
              <div
                key={note.id}
                className="bg-yellow-100 border border-yellow-300 rounded-lg p-3 relative group"
              >
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleDeleteNote(note.id)}
                >
                  <X className="h-3 w-3" />
                </Button>
                <p className="text-sm pr-6">{note.content}</p>
                <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {formatTime(note.createdAt)}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {notes.length === 0 && !isAdding && (
          <p className="text-sm text-muted-foreground text-center py-8">
            No notes yet. Click + to add one!
          </p>
        )}
      </CardContent>
    </Card>
  );
}
