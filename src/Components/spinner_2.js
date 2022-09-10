import { PulseLoader } from "react-spinners";
import React from "react";

const Spinner2 = ({ loading }) => {
  return (
    <div>
      <PulseLoader color={"white"} loading={loading} size={25} />
    </div>
  );
};

export default Spinner2;
