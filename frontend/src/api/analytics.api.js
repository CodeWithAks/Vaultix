import api from "./axios";

export const getMonthlyAnalytics = async () => {
    try{
        const response = await api.get("/analytics/monthly-spending");
        return response.data.analytics;
    } catch (error) {
        console.error("Error fetching monthly analytics:", error);
        throw error.response?.data || error.message || "An error occurred while fetching monthly analytics.";
    }
}
