import React from "react";
import {
  Typography,
  List as MuiList,
  ListItem,
  ListItemText,
  Avatar,
} from "@mui/material";
import { IProps } from "./IProps";

export const ListDetails = ({ partsListDetails }: IProps) => {
  return (
    <>
      {partsListDetails.status === "loading" && (
        <Typography>Loading...</Typography>
      )}
      {partsListDetails.status === "succeeded" && (
        <MuiList>
          {partsListDetails.list?.results.map((part) => (
            <ListItem key={part.part.partNum}>
              <Avatar
                src={part.part.partImgUrl}
                alt={part.part.name}
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "5px",
                  marginRight: "10px",
                }}
              />
              <ListItemText
                primary={`${part.part.name} (${part.part.partNum})`}
                secondary={`Color: ${part.color.name} | Quantity: ${part.quantity}`}
              />
            </ListItem>
          ))}
        </MuiList>
      )}
      {partsListDetails.status === "failed" && (
        <Typography color="error">{partsListDetails.error?.message}</Typography>
      )}
    </>
  );
};
