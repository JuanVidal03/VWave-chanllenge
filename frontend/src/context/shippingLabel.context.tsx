/* eslint-disable react-refresh/only-export-components */
import React, { createContext, ReactNode, useState } from "react";

interface ContextProps {
  selectedShippingLabel: string;
  setSelectedShippingLabel: React.Dispatch<React.SetStateAction<string>>
}

export const ShippingLabelContext = createContext<ContextProps>({
  selectedShippingLabel: "",
  setSelectedShippingLabel: () => {},
});

const ShippingLabelProvider:React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedShippingLabel, setSelectedShippingLabel] = useState<string>("");

  return (
    <ShippingLabelContext.Provider value={{
      selectedShippingLabel,
      setSelectedShippingLabel
    }}>
      { children }
    </ShippingLabelContext.Provider>
  );
};

export default ShippingLabelProvider;
