import styled from "@emotion/styled";
import { Box, Button } from "@mui/material";

export const StyledBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledLogoutBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const StyledImageLogo = styled.img`
  max-height: 50px;
`;

export const StyledButton = styled(Button)`
  background: #fcba03;
  color: #000;
  padding: 8px;
  font-weight: 600;

  &:hover {
    background: #ffcd42;
  }
`;
