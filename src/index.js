import React from 'react';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import ReactDOM from 'react-dom/client';
import MainRouter from './routes/MainRouter';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <MainRouter/>
    </React.StrictMode>
);
