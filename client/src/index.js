import React from "react";
import ReactDOM from "react-dom";
import "./cssReset.css";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import { createStore, applyMiddleware } from "redux";
import reducer from "./redux/reducers/index";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App/App";
import thunk from "redux-thunk";

const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
