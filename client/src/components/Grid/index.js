import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh"
  },
  image: {
    backgroundImage: "url(../images/weights.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },

  form: {
    width: "100%",
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export function MyGrid(props) {
  const classes = useStyles();
  return (
    <Grid {...props} container component="main" className={classes.root}>
      {props.children}
    </Grid>
  );
}

export function MyPaperLogin(props) {
  const classes = useStyles();
  return (
    <div {...props} className={classes.paper}>
      {" "}
      {props.children}
    </div>
  );
}

export function MyFormLogin(props) {
  const classes = useStyles();
  return (
    <form {...props} className={classes.form} noValidate>
      {props.children}
    </form>
  );
}
