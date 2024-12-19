import { useContext } from "react";
import { LuNotebookText } from "react-icons/lu";
import { NoteContext } from "../Context/NoteProvider";
const Notes = () => {
  const {divs} = useContext(NoteContext)
  return (
    <>
      <div className="flex flex-col items-start justify-center w-full md:pt-8 md:pl-5">
        <div className="flex items-center justify-center gap-2">
          <h1 className="font-bold text-[25px]">My Notes </h1>
          <LuNotebookText className="text-[25px]" />
        </div>
        <div className="flex flex-col items-center w-full gap-5 mt-3 md:flex-wrap md:flex-row">
        {divs}
        </div>
      </div>
    </>
  );
};

export default Notes;
