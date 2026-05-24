import api from "./axios";

export const getStats = async () => {
    try {
        const response = await api.get("stats");
        return response.data;
    } catch (error) {
        throw error.response?.data || {
            message: error.message
        };
    }
}