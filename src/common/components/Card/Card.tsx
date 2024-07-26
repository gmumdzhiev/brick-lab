import React, { useEffect } from "react";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import { ContainerSpacer } from "../../styles/style";
import { useAppDispatch, useAppSelector } from "../../utils/hooks/reduxHooks";
import brickIcon from "../../../app/assets/icons/brick_icon.png";
import linkIcon from "../../../app/assets/icons/link-icon.png";
import {
  StyledButton,
  StyledCard,
  StyledCardActions,
  StyledCardMedia,
  StyledIcon,
} from "./style";
import { useWindowDimensions } from "../../utils/hooks/useWindowDimensions";
import { getLegoSetParts } from "../Searchbar/apiActions/getLegoSetParts";
import { IProps } from "./IProps";

export const ProductCard = ({ isPartsShown, setIsPartsShown }: IProps) => {
  const dispatch = useAppDispatch();
  const { windowWidth } = useWindowDimensions();
  const setData = useAppSelector((state) => state.sets.list);

  useEffect(() => {
    if (isPartsShown && setData?.setNum) {
      dispatch(getLegoSetParts(setData.setNum));
    }
  }, [setData, isPartsShown, dispatch]);

  const fetchRelatedSetParts = () => {
    if (setData?.setNum) {
      dispatch(getLegoSetParts(setData.setNum));
      setIsPartsShown(true);
    }
  };

  return (
    <ContainerSpacer>
      <Container>
        {setData ? (
          <StyledCard windowWidth={windowWidth}>
            <StyledCardMedia
              component="img"
              alt={setData.name}
              width="200"
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
                <StyledButton
                  onClick={fetchRelatedSetParts}
                  windowWidth={windowWidth}
                >
                  Show related parts
                  <StyledIcon src={brickIcon} alt="brick icon" />
                </StyledButton>
                <StyledButton
                  href={setData.setUrl}
                  target="_blank"
                  windowWidth={windowWidth}
                >
                  Navigate to rebrickable
                  <StyledIcon src={linkIcon} alt="link icon" />
                </StyledButton>
              </StyledCardActions>
            </div>
          </StyledCard>
        ) : (
          <StyledCard windowWidth={windowWidth}>
            <Typography variant="body1" color="text.secondary">
              No set data available. 🤷‍♂️
            </Typography>
          </StyledCard>
        )}
      </Container>
    </ContainerSpacer>
  );
};
