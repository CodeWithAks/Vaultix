import api from "./axios";

export const getTransactions = async () => {
    try {
        const response = await api.get("/transactions");
        return response.data;
    } catch(error) {
        console.error("Error fetching transactions:", error);
        throw error;
    }
}