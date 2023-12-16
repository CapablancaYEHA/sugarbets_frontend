import { render } from "preact";
import { LocationProvider, Router, Route } from "preact-iso";

import { Header } from "./components/Header.jsx";
import { NotFound } from "./pages/_404.jsx";
import { Home } from "./pages/Home/index.jsx";
import { Bets } from "./pages/bets.js";
import { Bet } from "./pages/bet_id.js";

import "./style.css";

export function App() {
  return (
    <LocationProvider>
      <Header />
      <main>
        <Router>
          <Route path="/" component={Home} />
          <Route path="/bets" component={Bets} />
          <Route path="/bets/:id" component={Bet} />
          <Route default component={NotFound} />
        </Router>
      </main>
    </LocationProvider>
  );
}

render(<App />, document.getElementById("app"));
