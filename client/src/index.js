import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ContextProvider from './context/context';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux'
import store from './features/store';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ContextProvider>
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </Provider>
  </ContextProvider>
);