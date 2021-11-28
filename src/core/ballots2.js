import Web3 from "web3";
import constants from "./constants";
import moment from "moment";

import { stringToBytes } from "./utils";

import { endpoint } from "../endpoint/endpoint";

const charlie_abi = require("../abis/Charlie.json");
const web3 = endpoint;

function getCharlieContract() {
  const web3 = new Web3(
    "https://polygon-mumbai.g.alchemy.com/v2/mkm4u7lz0jQA4TlWxBc1YDjksW1DbQTH"
  );
  const charlie = new web3.eth.Contract(charlie_abi, constants.CHARLIE_ADDRESS);
  console.log(charlie);

  return charlie;
}

export const createBallot = async (desc, account) => {
  const contract = getCharlieContract();
  const descrption = stringToBytes(desc);

  const receipt = await contract.methods
    .propose([], [], [], [], descrption)
    .send({ from: account, gas: "500000" });
  return receipt;
};

export const castVote = async (id) => {
  const contract = getCharlieContract();
  const _id = id;

  // contract.methods
  //   .castVote(1, 0)
  //   .send({ from: "0x22272465C01b21Af999Fb03012540882b3313Fd6" })
  //   .then(function (receipt) {
  //     // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
  //     console.log(receipt);
  //   });
  // const receipt = await contract.methods.castVote(1, 0).send({
  //   from: "0x22272465C01b21Af999Fb03012540882b3313Fd6",
  //   gas: "500000",
  // });

  // return receipt;
};

export const fetchTotalBallots = async () => {
  try {
    const contract = getCharlieContract();
    const value = await contract.methods.totalBallots().call();
    return value;
  } catch (err) {
    throw err;
  }
};

export const fetchBallots = async () => {
  const numberOfBallots = await fetchTotalBallots();
  const minimumToRead = 10;
  let list = [];
  for (let i = numberOfBallots - 1; i >= numberOfBallots - minimumToRead; i--) {
    const result = await getBallot(i);
    list = [...list, result];

    if (i === 0) {
      break;
    }
  }
  return list;
};

export const getBallot = async (id) => {
  const contract = getCharlieContract();
  const result = await contract.methods.getBallotOf(id).call();
  const proposals = await contract.methods.proposalsOf(id).call();
  const endTimestamp = Number(result.currentTime_) + Number(result.timeLimit_);

  result.id = id;
  result.name_ = Web3.utils.toUtf8(result.name_);
  result.currentTime_ = moment
    .unix(result.currentTime_)
    .format("YYYY-MM-DD HH:mm:ss");
  result.endTime_ = moment.unix(endTimestamp).format("YYYY-MM-DD HH:mm:ss");
  result.passed = moment.unix(endTimestamp).isBefore(moment());
  result.proposals = proposals.map((x) => Web3.utils.toUtf8(x));

  return result;
};

export const getWeightAt = async (ballotId, address) => {
  const contract = getCharlieContract();
  const result = await contract.methods
    .voterAt(ballotId)
    .call({ from: address });
  return result;
};

export const joinAt = async (ballotId, amount, address) => {
  const contract = getCharlieContract();
  const receipt = await contract.methods
    .joinAt(ballotId, amount)
    .send({ from: address, gas: "100000" });
  return receipt;
};

export const voteAt = async (ballotId, proposals, votes, address) => {
  const contract = getCharlieContract();
  const receipt = await contract.methods
    .voteAt(ballotId, proposals, votes)
    .send({ from: address, gas: "500000" });
  return receipt;
};

export const tallyUp = async (ballotId, address) => {
  const contract = getCharlieContract();
  const receipt = await contract.methods
    .tallyUp(ballotId)
    .send({ from: address, gas: "5000000" });
  return receipt;
};

export const getVoteEvents = async (ballotId) => {
  const contract = getCharlieContract();
  const events = await contract.getPastEvents("Vote", {
    filter: { ballotNum: Number(ballotId) },
    fromBlock: 0,
    toBlock: "latest",
  });
  return events;
};
