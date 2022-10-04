import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import UserContext from "./context/UserContext";
import BookFinderPage from "./pages/BookFinderPage";
import SpecificBookPage from "./pages/SpecificBookPage";

function App() {
  const [token, setToken] = useState("");
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const contextValue = {
    token,
    setToken,
    image,
    setImage,
    name,
    setName,
  };
  return (
    <UserContext.Provider value={contextValue}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/bookfinder" element={<BookFinderPage />} />
          <Route path="/book/:id" element={<SpecificBookPage />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
