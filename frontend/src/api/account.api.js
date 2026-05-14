import api from "./axios";

export const getBalance = async () => {
    try {
        const response = await api.get("/accounts/balance");
        return response.data;
    } catch (error) {
        console.error("Error fetching balance:", error);
        throw error;
    }
};

// in this file we will add all the api calls related to account like balance, transactions etc. This will help us to keep our code organized and maintainable.