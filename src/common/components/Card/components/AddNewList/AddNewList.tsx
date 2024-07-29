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
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { IProps } from "./IProps";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../utils/hooks/reduxHooks";
import { createPartsList } from "../../apiActions/createPartsList";

interface IFormInput {
  isBuildable: boolean;
  name: string;
  numParts: number;
}

export const AddNewList = ({ open, onClose }: IProps) => {
  const dispatch = useAppDispatch();
  const userToken =
    useAppSelector((state) => state.login.token?.userToken) ||
    localStorage.getItem("token");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      isBuildable: true,
      name: "",
      numParts: 0,
    },
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = (data: IFormInput) => {
    const token = userToken as string;

    if (!token) {
      console.error("User token is missing");
      setLoading(false);
      return;
    }
    setLoading(true);
    dispatch(createPartsList({ userToken: token, ...data }))
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
            Add New List
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box mb={2}>
              <Controller
                name="isBuildable"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        color="primary"
                      />
                    }
                    label="Is Buildable"
                  />
                )}
              />
            </Box>
            <Box mb={2}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Name"
                    variant="outlined"
                    fullWidth
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                )}
              />
            </Box>
            <Box mb={2}>
              <Controller
                name="numParts"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="number"
                    label="Number of Parts"
                    variant="outlined"
                    fullWidth
                    error={!!errors.numParts}
                    helperText={errors.numParts?.message}
                    InputProps={{
                      inputProps: { min: 0 },
                    }}
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
