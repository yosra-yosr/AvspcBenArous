// src/services/volunteerApi.js
import axios from 'axios';

// Configuration de base de l'API
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

// Créer une instance axios avec configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000 // 10 secondes
});

// Intercepteur pour gérer les erreurs globalement
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Erreur venant du serveur
      console.error('API Error Response:', error.response.data);
    } else if (error.request) {
      // Pas de réponse du serveur
      console.error('API No Response:', error.request);
    } else {
      // Erreur lors de la configuration de la requête
      console.error('API Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// Service pour les volontaires
const volunteerApi = {
  /**
   * Créer un nouveau volontaire
   * @param {Object} volunteerData - Données du volontaire
   * @returns {Promise} Réponse de l'API
   */
  create: async (volunteerData) => {
    try {
      const response = await api.post('/volunteers', volunteerData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Obtenir tous les volontaires
   * @param {Object} params - Paramètres de pagination et filtres
   * @returns {Promise} Liste des volontaires
   */
  getAll: async (params = {}) => {
    try {
      const response = await api.get('/volunteers', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Obtenir un volontaire par ID
   * @param {string} id - ID du volontaire
   * @returns {Promise} Données du volontaire
   */
  getById: async (id) => {
    try {
      const response = await api.get(`/volunteers/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Mettre à jour le statut d'un volontaire
   * @param {string} id - ID du volontaire
   * @param {string} status - Nouveau statut
   * @param {string} rejectionReason - Raison du rejet (optionnel)
   * @returns {Promise} Volontaire mis à jour
   */
  updateStatus: async (id, status, rejectionReason = null) => {
    try {
      const response = await api.patch(`/volunteers/${id}/status`, {
        status,
        rejectionReason
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Mettre à jour l'état d'un volontaire
   * @param {string} id - ID du volontaire
   * @param {string} etat - Nouvel état
   * @returns {Promise} Volontaire mis à jour
   */
  updateEtat: async (id, etat) => {
    try {
      const response = await api.patch(`/volunteers/${id}/etat`, { etat });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Supprimer un volontaire
   * @param {string} id - ID du volontaire
   * @returns {Promise} Confirmation de suppression
   */
  delete: async (id) => {
    try {
      const response = await api.delete(`/volunteers/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Vérifier le résultat d'un volontaire
   * @param {string} idNumber - Numéro de carte d'identité
   * @param {string} dob - Date de naissance (format YYYY-MM-DD)
   * @returns {Promise} Résultat de la vérification
   */
  checkResult: async (idNumber, dob) => {
    try {
      const response = await api.post('/volunteers/check-result', {
        idNumber,
        dob
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default volunteerApi;