import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';
import RouterConfig from 'utils/router';
import InstallPWA from './components/InstallPWA';
import './index.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <RouterConfig />
        <Toaster />
        <InstallPWA />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
