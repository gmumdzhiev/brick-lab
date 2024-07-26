import styled from "@emotion/styled";
import { DetailedHTMLProps, AnchorHTMLAttributes } from "react";
import {
  Button,
  ButtonProps,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

type ExtendedButtonProps = ButtonProps &
  DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;

export const StyledCard = styled(Card)`
  max-width: 160px;
  padding: 16px;
  transition: transform 0.1s ease-in-out;

  &:hover {
    cursor: pointer;
    transform: scale(1.02);
  }
`;
export const StyledCardContent = styled(CardContent)`
  padding: 0;
  margin: 6px 0;
`;

export const StyledCardsActions = styled(CardActions)`
  display: flex;
  justify-content: center;
  padding: 0;
  margin: 6px 0;
`;

export const StyledButton = styled(Button)<ExtendedButtonProps>`
  width: 100%;
  margin: 6px 0;
  background: #fcba03;
  color: #000;
  padding: 8px;
  font-weight: 600;
  justify-content: center;
  display: flex;

  &:hover {
    background: #ffcd42;
  }
`;

export const StyledTypography = styled(Typography)`
  font-size: 0.95em;
  background: #ffebbc;
  color: #11110f;
  border-radius: 5px;
  padding: 5px;
  margin-bottom: 6px;
`;

export const TypographyStrong = styled.span`
  font-weight: 700;
`;
