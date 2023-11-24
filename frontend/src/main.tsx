import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import { CookiesProvider } from 'react-cookie';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<CookiesProvider defaultSetOptions={{ path: '/'}}>
			<App />
			</CookiesProvider>
		</Provider>
	</React.StrictMode>
);
