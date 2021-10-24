import React from "react";
import { Pie } from "react-chartjs-2";

function PieChart({ distribution, pieRef }) {
  const data = {
    labels: distribution.map((stock) => stock._id),
    datasets: [
      {
        label: "# of votes",
        data: distribution.map((stock) => stock.value),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="w-full">
      <Pie
        data={data}
        height={"300px"}
        options={{ maintainAspectRatio: false }}
        ref={pieRef}
      />
    </div>
  );
}

export default PieChart;
