import React from "react";

import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";

// import { Box } from "@mui/material";
import { StyledToolbar } from "./style";

export const TopBar = () => {
  return (
    <StyledToolbar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>Toolbar</Toolbar>
      </Container>
    </StyledToolbar>
  );
};
