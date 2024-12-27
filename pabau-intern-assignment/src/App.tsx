import "./App.css";
import { Characters } from "./components/Characters";
import { Footer } from "./components/Footer";
import "./i18n"; // Ensure this is correct

function App() {
  return (
    <>
      <Characters />
      <Footer />
    </>
  );
}

export default App;
