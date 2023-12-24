import React from "react";

const Clause = ({ points }) => {
  console.log("points", points);
  return (
    <div className="grid grid-cols-12">
      <p>{points?.PointTitle}</p>
      <p className="col-span-11">{points?.PointContent}</p>
    </div>
  );
};

export default Clause;
