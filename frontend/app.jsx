import {
BrowserRouter,
Routes,
Route
} from "react-router-dom";

import Login from "./pages/login";
import Register from "./pages/Register";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import Leaderboard from "./pages/Leaderboard";
import Admin from "./pages/Admin";
import ChatWidget from "./components/ChatWidget";

function App() {

return (

<BrowserRouter>

<Routes>

<Route
path="/"
element={<Login />}
/>

<Route
path="/register"
element={<Register />}
/>

<Route
path="/quiz"
element={<Quiz />}
/>

<Route
path="/result"
element={<Result />}
/>

<Route
path="/leaderboard"
element={<Leaderboard />}
/>

<Route
 path="/admin"
 element={<Admin />}
/>

</Routes>
      <ChatWidget />
      <div style={{
        position: "fixed", bottom: 8, left: 0, right: 0,
        textAlign: "center", zIndex: 500,
        fontSize: 11, color: "rgba(107,122,154,0.45)",
        letterSpacing: "0.08em", pointerEvents: "none",
      }}>
        © 2026 sumant. All rights reserved.
      </div>
</BrowserRouter>

);

}

export default App;