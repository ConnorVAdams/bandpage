import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from "react-router-dom";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import { persistor, store } from './app/store';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <Provider store={store}>
        <Router>
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </Router>
    </Provider>
    );
