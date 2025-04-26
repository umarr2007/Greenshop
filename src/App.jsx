import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import MainLayout from "./layout/main-layout";
import Homepage from "./pages/homepage";
import Blogpage from "./pages/blog";
import ProfilePage from "./pages/profile";
import {
  AccountDetails,
  Address,
  MyProducts,
  TrackOrder,
  Wishlist,
} from "./components";
import NotFound from "./pages/not-found";
import PropTypes from "prop-types";

App.propTypes = {
  children: PropTypes.node.isRequired,
};

function App() {
  const isAuth = () => {
    return localStorage.getItem("user");
  };

  function ProtectedRoute({ children }) {
    if (isAuth()) {
      return children;
    } else {
      return <NotFound />;
    }
  }

  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Homepage />} />
        <Route path="blog" element={<Blogpage />} />
        <Route
          path="profile/"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={
              <ProtectedRoute>
                <AccountDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="my-products"
            element={
              <ProtectedRoute>
                <MyProducts />
              </ProtectedRoute>
            }
          />
          <Route
            path="address"
            element={
              <ProtectedRoute>
                <Address />
              </ProtectedRoute>
            }
          />
          <Route
            path="wishlist"
            element={
              <ProtectedRoute>
                <Wishlist />
              </ProtectedRoute>
            }
          />
          <Route
            path="track-order"
            element={
              <ProtectedRoute>
                <TrackOrder />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return (
    <GoogleOAuthProvider clientId="179859810498-1b2scmadrpf0d3hum6eip3r5giea9gnt.apps.googleusercontent.com">
      <RouterProvider router={routes} />
    </GoogleOAuthProvider>
  );
}

export default App;
