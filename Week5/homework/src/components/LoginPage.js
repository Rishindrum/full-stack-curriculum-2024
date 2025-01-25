import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useAuth } from "../contexts/AuthContext";

function LoginPage() {
  // Access the MUI theme for potential theme-related functionalities.
  const theme = useTheme();

  // TODO: Extract login + register function and error from our authentication context.
  const {error, login, register} = useAuth();

  // State to hold the username and password entered by the user.
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registerPage, setRegisterPage] = useState(false);

  // TODO: Handle login function.
  const handleLogin = () => {
    if (registerPage) 
    {
      register(username, password);
    } 
    else 
    {
      login(username, password);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          component="img"
          sx={{
            marginBottom: 2,
            height: 200,
            width: 200,
          }}
          alt="UT Longhorn"
          src="/longhorn.jpg"
        ></Box>
        <Typography component="h1" variant="h4" fontWeight="bold">
          {/*Depedning on mode, change the title*/}
          {registerPage ? "Register" : "Login"}
        </Typography>
        <Box sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            InputLabelProps={{ shrink: true }}
            placeholder="admin"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            id="password"
            InputLabelProps={{ shrink: true }}
            placeholder="racecar"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleLogin}
          >
          {registerPage ? "Register" : "Login"}
          </Button>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            color="secondary"
            sx={{ 
              mt: 1, 
              color: '#FFA07A', // Burnt orange color
              padding: '10px', 
              '&:hover': {
                color: '#B34700', // Darker burnt orange for hover effect
              }
            }}
            onClick={() => setRegisterPage((mode) => !mode)}
          >
            {registerPage ? "Switch to Login" : "Switch to Register"}
          </Button>
          </div>
        </Box>
        {/* TODO: Display Login Error if it exists */}
        {
          error && (
            <Alert severity="error">
              {error}
            </Alert>
          )
        }
      </Box>
    </Container>
  );
}

export default LoginPage;
