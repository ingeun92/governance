import constants from "./constants";

import { endpoint } from "../endpoint/endpoint";

let last_abi = require("../abis/LAST.json");
const web3 = endpoint;

function getLASTContract() {
  const last = web3.contract(last_abi, constants.LAST_ADDRESS);
  return last;
}

export const balanceOf = async (address) => {
  const contract = getLASTContract();
  return await contract.methods.balanceOf(address).call();
};
