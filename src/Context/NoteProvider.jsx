import { useState } from "react";
import { createContext } from "react";
import CreateRed from "../Component/CreateRed";
import CreateYellow from "../Component/CreateYellow";
import CreateOrange from "../Component/CreateOrange";

export const NoteContext = createContext();
const NoteProvider = ({ children }) => {
  const [isShowing, setIsShowing] = useState(false);
  const [divs, setDivs] = useState([]);
  const toggle = () => {
    setIsShowing(!isShowing);
  };
  const Red = () => {
    setDivs([...divs, <CreateRed key={divs.length} />]);
  };
  const Yellow = () => {
    setDivs([...divs, <CreateYellow key={divs.length} />]);
  };
  const Orange = () => {
    setDivs([...divs, <CreateOrange key={divs.length} />]);
  };
  const value = {
    toggle,
    Red,
    Yellow,
    Orange,
    isShowing,
    setIsShowing,
    divs,
    setDivs,
  };
  return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>;
};

export default NoteProvider;