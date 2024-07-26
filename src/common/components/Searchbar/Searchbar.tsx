import React, { useState, useEffect, useRef } from "react";
import { TextField, InputAdornment, Container } from "@mui/material";
import { SearchBarWrapper } from "./style";

import { getLegoSet } from "./apiActions/getLegoSet";
import { useAppDispatch } from "../../utils/hooks/reduxHooks";
import { ContainerSpacer } from "../../styles/style";
import { IProps } from "./IProps";

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

export const SearchBar = ({ setIsPartsShown }: IProps) => {
  const [searchInput, setSearchInput] = useState<string>("");
  const dispatch = useAppDispatch();

  const debouncedSearchInput = useDebounce(searchInput, 1500);

  useEffect(() => {
    if (debouncedSearchInput) {
      dispatch(getLegoSet(debouncedSearchInput));
      setIsPartsShown(false); 
    }
  }, [debouncedSearchInput, dispatch, setIsPartsShown]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  return (
    <ContainerSpacer>
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
            }}
            sx={{
              background: "white",
            }}
          />
        </SearchBarWrapper>
      </Container>
    </ContainerSpacer>
  );
};
