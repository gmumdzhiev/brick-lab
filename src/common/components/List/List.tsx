import React, { useState } from "react";
import {
  Card,
  Container,
  Typography,
  List as MuiList,
  ListItem,
  ListItemText,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import { useAppSelector, useAppDispatch } from "../../utils/hooks/reduxHooks";
import { getPartsListDetails } from "../Card/apiActions/getPartsListDetails";
import { ListDetails } from "./components/ListDetails/ListDetails";


export const List = () => {
  const dispatch = useAppDispatch();
  const userToken =
    useAppSelector((state) => state.login.token?.userToken) ||
    localStorage.getItem("token");
  const lists = useAppSelector((state) => state.partsList.partsList?.results);
  const partsListDetails = useAppSelector((state) => state.partsListDetails);

  const [expandedList, setExpandedList] = useState<number | null>(null);

  const handleExpandClick = (listId: number) => {
    const token = userToken as string;

    if (!token) {
      console.error("User token is missing");
      return;
    }

    if (expandedList === listId) {
      setExpandedList(null);
    } else {
      dispatch(
        getPartsListDetails({
          userToken: token,
          listId,
        })
      );
      setExpandedList(listId);
    }
  };

  return (
    <Container>
      <Card style={{ padding: "20px", marginTop: "20px" }}>
        {lists && lists.length > 0 ? (
          <MuiList>
            {lists.map((list) => (
              <React.Fragment key={list.id}>
                <ListItem>
                  <ListItemText
                    primary={`${list.name} - ${list.id}`}
                    secondary={`Buildable: ${list.isBuildable ? "Yes" : "No"} | Number of Parts: ${list.numParts}`}
                  />
                  <ArrowDropDownCircleIcon
                    onClick={() => handleExpandClick(list.id)}
                    style={{ cursor: "pointer" }}
                  />
                </ListItem>
                <Divider />
                <Accordion expanded={expandedList === list.id}>
                  <AccordionSummary>
                    <Typography>Part Details</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <ListDetails partsListDetails={partsListDetails} />
                  </AccordionDetails>
                </Accordion>
              </React.Fragment>
            ))}
          </MuiList>
        ) : (
          <Typography variant="body1" color="text.secondary">
            No list data available. 🤷‍♂️
          </Typography>
        )}
      </Card>
    </Container>
  );
};
