import React from "react";
import ReactDOM from "react-dom";
import "./cssReset.css";
import "./index.css";
import App from "./components/App/App";
import registerServiceWorker from "./registerServiceWorker";
import { createStore } from "redux";
import reducer from "./redux/reducers/index";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
