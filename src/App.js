import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<></>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
