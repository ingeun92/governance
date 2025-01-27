import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { RecoilRoot } from "recoil";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./common/Header";
import HomeView from "./views/HomeView";
import BallotsView from "./views/BallotsView";
import BallotDetailView from "./views/BallotDetailView";
import DAPPOView from "./views/DAPPOView";
import CreateBallotView from "./views/CreateBallotView";
import VoteCreateView from "./views/VoteCreateView";
import VoteProceedView from "./views/VoteProceedView";
import FundingView from "./views/FundingView";
import FundingDetailView from "./views/FundingDetailView";
import CreateFundingView from "./views/CreateFundingView";

function App() {
  return (
    <RecoilRoot>
      <Router>
        <div className="App">
          <Header />
          <Switch>
            <Route path="/vote/detail/:id">
              <BallotDetailView />
            </Route>
            <Route path="/funding/detail/:id">
              <FundingDetailView />
            </Route>
            <Route path="/vote/proceed/:id">
              <VoteProceedView />
            </Route>
            <Route path="/vote/create/:id">
              <VoteCreateView />
            </Route>
            <Route path="/create/ballot">
              <CreateBallotView />
            </Route>
            <Route path="/create/funding">
              <CreateFundingView />
            </Route>
            <Route path="/token">
              <DAPPOView />
            </Route>
            <Route path="/ballots">
              <BallotsView />
            </Route>
            {/* <Route path="/funding">
              <FundingView />
            </Route> */}
            <Route path="/">
              <HomeView />
            </Route>
          </Switch>
        </div>
      </Router>
      <ToastContainer autoClose={10000} hideProgressBar={true} />
    </RecoilRoot>
  );
}

export default App;
