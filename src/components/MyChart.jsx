import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, DoughnutController, ArcElement, Title, Tooltip, Legend } from 'chart.js'
import axios from 'axios';
import { useRouter } from 'next/router';

Chart.register(DoughnutController, CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend);

export const MyChart = () => {
    const router = useRouter();
    const { userId } = router.query;
    const [categories, setCategories] = useState([]);
    const [transactions, setTransactions] = useState([]);

    const fetchCategoriesData = async () => {
        try {
            const token = localStorage.getItem("authToken");
            const res = await axios.get("http://localhost:8000/categories", {
                headers: { "Authorization": `Bearer ${token}` }
            });
            setCategories(res.data);
        } catch (error) {
            console.log("token not found");
        }
    };

    const fetchTransactionsData = async () => {
        try {
            const token = localStorage.getItem("authToken");
            const res = await axios.get("http://localhost:8000/transactions", {
                headers: { "Authorization": `Bearer ${token}` }
            });
            setTransactions(res.data);
        } catch (error) {
            console.log("token not found");
        }
    }

    useEffect(() => {
        fetchCategoriesData();
        fetchTransactionsData();
    }, []);

    const userCategories = categories.filter(category => category.user_id === userId);
    const userTransactions = transactions.filter(transaction => transaction.user_id === userId);

    const groupedTransactions = userCategories.map(category => {
        const categoryTransactions = userTransactions.filter(transaction => transaction.category_id === category.id);
        return {
            name: category.name,
            totalAmount: categoryTransactions.reduce((total, transaction) => total + transaction.amount, 0)
        };
    });

    const randomColorGenerator = () => {
        return 'rgb(' +
            Math.floor(Math.random() * 256) + ', ' +
            Math.floor(Math.random() * 256) + ', ' +
            Math.floor(Math.random() * 256) + ')';
    };

    const data = {
        labels: groupedTransactions.map(category => category.name),
        datasets: [{
            label: 'Expense',
            data: groupedTransactions.map(transaction => transaction.totalAmount),
            backgroundColor: groupedTransactions.map(() => randomColorGenerator()),
            hoverOffset: 4
        }]
    };

    const config = {
        type: 'doughnut',
        data: data,
    };

    return <Doughnut {...config} />;
};