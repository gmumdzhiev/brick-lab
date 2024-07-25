import styled from "@emotion/styled";
import { Card, Button, CardActions } from "@mui/material";

export const StyledCard = styled(Card)<{ windowWidth: number }>`
  display: flex;
  justify-content: space-around;

  flex-direction: ${({ windowWidth }) =>
    windowWidth < 940 ? "column" : "row"};
  justify-content: ${({ windowWidth }) =>
    windowWidth < 940 ? "center" : "space-around"};
  align-items: center;
`;

export const StyledCardActions = styled(CardActions)<{ windowWidth: number }>`
  justify-content: space-between;
  padding: 16px;
  flex-direction: ${({ windowWidth }) =>
    windowWidth < 768 ? "column" : "row"};
`;

export const StyledButton = styled(Button)<{ windowWidth: number }>`
  background: #fcba03;
  color: #000;
  padding: 8px;
  font-weight: 600;
  justify-content: center;
  display: flex;
  margin-bottom: ${({ windowWidth }) => (windowWidth < 768 ? "8px" : "0")};

  &:hover {
    background: #ffcd42;
  }
`;

export const StyledIcon = styled.img`
  margin-left: 10px;
  width: 25px;
  height: 25px;
`;
