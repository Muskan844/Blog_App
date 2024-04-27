import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Single from "./pages/Single";
import Write from "./pages/Write";
import Setting from "./pages/Setting";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useContext } from "react";
import { Context } from "./contextData/Context";

function App() {
  const { user } = useContext(Context);
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={user ? <Home /> : <Register />} />
          {/* <Route path="/" element={<Single />} /> */}
          <Route path="/write" element={user ? <Write /> : <Register />} />
          <Route path="/setting" element={user ? <Setting /> : <Register />} />
          <Route path="/register" element={user ? <Home /> : <Register />} />
          <Route path="/login" element={user ? <Home /> : <Login />} />
          <Route path="/post/:postId" element={<Single />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
