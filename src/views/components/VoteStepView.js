import React from "react";
import classnames from "classnames";

const VoteStepView = ({ activeId }) => {
  return (
    <ul class="step step-md step-dashed">
      <li class="step-item">
        <div class="step-content-wrapper">
          <span
            class={classnames("step-icon", {
              "step-icon-soft-primary": activeId === 1,
              "step-icon-soft-secondary": activeId === 2,
            })}
          >
            1
          </span>
          <div class="step-content">
            <h4>Create Voting Rights</h4>
            <p class="step-text">
              It is the process of incinerating the CVT token held and obtaining
              voting rights on this agenda.
            </p>
          </div>
        </div>
      </li>

      <li class="step-item">
        <div class="step-content-wrapper">
          <span
            class={classnames("step-icon", {
              "step-icon-soft-primary": activeId === 2,
              "step-icon-soft-secondary": activeId === 1,
            })}
          >
            2
          </span>
          <div class="step-content">
            <h4>Voting</h4>
            <p class="step-text">
              Voting proceeds using the voting rights generated in Process 1. We
              use a square-voting method that exerts influence only by the
              square root of the right to vote entered.
            </p>
          </div>
        </div>
      </li>
    </ul>
  );
};

export default VoteStepView;
