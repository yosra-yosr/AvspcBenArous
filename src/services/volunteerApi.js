// src/services/volunteerApi.js
import axios from 'axios';

// Configuration de base de l'API
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://avspcbenarous-api.netlify.app/api';

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
  },
  
  /**
   * Vérifier si la session d'inscription est active.
   * Consomme l'API GET /sessions/active
   * @returns {Promise<Object>} Un objet avec la clé 'active' (boolean)
   */
  checkActiveSession: async () => {
    try {
      const response = await api.get('/sessions/active');
      console.log(response.data)
      return response.data; // Doit retourner { active: true } ou { active: false }
    } catch (error) {
      // En cas d'erreur réseau ou serveur, on suppose que la session est inactive par sécurité.
      console.error('Erreur lors de la vérification de la session active:', error);
      // Retourne un état inactif par défaut en cas d'échec de la connexion.
      return { active: false };
    }
  }
};

export default volunteerApi;