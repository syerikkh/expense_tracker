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

export default UserRecords;
