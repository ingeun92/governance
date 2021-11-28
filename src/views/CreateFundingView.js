import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useRecoilState } from "recoil";
import { createBallot } from "../core/ballots";
import { activeState, accountState } from "../state";

const CreateFundingView = () => {
  let [active, setActive] = useRecoilState(activeState);
  let [account, setAccount] = useRecoilState(accountState);

  let [errors, setErrors] = useState({});
  let [subject, setSubject] = useState("");
  let [desc, setDesc] = useState("");
  let [timeLimit, setTimeLimit] = useState("");
  let [proposals, setProposals] = useState([""]);
  let [receipt, setReceipt] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validate() && active) {
      createBallot(subject, proposals, timeLimit, account.address)
        .then((receipt) => {
          setReceipt(receipt);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const validate = () => {
    let errors = {};
    let hasError = false;
    if (subject === "") {
      errors["subject"] = "Input Title";
      hasError = true;
    }

    if (timeLimit === "") {
      errors["timeLimit"] = "Input Voting Closing Time";
      hasError = true;
    } else if (!Number.isInteger(Number(timeLimit))) {
      errors["timeLimit"] = "Only Number Please";
      hasError = true;
    } else if (Number(timeLimit) < 60) {
      errors["timeLimit"] = "At least 60 sec";
      hasError = true;
    }

    if (proposals.length < 2) {
      errors["proposals"] = "At least 2 proposals";
      hasError = true;
    }

    setErrors(errors);
    return !hasError;
  };

  const handleProposalChange = (index, value) => {
    let list = [...proposals];
    list[index] = value;
    setProposals(list);
  };

  const addProposal = () => {
    let _proposals = proposals.concat([""]);
    setProposals(_proposals);
  };

  const deleteProposal = (index) => {
    let _proposals = proposals;
    _proposals = _proposals.filter((v, idx) => idx !== index);
    setProposals(_proposals);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="row justify-content-md-center mt-15 mb-15">
          <div className="col-lg-5">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">
                  <Link
                    to="/funding"
                    className="btn btn-sm btn-ghost-secondary mr-2 mb-1"
                  >
                    <i className="tio-chevron-left"></i>
                  </Link>
                  New Funding
                </h4>
              </div>
              {receipt && (
                <div className="alert alert-soft-success card-alert">
                  <label className="mb-0">The Funding has been Added</label>
                  <span className="font-size-sm">
                    {receipt.transactionHash}
                  </span>
                </div>
              )}
              <div className="card-body">
                <div className="form-group">
                  <label className="input-label mb-0">Funding Title</label>
                  <input
                    type="text"
                    className="form-control form-control-flush"
                    name="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Subject"
                  />
                  {errors["subject"] && (
                    <p className="text-danger font-size-sm">
                      {errors["subject"]}
                    </p>
                  )}
                </div>
                <div class="form-group">
                  <label class="input-label mb-0">Funding Description</label>
                  <input
                    type="text"
                    class="form-control form-control-flush"
                    name="desc"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    placeholder="Desc"
                  />
                </div>
                <div className="form-group">
                  <label className="input-label mb-0">
                    Funding Closing Time
                  </label>
                  <input
                    type="text"
                    name="timeLimit"
                    value={timeLimit}
                    onChange={(e) => setTimeLimit(e.target.value)}
                    className="form-control form-control-flush"
                    placeholder="30 Sec"
                  />
                  {errors["timeLimit"] && (
                    <p className="text-danger font-size-sm">
                      {errors["timeLimit"]}
                    </p>
                  )}
                  <p className="bg-light p-2 mt-2">
                    The deadline for Funding is calculated as 1 second per
                    number and must be greater than 60
                  </p>
                </div>
                <button
                  type="submit"
                  className="btn btn-block background-pink white"
                  disabled={!active}
                >
                  <i className="tio-send mr-1"></i>
                  {active ? "Submit Funding" : "Connect wallet"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateFundingView;
