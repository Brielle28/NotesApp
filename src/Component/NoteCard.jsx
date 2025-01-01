import { useState, useRef } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { ImClock } from "react-icons/im";

// A re-usable CreateNote component
const NoteCard = ({
  date,
  hour,
  minutes,
  seconds,
  day,
  onSubmit,
  onEdit,
  initialTitle = "",
  initialText = "",
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [text, setText] = useState(initialText);
  const [errors, setErrors] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formRef = useRef(null);

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !isSubmitted) {
      formRef.current.requestSubmit(); // Submit the form on Enter key press if not submitted
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === "" || text === "") {
      setErrors("All fields are required");
    } else {
      setErrors("");
      onSubmit({ title, text });
      setIsSubmitted(true); // Mark as submitted
    }
  };

  const handleEdit = () => {
    setIsSubmitted(false); // Allow editing again
    onEdit(); // Call the parent edit handler
  };

  return (
    <div className="bg-[#FFF6CA] w-[90%] md:w-[350px] md:h-[300px] rounded-[15px] px-2 py-4">
      <h1 className="text-[12px] font-semibold">{date}</h1>
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="mt-[3px] flex items-center justify-between w-full">
          <input
            placeholder="Enter Note Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={handleKeyPress}
            className="text-[20px] outline-none outline-0 font-semibold bg-transparent"
            disabled={isSubmitted} // Disable input if submitted
          />
          {isSubmitted && (
            <AiOutlineEdit className="text-[23px] text-yellow-700" onClick={handleEdit} />
          )}
        </div>
        <div className="w-full h-[2px] bg-black my-2"></div>
        <textarea
          className="w-full h-[150px] bg-transparent outline-none outline-0"
          rows="200"
          cols="43"
          value={text}
          placeholder="Enter your notes here....."
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyPress}
          disabled={isSubmitted} // Disable textarea if submitted
        ></textarea>
        <p className="text-red-500 text-[15px]">{errors}</p>
      </form>
      <div className="flex items-center gap-1">
        <ImClock />
        <h1 className="font-bold text-[12px]">
          {hour}:{minutes}:{seconds}, {day}
        </h1>
      </div>
    </div>
  );
};

export default NoteCard;
