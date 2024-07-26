import styled from "@emotion/styled";

export const ContainerSpacer = styled.div`
  margin: 1.5em 0;
`;

export const StyledLogo = styled.img<{ windowWidth: number }>`
  height: ${({ windowWidth }) => (windowWidth < 700 ? "25px" : "50px")};
`;
