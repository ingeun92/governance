import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { Link } from "react-router-dom";

import AccountSideView from "./components/AccountSideView";
import FundingListView from "./components/FundingListView";
import { activeState, ballotState } from "../state";
import { fetchBallots } from "../core/ballots";

const FundingView = () => {
  const [active, setActive] = useRecoilState(activeState);
  const [ballots, setBallots] = useRecoilState(ballotState);

  useEffect(() => {
    if (active) {
      fetchBallots().then((ballots) => {
        setBallots(ballots);
      });
    }
  }, [active]);

  return (
    <div className="container">
      <div className="page-header">
        <div className="row mt-5 align-items-end">
          <div className="col-lg-8">
            <h2>Funding</h2>
            <p className="p-0 m-0">
              Display up to 6 of the funding lists that are in progress on DAppO
            </p>
          </div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-9">
          <FundingListView />
        </div>
        <div className="col-md-3">
          <AccountSideView />
        </div>
      </div>
    </div>
  );
};

export default FundingView;
