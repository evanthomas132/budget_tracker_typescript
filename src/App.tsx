
import Budget from "./components/Budget/Budget";
import Header from "./components/Header/Header";
import "./index.css";

function App() {

  return (
      <div className="App">
        <Header title={"Budget Tracker"} />
        <Budget />
      </div>
  );
}

export default App;
