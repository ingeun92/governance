import React, { useState, useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";

import { useRecoilState, useRecoilValue } from "recoil";
import { getBallot, getVoteEvents } from "../core/ballots";
import { activeState, accountState, ballotState } from "../state";

const BallotDetailView = () => {
  let active = useRecoilValue(activeState);
  let account = useRecoilValue(accountState);
  let match = useRouteMatch();

  const [id, setId] = useState(0);
  const [ballot, setBallot] = useRecoilState(ballotState);
  const [btemp, setBtemp] = useState([]);
  const [votes, setVotes] = useState([]);

  const temp = [
    {
      title: "Add DAPPO Support",
      startBlock: "123",
      endBlock: "180",
      passed: false,
    },
    {
      title: "No",
      startBlock: "456",
      endBlock: "789",
      passed: true,
    },
  ];

  useEffect(() => {
    setBtemp(temp);
    // if (active && account && match) {
    //   initialize();
    // }
  }, []);

  const initialize = () => {
    let id = match.params.id;
    // 투표 정보 가져오기
    // getBallot(id).then((ballot) => {
    //   setId(id);
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
                  to="/ballots"
                  className="btn btn-sm btn-ghost-secondary mr-2 mb-1"
                >
                  <i className="tio-chevron-left"></i>
                </Link>
                Details of Proposal
              </h4>
            </div>
            <div className="card-body">
              <div className="row form-group">
                <div className="col-md-4">
                  <label className="text-dark">Proposal Title</label>
                </div>
                <div className="col-md-8">Add DAPPO Support</div>
              </div>
              <div className="row form-group">
                <div className="col-md-4">
                  <label className="text-dark">
                    <i className="tio-time mr-1"></i>Start Block
                  </label>
                </div>
                <div className="col-md-8">21,876,993 (24 secs ago)</div>
              </div>
              <div className="row form-group">
                <div className="col-md-4">
                  <label className="text-dark">
                    <i className="tio-time mr-1"></i>End Block
                  </label>
                </div>
                <div className="col-md-8">21,886,580 (6 hrs ahead)</div>
              </div>
              <div class="row form-group">
                <div class="col-md-4">
                  <label class="text-dark">Details</label>
                </div>
                <div className="col-md-8">
                  On behalf of Luke Park & Ingeun Kim, I am submitting their
                  proposal to add DAPPO to The Last DAO. DAPPO is the newest
                  adorable running DAO team.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {ballot &&
        ballot.proposals &&
        ballot.proposals.map((value, index) => {
          return (
            <div
              className="row justify-content-md-center mb-5"
              key={`proposal-${index}`}
            >
              <div className="col-lg-10">
                <div className="card">
                  <div className="card-header">
                    <h5 className="card-title text-muted">
                      Proposal {index + 1} {value}
                      {ballot.ended_ &&
                        Number(ballot.winningProposal_) === index && (
                          <span className="badge background-pink soft-black ml-1">
                            Adopted
                          </span>
                        )}
                    </h5>
                  </div>
                  <table className="table table-borderless table-thead-bordered table-nowrap table-align-middle mb-0 pb-0">
                    <thead className="thead-light">
                      <tr>
                        <th width="70%">Voters</th>
                        <th>Voting Rights</th>
                      </tr>
                    </thead>
                    <tbody>
                      {votes &&
                        votes
                          .filter((x) => x.proposal === index)
                          .map((item) => {
                            return (
                              <tr>
                                <td>{item.who}</td>
                                <td className="text-dark">{item.weights}</td>
                              </tr>
                            );
                          })}
                      {votes &&
                        votes.filter((x) => x.proposal === index).length ===
                          0 && (
                          <tr>
                            <td
                              colSpan={2}
                              className="text-center pt-5 pb-5 text-muted"
                            >
                              No one voted yet :(
                            </td>
                          </tr>
                        )}
                    </tbody>
                    <tfoot className="thead-light mb-0">
                      <tr>
                        <th>Total Votes</th>
                        <th>
                          {votes &&
                            votes
                              .filter((x) => x.proposal === index)
                              .reduce((a, b) => a + Number(b.weights), 0)}
                        </th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default BallotDetailView;
