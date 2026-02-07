import { useEffect, useMemo, useState } from "react";
import { FaCalendarPlus, FaSearch } from "react-icons/fa";
import { CiCircleCheck } from "react-icons/ci";
import { CgNotes } from "react-icons/cg";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import ConfirmModal from "../components/ConfirmModal";
import RichTextEditor from "../components/RichTextEditor";

const colors = {
  green: "bg-[#FFF6CA]",
  pink: "bg-[#DFF2FF]",
  blue: "bg-[#FFD7D5]",
};

const loadInitialNotes = () => {
  const savedNotes = localStorage.getItem("notes");
  if (!savedNotes) return [];

  try {
    const parsed = JSON.parse(savedNotes);
    if (!Array.isArray(parsed)) return [];

    return parsed.map((note) => {
      const created =
        note.createdAt || note.date || new Date().toISOString();
      const updated =
        note.updatedAt || note.date || note.createdAt || created;

      return {
        ...note,
        color: note.color || colors.green,
        isEditing: typeof note.isEditing === "boolean" ? note.isEditing : false,
        isPinned: Boolean(note.isPinned),
        createdAt: created,
        updatedAt: updated,
      };
    });
  } catch {
    return [];
  }
};

const formatRelativeTime = (note) => {
  const rawDate = note.updatedAt || note.createdAt || note.date;
  if (!rawDate) return "";

  const date = new Date(rawDate);
  if (Number.isNaN(date.getTime())) {
    return typeof note.date === "string" ? note.date : "";
  }

  const diffMs = Date.now() - date.getTime();
  const diffMinutes = Math.round(diffMs / (1000 * 60));

  if (diffMinutes < 1) return "Just now";
  if (diffMinutes < 60) {
    return `${diffMinutes} min${diffMinutes > 1 ? "s" : ""} ago`;
  }

  const diffHours = Math.round(diffMinutes / 60);
  if (diffHours < 24) {
    return `${diffHours} hr${diffHours > 1 ? "s" : ""} ago`;
  }

  const diffDays = Math.round(diffHours / 24);
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;

  return date.toLocaleDateString();
};

const NotesApp = () => {
  const [notes, setNotes] = useState(loadInitialNotes);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all"); // "all" | "pinned"
  const [sortBy, setSortBy] = useState("lastEdited"); // "lastEdited" | "created" | "title" | "color"
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedNoteIds, setSelectedNoteIds] = useState([]);
  const [deleteModalNoteId, setDeleteModalNoteId] = useState(null);
  const [isBulkDeleteOpen, setIsBulkDeleteOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = (color) => {
    const now = new Date().toISOString();
    const newNote = {
      id: Date.now(),
      title: "",
      content: "",
      color: colors[color],
      createdAt: now,
      updatedAt: now,
      isEditing: true,
      isPinned: false,
    };
    setNotes((prev) => [...prev, newNote]);
    setShowColorPicker(false);
  };

  const updateNote = (id, field, value) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id
          ? { ...note, [field]: value, updatedAt: new Date().toISOString() }
          : note
      )
    );
  };

  const saveNote = (id) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id
          ? { ...note, isEditing: false, updatedAt: new Date().toISOString() }
          : note
      )
    );
  };

  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  const startEditing = (id) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, isEditing: true } : note
      )
    );
  };

  const togglePin = (id) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id
          ? { ...note, isPinned: !note.isPinned, updatedAt: new Date().toISOString() }
          : note
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

  const toggleSelectMode = () => {
    setIsSelectionMode((prev) => !prev);
    setSelectedNoteIds([]);
  };

  const toggleSelectNote = (id) => {
    setSelectedNoteIds((prev) =>
      prev.includes(id) ? prev.filter((noteId) => noteId !== id) : [...prev, id]
    );
  };

  const hasSelection = selectedNoteIds.length > 0;

  const bulkUpdatePinned = (pinned) => {
    if (!hasSelection) return;

    setNotes((prev) =>
      prev.map((note) =>
        selectedNoteIds.includes(note.id)
          ? { ...note, isPinned: pinned, updatedAt: new Date().toISOString() }
          : note
      )
    );
    setSelectedNoteIds([]);
  };

  const bulkDelete = () => {
    if (!hasSelection) return;

    setNotes((prev) => prev.filter((note) => !selectedNoteIds.includes(note.id)));
    setSelectedNoteIds([]);
    setIsSelectionMode(false);
  };

  const filteredNotes = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    let result = notes;

    if (query) {
      result = result.filter((note) => {
        const title = (note.title || "").toLowerCase();
        const content = (note.content || "").toLowerCase();
        return title.includes(query) || content.includes(query);
      });
    }

    if (activeFilter === "pinned") {
      result = result.filter((note) => note.isPinned);
    }

    const getTime = (note, field) => {
      const raw = note[field] || note.createdAt || note.date;
      const date = new Date(raw);
      const time = date.getTime();
      return Number.isNaN(time) ? 0 : time;
    };

    const sorted = [...result].sort((a, b) => {
      if (a.isPinned !== b.isPinned) {
        return a.isPinned ? -1 : 1;
      }

      switch (sortBy) {
        case "created":
          return getTime(b, "createdAt") - getTime(a, "createdAt");
        case "title": {
          const titleA = (a.title || "").toLowerCase();
          const titleB = (b.title || "").toLowerCase();
          return titleA.localeCompare(titleB);
        }
        case "color": {
          const colorA = a.color || "";
          const colorB = b.color || "";
          return colorA.localeCompare(colorB);
        }
        case "lastEdited":
        default:
          return getTime(b, "updatedAt") - getTime(a, "updatedAt");
      }
    });

    return sorted;
  }, [notes, searchQuery, activeFilter, sortBy]);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 md:items-start md:flex-row">
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
        <div className="w-full max-w-sm md:max-w-none md:w-[80%] md:pl-10 mt-20 md:mt-0 md:ml-[17%] md:h-screen md:overflow-y-auto">
          <div className="hidden md:flex md:items-center md:justify-between md:mt-9">
            <div className="flex items-center gap-2">
              <CgNotes className="text-[20px]" />
              <div>
                <h1 className="text-[20px] font-bold">Notes({filteredNotes.length})</h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 rounded-full bg-white px-1 py-1 shadow-sm">
                <button
                  type="button"
                  onClick={() => setActiveFilter("all")}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    activeFilter === "all"
                      ? "bg-gray-900 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  All
                </button>
                <button
                  type="button"
                  onClick={() => setActiveFilter("pinned")}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    activeFilter === "pinned"
                      ? "bg-gray-900 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  Pinned
                </button>
              </div>
              <button
                type="button"
                onClick={toggleSelectMode}
                className={`rounded-full px-3 py-1 text-xs font-medium border transition-colors ${
                  isSelectionMode
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                {isSelectionMode ? "Done" : "Select"}
              </button>
              <div className="flex items-center gap-3">
                <label className="text-xs text-gray-500">Sort by</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="rounded-md border border-gray-300 bg-white px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="lastEdited">Last edited</option>
                  <option value="created">Created</option>
                  <option value="title">Title</option>
                  <option value="color">Color</option>
                </select>
              </div>
              {/* Search input */}
              <div className="relative flex items-center">
                <FaSearch className="absolute left-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search notes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
          {/* Mobile search input */}
          <div className="md:hidden sticky top-16 z-20 mt-4 mb-2 pb-2 bg-gray-100">
            <div className="relative flex items-center">
              <FaSearch className="absolute left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={() => setActiveFilter("all")}
                className={`flex-1 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  activeFilter === "all"
                    ? "bg-gray-900 text-white"
                    : "bg-white text-gray-700"
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter("pinned")}
                className={`flex-1 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  activeFilter === "pinned"
                    ? "bg-gray-900 text-white"
                    : "bg-white text-gray-700"
                }`}
              >
                Pinned
              </button>
            </div>
            <div className="mt-2 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={toggleSelectMode}
                className={`rounded-full px-3 py-1 text-xs font-medium border transition-colors ${
                  isSelectionMode
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                {isSelectionMode ? "Done" : "Select"}
              </button>
              <div className="flex items-center gap-2">
                <label className="text-[11px] text-gray-500">Sort</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="flex-1 rounded-md border border-gray-300 bg-white px-2 py-1 text-[11px] focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="lastEdited">Last edited</option>
                  <option value="created">Created</option>
                  <option value="title">Title</option>
                  <option value="color">Color</option>
                </select>
              </div>
            </div>
          </div>

          {filteredNotes.length === 0 ? (
            <div className="flex items-center justify-center w-full md:mt-52">
              <h1 className="text-center font-semibold text-black">
                {searchQuery ? (
                  `No notes found matching "${searchQuery}"`
                ) : activeFilter === "pinned" ? (
                  <>
                    You haven&apos;t pinned any notes yet.{" "}
                    <span className="font-bold">
                      Pin your favorite notes from the All tab.
                    </span>
                  </>
                ) : (
                  <>
                    No Notes Found : click the{" "}
                    <span className="font-bold">Add new note</span> button to
                    add a note
                  </>
                )}
              </h1>
            </div>
          ) : (
            <>
            {isSelectionMode && (
              <div className="sticky top-[112px] z-10 mb-2 flex items-center justify-between rounded-lg bg-white px-3 py-2 text-xs shadow-sm md:static md:mt-3">
                <span className="font-medium">
                  {hasSelection ? `${selectedNoteIds.length} selected` : "Tap notes to select"}
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => bulkUpdatePinned(true)}
                    disabled={!hasSelection}
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      hasSelection
                        ? "bg-gray-900 text-white"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Pin
                  </button>
                  <button
                    type="button"
                    onClick={() => bulkUpdatePinned(false)}
                    disabled={!hasSelection}
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      hasSelection
                        ? "bg-white text-gray-700 border border-gray-300"
                        : "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed"
                    }`}
                  >
                    Unpin
                  </button>
                  <button
                    type="button"
                    onClick={() => hasSelection && setIsBulkDeleteOpen(true)}
                    disabled={!hasSelection}
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      hasSelection
                        ? "bg-red-500 text-white"
                        : "bg-red-100 text-red-300 cursor-not-allowed"
                    }`}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 w-[100%] mt-3 pb-6">
              {filteredNotes.map((note) => (
              <div
                key={note.id}
                className={`p-4 rounded-xl shadow ${note.color} transition-transform hover:scale-[1.02] hover:shadow-md`}
              >
                <div className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">
                  {formatRelativeTime(note) || "Saved"}
                </div>
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
                    <div className="mt-1">
                      <RichTextEditor
                        value={note.content}
                        onChange={(html) =>
                          updateNote(note.id, "content", html)
                        }
                      />
                    </div>
                    <button
                      onClick={() => saveNote(note.id)}
                      className="flex items-center gap-1 px-3 py-1 mt-2 bg-white rounded-lg shadow-sm transition-shadow hover:shadow"
                    >
                      <CiCircleCheck size={16} />
                      Save
                    </button>
                  </>
                ) : (
                  <div
                    className="cursor-pointer h-52"
                    onClick={(e) => {
                      if (isSelectionMode) {
                        e.stopPropagation();
                        toggleSelectNote(note.id);
                        return;
                      }
                      // Prevent editing when clicking the delete button or checkbox area
                      if (!e.target.closest(".delete-button") && !e.target.closest(".select-checkbox")) {
                        startEditing(note.id);
                      }
                    }}
                  >
                    <div className="flex items-start justify-between w-full gap-2">
                      <h3 className="mb-2 font-bold hover:text-gray-700 line-clamp-2">
                        {note.title || "Untitled"}
                      </h3>
                      <div className="flex items-center gap-1">
                        {isSelectionMode && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleSelectNote(note.id);
                            }}
                            className="select-checkbox flex h-6 w-6 items-center justify-center rounded-full border border-gray-300 bg-white text-[12px] font-semibold text-gray-600"
                          >
                            {selectedNoteIds.includes(note.id) ? "✓" : ""}
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            togglePin(note.id);
                          }}
                          className="delete-button rounded-full p-1 transition-colors hover:bg-white/60"
                          aria-label={note.isPinned ? "Unpin note" : "Pin note"}
                        >
                          {note.isPinned ? (
                            <AiFillStar className="text-yellow-500 text-[18px]" />
                          ) : (
                            <AiOutlineStar className="text-gray-400 text-[18px]" />
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeleteModalNoteId(note.id);
                          }}
                          className="delete-button rounded-full p-1 transition-colors hover:bg-white/60"
                          aria-label="Delete note"
                        >
                          <MdOutlineDeleteSweep className="text-red-500 text-[22px]" />
                        </button>
                      </div>
                    </div>
                    <div className="w-full h-[1px] bg-black/10"></div>
                    <div className="w-full mt-2 text-sm leading-relaxed hover:text-gray-700 line-clamp-6">
                      {note.content ? (
                        <div
                          className="tiptap"
                          dangerouslySetInnerHTML={{ __html: note.content }}
                        />
                      ) : (
                        "Empty note"
                      )}
                    </div>
                  </div>
                )}
              </div>
              ))}
            </div>
            </>
          )}
        </div>
      )}

      <ConfirmModal
        isOpen={deleteModalNoteId != null}
        title="Delete note?"
        message="Delete this note? This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={() => {
          if (deleteModalNoteId != null) {
            deleteNote(deleteModalNoteId);
            setDeleteModalNoteId(null);
          }
        }}
        onCancel={() => setDeleteModalNoteId(null)}
        danger
      />

      <ConfirmModal
        isOpen={isBulkDeleteOpen}
        title="Delete selected notes?"
        message={`Delete ${selectedNoteIds.length} selected note${selectedNoteIds.length === 1 ? "" : "s"}? This action cannot be undone.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={() => {
          bulkDelete();
          setIsBulkDeleteOpen(false);
        }}
        onCancel={() => setIsBulkDeleteOpen(false)}
        danger
      />
    </div>
  );
};

export default NotesApp;
