import React from "react";

import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";

import { Logo } from "../Logo/Logo";
import { StyledToolbar } from "./style";
import { useWindowDimensions } from "../../utils/hooks/useWindowDimensions";

export const TopBar = () => {
  const { windowWidth } = useWindowDimensions();
  return (
    <StyledToolbar windowWidth={windowWidth} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "center" }}>
          <Logo />
        </Toolbar>
      </Container>
    </StyledToolbar>
  );
};
