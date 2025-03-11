import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { QueryClient, QueryClientProvider,} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

const root = createRoot(document.getElementById('root'));
root.render(
<QueryClientProvider client = {queryClient}>
  <App/>
  <ReactQueryDevtools/>
</QueryClientProvider>
);
