import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { Link, useRouteMatch } from "react-router-dom";

import { accountState, activeState } from "../state";
import { getBallot, getWeightAt, joinAt } from "../core/ballots";
import { balanceOf } from "../core/cvt";

import VoteStepView from "./components/VoteStepView";

const VoteCreateView = () => {
  const match = useRouteMatch("/vote/create/:id");
  const active = useRecoilValue(activeState);
  const account = useRecoilValue(accountState);

  const [amount, setAmount] = useState("");
  const [errors, setErrors] = useState({});
  const [ballot, setBallot] = useState({});
  const [weight, setWeight] = useState(0);
  const [cvtToken, setCVTToken] = useState(0);

  const [id, setId] = useState(0);
  const [alarm, setAlarm] = useState(null);

  useEffect(() => {
    if (active && account && match) {
      initialize();
    }
  }, [active]);

  const initialize = () => {
    let id = match.params.id;

    // 투표 정보 가져오기
    getBallot(id).then((ballot) => {
      setId(id);
      setBallot(ballot);
    });

    // 투표권 정보 가져오기
    getWeightAt(id, account.address).then((res) => {
      setWeight(res.weights_);
    });

    // CVT 수량 가져오기
    balanceOf(account.address).then((balance) => {
      setCVTToken(balance);
    });
  };

  const validate = () => {
    let hasError = false;
    let errors = {};

    if (amount === "") {
      errors["amount"] = "Input Amount";
      hasError = true;
    } else if (!Number.isInteger(Number(amount))) {
      errors["amount"] = "Only Numbers";
      hasError = true;
    } else if (Number(amount) > Number(cvtToken)) {
      errors["amount"] =
        "You can exchange only the number of CVT tokens you have.";
      hasError = true;
    }

    setErrors(errors);
    return !hasError;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validate() && active) {
      joinAt(id, amount, account.address).then((receipt) => {
        setAlarm({ receipt: receipt });
        initialize();
      });
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="row justify-content-md-center mt-10 mb-15">
          <div className="col-lg-6">
            <div className="row">
              <div className="col-lg-12">
                <VoteStepView activeId={1} />
              </div>
              <div className="col-lg-12 mt-5">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">
                      <Link
                        to="/ballots"
                        className="btn btn-sm btn-ghost-secondary mr-2 mb-1"
                      >
                        <i className="tio-chevron-left"></i>
                      </Link>
                      Create Voting Rights
                    </h4>
                  </div>
                  {alarm && alarm.receipt.status && (
                    <div className="alert alert-soft-success card-alert">
                      <label className="mb-0">Created Voting Rights</label>
                      <span className="font-size-sm">
                        {alarm.receipt.transactionHash}
                      </span>
                    </div>
                  )}
                  {alarm && !alarm.receipt.status && (
                    <div className="alert alert-soft-danger card-alert">
                      <label className="mb-0">
                        Failed: If you've already voted or it's past voting
                        time, you can't vote.
                      </label>
                      <span className="font-size-sm">
                        {alarm.receipt.transactionHash}
                      </span>
                    </div>
                  )}
                  <div className="card-body">
                    <div className="row form-group">
                      <div className="col-md-3">
                        <label className="text-dark">Name</label>
                      </div>
                      <div className="col-md-9">
                        <span className="text-muted">{ballot.name_}</span>
                      </div>
                    </div>
                    <div className="row form-group">
                      <div className="col-md-3">
                        <label className="text-dark">
                          <i className="tio-ticket mr-1"></i>Voting Rights
                        </label>
                      </div>
                      <div className="col-md-9">
                        <span className="text-muted">{weight}</span>
                      </div>
                    </div>
                    <div className="row form-group">
                      <div className="col-md-3">
                        <label className="text-dark">
                          <i className="tio-time mr-1"></i>POSTED
                        </label>
                      </div>
                      <div className="col-md-9">
                        <span className="text-muted">
                          {ballot.currentTime_}
                        </span>
                      </div>
                    </div>
                    <div className="row form-group">
                      <div className="col-md-3">
                        <label className="text-dark">
                          <i className="tio-time mr-1"></i>Voting Closing Time
                        </label>
                      </div>
                      <div className="col-md-9">
                        <span className="text-muted">{ballot.endTime_}</span>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label className="input-label">
                          Number of Voting Rights to be generated
                        </label>
                      </div>
                      <div className="col-md-6 text-right">
                        <span className="input-label text-muted">
                          Current CVT : {cvtToken}
                        </span>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <input
                          type="text"
                          className="form-control"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          placeholder="0"
                        />
                        {errors["amount"] && (
                          <p className="text-danger">{errors["amount"]}</p>
                        )}
                        <p className="bg-light p-2 mt-2">
                          1 CVT is exchanged for 1 Voting Right.
                        </p>
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col-md-6">
                        <button
                          type="submit"
                          className="btn btn-sm btn-block btn-primary"
                        >
                          Create Voting Rights
                        </button>
                      </div>
                      <div className="col-md-6">
                        <Link
                          to={`/vote/proceed/${id}`}
                          className="btn btn-sm btn-block btn-soft-secondary"
                        >
                          Next Step <i className="tio-chevron-right ml-1"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default VoteCreateView;
