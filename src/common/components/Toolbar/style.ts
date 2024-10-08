import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

import { AppBar, Box } from "@mui/material";

const fadeInFromTop = keyframes`
0% {
    opacity: 0;
    transform: translateY(80%);
  }
  20% {
    opacity: 0;
  }
  50% {
    opacity: 1;
    transform: translateY(0%);
  }
  100% {
    opacity: 1;
    transform: translateY(0%);
  }
`;

export const StyledToolbar = styled(AppBar)<{ windowWidth: number }>`
  background: #feecbc;
  justify-content: center;
  padding: ${({ windowWidth }) => (windowWidth < 768 ? "8px" : "16px")};
`;

export const StyledSubContainer = styled(Box)`
  animation: 2s ${fadeInFromTop} ease-out;
`;
