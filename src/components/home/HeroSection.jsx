import { Button, Typography } from 'antd';
import { UserAddOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import React from 'react'; // Ajouté pour une bonne pratique, bien que souvent implicite

const { Title, Paragraph } = Typography;

const HeroSection = () => {
  return (
    <div
      style={{
        // 1. Ambiance de l'arrière-plan améliorée
        // Augmentation de l'opacité du dégradé pour un meilleur contraste avec le texte blanc
        background: 'linear-gradient(135deg, rgba(26, 32, 44, 0.7) 0%, rgba(13, 17, 23, 0.95) 100%), url("assets/images/avspc_team.jpg") center/cover',
        backgroundAttachment: 'fixed',
        color: 'white',
        padding: '120px 40px 80px',
        textAlign: 'center',
        marginTop: '70px',
        minHeight: '450px', // Assurer une hauteur minimale pour l'effet Hero
        display: 'flex',
        alignItems: 'center', // Centrage vertical du contenu
      }}
    >
      {/* 2. Ajout d'une animation subtile au conteneur principal si nécessaire (via CSS externe par exemple) */}
      <div style={{ maxWidth: '900px', margin: '0 auto', width: '100%' }}>
        <Title
          level={1}
          style={{
            color: 'white',
            // Augmentation de la taille pour un impact maximal
            fontSize: 'clamp(2.2rem, 6vw, 3.5rem)', 
            fontWeight: 800, // Plus gras
            marginBottom: '10px',
            textShadow: '3px 3px 6px rgba(0,0,0,0.4)', // Ombre plus prononcée
            letterSpacing: '1px' // Espacement des lettres pour une meilleure lisibilité
          }}
        >
          مرحباً بكم في جمعية متطوعون في خدمة الحماية المدنية ببن عروس
        </Title>

        {/* 3. Slogan mis en valeur */}
        <Paragraph
          style={{
            // Utiliser une couleur vive (comme le orange principal) pour le slogan
            color: '#ff8c42', 
            // Augmentation de la taille de la police
            fontSize: 'clamp(1.5rem, 3.5vw, 2rem)', 
            fontWeight: 700, // Plus gras
            // Mettre en italique ou ajouter une bordure pour le distinguer
            fontStyle: 'italic', 
            marginBottom: '50px', // Plus d'espace avant les boutons
            lineHeight: 1.5,
            padding: '10px 20px',
            background: 'rgba(0, 0, 0, 0.3)', // Léger arrière-plan pour le contraste
            borderRadius: '5px',
            // Ajout d'une ombre portée pour le faire ressortir comme un élément clé
            boxShadow: '0 0 15px rgba(255, 140, 66, 0.5)' 
          }}
        >
          متطوّع اليوم ... منقذ الغد </Paragraph>

        {/* 4. Boutons améliorés (CTA) */}
        <div style={{ display: 'flex', gap: '30px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/register">
            <Button
              type="primary"
              size="large"
              icon={<UserAddOutlined />}
              style={{
                // Dégradé de couleur plus agressif et chaleureux
                background: 'linear-gradient(45deg, #ff4c1a, #ff8c42)', 
                border: 'none',
                height: 'auto',
                padding: '18px 36px', // Augmentation de la taille du padding
                fontSize: '18px', // Augmentation de la taille de la police
                fontWeight: 700, // Plus gras
                borderRadius: '8px', // Bords légèrement plus arrondis
                // Ombre portée plus visible pour attirer l'œil
                boxShadow: '0 8px 25px rgba(255, 76, 26, 0.5)', 
                transition: 'all 0.3s ease', // Ajout d'une transition
                transform: 'scale(1.05)' // Suggestion: Ajouter un pseudo-élément CSS pour le `hover`
              }}
              // Vous pouvez ajouter des props onClick ou onMouseEnter/Leave ici si vous utilisez Ant Design directement sans Link
            >
              انضم كمتطوع
            </Button>
          </Link>
          <Link to="/goals">
            <Button
              size="large"
              icon={<InfoCircleOutlined />}
              style={{
                background: 'rgba(255,255,255,0.15)', // Légère augmentation de l'opacité
                color: 'white',
                border: '2px solid rgba(255,255,255,0.4)', // Bordure plus visible
                backdropFilter: 'blur(12px)', // Flou plus prononcé
                height: 'auto',
                padding: '18px 36px',
                fontSize: '18px',
                fontWeight: 600,
                borderRadius: '8px',
                // Ombre portée subtile pour le rendre 3D
                boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
              }}
            >
              تعرف على أهدافنا
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;