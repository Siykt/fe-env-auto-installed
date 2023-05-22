import { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { GlobalStyle } from './styles/global';
import App from './pages/App';
import './samples/node-api';

export default function render() {
  const container = document.querySelector('#root');
  if (container) {
    const root = createRoot(container);
    root.render(
      <Suspense fallback={null}>
        <GlobalStyle />
        <App />
      </Suspense>
    );

    postMessage({ payload: 'removeLoading' }, '*');
  }
}
