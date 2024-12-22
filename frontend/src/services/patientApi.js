import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

export const patientApi = {
  getPatients: async (params) => {
    try {
      const response = await api.get('/doctor/patients', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching patients:', error);
      throw error;
    }
  },

  getPatientDetails: async (id) => {
    const response = await api.get(`/doctor/patients/${id}`);
    return response.data;
  },

  createPatient: async (data) => {
    const response = await api.post('/doctor/patients', data);
    return response.data;
  },

  updatePatient: async (id, data) => {
    const response = await api.put(`/doctor/patients/${id}`, data);
    return response.data;
  },
};

export default patientApi;
