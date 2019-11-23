import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import ProfileCard from "../components/UserProfile";
import MainCalendar from "../components/MainCalendar/MainCalendar";
import { connect } from "react-redux";
import { addAppointment } from "../actions/appointments";
import AdminNav from "../components/Nav/admin";

import API from "../utils/API";

class AdminMain extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    API.getAllEvents().then(res => {
      return res;
    });
  }

  render() {
    console.log("adminMain: state", this.state);
    return (
      <div>
        <AdminNav />
        <Grid container spacing={12}>
          <Grid item xs={12} sm={3}>
            {/* <CustDropdown /> */}
            <ProfileCard
              // userImage={this.props.adminProfile.userImage}
              firstName={this.props.adminProfile.firstName}
              lastName={this.props.adminProfile.lastName}
              dateJoined={this.props.adminProfile.dateJoined}
              startingWeight={this.props.adminProfile.startingWeight}
              currentWeight={this.props.adminProfile.currentWeight}
              goalWeight={this.props.adminProfile.goalWeight}
              notes={this.props.adminProfile.notes}
            />
          </Grid>
          <Grid item xs={12} sm={9}>
            <MainCalendar
              onAppointmentAdd={appointment => {
                this.props.dispatch(addAppointment(appointment));
                console.log(appointment);
              }}
            />
          </Grid>
          {/* <Grid item xs={12} sm={3}>
            <Retail />
          </Grid> */}
        </Grid>
      </div>
    );
  }
}
const mapStateToProps = (state, props) => {
  return {
    adminProfile: state.adminProfile
  };
};
export default connect(mapStateToProps)(AdminMain);
