// import { useContext } from "react";
// import { AiOutlineEdit } from "react-icons/ai";
// import { ImClock } from "react-icons/im";
// import { NoteContext } from "../Context/NoteProvider";

// const CreateButtercream = () => {
//   const {
//     handleKeyPress,
//     handleEdit,
//     butterTitle,
//     setButterTitle,
//     butterTodo,
//     setButterTodo,
//     errors,
//     isSubmitted,
//     submit,
//     date,
//     hour,
//     minutes,
//     seconds,
//     day,
//     formRef,
//     notes,
//   } = useContext(NoteContext);

//   return (
//     <div className="bg-[#FFF6CA] w-[90%] md:w-[350px] md:h-[300px] rounded-[15px] px-2 py-4">
//       <h1 className="text-[12px] font-semibold">{date}</h1>
//       <form ref={formRef} onSubmit={submit}>
//         <div className="mt-[3px] flex items-center justify-between w-full">
//           <input
//             placeholder="Enter Note Title"
//             value={butterTitle}
//             onChange={(e) => setButterTitle(e.target.value)}
//             onKeyDown={handleKeyPress}
//             className="text-[20px] outline-none outline-0 font-semibold bg-transparent"
//             disabled={isSubmitted} // Disable input if the form is submitted
//           />
//           {isSubmitted && (
//             <AiOutlineEdit
//               className="text-[23px] text-yellow-700"
//               onClick={handleEdit}
//             />
//           )}
//         </div>
//         <div className="w-full h-[2px] bg-black my-2"></div>
//         <textarea
//           className="w-full h-[150px] bg-transparent outline-none outline-0"
//           rows="200"
//           cols="43"
//           value={butterTodo}
//           placeholder="Enter your notes here....."
//           onChange={(e) => setButterTodo(e.target.value)}
//           onKeyDown={handleKeyPress}
//           disabled={isSubmitted} // Disable textarea if the form is submitted
//         ></textarea>
//         <p className="text-red-500 text-[15px]">{errors}</p>
//       </form>
//       <div className="flex items-center gap-1">
//         <ImClock />
//         <h1 className="font-bold text-[12px]">
//           {hour}:{minutes}:{seconds}, {day}
//         </h1>
//       </div>
//     </div>
//   );
// };

// export default CreateButtercream;
import { useContext } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { ImClock } from "react-icons/im";
import { NoteContext } from "../Context/NoteProvider";

const CreateButtercream = ({ note }) => {
  const { color, date, hour, minutes, seconds, day } = note;

  return (
    <div
      className={`w-[90%] md:w-[350px] md:h-[300px] rounded-[15px] px-2 py-4`}
      style={{ backgroundColor: color }}
    >
      <h1 className="text-[12px] font-semibold">{date}</h1>
      <div className="mt-[3px] flex items-center justify-between w-full">
        <input
          placeholder="Enter Note Title"
          className="text-[20px] outline-none font-semibold bg-transparent"
        />
        <AiOutlineEdit className="text-[23px]" />
      </div>
      <div className="w-full h-[2px] bg-black my-2"></div>
      <textarea
        className="w-full h-[150px] bg-transparent outline-none"
        placeholder="Enter your notes here..."
      />
      <div className="flex items-center gap-1">
        <ImClock />
        <h1 className="font-bold text-[12px]">
          {hour}:{minutes}:{seconds}, {day}
        </h1>
      </div>
    </div>
  );
};

export default CreateButtercream;
