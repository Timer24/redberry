import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { QueryClient, QueryClientProvider,} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter } from 'react-router';
import './App.css'

const queryClient = new QueryClient();

const root = createRoot(document.getElementById('root'));
root.render(
<BrowserRouter>
  <QueryClientProvider client = {queryClient}>
    <App/>
    <ReactQueryDevtools/>
  </QueryClientProvider>
</BrowserRouter>
);
