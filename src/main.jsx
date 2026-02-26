import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/store";
import { setUser } from "./store/authSlice";
import { Toaster } from "react-hot-toast";
import { lazy, Suspense } from "react";
import { supabase } from "./supabaseClient";

const Home = lazy(() => import("./pages/Home"));
const Recipes = lazy(() => import("./pages/Recipes"));
const NewRecipe = lazy(() => import("./pages/NewRecipe"));
const RecipeDetails = lazy(() => import("./pages/RecipeDetails"));
const Contact = lazy(() => import("./pages/Contact"));
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/Register"));
const VerifyEmail = lazy(() => import("./pages/auth/VerifyEmail"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/auth/ResetPassword"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Layout = lazy(() => import("./layout/Layout"));

function RequireAdmin({ children }) {
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  if (!isAuthenticated || role !== "admin") {
    return <Navigate to="/recipes" replace />;
  }

  return children;
}

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;
    let unsubscribe = null;

    const initSession = async () => {
      if (!isMounted) {
        return;
      }

      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", session.user.id)
          .single();

        dispatch(setUser({ user: session.user, role: profile?.role }));
      }

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
        if (currentSession) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", currentSession.user.id)
            .single();
          dispatch(setUser({ user: currentSession.user, role: profile?.role }));
        } else {
          dispatch(setUser({ user: null, role: null }));
        }
      });

      unsubscribe = () => subscription.unsubscribe();
    };

    let scheduleId = null;
    if ("requestIdleCallback" in window) {
      scheduleId = window.requestIdleCallback(initSession, { timeout: 1500 });
    } else {
      scheduleId = window.setTimeout(initSession, 0);
    }

    return () => {
      isMounted = false;
      if (unsubscribe) {
        unsubscribe();
      }
      if (scheduleId !== null) {
        if ("cancelIdleCallback" in window) {
          window.cancelIdleCallback(scheduleId);
        } else {
          clearTimeout(scheduleId);
        }
      }
    };
  }, [dispatch]);

  return (
    <>
      <Toaster />
      <Suspense
        fallback={
          <div className="loading-screen">Flavorly is heating up...</div>
        }
      >
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route
              path="/recipes/new"
              element={
                <RequireAdmin>
                  <NewRecipe />
                </RequireAdmin>
              }
            />
            <Route path="/recipes/:id" element={<RecipeDetails />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>,
);
