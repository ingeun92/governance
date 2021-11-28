import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { Link } from "react-router-dom";

import BallotListView from "./components/BallotListView";
import { activeState, ballotState } from "../state";
import { fetchBallots } from "../core/ballots";

const BallotsView = () => {
  const [active, setActive] = useRecoilState(activeState);
  const [ballots, setBallots] = useRecoilState(ballotState);

  useEffect(() => {
    if (active) {
      fetchBallots().then((ballots) => {
        setBallots(ballots);
      });
    }
  }, []);

  return (
    <div className="container">
      <div className="page-header">
        <div className="row mt-5 align-items-end">
          <div className="col-lg-8">
            <h2 class="pink">Proposals</h2>
            <p className="p-0 m-0 text-white">
              Show up the last 10 voting proposals in The Last DAO
            </p>
          </div>
          <div className="col-lg-4 text-right">
            <Link to={"/create/ballot"} className="btn background-pink white">
              New Proposal
            </Link>
          </div>
        </div>
      </div>
      <div className="row mt-5 justify-content-md-center">
        <div className="col-md-10 text-center">
          <BallotListView />
        </div>
      </div>
    </div>
  );
};

export default BallotsView;
