import React, { useState } from "react";
import { SearchBar } from "../../../common/components/Searchbar/Searchbar";
import { ProductCard } from "../../../common/components/Card/Card";
import { ProductParts } from "../../../common/components/Cards/Cards";

export const Home = () => {
  const [isPartsShown, setIsPartsShown] = useState<boolean>(false);

  return (
    <>
      <SearchBar />
      <ProductCard
        setIsPartsShown={setIsPartsShown}
      />
      {isPartsShown && <ProductParts />}
    </>
  );
};
