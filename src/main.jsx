import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { store } from "./app/store";
import { Provider } from "react-redux";
import SuspenseContent from "./containers/SuspenseContent";
import "./index.css";
// import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    {/* <PersistGate loading={null} persistor={persistor}> */}
    <Suspense fallback={<SuspenseContent />}>
      <App />
    </Suspense>
    {/* </PersistGate> */}
  </Provider>
);
