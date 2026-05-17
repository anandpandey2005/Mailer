import "./App.css";
import { Navbar, Homepage } from "./handler";

function App() {
  return (
    <>
      <Navbar></Navbar>
      {/* Main content area */}
      <section className="max-w-325 mx-auto px-3 py-4 md:py-8 overflow-hidden">
        <Homepage></Homepage>
      </section>
    </>
  );
}

export default App;
