import { Records } from "@/components/Records";
import axios from "axios";
import cookies from "next-cookies";
import React from "react";

const UserRecords = ({ userData, transactions, categories }) => {
  return (
    <Records
      userData={userData}
      transactions={transactions}
      categories={categories}
    />
  );
};

export const getServerSideProps = async (context) => {
  const allCookies = cookies(context);
  const token = allCookies.authToken;

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const [profileRes, transactionsRes, categoriesRes] = await Promise.all([
    axios.get("https://expense-tracker-backend-qlrz.onrender.com/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    axios.get("https://expense-tracker-backend-qlrz.onrender.com/transactions"),
    axios.get("https://expense-tracker-backend-qlrz.onrender.com/categories"),
  ]);

  const userData = profileRes.data;
  const transactions = transactionsRes.data;
  const categories = categoriesRes.data;
  return {
    props: {
      userData,
      transactions,
      categories,
    },
  };
};

export default UserRecords;
