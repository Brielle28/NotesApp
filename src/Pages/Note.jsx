// import { useState, useEffect } from "react";
// import { FaCalendarPlus } from "react-icons/fa";
// import { CiCircleCheck } from "react-icons/ci";
// import { CgNotes } from "react-icons/cg";
// import { MdOutlineDeleteSweep } from "react-icons/md";

// const NotesApp = () => {
//   const [notes, setNotes] = useState(() => {
//     // Initialize notes from localStorage
//     const savedNotes = localStorage.getItem('notes');
//     return savedNotes ? JSON.parse(savedNotes) : [];
//   });
//   const [showColorPicker, setShowColorPicker] = useState(false);

//   // Save notes to localStorage whenever they change
//   useEffect(() => {
//     localStorage.setItem('notes', JSON.stringify(notes));
//   }, [notes]);

//   const colors = {
//     green: "bg-[#FFF6CA]",
//     pink: "bg-[#DFF2FF]",
//     blue: "bg-[#FFD7D5]",
//   };

//   const addNote = (color) => {
//     const newNote = {
//       id: Date.now(),
//       title: "",
//       content: "",
//       color: colors[color],
//       date: new Date().toLocaleString(),
//       isEditing: true,
//     };
//     setNotes([...notes, newNote]);
//     setShowColorPicker(false);
//   };

//   const updateNote = (id, field, value) => {
//     setNotes(
//       notes.map((note) => (note.id === id ? { ...note, [field]: value } : note))
//     );
//   };

//   const saveNote = (id) => {
//     setNotes(
//       notes.map((note) =>
//         note.id === id ? { ...note, isEditing: false } : note
//       )
//     );
//   };

//   const deleteNote = (id) => {
//     setNotes(notes.filter((note) => note.id !== id));
//   };

//   // Close color picker when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (!e.target.closest('.color-picker-container')) {
//         setShowColorPicker(false);
//       }
//     };

//     document.addEventListener('click', handleClickOutside);
//     return () => document.removeEventListener('click', handleClickOutside);
//   }, []);

//   return (
//     <div className="flex flex-row items-start justify-start min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <div className="sticky flex items-start justify-center min-h-screen mb-6 bg-white w-[17%]">
//         <div className="relative color-picker-container">
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               setShowColorPicker(!showColorPicker);
//             }}
//             className="flex items-center gap-2 px-4 py-2 transition-colors rounded-lg mt-7 hover:bg-gray-100"
//           >
//             <FaCalendarPlus className="text-[20px] font-bold" />
//             <h1 className="font-bold text-[18px]">Add New Note</h1>
//           </button>
          
//           {/* Color Picker */}
//           {showColorPicker && (
//             <div className="absolute flex gap-2 p-2 bg-white rounded-lg shadow-lg left-9 top-[70px]">
//               <button
//                 onClick={() => addNote("green")}
//                 className="w-8 h-8 bg-[#FFF6CA] rounded-full hover:ring-2 ring-[#f5eab5] transition-all"
//               />
//               <button
//                 onClick={() => addNote("pink")}
//                 className="w-8 h-8 bg-[#DFF2FF] rounded-full hover:ring-2 ring-[#c4dff0] transition-all"
//               />
//               <button
//                 onClick={() => addNote("blue")}
//                 className="w-8 h-8 bg-[#FFD7D5] rounded-full hover:ring-2 ring-[#f8b1ad] transition-all"
//               />
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="w-[80%] pl-10">
//         <div className="flex items-center gap-2 mt-9">
//           <h1 className="font-bold text-[20px]">Notes </h1>
//           <CgNotes className="text-[20px]" /> 
//         </div>
        
//         <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 w-[100%] mt-3 pb-6">
//           {notes.map((note) => (
//             <div
//               key={note.id}
//               className={`p-4 rounded-lg shadow ${note.color} transition-transform hover:scale-[1.02]`}
//             >
//               <div className="mb-2 text-sm text-gray-500">{note.date}</div>
//               {note.isEditing ? (
//                 <>
//                   <input
//                     type="text"
//                     value={note.title}
//                     onChange={(e) => updateNote(note.id, "title", e.target.value)}
//                     placeholder="Title"
//                     className="w-full p-1 mb-2 rounded bg-white/50 focus:outline-none focus:ring-1"
//                     autoFocus
//                   />
//                   <textarea
//                     value={note.content}
//                     onChange={(e) => updateNote(note.id, "content", e.target.value)}
//                     placeholder="Note content..."
//                     className="w-full h-32 p-1 rounded resize-none bg-white/50 focus:outline-none focus:ring-1"
//                   />
//                   <button
//                     onClick={() => saveNote(note.id)}
//                     className="flex items-center gap-1 px-3 py-1 mt-2 transition-shadow bg-white rounded-lg shadow-sm hover:shadow"
//                   >
//                     <CiCircleCheck size={16} />
//                     Save
//                   </button>
//                 </>
//               ) : (
//                 <div className="h-52">
//                   <div className="flex items-center justify-between w-full">
//                     <h3 
//                       className="mb-2 font-bold cursor-pointer hover:text-gray-700" 
//                       onClick={() => updateNote(note.id, "isEditing", true)}
//                     >
//                       {note.title}
//                     </h3>
//                     <button 
//                       onClick={() => deleteNote(note.id)}
//                       className="p-1 transition-colors rounded-full hover:bg-white/50"
//                     >
//                       <MdOutlineDeleteSweep className="text-red-500 text-[22px]" />
//                     </button>
//                   </div>
//                   <div className="w-full h-[1px] bg-black/10"></div>
//                   <p 
//                     className="w-full mt-2 cursor-pointer hover:text-gray-700" 
//                     onClick={() => updateNote(note.id, "isEditing", true)}
//                   >
//                     {note.content}
//                   </p>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NotesApp;
import { useState, useEffect } from "react";
import { FaCalendarPlus } from "react-icons/fa";
import { CiCircleCheck } from "react-icons/ci";
import { CgNotes } from "react-icons/cg";
import { MdOutlineDeleteSweep } from "react-icons/md";

const NotesApp = () => {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  const [showColorPicker, setShowColorPicker] = useState(false);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
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
      if (!e.target.closest('.color-picker-container')) {
        setShowColorPicker(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="flex flex-row items-start justify-start min-h-screen bg-gray-100">
      <div className="sticky flex items-start justify-center min-h-screen mb-6 bg-white w-[17%]">
        <div className="relative color-picker-container">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowColorPicker(!showColorPicker);
            }}
            className="flex items-center gap-2 px-4 py-2 mt-7 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FaCalendarPlus className="text-[20px] font-bold" />
            <h1 className="font-bold text-[18px]">Add New Note</h1>
          </button>
          
          {showColorPicker && (
            <div className="absolute flex gap-2 p-2 bg-white rounded-lg shadow-lg left-9 top-[70px]">
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

      <div className="w-[80%] pl-10">
        <div className="flex items-center gap-2 mt-9">
          <h1 className="font-bold text-[20px]">Notes ({notes.length})</h1>
          <CgNotes className="text-[20px]" />
        </div>
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 w-[100%] mt-3 pb-6">
          {notes.map((note) => (
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
                    onChange={(e) => updateNote(note.id, "title", e.target.value)}
                    placeholder="Title"
                    className="w-full p-1 mb-2 rounded bg-white/50 focus:outline-none focus:ring-1"
                    autoFocus
                  />
                  <textarea
                    value={note.content}
                    onChange={(e) => updateNote(note.id, "content", e.target.value)}
                    placeholder="Note content..."
                    className="w-full h-32 p-1 rounded resize-none bg-white/50 focus:outline-none focus:ring-1"
                  />
                  <button
                    onClick={() => saveNote(note.id)}
                    className="flex items-center gap-1 px-3 py-1 mt-2 bg-white rounded-lg shadow-sm hover:shadow transition-shadow"
                  >
                    <CiCircleCheck size={16} />
                    Save
                  </button>
                </>
              ) : (
                <div 
                  className="h-52 cursor-pointer"
                  onClick={(e) => {
                    // Prevent editing when clicking the delete button
                    if (!e.target.closest('.delete-button')) {
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
                      className="p-1 rounded-full hover:bg-white/50 transition-colors delete-button"
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
      </div>
    </div>
  );
};

export default NotesApp;