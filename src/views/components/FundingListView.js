/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { toast } from "react-toastify";

import { accountState, ballotState, fundingState } from "../../state";
import { getBallot, tallyUp, getVoteEvents } from "../../core/ballots";
import NumberFormat from "react-number-format";

const FundingListView = () => {
  const [fundings, setFundings] = useRecoilState(fundingState);
  const temp = [
    {
      title: "Ing's Project",
      desc: "Ing's Project to earn Funding",
      fund: 30000,
    },
    {
      title: "Hyun's Project",
      desc: "Hyun's Project to earn Funding",
      fund: 15000,
    },
    {
      title: "Sung's Project",
      desc: "Sung's Project to earn Funding",
      fund: 20000,
    },
    {
      title: "Jun's Project",
      desc: "Jun's Project to earn Funding",
      fund: 10000,
    },
  ];

  useEffect(() => {
    setFundings(temp);
  }, []);

  const FundingList = () => {
    return fundings.map((item, index) => {
      return (
        <div class="col-md-4 mb-5" key={String(index)}>
          <div class="card card-hover-shadow h-100">
            <img src="logo512.png" class="card-img-top" alt="image" />
            <div class="card-body">
              <h1 class="card-title">{item.title}</h1>
              <h3 class="card-text">{item.desc}</h3>
              <NumberFormat
                value={item.fund}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
                class="h1 card-text mt-5 text-right"
              />
              <div class="col text-center">
                <Link to={`/vote/detail/0`} class="btn btn-primary">
                  Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div class="row">
      <FundingList />
    </div>
  );
};

export default FundingListView;
