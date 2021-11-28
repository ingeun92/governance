/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import BallotListView from "./components/BallotListView";
import { fetchBallots } from "../core/ballots";
import { activeState, ballotState } from "../state";

const HomeView = () => {
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
      <div className="row">
        <div id="home-introduction" className="col-lg-12 text-center">
          <span className="display-1 pink">The Last DAO</span>
          <img src="dappo.png" class="img-fluid mt-5" alt="Responsive image" />
        </div>
      </div>
    </div>
  );
};

export default HomeView;
