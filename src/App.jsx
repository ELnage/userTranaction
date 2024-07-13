import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css';
import Home from './components/Home/Home';
import { Toaster } from 'react-hot-toast';
const myClint = new QueryClient();
function App() {
  return <>
  <QueryClientProvider client={myClint}>
  <Home/>
    <Toaster   position="top-right"/>

  </QueryClientProvider>
  </>
}

export default App;
