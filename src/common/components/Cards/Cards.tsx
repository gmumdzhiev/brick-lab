import React, { useState, useMemo, useCallback, useRef } from "react";
import {
  CardMedia,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../utils/hooks/reduxHooks";
import { IResult } from "../Searchbar/interfaces/ILegoSetParts";
import { ContainerSpacer } from "../../styles/style";
import {
  StyledButton,
  StyledCard,
  StyledCardContent,
  StyledCardsActions,
  StyledSearchCard,
  StyledTypography,
  TypographyStrong,
} from "./style";
import { getLegoSetParts } from "../Searchbar/apiActions/getLegoSetParts";

export const ProductParts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useAppDispatch();
  const partsData = useAppSelector((state) => state.parts.list);
  const nextUrl = useAppSelector((state) => state.parts.list?.next);
  const setData = useAppSelector((state) => state.sets.list);

  const filteredParts = useMemo(() => {
    if (!searchQuery) {
      return partsData?.results || [];
    }
    return (partsData?.results || []).filter(
      (result: IResult) =>
        result.part.partNum.toLowerCase() === searchQuery.toLowerCase()
    );
  }, [searchQuery, partsData, dispatch, setData?.setNum]);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastPartElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && nextUrl) {
          if (setData?.setNum) {
            console.log("triggered ?");
            dispatch(getLegoSetParts({ setNum: setData.setNum, nextUrl }));
          }
        }
      });
      if (node) observer.current.observe(node);
    },
    [nextUrl, dispatch, setData?.setNum]
  );

  return (
    <ContainerSpacer>
      <Container>
        <StyledSearchCard>
          <TextField
            label="Search Parts by Part Number"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ maxWidth: "240px" }}
          />
        </StyledSearchCard>

        <Grid container spacing={2}>
          {filteredParts.map((result: IResult, index: number) => {
            const isLastElement = index === filteredParts.length - 1;
            return (
              <Grid
                item
                xs={2}
                key={`${result.id}-${result.part.partNum}-${index}`} // eslint-disable-line react/no-array-index-key
                ref={isLastElement ? lastPartElementRef : null}
              >
                <StyledCard>
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
            );
          })}
        </Grid>
      </Container>
    </ContainerSpacer>
  );
};
