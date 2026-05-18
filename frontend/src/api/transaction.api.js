import api from "./axios";

/**
 * Fetches all transactions from the backend API.
 */
export const getTransactions = async () => {
    try {
        const response = await api.get("/transactions"); 
        return response.data;
    } catch(error) {
        console.error("Error fetching transactions:", error);
        throw error;
    }
}

/**
 * Creates a new transaction by sending a POST request to the backend API.
 */
export const createTransaction = async(data) => {
    try{
        const res = await api.post("/transactions",data); 
        return res.data; 
    } catch(error) {
        console.error("Error creating transaction:", error);
        throw error.response?.data || error.message || "An error occurred while creating the transaction.";
    }
}