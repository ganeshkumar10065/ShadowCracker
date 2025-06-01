import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

export const calculatePrice = async (userData) => {
    if (!userData || !userData.username) return null;

    try {
        const response = await axios.get(`${API_BASE_URL}/payment/get-price/${userData.username}`);
        if (response.data.success) {
            return response.data.data;
        }
        return null;
    } catch (error) {
        console.error('Error calculating price:', error);
        return null;
    }
};

export const storeSearchData = async (username, userData) => {
    try {
        const response = await fetch('http://localhost:3001/api/payment/store-search-data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, userData })
        });
        const result = await response.json();
        return result;
    } catch (error) {
        return { success: false, message: error.message };
    }
}; 