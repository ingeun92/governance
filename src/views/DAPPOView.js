import React from "react";
import AccountSideView from "./components/AccountSideView";

const CVTView = () => {
  return (
    <div className="container">
      <div className="page-header">
        <div className="row mt-5 align-items-end">
          <div className="col-lg-8">
            <h2>Proposals</h2>
            <p className="p-0 m-0">Show up Voting Proposals in DAppO DAO</p>
          </div>
          <div className="col-lg-4 text-right">
            <button type="button" className="btn btn-primary">
              새 안건 추가하기
            </button>
          </div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-9"></div>
        <div className="col-md-3">
          <AccountSideView />
        </div>
      </div>
    </div>
  );
};

export default CVTView;
