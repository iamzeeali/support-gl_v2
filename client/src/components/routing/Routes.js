import React from "react";
import { Route, Switch } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
//Components
import Dashboard from "../dashboard/Dashboard";

import Activity from "../activity/Activity";
import AddActivity from "../activity/AddActivity";
import EditActivity from "../activity/EditActivity";

import Company from "../company/Company";
import AddCompany from "../company/AddCompany";
import EditCompany from "../company/EditCompany";

import Request from "../request/Request";
import UserOpenStatus from "../request/UserOpenRequest";
import AddRequest from "../request/AddRequest";
import AdminRequest from "../request/AdminRequest";
import EditSuperAdminRequest from "../request/EditSuperAdminRequest";

import Email from "../request/Email";
import AddEmail from "../request/AddEmail";
import DeleteEmail from "../request/DeleteEmail";
import ChangePassword from "../request/ChangePassword";

import CompanyProfile from "../profile/CompanyProfile";
import MyProfile from "../profile/MyProfile";

import MyReport from "../report/MyReport";
import CompanyReport from "../report/CompanyReport";

import User from "../user/User";
import AddUser from "../user/AddUser";

import Member from "../member/Member";

import NotFound from "../UI/NotFound";

const Routes = () => {
  return (
    <div className="container-fluid">
      <Switch>
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/activity" component={Activity} />
        <PrivateRoute exact path="/addActivity" component={AddActivity} />
        <PrivateRoute
          exact
          path={`/editActivity/:id`}
          component={EditActivity}
        />
        <PrivateRoute exact path="/company" component={Company} />
        <PrivateRoute exact path="/addCompany" component={AddCompany} />
        <PrivateRoute exact path={`/editCompany/:id`} component={EditCompany} />
        <PrivateRoute exact path="/request" component={Request} />
        <PrivateRoute exact path="/openRequest" component={UserOpenStatus} />

        <PrivateRoute exact path={"/addRequest"} component={AddRequest} />
        <PrivateRoute exact path={"/adminRequest"} component={AdminRequest} />
        <PrivateRoute
          exact
          path={"/editRequest/:id"}
          component={EditSuperAdminRequest}
        />
        <PrivateRoute exact path={"/email"} component={Email} />
        <PrivateRoute exact path={"/addEmail"} component={AddEmail} />
        <PrivateRoute exact path={"/deleteEmail"} component={DeleteEmail} />
        <PrivateRoute
          exact
          path={"/changePassword"}
          component={ChangePassword}
        />
        <PrivateRoute exact path="/mycompany" component={CompanyProfile} />
        <PrivateRoute exact path="/myprofile" component={MyProfile} />

        <PrivateRoute exact path="/user" component={User} />
        <PrivateRoute exact path="/addUser" component={AddUser} />

        <PrivateRoute exact path="/myreport" component={MyReport} />
        <PrivateRoute exact path="/companyreport" component={CompanyReport} />

        <PrivateRoute exact path="/member" component={Member} />

        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default Routes;
