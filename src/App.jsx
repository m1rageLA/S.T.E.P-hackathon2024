import { Provider } from "react-redux";
import { store } from "./store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import "./styles/main.scss"
import Counter from "./features/counter/Counter";
import WorkspacePage from "./pages/WorkspacePage";


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Counter />} />
          <Route path="/workspace" element={<WorkspacePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>

    </Provider>
  );
}

export default App;