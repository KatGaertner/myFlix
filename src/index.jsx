import { createRoot } from 'react-dom/client';
import "./index.scss";

const MyFlixApp = () => {
  return (
    <div className="my-flix">
      <div>Hello World</div>
    </div>
  );
};

const container = document.querySelector("#root");
const root = createRoot(container);

root.render(<MyFlixApp />);