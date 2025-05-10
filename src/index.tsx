import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.css'
import './test.scss'
import './styles.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    {/* <div className='test'>test</div>
    <div className="card">
      <h1 className="title">Hello, Tailwind!</h1>
      <button className="button">Click Me</button>
    </div> */}
    <App />
  </React.StrictMode>
);

