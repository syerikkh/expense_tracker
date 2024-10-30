import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { DeleteIcon } from "./Icons/DeleteIcon";
import Cookies from "js-cookie";

export const RecordsPart2 = ({ categories, transactions, userData }) => {
  const [transactionsData, setTransactionsData] = useState(transactions);

  const router = useRouter();
  const { userId } = router.query;

  const deleteAllTransactions = async () => {
    try {
      const token = Cookies.get("authToken");
      const res = await axios.delete("http://192.168.1.5:8000/transactions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 202) {
        setTransactionsData([]);
        console.log("Successfully deleted transactions");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const deleteSpecificTransaction = async (transactionId) => {
    try {
      const token = Cookies.get("authToken");
      const res = await axios.delete(
        `http://192.168.1.5:8000/transactions/${transactionId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.status === 202) {
        setTransactionsData((prevTransactionsData) =>
          prevTransactionsData.filter(
            (transaction) => transaction.id !== transactionId
          )
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full flex flex-col">
      <div className="flex justify-between">
        <div className="flex gap-2 justify-center items-center">
          <div className="join">
            <button className="join-item btn">«</button>
            <button className="join-item btn">Last 30 Days</button>
            <button className="join-item btn">»</button>
          </div>
        </div>
        <div>
          <select className="select select-bordered w-full max-w-xs font-semibold">
            <option selected>Newest first</option>
            <option>Latest</option>
            <option>Custom</option>
          </select>
        </div>
      </div>
      <div className="flex flex-col gap-6 mt-4">
        <div className="bg-white px-6 py-2 rounded-lg">
          <div className="form-control">
            <label className="cursor-pointer flex gap-2 items-center justify-between">
              <div className="flex gap-2">
                <input type="checkbox" className="checkbox checkbox-primary" />
                <span className="label-text">Select all</span>
              </div>
              <button onClick={deleteAllTransactions}>Clear</button>
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {transactionsData.map((transaction) =>
            transaction.user_id === userId ? (
              <div key={transaction.id} className="flex flex-col gap-3">
                <div className="bg-white px-6 py-3 rounded-lg ">
                  <div className="form-control">
                    <label className="cursor-pointer flex gap-2 items-center justify-between">
                      <div className="flex gap-4 justify-center items-center">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-primary"
                        />
                        {categories.map((category) =>
                          category.id === transaction.category_id &&
                          category.user_id === transaction.user_id ? (
                            <div key={category.id}>
                              {category.category_image}
                            </div>
                          ) : null
                        )}
                        <div className="label-text flex flex-col text-xs">
                          {categories.map((category) =>
                            category.id === transaction.category_id ? (
                              <div className="text-base capitalize">
                                {category.name}
                              </div>
                            ) : null
                          )}
                          <p className="text-gray-500">
                            {transaction.transaction_time.slice(0, -3)}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-8 items-center">
                        <p
                          className={` ${
                            transaction.transaction_type === "EXP"
                              ? "text-red-500"
                              : "text-[#23E01F]"
                          } font-bold`}
                        >
                          {`${
                            transaction.transaction_type === "EXP" ? "-" : "+"
                          }`}
                          {transaction.amount}₮
                        </p>
                        <button
                          onClick={() =>
                            deleteSpecificTransaction(transaction.id)
                          }
                          className="btn p-1"
                        >
                          <DeleteIcon />
                        </button>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
};
