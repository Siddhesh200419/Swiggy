import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import {Provider} from "react-redux";
import store from './utils/store.js';
import './index.css'
import App from './App.jsx'
import toast, { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <BrowserRouter>
    <StrictMode>
      <App />
      <Toaster/>
    </StrictMode>
  </BrowserRouter>
  </Provider>
)
