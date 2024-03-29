import React, { Component } from "react";
import Redux from "redux";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import DropdownMenu from "../components/Dropdown";
import Copyright from "../components/Copyright";
import API from "../utils/API";
import { MyContainer, MyPaper, MyForm } from "../components/Container";
import { addUser } from "../actions/adminInfo";
import { handleLogIn } from "../actions/loggedIn";
import InitialNav from "../components/Nav/index";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      account_type: "Admin",
      firstName: "",
      lastName: "",
      fireRedirect: false
    };
  }
  componentDidMount() {
    console.log("props: ", this.props);
    // console.log("Page has loaded");
    console.log("props.adminprofile: ", this.props.adminProfile);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // console.log("this.props.adminprofile: ", this.props.adminProfile);
  }

  handleFormSubmitAdmin = event => {
    event.preventDefault();

    if (
      this.state.email &&
      this.state.password &&
      this.state.firstName &&
      this.state.lastName
    ) {
      this.props.dispatch(
        addUser({
          email: this.state.email,
          password: this.state.password,
          account_type: this.state.account_type,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          super: true,
          workSpace: "",
          dateJoined: "",
          sessions: 0,
          startingWeight: 0,
          currentWeight: 0,
          goalWeight: 0,
          notes: "Notes go here"
        })
      );

      this.props.dispatch(handleLogIn());
      API.adminSignUp({
        email: this.state.email,
        password: this.state.password,
        account_type: this.state.account_type,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        super: true,
        workSpace: "",
        dateJoined: "",
        sessions: 0,
        startingWeight: 0,
        currentWeight: 0,
        goalWeight: 0,
        notes: "Notes go here"
      })
        .then(res => {
          this.setState({ fireRedirect: true });
        })
        .catch(err => console.log(err));
    } else {
      alert("You need to enter info to all fields");
    }
  };
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  handleChange = (event, index, value) => {
    console.log(value);
    this.setState({ account_type: value });
    console.log(this.state.account_type);
  };
  setAccountType = index => {
    const options = ["User (Free)", "Employee", "Business"];
    // this.setState({ account_type: options[index] });
    console.log(index);
  };

  render() {
    const { from } = this.props.location.state || "/";
    const { fireRedirect } = this.state;
    return (
      <>
        <InitialNav />
        <MyContainer>
          <MyPaper>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>

            <MyForm>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <DropdownMenu setAccount={this.setAccountType} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    onChange={this.handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="lastName"
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    onChange={this.handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="email"
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    onChange={this.handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="password"
                    variant="outlined"
                    required
                    fullWidth
                    id="password"
                    label="Password"
                    type="password"
                    onChange={this.handleInputChange}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={this.handleFormSubmitAdmin}
              >
                Sign Up
              </Button>
              {fireRedirect && <Redirect to={from || "/admin"} />}
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </MyForm>
          </MyPaper>

          <Box mt={5}>
            <Copyright />
          </Box>
        </MyContainer>
      </>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    adminProfile: state.adminProfile
  };
};
export default connect(mapStateToProps)(SignUp);
