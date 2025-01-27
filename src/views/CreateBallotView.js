import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useRecoilState } from "recoil";
import { createBallot } from "../core/ballots";
import { activeState, accountState } from "../state";

const CreateBallotView = () => {
  let [active, setActive] = useRecoilState(activeState);
  let [account, setAccount] = useRecoilState(accountState);

  let [errors, setErrors] = useState({});
  let [subject, setSubject] = useState("");
  let [desc, setDesc] = useState("");
  let [receipt, setReceipt] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    const subdesc = subject + "|" + desc;

    if (validate() && active) {
      createBallot(subdesc, account.address)
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

    setErrors(errors);
    return !hasError;
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
                    to="/ballots"
                    className="btn btn-sm btn-ghost-secondary mr-2 mb-1"
                  >
                    <i className="tio-chevron-left"></i>
                  </Link>
                  New Proposal
                </h4>
              </div>
              {receipt && (
                <div className="alert alert-soft-success card-alert">
                  <label className="mb-0">The Proposal has been Added</label>
                  <span className="font-size-sm">
                    {receipt.transactionHash}
                  </span>
                </div>
              )}
              <div className="card-body">
                <div className="form-group">
                  <label className="input-label mb-0">Proposal Title</label>
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
                  <label class="input-label mb-0">Ballot Description</label>
                  <input
                    type="text"
                    class="form-control form-control-flush"
                    name="desc"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    placeholder="Desc"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-block background-pink white"
                  disabled={!active}
                >
                  <i className="tio-send mr-1"></i>
                  {active ? "Submit Proposal" : "Connect wallet"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateBallotView;
