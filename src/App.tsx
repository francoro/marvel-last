import { CharactersList } from "./components/CharactersList";
import { Character } from "./components/Character";
import { Provider } from "react-redux";
import store from "./store";

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/characters" element={<CharactersList />}></Route>
          <Route path="/character/:id" element={<Character />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
