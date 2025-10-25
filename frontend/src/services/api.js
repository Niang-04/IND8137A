const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const parkingAPI = {
  // Get all parking spots
  getAllParkingSpots: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/parking`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching parking spots:', error);
      throw error;
    }
  },

  // Get parking spot by ID
  getParkingSpotById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/parking/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching parking spot ${id}:`, error);
      throw error;
    }
  },

  // Get parking spots by area
  getParkingSpotsByArea: async (area) => {
    try {
      const response = await fetch(`${API_BASE_URL}/parking/area/${area}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching parking spots for area ${area}:`, error);
      throw error;
    }
  },

  // Get parking spots by type (public/private)
  getParkingSpotsByType: async (type) => {
    try {
      const response = await fetch(`${API_BASE_URL}/parking/type/${type}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching ${type} parking spots:`, error);
      throw error;
    }
  },

  // Health check
  checkHealth: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error checking API health:', error);
      throw error;
    }
  }
};
