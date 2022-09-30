import React from "react";
import { AppBar, Toolbar, Grid, IconButton } from "@mui/material";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import AuthContext from "../../store/auth-context";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { useContext } from "react";
import "./Header.module.css";

const Header = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const LogoutHandler = () => {
    authCtx.logout();
    history.push("/auth");
  };

  return (
    <AppBar position="static" >
      <Toolbar>
        <Grid container alignItems="center">
          <Grid item>
          <Link to="/">Start Wizard</Link>
          </Grid>
          <Grid item sm></Grid>
          <Grid item>
            <IconButton onClick={LogoutHandler}>
              <PowerSettingsNewIcon   sx={{ color: "#fafafa"}} />
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
