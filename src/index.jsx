import { createRoot } from "react-dom/client";
import { MainView } from "./components/main-view/main-view";
import { Container } from "react-bootstrap";
import { store } from "./redux/store";
import { Provider } from "react-redux";

import "./index.scss";

const MyFlixApp = () => {
  return <MainView />;
};

const container = document.querySelector("#root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <Container fluid>
      <MyFlixApp />
    </Container>
  </Provider>
);
