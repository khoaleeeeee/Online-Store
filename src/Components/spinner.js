import { ClipLoader } from "react-spinners";
import React from "react";

const Spinner = ({ loading }) => {
  return (
    <div>
      <ClipLoader color={"#123abc"} loading={loading} />
    </div>
  );
};

export default Spinner;
