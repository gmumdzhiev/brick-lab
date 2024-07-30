import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Backdrop,
  CircularProgress,
  Box,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { IProps } from "./IProps";
import {
  addPartsToList,
  AddPartsToListParams,
} from "../../apiActions/addPartsToList";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../utils/hooks/reduxHooks";
import { IAddPartsToList } from "../../interfaces/IAddPartsToList";

export const AddNewPart = ({ open, onClose }: IProps) => {
  const dispatch = useAppDispatch();
  const userToken =
    useAppSelector((state) => state.login.token?.userToken) ||
    localStorage.getItem("token");
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const [loading, setLoading] = useState(false);

  const onSubmit = (data: IFormInput) => {
    const token = userToken as string;

    const partsForApi: IAddPartsToList[] = [
      {
        partNum: data.part_num,
        quantity: data.quantity,
        colorId: parseInt(data.color_id, 10),
      },
    ];

    const params: AddPartsToListParams = {
      userToken: token,
      listId: parseInt(data.list_id, 10),
      parts: partsForApi,
    };

    if (!token) {
      console.error("User token is missing");
      setLoading(false);
      return;
    }

    setLoading(true);
    dispatch(addPartsToList(params))
      .unwrap()
      .then(() => {
        setLoading(false);
        onClose();
      })
      .catch((error) => {
        setLoading(false);
        console.error("Failed to create parts list:", error);
      });
  };

  return (
    <Backdrop open={open} onClick={onClose} style={{ zIndex: 1300 }}>
      <Card
        style={{ width: "400px", padding: "20px", margin: "auto" }}
        onClick={(e) => e.stopPropagation()}
      >
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Add New Part
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box mb={2}>
              <Controller
                name="list_id"
                control={control}
                defaultValue=""
                rules={{ required: "List ID is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="List ID"
                    variant="outlined"
                    fullWidth
                    error={!!errors.list_id}
                    helperText={errors.list_id?.message}
                  />
                )}
              />
            </Box>
            <Box mb={2}>
              <Controller
                name="part_num"
                control={control}
                defaultValue=""
                rules={{ required: "Part Number is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Part Number"
                    variant="outlined"
                    fullWidth
                    error={!!errors.part_num}
                    helperText={errors.part_num?.message}
                  />
                )}
              />
            </Box>
            <Box mb={2}>
              <Controller
                name="quantity"
                control={control}
                defaultValue={0}
                rules={{ required: "Quantity is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="number"
                    label="Quantity"
                    variant="outlined"
                    fullWidth
                    error={!!errors.quantity}
                    helperText={errors.quantity?.message}
                    InputProps={{
                      inputProps: { min: 0 }, // Optional: Prevent negative numbers
                    }}
                    onChange={(e) =>
                      field.onChange(parseInt(e.target.value, 10))
                    }
                  />
                )}
              />
            </Box>
            <Box mb={2}>
              <Controller
                name="color_id"
                control={control}
                defaultValue=""
                rules={{ required: "Color ID is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Color ID"
                    variant="outlined"
                    fullWidth
                    error={!!errors.color_id}
                    helperText={errors.color_id?.message}
                  />
                )}
              />
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Submit"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Backdrop>
  );
};
