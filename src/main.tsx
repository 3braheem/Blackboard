import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './flexlayout_blackboard.css';

import App from './App.tsx'

console.log("Booting…"); // should print once on page load

const el = document.getElementById("root");
if (!el) throw new Error("Root element #root not found");

createRoot(el).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
