import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/store";
import { setUser } from "./store/authSlice";
import { Toaster } from "react-hot-toast";
import { lazy, Suspense } from "react";
import { supabase } from "./supabaseClient";
import Loading from "./components/common/Loading";

const Home = lazy(() => import("./pages/Home"));
const Recipes = lazy(() => import("./pages/Recipes"));
const NewRecipe = lazy(() => import("./pages/NewRecipe"));
const RecipeDetails = lazy(() => import("./pages/RecipeDetails"));
const Contact = lazy(() => import("./pages/Contact"));
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
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

function RequireGuest({ children }) {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (isAuthenticated) {
    return <Navigate to="/recipes" replace />;
  }

  return children;
}

export default function App() {
  const dispatch = useDispatch();
  const [authReady, setAuthReady] = useState(false);

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
      } else {
        dispatch(setUser({ user: null, role: null }));
      }

      setAuthReady(true);

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

    initSession();

    return () => {
      isMounted = false;
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [dispatch]);

  if (!authReady) {
    return <Loading />;
  }

  return (
    <>
      <Toaster />
      <Suspense fallback={<Loading />}>
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
          <Route
            path="/login"
            element={
              <RequireGuest>
                <Login />
              </RequireGuest>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <RequireGuest>
                <ForgotPassword />
              </RequireGuest>
            }
          />
          <Route
            path="/reset-password"
            element={
              <RequireGuest>
                <ResetPassword />
              </RequireGuest>
            }
          />
          <Route
            path="/register"
            element={
              <RequireGuest>
                <Register />
              </RequireGuest>
            }
          />
          <Route
            path="/verify-email"
            element={
              <RequireGuest>
                <VerifyEmail />
              </RequireGuest>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>,
);
