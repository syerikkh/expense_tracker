import { Dashboard } from "@/components/Dashboard";
import React from "react";
import axios from "axios";
import cookies from "next-cookies";

const UserDashboard = ({ userData, transactions, categories }) => {
  return (
    <div>
      <Dashboard
        userData={userData}
        transactions={transactions}
        categories={categories}
      />
    </div>
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
    axios.get("http://192.168.1.5:8000/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    axios.get("http://192.168.1.5:8000/transactions"),
    axios.get("http://192.168.1.5:8000/categories"),
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

export default UserDashboard;
