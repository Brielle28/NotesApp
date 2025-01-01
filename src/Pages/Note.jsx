import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { CiCircleCheck } from "react-icons/ci";
const NotesApp = () => {
  const [notes, setNotes] = useState([]);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const colors = {
    green: "bg-green-100",
    pink: "bg-pink-100",
    blue: "bg-blue-100",
  };

  const addNote = (color) => {
    const newNote = {
      id: Date.now(),
      title: "",
      content: "",
      color: colors[color],
      date: new Date().toLocaleString(),
      isEditing: true,
    };
    setNotes([...notes, newNote]);
    setShowColorPicker(false);
  };

  const updateNote = (id, field, value) => {
    setNotes(
      notes.map((note) => (note.id === id ? { ...note, [field]: value } : note))
    );
  };

  const saveNote = (id) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, isEditing: false } : note
      )
    );
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      {/* Add Note Button */}
      <div className="relative mb-6">
        <button
          onClick={() => setShowColorPicker(!showColorPicker)}
          className="flex items-center gap-2 px-4 py-2 transition-shadow bg-white rounded-lg shadow hover:shadow-md"
        >
          <FaPlus size={20} />
          Add Note
        </button>

        {/* Color Picker */}
        {showColorPicker && (
          <div className="absolute left-0 flex gap-2 p-2 bg-white rounded-lg shadow-lg top-12">
            <button
              onClick={() => addNote("green")}
              className="w-8 h-8 bg-green-100 rounded-full hover:ring-2 ring-green-400"
            />
            <button
              onClick={() => addNote("pink")}
              className="w-8 h-8 bg-pink-100 rounded-full hover:ring-2 ring-pink-400"
            />
            <button
              onClick={() => addNote("blue")}
              className="w-8 h-8 bg-blue-100 rounded-full hover:ring-2 ring-blue-400"
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {notes.map((note) => (
          <div key={note.id} className={`p-4 rounded-lg shadow ${note.color}`}>
            <div className="mb-2 text-sm text-gray-500">{note.date}</div>

            {note.isEditing ? (
              <>
                <input
                  type="text"
                  value={note.title}
                  onChange={(e) => updateNote(note.id, "title", e.target.value)}
                  placeholder="Title"
                  className="w-full p-1 mb-2 rounded bg-white/50"
                />
                <textarea
                  value={note.content}
                  onChange={(e) =>
                    updateNote(note.id, "content", e.target.value)
                  }
                  placeholder="Note content..."
                  className="w-full h-32 p-1 rounded resize-none bg-white/50"
                />
                <button
                  onClick={() => saveNote(note.id)}
                  className="flex items-center gap-1 px-3 py-1 mt-2 bg-white rounded-lg shadow-sm hover:shadow"
                >
                  <CiCircleCheck size={16} />
                  Save
                </button>
              </>
            ) : (
              <div onClick={() => updateNote(note.id, "isEditing", true)}>
                <h3 className="mb-2 font-medium">{note.title}</h3>
                <p className="whitespace-pre-wrap">{note.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesApp;
