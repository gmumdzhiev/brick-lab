import React from "react";

import { CardMedia, Container, Grid, Typography } from "@mui/material";
import { useAppSelector } from "../../utils/hooks/reduxHooks";
import { IResult } from "../Searchbar/interfaces/ILegoSetParts";
import { ContainerSpacer } from "../../styles/style";
import {
  StyledButton,
  StyledCard,
  StyledCardContent,
  StyledCardsActions,
  StyledTypography,
  TypographyStrong,
} from "./style";

export const ProductParts: React.FC = () => {
  const partsData = useAppSelector((state) => state.parts.list);

  const resultsCount = partsData?.results.length || 0;

  console.log("results", resultsCount);

  return (
    <ContainerSpacer>
      <Container>
        <Grid container spacing={2}>
          {partsData?.results.map((result: IResult) => (
            <Grid item xs={2}>
              <StyledCard key={result.id}>
                <CardMedia
                  sx={{ height: 140, backgroundSize: "contain" }}
                  image={result.part.partImgUrl}
                  title={result.part.name}
                />
                <StyledCardContent>
                  <StyledTypography>
                    Part #:{" "}
                    <TypographyStrong>{result.part.partNum}</TypographyStrong>
                  </StyledTypography>
                  <Typography variant="body2">
                    Part ID: <TypographyStrong>{result.id}</TypographyStrong>
                  </Typography>
                  <Typography variant="body2">
                    Quantity:{" "}
                    <TypographyStrong>{result.quantity}</TypographyStrong>
                  </Typography>
                </StyledCardContent>
                <StyledCardsActions>
                  <StyledButton
                    size="small"
                    href={result.part.partUrl}
                    target="_blank"
                  >
                    View
                  </StyledButton>
                </StyledCardsActions>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </ContainerSpacer>
  );
};
