// import { useRef, useState, useEffect } from "react";
// import { createContext } from "react";
// import CreateBlue from "../Component/CreateBlue";
// import CreatePink from "../Component/CreatePink";
// import CreateButtercream from "../Component/CreateButtercream";

// export const NoteContext = createContext();

// const NoteProvider = ({ children }) => {
//   const date = new Date().toLocaleDateString();
//   const time = new Date();
//   const hour = time.getHours();
//   const minutes = String(time.getMinutes()).padStart(2, "0");
//   const seconds = String(time.getSeconds()).padStart(2, "0");
//   const dayOfWeek = [
//     "Sunday",
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//   ];
//   const day = dayOfWeek[time.getDay()];

//   // States
//   const [isShowing, setIsShowing] = useState(false);
//   const [divs, setDivs] = useState([]);
//   const [notes, setNotes] = useState(
//     JSON.parse(localStorage.getItem("notes")) || []
//   );
//   const [butterTitle, setButterTitle] = useState("");
//   const [butterTodo, setButterTodo] = useState("");
//   const formRef = useRef(null);
//   const [errors, setErrors] = useState("");
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   // Save notes to localStorage on updates
//   useEffect(() => {
//     localStorage.setItem("notes", JSON.stringify(notes));
//   }, [notes]);

//   const toggle = () => {
//     setIsShowing(!isShowing);
//   };

//   const Buttercream = () => {
//     setNotes([...notes, <CreateButtercream key={divs.length} />]);
//   };

//   const Blue = () => {
//     setDivs([...divs, <CreateBlue key={divs.length} />]);
//   };

//   const Pink = () => {
//     setDivs([...divs, <CreatePink key={divs.length} />]);
//   };

//   function generateRandomId() {
//     return Math.random().toString(36).substring(2, 10);
//   }

//   const submit = (e) => {
//     e.preventDefault();
//     if (butterTitle === "" || butterTodo === "") {
//       setErrors("All fields are required");
//     } else {
//       setErrors("");
//       setIsSubmitted(true);
//       const newNote = {
//         id: generateRandomId(),
//         title: butterTitle,
//         text: butterTodo,
//         date: new Date().toLocaleString(),
//       };
//       setNotes((prevNotes) => [...prevNotes, newNote]);
//       setButterTitle("");
//       setButterTodo("");
//     }
//   };

//   const handleKeyPress = (event) => {
//     if (event.key === "Enter" && !isSubmitted) {
//       formRef.current.requestSubmit();
//     }
//   };

//   const handleEdit = () => {
//     setIsSubmitted(false);
//   };

//   const value = {
//     toggle,
//     Buttercream,
//     Blue,
//     Pink,
//     isShowing,
//     setIsShowing,
//     divs,
//     setDivs,
//     date,
//     hour,
//     minutes,
//     seconds,
//     day,
//     handleKeyPress,
//     handleEdit,
//     butterTitle,
//     setButterTitle,
//     butterTodo,
//     setButterTodo,
//     errors,
//     setErrors,
//     isSubmitted,
//     setIsSubmitted,
//     submit,
//     formRef,
//     notes,
//   };
//   return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>;
// };

// export default NoteProvider;

import { createContext, useState, useEffect } from "react";

export const NoteContext = createContext();

const NoteProvider = ({ children }) => {
  const [isShowing, setIsShowing] = useState(false);
  const toggle = () => {
    setIsShowing(!isShowing);
  };
  const [notes, setNotes] = useState([]);

  const date = new Date().toLocaleDateString();
  const hour = new Date().getHours();
  const minutes = new Date().getMinutes();
  const seconds = new Date().getSeconds();
  const day = new Date().toLocaleString("default", { weekday: "long" });

  // Load notes from localStorage
  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(storedNotes);
  }, []);

  // Save notes to localStorage
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const createNote = (color) => {
    const newNote = {
      id: Date.now(),
      color,
      date,
      hour,
      minutes,
      seconds,
      day,
    };
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        date,
        hour,
        minutes,
        seconds,
        day,
        createNote,
        toggle,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export default NoteProvider;
