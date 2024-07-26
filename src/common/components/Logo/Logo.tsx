import React from "react";
// import Box from "@mui/material/Box";

import logo from "../../../app/assets/logo.png";
import { useWindowDimensions } from "../../utils/hooks/useWindowDimensions";
import { StyledLogo } from "../../styles/style";

export const Logo = () => {
  const { windowWidth } = useWindowDimensions();

  return <StyledLogo src={logo} alt="Logo" windowWidth={windowWidth} />;
};
