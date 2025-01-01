// import { useContext } from "react";
import { LuNotebookText } from "react-icons/lu";
// import { NoteContext } from "../Context/NoteProvider";
const Notes = () => {
  // const { divs, notes } = useContext(NoteContext);
  return (
    <>
      <div className="flex flex-col items-start w-full md:pt-8 md:pl-5">
        <div className="items-center justify-center hidden gap-2 md:flex">
          <h1 className="font-bold text-[25px]">My Notes </h1>
          <LuNotebookText className="text-[25px]" />
        </div>
        <div
          className={`flex flex-col items-center w-full gap-5 mt-3 md:flex-wrap md:flex-row`}
        >
          {/* {divs} */}
          {/* {notes.map((note) => (
            <div key={note.id} className="note-card">
              <h3>{note.title}</h3>
              <p>{note.text}</p>
              <span>{note.date}</span>
            </div>
          ))} */}
        </div>
      </div>
    </>
  );
};

export default Notes;
