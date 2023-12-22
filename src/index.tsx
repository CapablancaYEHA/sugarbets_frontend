import { render } from "preact";

import { LocationProvider, Router, Route } from "preact-iso";
import { QueryClientProvider } from "@tanstack/react-query";

import { NotFound } from "./pages/_404.jsx";
import { Register } from "./pages/Register/index.js";
import { Login } from "./pages/Login/index.js";
import { Bets } from "./pages/bets.js";
import { Bet } from "./pages/bet_id.js";
import { queryClient } from "./api/instance.js";
import { AuthProvider } from "../utils/auth-manager.js";
import { ProtectedRoute } from "./components/route.js";
import { Header } from "./components/Header.jsx";

import "./style.css";

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LocationProvider>
          <Header />
          <main>
            <Router>
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <ProtectedRoute path="/" component={Bets} />
              <ProtectedRoute path="/bets/:id" component={Bet} />
              <Route default component={NotFound} />
            </Router>
          </main>
          <footer />
        </LocationProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

render(<App />, document.getElementById("app"));
