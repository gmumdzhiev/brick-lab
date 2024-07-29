import React, { useState } from "react";
import { SearchBar } from "../../../common/components/Searchbar/Searchbar";
import { ProductCard } from "../../../common/components/Card/Card";
import { ProductParts } from "../../../common/components/Cards/Cards";
import { useAppSelector } from "../../../common/utils/hooks/reduxHooks";
import { List } from "../../../common/components/List/List";

export const Home = () => {
  const setData = useAppSelector((state) => state.sets.list);
  const [isPartsShown, setIsPartsShown] = useState<boolean>(false);
  const [isListShown, setIsListShown] = useState<boolean>(false);
  return (
    <>
      <SearchBar setIsPartsShown={setIsPartsShown} />
      <ProductCard
        isPartsShown={isPartsShown}
        setIsPartsShown={setIsPartsShown}
        setIsListShown={setIsListShown}
      />
      {isPartsShown && <ProductParts key={setData?.setNum} />}
      {isListShown && <List/>}
    </>
  );
};
