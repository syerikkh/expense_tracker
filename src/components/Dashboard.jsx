import React, { useEffect, useState } from "react";
import { AppIcon } from "./Icons/AppIcon";
import { GreenDot } from "./Icons/GreenDot";
import { LeadingIcon } from "./Icons/LeadingIcon";
import { BlueDot } from "./Icons/BlueDot";
import Link from "next/link";
import { useRouter } from "next/router";
import { MyChart } from "./MyChart";
import Cookies from "js-cookie";

export const Dashboard = ({ userData, transactions, categories }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { userId } = router.query;

  const handleSignOut = () => {
    setLoading(true);
    Cookies.remove("authToken");
    setTimeout(() => {
      setLoading(false);
      router.push("/");
    }, 1500);
  };

  const userTransactions = transactions.filter(
    (transaction) => transaction.user_id === userId
  );
  const totalIncome = userTransactions
    .filter((transaction) => transaction.transaction_type === "INC")
    .reduce((sum, transaction) => sum + transaction.amount, 0);
  const totalExpenses = userTransactions
    .filter((transaction) => transaction.transaction_type === "EXP")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  return (
    <div className="w-full min-h-screen pb-10 flex flex-col bg-[#F3F4F6]">
      <div className="w-full p-6 lg:px-20 bg-white shadow-md">
        <div className="flex justify-between items-center">
          <div className="flex gap-6 items-center">
            <AppIcon />
            <h1 className="font-semibold text-xl lg:text-2xl">Dashboard</h1>
            <Link href={`/records/${userId}`}>
              <button className="text-blue-500 hover:underline">Records</button>
            </Link>
          </div>
          <div className="flex items-center gap-5">
            {userData.map((user) => (
              <div className="flex gap-4 items-center capitalize">
                {user.name}
              </div>
            ))}
            <button onClick={handleSignOut} className="btn btn-black">
              {loading ? "Signing out..." : "Sign out"}
            </button>
          </div>
        </div>
      </div>
      <div className="w-full lg:px-20 mt-9">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="rounded-2xl bg-blue-500 p-6 flex items-end shadow-md">
            <div>
              <p className="text-gray-200">Cash</p>
              <p className="text-2xl text-white font-bold">10,000,00</p>
            </div>
          </div>
          <div className="rounded-2xl bg-white shadow-md">
            <div className="h-14 w-full border-b-2 rounded-t-2xl p-6 flex items-center gap-3">
              <GreenDot />
              <h1 className="font-semibold">Your Income</h1>
            </div>
            <div className="p-6 flex flex-col gap-4">
              <div>
                <h1 className="font-bold text-2xl">
                  {totalIncome.toLocaleString()}₮
                </h1>
                <p className="text-gray-500 mt-2">Your Income Amount</p>
              </div>
              <div className="flex gap-2 items-center"></div>
            </div>
          </div>
          <div className="rounded-2xl bg-white shadow-md">
            <div className="h-14 w-full border-b-2 rounded-t-2xl p-6 flex items-center gap-3">
              <BlueDot />
              <h1 className="font-semibold">Total Expenses</h1>
            </div>
            <div className="p-6 flex flex-col gap-4">
              <div>
                <h1 className="font-bold text-2xl">
                  -{totalExpenses.toLocaleString()}₮
                </h1>
                <p className="text-gray-500 mt-2">Your Expense Amount</p>
              </div>
              <div className="flex gap-2 items-center"></div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-6 mt-6">
          <div className="bg-white rounded-2xl shadow-md">
            <div className="h-14 w-full p-6 border-b-2 flex items-center">
              <h1 className="font-semibold">Expense chart</h1>
            </div>
            <div className="py-8 px-6">
              <div className="lg:w-[700px] w-full h-[500px]">
                <MyChart categories={categories} transactions={transactions} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
