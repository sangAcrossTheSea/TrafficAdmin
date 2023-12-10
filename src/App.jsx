import { RouterProvider } from "react-router-dom";
import { router } from "./routes/index";
import initializeApp from "./app/init";

const App = () => {
  initializeApp();

  return <RouterProvider router={router} />;
};

export default App;
