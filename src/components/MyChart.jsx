import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  DoughnutController,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";
import { useRouter } from "next/router";

Chart.register(
  DoughnutController,
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export const MyChart = ({ categories, transactions }) => {
  const router = useRouter();
  const { userId } = router.query;

  const userCategories = categories.filter(
    (category) => category.user_id === userId
  );
  const userTransactions = transactions.filter(
    (transaction) =>
      transaction.user_id === userId && transaction.transaction_type === "EXP"
  );

  const groupedTransactions = userCategories.map((category) => {
    const categoryTransactions = userTransactions.filter(
      (transaction) => transaction.category_id === category.id
    );
    return {
      name: category.name,
      totalAmount: categoryTransactions.reduce(
        (total, transaction) => total + transaction.amount,
        0
      ),
    };
  });

  const randomColorGenerator = () => {
    return (
      "rgb(" +
      Math.floor(Math.random() * 256) +
      ", " +
      Math.floor(Math.random() * 256) +
      ", " +
      Math.floor(Math.random() * 256) +
      ")"
    );
  };

  const data = {
    labels: groupedTransactions.map((category) => category.name),
    datasets: [
      {
        label: "Expense",
        data: groupedTransactions.map((transaction) => transaction.totalAmount),
        backgroundColor: groupedTransactions.map(() => randomColorGenerator()),
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="w-full h-full">
      <Doughnut data={data} options={options} />
    </div>
  );
};
