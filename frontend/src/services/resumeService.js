import { api } from '../utils/api';
import { API_ENDPOINTS } from '../constants';

export const resumeService = {
  uploadResume: async (formData) => {
    try {
      const response = await api.post(API_ENDPOINTS.RESUME.UPLOAD, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  analyzeResume: async (resumeId) => {
    try {
      const response = await api.get(`${API_ENDPOINTS.RESUME.ANALYZE}/${resumeId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  getResumes: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.RESUME.LIST);
      return response;
    } catch (error) {
      throw error;
    }
  },

  deleteResume: async (resumeId) => {
    try {
      const response = await api.delete(`${API_ENDPOINTS.RESUME.DELETE}/${resumeId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default resumeService;
