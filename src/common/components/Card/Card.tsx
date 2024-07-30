import React, { useEffect, useState } from "react";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Container, Tooltip } from "@mui/material";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { ContainerSpacer } from "../../styles/style";
import { useAppDispatch, useAppSelector } from "../../utils/hooks/reduxHooks";
import brickIcon from "../../../app/assets/icons/brick_icon.png";
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
import { resetParts } from "../Searchbar/slices/setPartsSlice";
import { AddNewPart } from "./components/AddNewPart/AddNewPart";
import { getPartsList } from "./apiActions/getPartsList";
import { AddNewList } from "./components/AddNewList/AddNewList";

export const ProductCard = ({
  isPartsShown,
  setIsPartsShown,
  setIsListShown,
}: IProps) => {
  const dispatch = useAppDispatch();
  const { windowWidth } = useWindowDimensions();
  const setData = useAppSelector((state) => state.sets.list);
  const token = useAppSelector((state) => state.login.token?.userToken);
  const partsList = useAppSelector(
    (state) => state.partsList.partsList?.results
  );

  const [isAddPartOpen, setAddPartOpen] = useState(false);
  const [isAddNewListOpen, setAddNewListOpen] = useState(false);

  useEffect(() => {
    if (isPartsShown && setData?.setNum) {
      dispatch(getLegoSetParts({ setNum: setData.setNum }));
    }
  }, [setData, isPartsShown, dispatch]);

  useEffect(() => {
    const userToken = token || localStorage.getItem("token");
    if (userToken) {
      dispatch(getPartsList({ userToken, page: 1, pageSize: 10 }));
    }
  }, [token, dispatch]);


  const fetchRelatedSetParts = () => {
    if (setData?.setNum) {
      dispatch(resetParts());
      dispatch(getLegoSetParts({ setNum: setData.setNum }));
      setIsPartsShown(true);
      setIsListShown(false);
    }
  };

  const manageShownList = () => {
    setIsPartsShown(false);
    setIsListShown(true);
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
                {token && (
                  <StyledButton
                    onClick={manageShownList}
                    windowWidth={windowWidth}
                  >
                    Show your lists
                    <ListAltIcon sx={{ marginLeft: "10px" }} />
                  </StyledButton>
                )}

                {token && (
                  <Tooltip
                    title={
                      partsList && partsList.length > 0
                        ? "Add part to your lists"
                        : "Create a new list"
                    }
                  >
                    <StyledButton
                      windowWidth={windowWidth}
                      onClick={() => {
                        if (partsList && partsList.length > 0) {
                          setAddPartOpen(true);
                        } else {
                          setAddNewListOpen(true);
                        }
                      }}
                    >
                      {partsList && partsList.length > 0 ? (
                        <PlaylistAddIcon />
                      ) : (
                        <AddCircleIcon />
                      )}
                    </StyledButton>
                  </Tooltip>
                )}
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
        <AddNewPart
          open={isAddPartOpen}
          onClose={() => setAddPartOpen(false)}
        />
        <AddNewList
          open={isAddNewListOpen}
          onClose={() => setAddNewListOpen(false)}
        />
      </Container>
    </ContainerSpacer>
  );
};
