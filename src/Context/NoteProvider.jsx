import { useState } from "react";
import { createContext } from "react";
import CreateBlue from "../Component/CreateBlue";
import CreatePink from "../Component/CreatePink";
import CreateButtercream from "../Component/CreateButtercream";

export const NoteContext = createContext();
const NoteProvider = ({ children }) => {
  const [isShowing, setIsShowing] = useState(false);
  const [divs, setDivs] = useState([]);
  const toggle = () => {
    setIsShowing(!isShowing);
  };
  const Buttercream = () => {
    setDivs([...divs, <CreateButtercream key={divs.length} />]);
  };
  const Blue = () => {
    setDivs([...divs, <CreateBlue key={divs.length} />]);
  };
  const Pink = () => {
    setDivs([...divs, <CreatePink key={divs.length} />]);
  };

    const date = new Date().toLocaleDateString();
    const time = new Date()
    const hour = time.getHours() 
    const minutes = String(time.getMinutes()).padStart(2,"0")
    const seconds = String(time.getSeconds()).padStart(2,"0")
    const dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const day = dayOfWeek[time.getDay()]

  const value = {
    toggle,
    Buttercream,
    Blue,
    Pink,
    isShowing,
    setIsShowing,
    divs,
    setDivs, date, hour, minutes, seconds, day,
  };
  return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>;
};

export default NoteProvider;