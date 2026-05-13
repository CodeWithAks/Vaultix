import api from "./axios";

export const registerUser = async(data) => { 
    try {
        const response = await api.post("/auth/register", data); 
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: error.message };
    }
};

export const loginUser = async(data) => {
    try {
        const response = await api.post("/auth/login", data);   
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: error.message };
    }
};

export const logoutUser = async() => {
    try {
        const response = await api.post("/auth/logout"); // No data needed for logout
        return response.data; // Return response data if needed
    } catch (error) {
        throw error.response?.data || { message: error.message };
    }
};