import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import arEG from 'antd/locale/ar_EG';
import App from './App';
import './styles/global.css';
import 'antd/dist/reset.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
      <ConfigProvider 
        locale={arEG}
        direction="rtl"
        theme={{
          token: {
            colorPrimary: '#ff6b35',
            fontFamily: 'Cairo, sans-serif',
            borderRadius: 12,
          },
        }}
      >
        <App />
      </ConfigProvider>
  </React.StrictMode>
);