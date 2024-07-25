import React, { useState, useEffect, useRef } from "react";
import { TextField, InputAdornment, Container } from "@mui/material";
import brickIcon from "../../../app/assets/icons/brick_icon.png";
import { SearchBarWrapper, StyledIconButton } from "./style";

import { getLegoSet } from "./apiActions/getLegoSet";
import { useAppDispatch } from "../../utils/hooks/reduxHooks";

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const handler = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (handler.current) {
      clearTimeout(handler.current);
    }

    handler.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      if (handler.current) {
        clearTimeout(handler.current);
      }
    };
  }, [value, delay]);

  return debouncedValue;
};

export const SearchBar = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const dispatch = useAppDispatch();

  const debouncedSearchInput = useDebounce(searchInput, 1500);

  useEffect(() => {
    if (debouncedSearchInput) {
      dispatch(getLegoSet(debouncedSearchInput));
    }
  }, [debouncedSearchInput, dispatch]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  return (
    <Container>
      <SearchBarWrapper>
        <p>Search for your set</p>
        <TextField
          id="set-search"
          value={searchInput}
          onChange={handleInputChange}
          InputProps={{
            startAdornment: (
              <InputAdornment disableTypography position="start">
                #
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <StyledIconButton>
                  <img src={brickIcon} alt="brick icon" />
                </StyledIconButton>
              </InputAdornment>
            ),
          }}
        />
      </SearchBarWrapper>
    </Container>
  );
};
