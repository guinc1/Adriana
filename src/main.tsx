import "./styles.css";

import { ViteReactSSG } from "vite-react-ssg/single-page";

import { App } from "./App";

// Pré-renderiza o HTML no build (SSG) e hidrata no cliente.
export const createRoot = ViteReactSSG(<App />);
