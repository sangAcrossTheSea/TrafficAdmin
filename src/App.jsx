import { RouterProvider } from "react-router-dom";
import { router } from "./routes/index";
import initializeApp from "./app/init";

initializeApp();

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
