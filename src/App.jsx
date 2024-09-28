import { Provider } from "react-redux";
import { store } from "./store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import "./styles/main.scss"
import WorkspacePage from "./pages/WorkspacePage";
import HomePage from "./pages/HomePage";


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<HomePage />} />
          <Route path="/workspace" element={<WorkspacePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>

    </Provider>
  );
}

export default App;