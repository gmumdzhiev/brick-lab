import React, { useEffect } from "react";
import {
  Backdrop,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Tooltip,
  IconButton,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { useForm, Controller } from "react-hook-form";
import logo from "../../../app/assets/logo.png";
import {
  StyledBox,
  StyledButton,
  StyledImageLogo,
  StyledLogoutBox,
} from "./style";
import { getUserToken } from "./apiActions/getUserToken";
import { useAppDispatch, useAppSelector } from "../../utils/hooks/reduxHooks";
import { clearToken, setToken } from "./slices/loginSlice";

interface LoginProps {
  open: boolean;
  onClose: () => void;
}

interface IFormInput {
  username: string;
  password: string;
}

export const Login: React.FC<LoginProps> = ({ open, onClose }) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.login.token?.userToken);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      dispatch(setToken({ userToken: storedToken }));
    }
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const onSubmit = (data: IFormInput) => {
    dispatch(getUserToken(data));
  };

  const handleLogout = () => {
    dispatch(clearToken());
    localStorage.removeItem("token");
  };

  return (
    <Backdrop open={open} onClick={onClose} style={{ zIndex: 1300 }}>
      <Card
        style={{ width: "400px", padding: "20px", margin: "auto" }}
        onClick={(e) => e.stopPropagation()}
      >
        <CardContent>
          <StyledBox mb={2}>
            <StyledImageLogo src={logo} alt="Logo" />
          </StyledBox>
          {!token ? (
            <>
              <Box display="flex" alignItems="center" mb={2}>
                <Typography variant="h6" gutterBottom>
                  Login
                </Typography>
                <Tooltip title="You may login with your username or email address registered on Rebrickable">
                  <IconButton>
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
              </Box>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box mb={2}>
                  <Controller
                    name="username"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Username is required" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Username"
                        variant="outlined"
                        fullWidth
                        error={!!errors.username}
                        helperText={errors.username?.message}
                      />
                    )}
                  />
                </Box>
                <Box mb={2}>
                  <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Password is required" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        error={!!errors.password}
                        helperText={errors.password?.message}
                      />
                    )}
                  />
                </Box>
                <Button type="submit" variant="contained" color="primary">
                  Login
                </Button>
              </form>
            </>
          ) : (
            <StyledLogoutBox>
              <Typography variant="h6" gutterBottom>
                You are logged in
              </Typography>
              <StyledButton
                variant="contained"
                color="secondary"
                onClick={handleLogout}
              >
                Logout
              </StyledButton>
            </StyledLogoutBox>
          )}
        </CardContent>
      </Card>
    </Backdrop>
  );
};
