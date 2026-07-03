import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App.tsx';
import './index.css';

// Configure the QueryClient with robust default options for an offline-first architecture
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,           // Retry failed requests a couple of times before throwing
      staleTime: 5 * 60 * 1000, // Data remains "fresh" for 5 minutes (avoids over-fetching)
      refetchOnWindowFocus: true, // Auto-refresh when user comes back to the tab
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
,
)
