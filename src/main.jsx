import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Container } from "react-bootstrap";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Container>
      <App />
    </Container>
  </StrictMode>
);
