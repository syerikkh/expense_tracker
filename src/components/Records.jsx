import React, { useState } from "react";
import { AppIcon } from "./Icons/AppIcon";
import { Category } from "./Category";
import { PlusIcon } from "./Icons/PlusIcon";
import { RecordsPart2 } from "./RecordsPart2";
import Link from "next/link";
import { AddRecord } from "./AddRecord";
import { CategoryForm } from "./CategoryForm";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/router";

export const Records = ({ userData, transactions, categories }) => {
  const userId = userData[0].id;
  const [addRecords, setAddRecords] = useState(false);
  const [categoryForm, setCategoryForm] = useState(false);
  const [range, setRange] = useState(0);
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState(categories);
  const [transactionData, setTransactionData] = useState(transactions);
  const router = useRouter();

  const handleSignOut = () => {
    setLoading(true);
    Cookies.remove("authToken");
    setTimeout(() => {
      setLoading(false);
      router.push("/");
    }, 1500);
  };

  const clearAllCategories = async () => {
    const token = Cookies.get("authToken");
    try {
      const res = await axios.delete(
        "https://expense-tracker-backend-qlrz.onrender.com/categories",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 202) {
        setCategoryData([]);
        console.log("Successfully deleted");
      }
    } catch (error) {
      console.error("Error deleting all categories:", error);
    }
  };

  const deleteSpecificCategory = async (categoryId) => {
    try {
      const token = Cookies.get("authToken");
      const res = await axios.delete(
        `https://expense-tracker-backend-qlrz.onrender.com/categories/${categoryId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 202) {
        setCategoryData((prevCategories) =>
          prevCategories.filter((category) => category.id !== categoryId)
        );
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const addCategory = (newCategory) => {
    setCategoryData((prevCategories) => [...prevCategories, newCategory]);
  };

  const addTransaction = (newTransaction) => {
    setTransactionData((prevTransactions) => [
      ...prevTransactions,
      newTransaction,
    ]);
  };

  return (
    <>
      <div className="w-full min-h-screen pb-10 flex flex-col bg-gray-100">
        <div className="w-full px-4 lg:px-20 py-6 bg-white shadow-md">
          <div className="flex justify-between items-center">
            <div className="flex gap-4 lg:gap-6 items-center">
              <AppIcon />
              <Link href={`/dashboard/${userId}`}>
                <button className="text-blue-500 hover:underline">
                  Dashboard
                </button>
              </Link>
              <h1 className="font-semibold text-lg lg:text-xl">Records</h1>
            </div>
            <div className="flex items-center gap-2 lg:gap-4">
              <button
                onClick={() => setAddRecords(!addRecords)}
                className="p-2 lg:p-4 btn btn-primary text-white rounded-full"
              >
                + Record
              </button>
              {userData.map((user) => (
                <span key={user.id} className="capitalize">
                  {user.name}
                </span>
              ))}
              <button onClick={handleSignOut} className="btn btn-black">
                {loading ? "Signing out..." : "Sign out"}
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-4 px-4 lg:px-20 mt-9">
          <div className="py-6 px-3 flex flex-col gap-6 bg-white rounded-lg w-full lg:w-1/4 shadow-md">
            <h1 className="font-semibold text-lg lg:text-xl">Records</h1>
            <button
              onClick={() => setAddRecords(!addRecords)}
              className="btn btn-primary rounded-3xl flex gap-2 w-full h-8"
            >
              + Add
            </button>

            <input
              type="text"
              placeholder="Search"
              className="p-2 rounded-lg border"
            />
            <div>
              <p className="font-bold">Types</p>
            </div>
            <div>
              <div className="flex justify-between">
                <p className="font-bold">Category</p>
                <button onClick={clearAllCategories} className="text-gray-700">
                  Clear
                </button>
              </div>
              <div className="mt-4 flex flex-col gap-2">
                {categoryData.map((category) =>
                  category.user_id === userId ? (
                    <div
                      key={category.id}
                      className="flex justify-between items-center"
                    >
                      <Category text={category.name} />
                      <button
                        onClick={() => deleteSpecificCategory(category.id)}
                        className="bg-gray-400 p-1 rounded-full w-4 h-4 flex justify-center items-center text-white"
                      >
                        -
                      </button>
                    </div>
                  ) : null
                )}
              </div>
              <div>
                <button
                  onClick={() => setCategoryForm(!categoryForm)}
                  className="flex gap-2 justify-center items-center mt-2 text-blue-500 hover:underline"
                >
                  <PlusIcon />
                  Add Category
                </button>
              </div>
            </div>
            <div>
              <p className="font-bold">Amount Range</p>
              <div className="flex justify-between gap-2 w-full">
                <div className="p-4 bg-gray-100 mt-2 w-[114px] rounded-lg">
                  <p>0</p>
                </div>
                <div className="p-4 bg-gray-100 mt-2 w-[114px] rounded-lg flex justify-center items-center">
                  <p>{range}</p>
                </div>
              </div>
              <input
                value={range}
                onChange={(e) => setRange(e.target.value)}
                type="range"
                min={0}
                max="1000"
                className="range w-full range-primary mt-4"
              />
            </div>
          </div>

          <div className="w-full lg:w-3/4">
            <RecordsPart2
              userData={userData}
              transactions={transactionData}
              categories={categories}
            />
          </div>
        </div>
      </div>
      {addRecords && (
        <AddRecord categories={categories} addTransaction={addTransaction} />
      )}
      {categoryForm && <CategoryForm addCategory={addCategory} />}
    </>
  );
};
