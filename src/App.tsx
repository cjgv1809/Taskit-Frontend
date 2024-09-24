import { Route, Routes } from "react-router-dom";
import HomeView from "./views/HomeView";
import SignInView from "./views/SignInView";
import RegisterView from "./views/RegisterView";
import NotFoundView from "./views/NotFoundView";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/sign-in" element={<SignInView />} />
        <Route path="/sign-up" element={<RegisterView />} />
        <Route path="*" element={<NotFoundView />} />
      </Routes>
    </>
  );
}

export default App;
