import { useState, useEffect } from "react";
import { FaCalendarPlus, FaSearch } from "react-icons/fa";
import { CiCircleCheck } from "react-icons/ci";
import { CgNotes } from "react-icons/cg";
import { MdOutlineDeleteSweep } from "react-icons/md";

const NotesApp = () => {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const colors = {
    green: "bg-[#FFF6CA]",
    pink: "bg-[#DFF2FF]",
    blue: "bg-[#FFD7D5]",
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

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const startEditing = (id) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, isEditing: true } : note
      )
    );
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".color-picker-container")) {
        setShowColorPicker(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Filter notes based on search query
  const filteredNotes = notes.filter((note) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    const title = (note.title || "").toLowerCase();
    const content = (note.content || "").toLowerCase();
    return title.includes(query) || content.includes(query);
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 md:justify-start md:items-start md:flex-row">
      {/* add note */}
      <div className="fixed top-0 left-0 z-10 flex w-full items-start md:items-start justify-center md:min-h-screen mb-6 bg-white md:w-[17%] md:fixed md:top-0 md:left-0 md:h-screen">
        <div className="relative color-picker-container">
          {/* button for color picker */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowColorPicker(!showColorPicker);
            }}
            className="flex items-center gap-2 px-4 py-2 my-3 transition-colors rounded-lg md:mt-7"
          >
            <FaCalendarPlus className="text-[20px] font-bold" />
            <h1 className="font-bold text-[12px] md:text-[10px] lg:text-[14px] xl:text-[18px]">Add New Note</h1>
          </button>
          {/* color picker */}
          {showColorPicker && (
            <div className="absolute flex gap-2 p-2 bg-white rounded-lg shadow-lg left-9 top-[50px] md:top-[70px]">
              <button
                onClick={() => addNote("green")}
                className="w-8 h-8 bg-[#FFF6CA] rounded-full hover:ring-2 ring-[#f5eab5] transition-all"
              />
              <button
                onClick={() => addNote("pink")}
                className="w-8 h-8 bg-[#DFF2FF] rounded-full hover:ring-2 ring-[#c4dff0] transition-all"
              />
              <button
                onClick={() => addNote("blue")}
                className="w-8 h-8 bg-[#FFD7D5] rounded-full hover:ring-2 ring-[#f8b1ad] transition-all"
              />
            </div>
          )}
        </div>
      </div>
      {/* notes display */}
      {notes.length === 0 ? (
        <div className="w-[80%] md:pl-10 mt-20 md:mt-0 md:ml-[17%] md:h-screen md:overflow-y-auto">
          <div className="hidden gap-2 md:items-center md:flex md:mt-9 ">
            <CgNotes className="text-[20px]" />
            <h1 className="font-bold text-[20px]">Notes ({notes.length})</h1>
          </div>
          <div className="flex items-center justify-center w-full md:mt-52">
            <h1 className="font-semibold text-center text-black">No Notes Found : click the <span className="font-bold"> Add new note </span> button to add a note </h1>
          </div>
        </div>
      ) : (
        <div className="w-[80%] md:pl-10 mt-20 md:mt-0 md:ml-[17%] md:h-screen md:overflow-y-auto">
          <div className="hidden md:flex md:items-center md:justify-between md:mt-9">
            <div className="flex gap-2 items-center">
              <CgNotes className="text-[20px]" />
              <h1 className="font-bold text-[20px]">Notes ({filteredNotes.length})</h1>
            </div>
            {/* Search input */}
            <div className="relative flex items-center">
              <FaSearch className="absolute left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-64 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>
          </div>
          {/* Mobile search input */}
          <div className="md:hidden mt-4 mb-4">
            <div className="relative flex items-center">
              <FaSearch className="absolute left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>
          </div>

          {filteredNotes.length === 0 ? (
            <div className="flex items-center justify-center w-full md:mt-52">
              <h1 className="font-semibold text-center text-black">
                {searchQuery ? (
                  `No notes found matching "${searchQuery}"`
                ) : (
                  <>
                    No Notes Found : click the <span className="font-bold"> Add new note </span> button to add a note
                  </>
                )}
              </h1>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 w-[100%] mt-3 pb-6">
              {filteredNotes.map((note) => (
              <div
                key={note.id}
                className={`p-4 rounded-lg shadow ${note.color} transition-transform hover:scale-[1.02]`}
              >
                <div className="mb-2 text-sm text-gray-500">{note.date}</div>
                {note.isEditing ? (
                  <>
                    <input
                      type="text"
                      value={note.title}
                      onChange={(e) =>
                        updateNote(note.id, "title", e.target.value)
                      }
                      placeholder="Title"
                      className="w-full p-1 mb-2 rounded bg-white/50 focus:outline-none focus:ring-1"
                      autoFocus
                    />
                    <textarea
                      value={note.content}
                      onChange={(e) =>
                        updateNote(note.id, "content", e.target.value)
                      }
                      placeholder="Note content..."
                      className="w-full h-32 p-1 rounded resize-none bg-white/50 focus:outline-none focus:ring-1"
                    />
                    <button
                      onClick={() => saveNote(note.id)}
                      className="flex items-center gap-1 px-3 py-1 mt-2 transition-shadow bg-white rounded-lg shadow-sm hover:shadow"
                    >
                      <CiCircleCheck size={16} />
                      Save
                    </button>
                  </>
                ) : (
                  <div
                    className="cursor-pointer h-52"
                    onClick={(e) => {
                      // Prevent editing when clicking the delete button
                      if (!e.target.closest(".delete-button")) {
                        startEditing(note.id);
                      }
                    }}
                  >
                    <div className="flex items-center justify-between w-full">
                      <h3 className="mb-2 font-bold hover:text-gray-700">
                        {note.title || "Untitled"}
                      </h3>
                      <button
                        onClick={() => deleteNote(note.id)}
                        className="p-1 transition-colors rounded-full hover:bg-white/50 delete-button"
                      >
                        <MdOutlineDeleteSweep className="text-red-500 text-[22px]" />
                      </button>
                    </div>
                    <div className="w-full h-[1px] bg-black/10"></div>
                    <p className="w-full mt-2 hover:text-gray-700">
                      {note.content || "Empty note"}
                    </p>
                  </div>
                )}
              </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotesApp;
