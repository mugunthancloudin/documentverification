import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'

import { WagmiConfig } from 'wagmi'
import { polygonMumbai,sepolia } from 'wagmi/chains'
import ConnectButton from './App';

// 1. Get projectId
const projectId = '81897227d6796cb9c8b7c6709c2d670e'

// 2. Create wagmiConfig
const chains = [sepolia]
const wagmiConfig = defaultWagmiConfig({ chains, projectId, appName: 'Web3Modal' })

// 3. Create modal
createWeb3Modal({ wagmiConfig, projectId, chains })

const root = ReactDOM.createRoot(document.getElementById('root'));

  
root.render(
  <React.StrictMode>
    <WagmiConfig config={wagmiConfig}>
    <App />
    </WagmiConfig>
  </React.StrictMode>
)

