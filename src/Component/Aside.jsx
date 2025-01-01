import { useContext } from "react";
import { FaCalendarPlus } from "react-icons/fa";
import { NoteContext } from "../Context/NoteProvider";

const Aside = () => {
  // const { toggle, Buttercream, Blue, Pink, isShowing, divs } = useContext(NoteContext);
  const { toggle, isShowing, createNote } = useContext(NoteContext);
  return (
    <div className="flex flex-col items-center justify-center w-full gap-2 py-3 md:pt-10">
      <div
        className="flex items-center justify-center gap-2 cursor-pointer"
        onClick={toggle}
      >
        <FaCalendarPlus />
        <h1 className="font-bold">Add Note</h1>
      </div>
        <button onClick={() => createNote("#DFF2FF")}>Add Blue Note</button>
        <button onClick={() => createNote("#FFD7D5")}>Add Pink Note</button>
      {/* {isShowing && (
        <div className="flex flex-row gap-3 cursor-pointer md:flex-col">
          <div
            className="w-4 h-4 bg-[#FFF6CA] rounded-full md:h-6 md:w-6"
            onClick={() => {
              Buttercream();
            }}
          ></div>
          <div
            className="w-4 h-4 bg-[#DFF2FF] rounded-full md:h-6 md:w-6"
            onClick={() => {
              Blue();
            }}
          ></div>
          <div
            className="w-4 h-4 bg-[#FFD7D5] rounded-full md:h-6 md:w-6"
            onClick={() => {
              Pink();
            }}
          ></div>
        </div>
      )} */}
    </div>
  );
};

export default Aside;
