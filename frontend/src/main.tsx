import App from './App';
import {createRoot} from 'react-dom/client';
import {CssBaseline, ThemeProvider} from '@mui/material';
import {Provider} from 'react-redux';
import {ToastContainer} from 'react-toastify';
import theme from './theme';
import 'react-toastify/dist/ReactToastify.css';
import {store} from './app/store';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ToastContainer position="bottom-right" theme="light" autoClose={3000}/>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <App/>
    </ThemeProvider>
  </Provider>
);