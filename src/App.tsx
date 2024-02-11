import { ToastContainer } from 'react-toastify';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import Header from './components/Header';
import Router from './routes';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const queryClient = new QueryClient();
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <Router />
        <ToastContainer />
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
