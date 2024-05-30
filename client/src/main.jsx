import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react'

import { StateContextProvider } from './context';

import { Sepolia } from '@thirdweb-dev/chains'
import App from './App';
import './index.css';
import ScrollToTop from './utils/ScrollToTop';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ThirdwebProvider
        clientId='76691636691ae12e487e74fc4699e2aa'
        activeChain={Sepolia}>
        <Router>
            <ScrollToTop>
                <StateContextProvider>
                    <App />
                </StateContextProvider>
            </ScrollToTop>
        </Router>

    </ThirdwebProvider >
)

