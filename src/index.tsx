import { render } from "preact";
import { MantineProvider, Box } from "@mantine/core";
import { LocationProvider, Router, Route } from "preact-iso";
import { QueryClientProvider } from "@tanstack/react-query";

import { NotFound } from "./pages/_404.jsx";
import { Register } from "./pages/Auth/register.js";
import { Login } from "./pages/Auth/login.js";
import { Bets } from "./pages/bets.js";
import { Bet } from "./pages/bet_id.js";
import { Terms } from "./pages/terms.js";
import { queryClient } from "./api/instance.js";
import { AuthProvider } from "../utils/auth-manager.js";
import { ProtectedRoute } from "./components/route.js";
import { Header } from "./components/navs/Header.js";
import { Footer } from "./components/navs/Footer.js";

import { theme } from "../styles/theme.js";
import "@mantine/core/styles.css";
import "../styles/global.scss";
import { Tickets } from "./pages/tickets.js";

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LocationProvider>
          <MantineProvider theme={theme}>
            <Header />
            <Box bg="white" component="main" px="xl">
              <Router>
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <Route path="/terms" component={Terms} />
                <Route path="/" component={Tickets} />
                <ProtectedRoute path="/bets/:id" component={Bet} />
                <Route default component={NotFound} />
              </Router>
            </Box>
            <Footer />
          </MantineProvider>
        </LocationProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

render(<App />, document.getElementById("app"));
