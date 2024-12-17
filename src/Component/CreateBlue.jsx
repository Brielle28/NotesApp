import { useContext } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { ImClock } from "react-icons/im";
import { NoteContext } from "../Context/NoteProvider";
const CreateBlue = () => {
  const {date, hour, minutes, seconds, day,} = useContext(NoteContext)

  return (
    <div className="bg-[#DFF2FF] md:w-[350px] md:h-[300px] rounded-[15px] px-2 py-4 ">
      <h1 className="text-[12px] font-semibold">1{date}</h1>
      <div className="mt-[3px] flex items-center justify-between w-full">
        <input
          placeholder="Enter Note Title"
          className="text-[20px] outline-none outline-0 font-semibold bg-transparent"
        />
        <AiOutlineEdit className="text-[23px]" />
      </div>
      <div className="w-full h-[2px] bg-black my-2"></div>
      <textarea
        className="w-full h-[150px] bg-transparent outline-none outline-0 "
        rows="200"
        cols="43"
        placeholder="Enter your notes here....."  
      >
      </textarea>
      <div className="flex items-center gap-1">
        <ImClock />
        <h1 className="font-bold text-[12px]">{hour}:{minutes}:{seconds}, {day}</h1>
      </div>
    </div>
  );
};

export default CreateBlue;
// import { AiOutlineEdit } from "react-icons/ai";
// import { ImClock } from "react-icons/im";

// const CreateBlue = () => {
//   return (
//     <div className="bg-[#DFF2FF] w-full md:w-[350px] md:h-[300px] rounded-[15px] px-4 py-6">
//       <h1 className="text-[10px] sm:text-[12px] font-semibold">12/12/2024</h1>
//       <div className="mt-[3px] flex items-center justify-between w-full">
//         <input
//           placeholder="Enter Note Title"
//           className="text-[16px] sm:text-[20px] outline-none font-semibold bg-transparent w-full sm:w-auto"
//         />
//         <AiOutlineEdit className="text-[20px] sm:text-[23px]" />
//       </div>
//       <div className="w-full h-[2px] bg-black my-2"></div>
//       <textarea
//         className="w-full h-[120px] sm:h-[150px] bg-transparent outline-none"
//         rows="5"
//         cols="40"
//         placeholder="Enter your notes here....."
//       ></textarea>
//       <div className="flex items-center gap-2 mt-2">
//         <ImClock />
//         <h1 className="font-bold text-[10px] sm:text-[12px]">12:30 PM, Monday</h1>
//       </div>
//     </div>
//   );
// };

// export default CreateBlue;
