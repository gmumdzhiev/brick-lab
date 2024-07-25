import React from "react";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import { ContainerSpacer } from "../../styles/style";
import { useAppSelector } from "../../utils/hooks/reduxHooks";
import brickIcon from "../../../app/assets/icons/brick_icon.png";
import linkIcon from "../../../app/assets/icons/link-icon.png";
import {
  StyledButton,
  StyledCard,
  StyledCardActions,
  StyledIcon,
} from "./style";
import { useWindowDimensions } from "../../utils/hooks/useWindowDimensions";

export const ProductCard = () => {
  const setData = useAppSelector((state) => state.sets.list);
  const { windowWidth } = useWindowDimensions();

  return (
    <ContainerSpacer>
      <Container>
        {setData ? (
          <StyledCard windowWidth={windowWidth}>
            <CardMedia
              component="img"
              alt={setData.name}
              width="200"
              sx={{
                objectFit: "contain",
                padding: "16px",
                maxWidth: "300px",
                maxHeight: "150px",
              }}
              image={setData.setImgUrl}
            />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {setData.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Year: {setData.year}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Number of Parts: {setData.numParts}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Set number: {setData.setNum}
                </Typography>
              </CardContent>
              <StyledCardActions windowWidth={windowWidth}>
                <StyledButton href={setData.setUrl} windowWidth={windowWidth}>
                  Show related parts
                  <StyledIcon src={brickIcon} alt="brick icon" />
                </StyledButton>
                <StyledButton href={setData.setUrl} windowWidth={windowWidth}>
                  Navigate to rebrickable
                  <StyledIcon src={linkIcon} alt="link icon" />
                </StyledButton>
              </StyledCardActions>
            </div>
          </StyledCard>
        ) : (
          <Typography variant="body2" color="text.secondary">
            No set data available.
          </Typography>
        )}
      </Container>
    </ContainerSpacer>
  );
};
