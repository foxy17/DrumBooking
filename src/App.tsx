import { ToastContainer } from 'react-toastify';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import theme from 'theme';
// import Header from './components/Header';
import Router from './routes';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const queryClient = new QueryClient();
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Router />
        <ToastContainer position="bottom-center" theme="colored" pauseOnHover />
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
