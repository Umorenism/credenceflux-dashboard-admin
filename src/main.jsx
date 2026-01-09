import React from 'react';
import { StyleProvider } from '@ant-design/cssinjs';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import 'antd/dist/reset.css'; // Ant Design v5+ CSS (imported first)
import './index.css'; // Tailwind/daisyUI CSS (imported after Ant Design)
import { GoogleOAuthProvider } from '@react-oauth/google';



const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <StyleProvider hashPriority="high">
        <BrowserRouter>
        <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
        <App />
        </GoogleOAuthProvider>
        
        </BrowserRouter>
      </StyleProvider>
    </React.StrictMode>
  );
}