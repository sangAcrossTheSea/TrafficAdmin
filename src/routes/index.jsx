import { lazy } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
const RootPage = lazy(() => import("../pages/RootPage"));
const NotFound = lazy(() => import("../pages/NotFound"));
const Home = lazy(() => import("../pages/admin/Home"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const ForgotPassword = lazy(() => import("../pages/ForgotPassword"));
const Layout = lazy(() => import("../containers/Layout"));
const Blank = lazy(() => import("../pages/admin/Blank"));
const Decree = lazy(() => import("../pages/admin/Decree"));

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootPage />}>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/blank" element={<Blank />} />
        <Route path="/decree" element={<Decree />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export default router;
