// RecordContext.js
import { createContext, useState } from "react";

export const RecordContext = createContext();

export const RecordProvider = ({ children }) => {
  const [records, setRecords] = useState([]);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const addRecord = (newAmount, newCategory, newDate, newTime) => {
    const newRecord = {
      amount: newAmount,
      category: newCategory,
      date: newDate,
      time: newTime,
    };

    setRecords([...records, newRecord]);

    setAmount("");
    setCategory("");
    setDate("");
    setTime("");
  };

  return (
    <RecordContext.Provider
      value={{
        records,
        setRecords,
        amount,
        setAmount,
        category,
        setCategory,
        date,
        setDate,
        time,
        setTime,
        addRecord,
      }}
    >
      {children}
    </RecordContext.Provider>
  );
};
