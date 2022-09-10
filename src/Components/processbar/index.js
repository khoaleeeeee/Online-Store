import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import "./style.css";
import Check from "../../svg/Check";

const ProcessBarCustom = ({ percent, item_1, item_2, item_3 }) => {
  return (
    <div className="bar_wrapper">
      <ProgressBar
        percent={percent}
        filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
      >
        <Step transition="scale">
          {({ accomplished }) => (
            <div
              className="personal info"
              style={{ background: `${accomplished ? "green" : "#85857e"}` }}
            >
              {accomplished ? <Check /> : <div className="num">1</div>}
            </div>
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished }) => (
            <div
              className="shipping info"
              style={{ background: `${accomplished ? "green" : "#85857e"}` }}
            >
              {accomplished ? <Check /> : <div className="num">2</div>}
            </div>
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished }) => (
            <div
              className="confirm info"
              style={{ background: `${accomplished ? "green" : "#85857e"}` }}
            >
              {accomplished ? <Check /> : <div className="num">3</div>}
            </div>
          )}
        </Step>
      </ProgressBar>

      <div className="section_text">
        <span>{item_1}</span>
        <span style={{ paddingLeft: "15px" }}>{item_2}</span>
        <span style={{ marginRight: "-10px" }}>{item_3}</span>
      </div>
    </div>
  );
};

export default ProcessBarCustom;
