import { render } from "preact";
import { MantineProvider, Box } from "@mantine/core";
import { LocationProvider, Router, Route } from "preact-iso";
import { QueryClientProvider } from "@tanstack/react-query";
import { Notifications } from "@mantine/notifications";

import { queryClient } from "./api/instance.js";
import { AuthProvider } from "../utils/auth-manager.js";
import { AdminRoute, ProtectedRoute } from "./components/route.js";
import { Header } from "./components/navs/Header.js";
import { Footer } from "./components/navs/Footer.js";
import { ErrorBoundary } from "./components/errBoundary/errorBoundary.component.js";
import { NotFound } from "./pages/_404.jsx";
import { Register } from "./pages/Auth/register.js";
import { Login } from "./pages/Auth/login.js";
import { Terms } from "./pages/terms.js";
import { Info } from "./pages/info.js";
import { Tickets } from "./pages/Tickets/index.js";
import { Events } from "./pages/Events/index.js";
import { EventId } from "./pages/Event_Id/index.js";
import { Manage } from "./pages/Manage/index.js";

import { theme } from "../styles/theme.js";
import "../styles/global.scss";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LocationProvider>
          <MantineProvider theme={theme}>
            <ErrorBoundary>
              <Notifications />
              <Header />
              <Box bg="white" component="main" px="xl">
                <Router>
                  <Route path="/register" component={Register} />
                  <Route path="/login" component={Login} />
                  <Route path="/terms" component={Terms} />
                  <Route path="/info" component={Info} />
                  <ProtectedRoute path="/" component={Tickets} />
                  <ProtectedRoute path="/events" component={Events} />
                  <ProtectedRoute path="/events/:id" component={EventId} />
                  <AdminRoute path="/manage" component={Manage} />
                  <Route default component={NotFound} />
                </Router>
              </Box>
              <Footer />
            </ErrorBoundary>
          </MantineProvider>
        </LocationProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

render(<App />, document.getElementById("app") as any);
