import React, { useEffect, useState } from "react";
import Caver from "caver-js";
import classnames from "classnames";

import { Link, useLocation } from "react-router-dom";
import { formatBalance, shortAddress } from "../core/utils";
import { useRecoilState } from "recoil";
import { accountState, activeState, contextState } from "../state";
import { balanceOf } from "../core/cvt";
import {} from "../core/dappo";

import { endpoint } from "../endpoint/endpoint";

const web3 = endpoint;

const Header = () => {
  const location = useLocation();
  const [active, setActive] = useRecoilState(activeState);
  const [context, setContext] = useRecoilState(contextState);
  const [_account, _setAccount] = useRecoilState(accountState);

  useEffect(() => {
    initContext();
    getCVTBalance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const initContext = async () => {
    setContext({
      isMetamask: window.ethereum.isMetaMask,
    });
  };

  // connect to injected wallet
  const connectToKaikas = () => {
    if (typeof window.klaytn !== "undefined") {
      window.klaytn.enable().then(() => {
        accessToKaikas();
      });
    }
  };

  const connectToMetamask = () => {
    if (window.ethereum.isMetaMask) {
      window.ethereum
        .request({
          method: "eth_requestAccounts",
        })
        .then((result) => {
          // The result varies by RPC method.
          // For example, this method will return a transaction hash hexadecimal string on success.
          setActive(true);
          const account = result[0];
          web3.eth.getBalance(result[0]).then((balance) => {
            balanceOf(account).then((cvtBalance) => {
              _setAccount({
                address: account,
                balance: formatBalance(balance),
                shortAddress: shortAddress(account),
                cvtBalance: cvtBalance,
              });
            });
          });
        })
        .catch((error) => {
          // If the request fails, the Promise will reject with an error.
        });
    }
  };

  const disconnectFromMetamask = () => {
    // disconnect from Metamask
  };

  const getCVTBalance = () => {
    if (_account) {
      balanceOf(_account.address).then((cvtBalance) => {
        _setAccount({ ..._account, cvtBalance: cvtBalance });
      });
    }
  };

  const accessToKaikas = () => {
    if (
      window.klaytn &&
      window.klaytn.selectedAddress !== "" &&
      typeof window.klaytn.selectedAddress !== "undefined"
    ) {
      setActive(true);

      let account = window.klaytn.selectedAddress;
      let caver = new Caver(window.klaytn);
      caver.klay.getBalance(account).then((balance) => {
        balanceOf(account).then((cvtBalance) => {
          _setAccount({
            address: account,
            balance: formatBalance(balance),
            shortAddress: shortAddress(account),
            cvtBalance: cvtBalance,
          });
        });
      });
    }
  };

  return (
    <>
      {context && !context.isMetamask && (
        <div className="alert alert-primary mb-0 font-size-sm">
          You can use it after installing your Metamask wallet.
          <a
            href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
            className="alert-link ml-5"
          >
            Install
          </a>
        </div>
      )}
      <header className="navbar navbar-expand-lg navbar-spacer-y fixed-top mb-3">
        <div className="container">
          <div className="navbar-nav-wrap">
            <div className="navbar-brand-wrapper">
              <Link
                className="navbar-brand text-black"
                to="/"
                aria-label="Front"
              >
                <b>The Last DAO</b>
              </Link>
            </div>

            <button
              type="button"
              className="navbar-toggler btn btn-ghost-secondary rounded-circle ml-auto"
              aria-label="Toggle navigation"
              aria-expanded="false"
              aria-controls="navbarNavMenuLightEg"
              data-toggle="collapse"
              data-target="#navbarNavMenuLightEg"
            >
              <i className="tio-menu-hamburger"></i>
            </button>

            <nav className="collapse navbar-collapse" id="navbarNavMenuLightEg">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link
                    className={classnames("nav-link", {
                      active: location.pathname === "/",
                    })}
                    to="/"
                  >
                    HOME
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={classnames("nav-link", {
                      active: location.pathname === "/ballots",
                    })}
                    to="/ballots"
                  >
                    GOVERNANCE
                  </Link>
                </li>
                {/* <li className="nav-item">
                  <Link
                    className={classnames("nav-link", {
                      active: location.pathname === "/funding",
                    })}
                    to="/funding"
                  >
                    FUNDINGS
                  </Link>
                </li> */}
                {active && _account && (
                  <>
                    <li className="nav-item">
                      <div className="h3 mt-2">
                        <span className="badge badge-soft-black">
                          4,325.29 DAPPO |{" "}
                          <span className="text-black">
                            {_account.shortAddress}
                          </span>
                        </span>
                      </div>
                    </li>
                    <li className="nav-item ml-5">
                      <button
                        className="btn btn-sm white btn-wallet-connect"
                        onClick={() => disconnectFromMetamask()}
                      >
                        Disconnect
                      </button>
                    </li>
                  </>
                )}
                {!active && (
                  <li className="nav-item">
                    {/* <button
                      className="btn btn-sm btn-soft-secondary btn-wallet-connect"
                      onClick={() => connectToKaikas()}
                    >
                      Connect to KaiKas
                    </button> */}
                    <button
                      className="btn btn-sm btn-soft-secondary btn-wallet-connect ml-2"
                      onClick={() => connectToMetamask()}
                    >
                      Connect to Metamask
                    </button>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
