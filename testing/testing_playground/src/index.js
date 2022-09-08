import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));

const fixedNotes = [{ content: 'im learning', id: 0 }, { id: 1, content: 'im having fun, i fucking love this' }]
root.render(
  <React.StrictMode>
    <App notes={fixedNotes} />
  </React.StrictMode>
);
