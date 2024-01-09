// ./src/components/Main/Main.tsx

import React from "react";
import { StyledMain } from "./MainStyles";

const Main: React.FC = ({ children }) => {
  return <StyledMain>{children}</StyledMain>;
};

export default Main;
