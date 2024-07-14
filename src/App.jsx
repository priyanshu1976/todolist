import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import { LandingPage } from "/src/pages/LandingPage";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />}>
            <Route path="mainboard" element={<HomePage />} />
          </Route>

          <Route path="/createaccount" element={<CreateAccount />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
