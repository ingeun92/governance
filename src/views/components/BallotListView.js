import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { toast } from "react-toastify";

import { accountState, ballotState } from "../../state";
import { getBallot, tallyUp, getVoteEvents } from "../../core/ballots";
import { createBallot, castVote } from "../../core/ballots2";

// const ProposalView = ({ proposals, winner, ended }) => {
//   return proposals.map((value, index) => {
//     return (
//       <div className="col-md-12 text-left mb-3" key={value + String(index)}>
//         <label className="input-label mb-0">
//           Proposal {index + 1}
//           {ended && winner === index && (
//             <span className="badge background-pink soft-black ml-1">
//               Adopted
//             </span>
//           )}
//         </label>
//         <span>{value}</span>
//       </div>
//     );
//   });
// };

const BallotListView = () => {
  const account = useRecoilValue(accountState);
  const [ballots, setBallots] = useRecoilState(ballotState);

  const temp = [
    {
      title: "Add DAPPO Support",
      startBlock: "123",
      endBlock: "180",
      passed: 1,
    },
    {
      title: "Security Solutions For The Last DAO Governance",
      startBlock: "456",
      endBlock: "789",
      passed: 2,
    },
    {
      title: "Address Whitelist for Submitting Proposals",
      startBlock: "456",
      endBlock: "789",
      passed: 3,
    },
  ];

  useEffect(() => {
    setBallots(temp);
  }, []);

  const handleTallyUp = (ballotId) => {
    if (account && account.address) {
      console.log(ballotId);
      tallyUp(ballotId, account.address)
        .then(async (res) => {
          if (res) {
            let newBallot = await getBallot(ballotId);
            let newList = ballots.map((x) => {
              if (x.id === newBallot.id) {
                return newBallot;
              } else {
                return x;
              }
            });
            setBallots(newList);
          }
        })
        .catch((err) => {
          toast.info("투표 결과를 보는데 실패했어요 :(");
        });
    }
  };

  return ballots.map((item, index) => {
    return (
      <div className="row" key={String(index)}>
        <div className="col-md-12 mb-5">
          {item.passed !== 3 && (
            <div className="card card-go-title card-hover-shadow h-10 mt-5">
              <Link to={`/vote/detail/${item.id}`} className="stretched-link" />
              <div className="card-body">
                <div className="row align-items-center text-left">
                  <div className="col-md-10">
                    <h3 class="ml-3">
                      {item.passed === 1 && (
                        <Link
                          to={`/vote/detail/${item.id}`}
                          class="badge background-pink soft-black p-4 mr-2"
                        >
                          Active
                        </Link>
                      )}
                      {item.passed === 2 && (
                        <Link
                          to={`/vote/detail/${item.id}`}
                          class="badge bg-success soft-black p-4 mr-2"
                        >
                          Executed
                        </Link>
                      )}
                      {item.passed === 3 && (
                        <Link
                          to={"/ballot"}
                          class="badge bg-warning soft-black p-4 mr-2"
                        >
                          Finalized
                        </Link>
                      )}
                      {item.title}
                    </h3>
                  </div>
                  <div className="col-md-6 text-right">
                    {/* {!item.passed && (
                    <Link
                      to={`/vote/create/${item.id}`}
                      className="btn btn-sm btn-soft-success"
                    >
                      Voting
                    </Link>
                  )} */}
                    {/* {item.passed && (
                    <button
                      className="btn btn-sm btn-soft-danger"
                      onClick={() => handleTallyUp(item.id)}
                    >
                      Finallize
                    </button>
                  )} */}
                    {/* <Link
                    to={`/vote/detail/${item.id}`}
                    className="btn btn-sm btn-outline-secondary ml-2"
                  >
                    Details
                  </Link> */}
                  </div>
                </div>
                {/* <div class="row">
                <div class="col-md-6 text-left">
                  <i className="tio-time mr-1"></i>Start Block:{"  "}
                  {item.startBlock}
                </div>
                <div class="col-md-6 text-left">
                  <i className="tio-time mr-1"></i>End Block:{"  "}
                  {item.endBlock}
                </div>
              </div> */}
              </div>
              <div className="card-footer">
                {item.passed === 1 && (
                  <div className="row justify-content-md-center">
                    {/* <ProposalView
                  proposals={item.proposals}
                  winner={Number(item.winningProposal_)}
                  ended={item.ended_}
                /> */}
                    <div class="col-md-3 card-go-success mr-5">
                      <div class="card-body">
                        <h4>FOR</h4>
                        <span class="text-sm text-right">
                          Expectation Value: <br />
                          280,467
                        </span>
                        <div class="progress mt-2">
                          <div
                            class="progress-bar bg-success w-75"
                            role="progressbar"
                            aria-valuenow="75"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                        <Link to={"#"} class="stretched-link change-success" />
                      </div>
                    </div>
                    <div class="col-md-3 card-go-danger mr-5">
                      <div class="card-body">
                        <h4>AGAINST</h4>
                        <span class="text-sm text-right">
                          Expectation Value: <br />
                          111,128
                        </span>
                        <div class="progress mt-2">
                          <div
                            class="progress-bar bg-danger w-25"
                            role="progressbar"
                            aria-valuenow="25"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                        <Link to={"#"} class="stretched-link" />
                      </div>
                    </div>
                    <div class="col-md-3 card-go-gray">
                      <div class="card-body">
                        <h4>ABSTAIN</h4>
                        <span class="text-sm text-right">
                          Expectation Value:
                          <br />6
                        </span>
                        <div class="progress mt-2">
                          <div
                            class="progress-bar bg-gray w-1"
                            role="progressbar"
                            aria-valuenow="1"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                        <Link to={"#"} class="stretched-link" />
                      </div>
                    </div>
                  </div>
                )}
                {item.passed === 2 && (
                  <div className="row justify-content-md-center">
                    {/* <ProposalView
                  proposals={item.proposals}
                  winner={Number(item.winningProposal_)}
                  ended={item.ended_}
                /> */}
                    <div class="col-md-3 card-go-success mr-5">
                      <div class="card-body">
                        <h4>FOR</h4>
                        <span class="text-sm text-right">
                          Expectation Value: <br />
                          1,534,713
                        </span>
                        <div class="progress mt-2">
                          <div
                            class="progress-bar bg-success w-100"
                            role="progressbar"
                            aria-valuenow="100"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                        <Link to={"#"} class="stretched-link change-success" />
                      </div>
                    </div>
                    <div class="col-md-3 card-go-danger mr-5">
                      <div class="card-body">
                        <h4>AGAINST</h4>
                        <span class="text-sm text-right">
                          Expectation Value:
                          <br />0
                        </span>
                        <div class="progress mt-2">
                          <div
                            class="progress-bar bg-danger w-0"
                            role="progressbar"
                            aria-valuenow="0"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                        <Link to={"#"} class="stretched-link" />
                      </div>
                    </div>
                    <div class="col-md-3 card-go-gray">
                      <div class="card-body">
                        <h4>ABSTAIN</h4>
                        <span class="text-sm text-right">
                          Expectation Value:
                          <br />0
                        </span>
                        <div class="progress mt-2">
                          <div
                            class="progress-bar bg-gray w-0"
                            role="progressbar"
                            aria-valuenow="0"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                        <Link to={"#"} class="stretched-link" />
                      </div>
                    </div>
                  </div>
                )}
                {item.passed === 3 && (
                  <div className="row justify-content-md-center">
                    {/* <ProposalView
                  proposals={item.proposals}
                  winner={Number(item.winningProposal_)}
                  ended={item.ended_}
                /> */}
                    <div class="col-md-3 card-go-success mr-5">
                      <div class="card-body">
                        <h4>FOR</h4>
                        <span class="text-sm text-right">
                          Expectation Value:
                          <br />
                          903,225
                        </span>
                        <div class="progress mt-2">
                          <div
                            class="progress-bar bg-success w-100"
                            role="progressbar"
                            aria-valuenow="100"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                        <Link to={"#"} class="stretched-link change-success" />
                      </div>
                    </div>
                    <div class="col-md-3 card-go-danger mr-5">
                      <div class="card-body">
                        <h4>AGAINST</h4>
                        <span class="text-sm text-right">
                          Expectation Value:
                          <br />0
                        </span>
                        <div class="progress mt-2">
                          <div
                            class="progress-bar bg-danger w-0"
                            role="progressbar"
                            aria-valuenow="0"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                        <Link to={"#"} class="stretched-link" />
                      </div>
                    </div>
                    <div class="col-md-3 card-go-gray">
                      <div class="card-body">
                        <h4>ABSTAIN</h4>
                        <span class="text-sm text-right">
                          Expectation Value:
                          <br />0
                        </span>
                        <div class="progress mt-2">
                          <div
                            class="progress-bar bg-gray w-0"
                            role="progressbar"
                            aria-valuenow="0"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                        <Link to={"#"} class="stretched-link" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          {item.passed === 3 && (
            <div className="card card-go-title card-hover-shadow h-10 mt-5">
              <Link to={`#`} className="stretched-link" />
              <div className="card-body">
                <div className="row align-items-center text-left">
                  <div className="col-md-10">
                    <h3 class="ml-3">
                      {item.passed === 1 && (
                        <Link
                          to={``}
                          class="badge background-pink soft-black p-4 mr-2"
                        >
                          Active
                        </Link>
                      )}
                      {item.passed === 2 && (
                        <Link
                          to={`/vote/detail/${item.id}`}
                          class="badge bg-success soft-black p-4 mr-2"
                        >
                          Executed
                        </Link>
                      )}
                      {item.passed === 3 && (
                        <Link
                          to={"/ballots"}
                          class="badge bg-success soft-black p-4 mr-2"
                        >
                          Succeeded
                        </Link>
                      )}
                      {item.title}
                    </h3>
                  </div>
                  <div className="col-md-6 text-right">
                    {/* {!item.passed && (
                    <Link
                      to={`/vote/create/${item.id}`}
                      className="btn btn-sm btn-soft-success"
                    >
                      Voting
                    </Link>
                  )} */}
                    {/* {item.passed && (
                    <button
                      className="btn btn-sm btn-soft-danger"
                      onClick={() => handleTallyUp(item.id)}
                    >
                      Finallize
                    </button>
                  )} */}
                    {/* <Link
                    to={`/vote/detail/${item.id}`}
                    className="btn btn-sm btn-outline-secondary ml-2"
                  >
                    Details
                  </Link> */}
                  </div>
                </div>
                {/* <div class="row">
                <div class="col-md-6 text-left">
                  <i className="tio-time mr-1"></i>Start Block:{"  "}
                  {item.startBlock}
                </div>
                <div class="col-md-6 text-left">
                  <i className="tio-time mr-1"></i>End Block:{"  "}
                  {item.endBlock}
                </div>
              </div> */}
              </div>
              <div className="card-footer">
                {item.passed === 1 && (
                  <div className="row justify-content-md-center">
                    {/* <ProposalView
                  proposals={item.proposals}
                  winner={Number(item.winningProposal_)}
                  ended={item.ended_}
                /> */}
                    <div class="col-md-3 card-go-success mr-5">
                      <div class="card-body">
                        <h4>FOR</h4>
                        <span class="text-sm text-right">
                          Expectation Value: 280,465
                        </span>
                        <div class="progress mt-2">
                          <div
                            class="progress-bar bg-success w-75"
                            role="progressbar"
                            aria-valuenow="75"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                        <Link to={"#"} class="stretched-link change-success" />
                      </div>
                    </div>
                    <div class="col-md-3 card-go-danger mr-5">
                      <div class="card-body">
                        <h4>AGAINST</h4>
                        <span class="text-sm text-right">
                          Expectation Value: 111,128
                        </span>
                        <div class="progress mt-2">
                          <div
                            class="progress-bar bg-danger w-25"
                            role="progressbar"
                            aria-valuenow="25"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                        <Link to={"#"} class="stretched-link" />
                      </div>
                    </div>
                    <div class="col-md-3 card-go-gray">
                      <div class="card-body">
                        <h4>ABSTAIN</h4>
                        <span class="text-sm text-right">
                          Expectation Value:
                          <br />6
                        </span>
                        <div class="progress mt-2">
                          <div
                            class="progress-bar bg-gray w-1"
                            role="progressbar"
                            aria-valuenow="1"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                        <Link to={"#"} class="stretched-link" />
                      </div>
                    </div>
                  </div>
                )}
                {item.passed === 2 && (
                  <div className="row justify-content-md-center">
                    {/* <ProposalView
                  proposals={item.proposals}
                  winner={Number(item.winningProposal_)}
                  ended={item.ended_}
                /> */}
                    <div class="col-md-3 card-go-success mr-5">
                      <div class="card-body">
                        <h4>FOR</h4>
                        <span class="text-sm text-right">
                          Expectation Value: 1,534,713
                        </span>
                        <div class="progress mt-2">
                          <div
                            class="progress-bar bg-success w-100"
                            role="progressbar"
                            aria-valuenow="100"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                        <Link to={"#"} class="stretched-link change-success" />
                      </div>
                    </div>
                    <div class="col-md-3 card-go-danger mr-5">
                      <div class="card-body">
                        <h4>AGAINST</h4>
                        <span class="text-sm text-right">
                          Expectation Value:
                          <br />0
                        </span>
                        <div class="progress mt-2">
                          <div
                            class="progress-bar bg-danger w-0"
                            role="progressbar"
                            aria-valuenow="0"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                        <Link to={"#"} class="stretched-link" />
                      </div>
                    </div>
                    <div class="col-md-3 card-go-gray">
                      <div class="card-body">
                        <h4>ABSTAIN</h4>
                        <span class="text-sm text-right">
                          Expectation Value:
                          <br />0
                        </span>
                        <div class="progress mt-2">
                          <div
                            class="progress-bar bg-gray w-0"
                            role="progressbar"
                            aria-valuenow="0"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                        <Link to={"#"} class="stretched-link" />
                      </div>
                    </div>
                  </div>
                )}
                {item.passed === 3 && (
                  <div className="row justify-content-md-center">
                    {/* <ProposalView
                  proposals={item.proposals}
                  winner={Number(item.winningProposal_)}
                  ended={item.ended_}
                /> */}
                    <div class="col-md-3 card-go-success mr-5">
                      <div class="card-body">
                        <h4>FOR</h4>
                        <span class="text-sm text-right">
                          Expectation Value: <br />
                          901,762
                        </span>
                        <div class="progress mt-2">
                          <div
                            class="progress-bar bg-success w-100"
                            role="progressbar"
                            aria-valuenow="100"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                        <Link to={"#"} class="stretched-link change-success" />
                      </div>
                    </div>
                    <div class="col-md-3 card-go-danger mr-5">
                      <div class="card-body">
                        <h4>AGAINST</h4>
                        <span class="text-sm text-right">
                          Expectation Value:
                          <br />0
                        </span>
                        <div class="progress mt-2">
                          <div
                            class="progress-bar bg-danger w-0"
                            role="progressbar"
                            aria-valuenow="0"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                        <Link to={"#"} class="stretched-link" />
                      </div>
                    </div>
                    <div class="col-md-3 card-go-gray">
                      <div class="card-body">
                        <h4>ABSTAIN</h4>
                        <span class="text-sm text-right">
                          Expectation Value:
                          <br />0
                        </span>
                        <div class="progress mt-2">
                          <div
                            class="progress-bar bg-gray w-0"
                            role="progressbar"
                            aria-valuenow="0"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                        <Link to={"#"} class="stretched-link" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  });
};

export default BallotListView;
