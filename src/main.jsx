import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "modern-normalize";
import "./index.css";

import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store.js";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastContainerStyles } from "components/Toast/toastStyles.js";



import { walletAPI } from "./helpers/api.js";
// import { logoutThunk } from "./redux/auth/operations";

// walletAPI.interceptors.response.use(
//   response => response,
//   error => {
//     if (error.response?.status === 401) {
//       store.dispatch(logoutThunk());
//       window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <BrowserRouter
    future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
  >
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
      <ToastContainer style={toastContainerStyles} />
    </Provider>
  </BrowserRouter>
  // </React.StrictMode>
);
