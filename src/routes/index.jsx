import { lazy } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
const RootPage = lazy(() => import("../pages/RootPage"));
const NotFound = lazy(() => import("../pages/NotFound"));
// const Home = lazy(() => import("../pages/admin/Home"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const ForgotPassword = lazy(() => import("../pages/ForgotPassword"));
const Layout = lazy(() => import("../containers/Layout"));
const Blank = lazy(() => import("../pages/admin/Blank"));
const Decree = lazy(() => import("../pages/admin/Decree"));
const DecreeDetail = lazy(() => import("../pages/admin/DecreeDetail"));
const ArticleDetail = lazy(() => import("../pages/admin/ArticleDetail"));
const Fine = lazy(() => import("../pages/admin/Fine"));
const FineType = lazy(() => import("../pages/admin/FineType"));
const Sign = lazy(() => import("../pages/admin/Sign"));
const SignType = lazy(() => import("../pages/admin/SignType"));
const Question = lazy(() => import("../pages/admin/Question"));
const New = lazy(() => import("../pages/admin/New"));
const NewContent = lazy(() => import("../pages/admin/NewContent"));
const Exam = lazy(() => import("../pages/admin/Exam"));
const ExamDetail = lazy(() => import("../pages/admin/ExamDetail"));

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootPage />}>
      <Route path="/" element={<Layout />}>
        {/* <Route path="/" element={<Home />} /> */}
        <Route index element={<Decree />} />
        <Route path="blank" element={<Blank />} />
        <Route path="decree" element={<Decree />} />
        <Route path="decree/:decreeId" element={<DecreeDetail />} />
        <Route path="article/:articleId" element={<ArticleDetail />} />
        <Route path="fine" element={<Fine />} />
        <Route path="fine-type" element={<FineType />} />
        <Route path="sign" element={<Sign />} />
        <Route path="sign-type" element={<SignType />} />
        <Route path="question" element={<Question />} />
        <Route path="news" element={<New />} />
        <Route path="new/:id" element={<NewContent />} />
        <Route path="exam" element={<Exam />} />
        <Route
          path="exam/:examName/:examId/:licenseId"
          element={<ExamDetail />}
        />
      </Route>

      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="forgot-password" element={<ForgotPassword />} />

      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export default router;
