import React, { createContext, useState } from "react";

export const ToolStateContext = createContext();

export const ToolStateProvider = ({ children }) => {
  const [tooltipshow, setTooltipshow] = useState("");
  const [modaltoggle, setModaltoggle] = useState(false);

  return (
    <ToolStateContext.Provider
      value={{ tooltipshow, setTooltipshow, modaltoggle, setModaltoggle }}
    >
      {children}
    </ToolStateContext.Provider>
  );
};
