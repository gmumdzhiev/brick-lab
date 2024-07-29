import {
  Card,
  Container,
  Typography,
  List as MuiList,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import React from "react";
import { useAppSelector } from "../../utils/hooks/reduxHooks";

export const List = () => {
  const lists = useAppSelector((state) => state.partsList.partsList?.results);

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
                </ListItem>
                <Divider />
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
