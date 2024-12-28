import { Outlet } from "react-router";
import "./App.css";
import { Footer } from "./components/Footer";
import "./i18n";
import { Header } from "./components/Heder";

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
