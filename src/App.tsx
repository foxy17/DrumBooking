import { ThemeProvider } from "@/components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router";
import { ToastContainer } from "react-toastify";
// import Header from './components/Header';
import { router } from "./routes";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const queryClient = new QueryClient();
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ToastContainer
          position="bottom-center"
          theme="colored"
          pauseOnHover={true}
        />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
