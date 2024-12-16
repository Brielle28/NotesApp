import { useContext } from "react";
import Aside from "../Component/Aside";
import Notes from "../Component/Notes";
import { NoteContext } from "../Context/NoteProvider";

const Note = () => {
  const {divs} = useContext(NoteContext)
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full md:items-start md:justify-start md:flex-row">
        <div className="md:w-[15%] md:h-screen bg-white">
          <Aside />
        </div>
        <div className={`md:w-[90%] w-full bg-[#ECECEC] ${divs.length < 4 ? "md:h-screen" : ""}`}>
          <Notes />
        </div>
      </div>
    </>
  );
};

export default Note;
