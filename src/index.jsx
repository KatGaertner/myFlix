import { createRoot } from "react-dom/client";
import { MainView } from "./components/main-view/main-view";
import { Container } from "react-bootstrap";

import "./index.scss";

const MyFlixApp = () => {
  return <MainView />;
};

const container = document.querySelector("#root");
const root = createRoot(container);

root.render(
  <Container>
    <MyFlixApp />
  </Container>
);
