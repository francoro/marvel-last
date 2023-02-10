import { CharactersList } from "./components/CharactersList";
import { Character } from "./components/Character";

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/characters" element={<CharactersList />}></Route>
        <Route path="/character/:id" element={<Character />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
