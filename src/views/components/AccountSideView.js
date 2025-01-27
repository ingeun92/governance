import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { accountState } from "../../state";
import { balanceOf } from "../../core/cvt";

const AccountSideView = () => {
  const [account, setAccount] = useRecoilState(accountState);
  const [balance, setBalance] = useState();

  useEffect(() => {
    if (account) {
      balanceOf(account.address).then((balance) => {
        setBalance(balance);
      });
    }
  }, [account]);

  const RenderActive = () => {
    return (
      <>
        <div className="row">
          <div className="col-md-4">
            <span className="card-subtitle">MATIC</span>
          </div>
          <div className="col-md-8">
            <h4>{account.balance} MATIC</h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <span className="card-subtitle">CVT</span>
          </div>
          <div className="col-md-8">
            <h4>{balance ? balance : "0"} CVT</h4>
          </div>
        </div>
      </>
    );
  };

  const RenderInactive = () => {
    return (
      <div className="row">
        <div className="col-md-12 mt-3 mb-3 text-center">
          <span className="text-secondary">Not Connected</span>
        </div>
      </div>
    );
  };

  return (
    <div className="card mb-3 bg-light mt-5">
      <div className="card-header">
        <h4 className="card-header-title">
          Account {account && "(" + account.shortAddress + ")"}
        </h4>
      </div>
      <div className="card-body">
        {account && <RenderActive />}
        {!account && <RenderInactive />}
      </div>
    </div>
  );
};

export default AccountSideView;
