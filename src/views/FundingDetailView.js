import React, { useState, useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";

import AccountSideView from "./components/AccountSideView";

const FundingDetailView = () => {
  let match = useRouteMatch("/funding/detail/:id");

  const [funding, setFunding] = useState({});

  const tmp_1 = {
    name_: "Ing's Project",
    currentTime_: "2021-11-24",
    endTime_: "2021-11-25",
  };
  const tmp_2 = {
    name_: "Hyun's Project",
    currentTime_: "2021-11-24",
    endTime_: "2021-11-25",
  };
  const tmp_3 = {
    name_: "Sung's Project",
    currentTime_: "2021-11-24",
    endTime_: "2021-11-25",
  };
  const tmp_4 = {
    name_: "Jun's Project",
    currentTime_: "2021-11-24",
    endTime_: "2021-11-25",
  };

  useEffect(() => {
    initialize();
  }, []);

  const initialize = () => {
    let id = match.params.id;

    switch (id) {
      case "0":
        setFunding(tmp_1);
        break;
      case "1":
        setFunding(tmp_2);
        break;
      case "2":
        setFunding(tmp_3);
        break;
      case "3":
        setFunding(tmp_4);
        break;
      default:
        break;
    }

    // 투표 정보 가져오기
    // getBallot(id).then((ballot) => {
    //   setBallot(ballot);
    // });

    // getVoteEvents(id).then((votes) => {
    //   setVotes(votes.map((x) => x.returnValues));
    // });
  };

  return (
    <div className="container">
      <div className="row justify-content-md-center mt-15 mb-5">
        <div className="col-lg-10">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">
                <Link
                  to="/funding"
                  className="btn btn-sm btn-ghost-secondary mr-2 mb-1"
                >
                  <i className="tio-chevron-left"></i>
                </Link>
                Details of Funding
              </h4>
            </div>
            <div className="card-body">
              <div className="row form-group">
                <div className="col-md-4">
                  <label className="text-dark">Funding Name</label>
                </div>
                <div className="col-md-8">{funding ? funding.name_ : ""}</div>
              </div>
              <div className="row form-group">
                <div className="col-md-4">
                  <label className="text-dark">
                    <i className="tio-time mr-1"></i>POSTED
                  </label>
                </div>
                <div className="col-md-8">
                  {funding ? funding.currentTime_ : ""}
                </div>
              </div>
              <div className="row form-group">
                <div className="col-md-4">
                  <label className="text-dark">
                    <i className="tio-time mr-1"></i>Voting Closing Time
                  </label>
                </div>
                <div className="col-md-8">
                  {funding ? funding.endTime_ : ""}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundingDetailView;
