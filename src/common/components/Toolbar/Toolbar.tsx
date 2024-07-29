// TopBar.tsx
import React, { useState } from "react";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Logo } from "../Logo/Logo";
import { StyledToolbar } from "./style";
import { useWindowDimensions } from "../../utils/hooks/useWindowDimensions";
import { Login } from "../Login/Login";

export const TopBar = () => {
  const { windowWidth } = useWindowDimensions();
  const [loginOpen, setLoginOpen] = useState(false);

  const handleLoginOpen = () => setLoginOpen(true);
  const handleLoginClose = () => setLoginOpen(false);

  return (
    <StyledToolbar windowWidth={windowWidth} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Logo />
          <IconButton color="inherit" onClick={handleLoginOpen}>
            <AccountCircleIcon sx={{ color: "#000" }} />
          </IconButton>
        </Toolbar>
      </Container>
      <Login open={loginOpen} onClose={handleLoginClose} />
    </StyledToolbar>
  );
};
