import { AiOutlineEdit } from "react-icons/ai";
import { ImClock } from "react-icons/im";
const CreateRed = () => {
  return (
    <div className="bg-[#FFF6CA] md:w-[350px] md:h-[300px] rounded-[15px] px-2 py-4 ">
      <h1 className="text-[12px] font-semibold">12/12/2024</h1>
      <div className="mt-[3px] flex items-center justify-between w-full">
        <h1 className="text-[22px] font-bold">title</h1>
        <AiOutlineEdit className="text-[23px]" />
      </div>
      <div className="w-full h-[2px] bg-black my-2"></div>
      <textarea
        className="w-full h-[150px] bg-transparent outline-none outline-0 "
        rows="200"
        cols="43"
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus odio
        tempore quisquam. Asperiores, necessitatibus natus fuga molestiae, magni
        omnis architecto fugiat atque itaque ipsam debitis, quae eum doloribus
        suscipit quibusdam?
      </textarea>
      <div className="flex items-center gap-1">
        <ImClock />
        <h1 className="font-bold text-[12px]">12:30 PM, Monday</h1>
      </div>
    </div>
  );
};

export default CreateRed;
