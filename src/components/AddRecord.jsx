import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { CategoryForm } from "./CategoryForm";

export const AddRecord = ({ categories, addTransaction }) => {
  const [name, setName] = useState("");
  const [localAmount, setLocalAmount] = useState("");
  const [toggleExpense, setToggleExpense] = useState(false);
  const [description, setDescription] = useState("");
  const [localDate, setLocalDate] = useState("");
  const [localTime, setLocalTime] = useState("");
  const [localCategory, setLocalCategory] = useState("");
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [closeForm, setCloseForm] = useState(false);

  const router = useRouter();
  const { userId } = router.query;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = Cookies.get("authToken");
      const res = await axios.post(
        `https://expense-tracker-backend-qlrz.onrender.com/transactions?user_id=${userId}`,
        {
          user_id: userId,
          name,
          amount: localAmount,
          transaction_type: toggleExpense ? "INC" : "EXP",
          description,
          date: localDate,
          time: localTime,
          category_id: localCategory,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      addTransaction({
        user_id: userId,
        name,
        amount: localAmount,
        transaction_type: toggleExpense ? "INC" : "EXP",
        description,
        date: localDate,
        time: localTime,
        category_id: localCategory,
      });
      setCloseForm(true);
      console.log("Transaction added successfully");
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ${
        closeForm && "hidden"
      }`}
    >
      <div className="bg-white rounded-lg w-[90%] max-w-[792px] p-6 relative">
        <div className="flex justify-between items-center border-b pb-3">
          <h1 className="font-bold text-lg">Add Record</h1>
          <button
            onClick={() => setCloseForm(true)}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.5459 17.954C19.7572 18.1653 19.876 18.452 19.876 18.7509C19.876 19.0497 19.7572 19.3364 19.5459 19.5477C19.3346 19.7591 19.0479 19.8778 18.749 19.8778C18.4501 19.8778 18.1635 19.7591 17.9521 19.5477L12 13.5937L6.0459 19.5459C5.83455 19.7572 5.54791 19.8759 5.24902 19.8759C4.95014 19.8759 4.66349 19.7572 4.45215 19.5459C4.2408 19.3345 4.12207 19.0479 4.12207 18.749C4.12207 18.4501 4.2408 18.1635 4.45215 17.9521L10.4062 11.9999L4.45402 6.04586C4.24268 5.83451 4.12395 5.54787 4.12395 5.24898C4.12395 4.9501 4.24268 4.66345 4.45402 4.45211C4.66537 4.24076 4.95201 4.12203 5.2509 4.12203C5.54978 4.12203 5.83643 4.24076 6.04777 4.45211L12 10.4062L17.954 4.45117C18.1654 4.23983 18.452 4.12109 18.7509 4.12109C19.0498 4.12109 19.3364 4.23983 19.5478 4.45117C19.7591 4.66251 19.8778 4.94916 19.8778 5.24804C19.8778 5.54693 19.7591 5.83358 19.5478 6.04492L13.5937 11.9999L19.5459 17.954Z"
                fill="#0F172A"
              />
            </svg>
          </button>
        </div>
        <form
          onSubmit={handleSubmit}
          className="mt-4 flex flex-col lg:flex-row"
        >
          <div className="w-full lg:w-1/2 lg:pr-4">
            <div className="flex flex-col gap-5">
              <div className="bg-[#F3F4F6] rounded-3xl flex">
                <button
                  type="button"
                  onClick={() => setToggleExpense(false)}
                  className={`btn shadow-none rounded-3xl w-1/2 ${
                    !toggleExpense
                      ? "bg-primary text-white"
                      : "bg-[#F3F4F6] text-black"
                  }`}
                >
                  Expense
                </button>
                <button
                  type="button"
                  onClick={() => setToggleExpense(true)}
                  className={`btn shadow-none rounded-3xl w-1/2 ${
                    toggleExpense
                      ? "bg-[#16A34A] text-white"
                      : "bg-[#F3F4F6] text-black"
                  }`}
                >
                  Income
                </button>
              </div>
              <div className="flex flex-col gap-2">
                <div className="bg-[#F3F4F6] p-3 flex flex-col rounded-lg border">
                  <label htmlFor="amount">Amount</label>
                  <input
                    value={localAmount}
                    onChange={(e) => setLocalAmount(e.target.value)}
                    type="number"
                    placeholder="₮ 000.00"
                    className="bg-[#F3F4F6] p-2 rounded-lg"
                  />
                </div>
                <div>
                  <label htmlFor="category">Category</label>
                  <select
                    value={localCategory}
                    onChange={(e) => {
                      if (e.target.value === "add") {
                        setShowCategoryForm(true);
                      } else {
                        setLocalCategory(e.target.value);
                      }
                    }}
                    className="select select-bordered w-full mt-1 text-[#94A3B8]"
                  >
                    <option hidden>
                      {toggleExpense ? "Find or choose category" : "Choose"}
                    </option>
                    {categories.map((category) =>
                      category.user_id === userId ? (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ) : null
                    )}
                    <option value="add">Add new category</option>
                  </select>
                  {showCategoryForm && <CategoryForm />}
                </div>
                <div className="flex gap-2">
                  <div className="flex flex-col w-1/2">
                    <label htmlFor="date">Date</label>
                    <input
                      value={localDate}
                      onChange={(e) => setLocalDate(e.target.value)}
                      type="date"
                      className="border p-2 rounded-lg"
                    />
                  </div>
                  <div className="flex flex-col w-1/2">
                    <label htmlFor="time">Time</label>
                    <input
                      value={localTime}
                      onChange={(e) => setLocalTime(e.target.value)}
                      type="time"
                      className="border p-2 rounded-lg"
                    />
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className={`btn btn-primary shadow-none border-none rounded-3xl w-full mt-2 ${
                  toggleExpense && "bg-[#16A34A] hover:bg-[#16A34A]"
                }`}
              >
                Add Record
              </button>
            </div>
          </div>
          <div className="w-full lg:w-1/2 lg:pl-4 flex flex-col gap-8 mt-4 lg:mt-0">
            <div className="flex flex-col">
              <label htmlFor="payee">Payee</label>
              <input
                type="text"
                className="border p-2 rounded-lg mt-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Write here"
              />
            </div>
            <div className="flex flex-col h-full gap-1">
              <label htmlFor="note">Note</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write here"
                className="bg-[#F3F4F6] p-4 h-full rounded-lg border"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
