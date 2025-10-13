// colors.js - Configuration centralisée des couleurs

export const COLORS = {
  // Couleurs principales
  primary: '#1890ff',
  success: '#52c41a',
  warning: '#faad14',
  error: '#ff4d4f',
  info: '#1890ff',

  // Nuances de gris
  gray: {
    dark: '#262626',
    medium: '#595959',
    light: '#8c8c8c',
    lighter: '#d9d9d9',
    lightest: '#f5f5f5',
  },

  // Backgrounds
  background: {
    white: '#ffffff',
    light: '#fafafa',
    gray: '#f5f5f5',
    dark: '#f0f0f0',
    border: '#e8e8e8',
  },

  // Couleurs de statut
  status: {
    pending: {
      color: '#faad14',
      bg: '#fffbe6',
      border: '#ffe58f',
    },
    approved: {
      color: '#52c41a',
      bg: '#f6ffed',
      border: '#b7eb8f',
    },
    rejected: {
      color: '#ff4d4f',
      bg: '#fff1f0',
      border: '#ffccc7',
    },
  },

  // Couleurs pour les badges/icônes
  badges: {
    blue: {
      icon: '#1890ff',
      bg: '#e6f7ff',
      bgAlt: '#f0f5ff',
      border: '#91d5ff',
    },
    green: {
      icon: '#52c41a',
      bg: '#f6ffed',
      border: '#d9f7be',
    },
    red: {
      icon: '#ff4d4f',
      bg: '#fff1f0',
      bgGradient: 'linear-gradient(135deg, #fff1f0 0%, #ffe7e7 100%)',
      border: '#ffccc7',
    },
    gray: {
      icon: '#8c8c8c',
      bg: '#fafafa',
      border: '#d9d9d9',
    },
  },

  // Gradients
  gradients: {
    purple: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    grayLight: 'linear-gradient(135deg, #f5f5f5 0%, #fafafa 100%)',
    grayHeader: 'linear-gradient(180deg, #fafafa 0%, #f5f5f5 100%)',
    redAlert: 'linear-gradient(135deg, #fff1f0 0%, #ffe7e7 100%)',
  },

  // Bordures
  borders: {
    light: '#f0f0f0',
    medium: '#e8e8e8',
    dark: '#d9d9d9',
    primary: '#1890ff',
  },

  // Ombres (box-shadow values)
  shadows: {
    small: '0 1px 2px rgba(0,0,0,0.03)',
    medium: '0 2px 8px rgba(0,0,0,0.1)',
    large: '0 4px 12px rgba(0,0,0,0.05)',
    card: '0 1px 2px rgba(0,0,0,0.03), 0 4px 12px rgba(0,0,0,0.05)',
    redAlert: '0 2px 8px rgba(255, 77, 79, 0.1)',
  },

  // Texte
  text: {
    primary: '#262626',
    secondary: '#595959',
    tertiary: '#8c8c8c',
    disabled: '#bfbfbf',
    white: '#ffffff',
  },
};

// Utilitaires pour créer des styles facilement
export const createBadgeStyle = (colorKey) => ({
  icon: COLORS.badges[colorKey].icon,
  bg: COLORS.badges[colorKey].bg,
  border: COLORS.badges[colorKey].border,
});

export const createStatusStyle = (status) => ({
  color: COLORS.status[status].color,
  bg: COLORS.status[status].bg,
  border: COLORS.status[status].border,
});

// Export par défaut pour import simple
export default COLORS;