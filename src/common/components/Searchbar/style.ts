import styled from "@emotion/styled";
import { IconButton } from "@mui/material";

export const SearchBarWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const StyledIconButton = styled(IconButton)`
  img {
    width: 30px;
    height: 30px;
  }
`;
