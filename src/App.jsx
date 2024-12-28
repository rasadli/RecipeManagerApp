import ProjectList from "./components/ProjectList";
import Pages from "./pages/Pages";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Recipe Manager App</h1>
        <p>Explore delicious recipes and learn how to cook them!</p>
      </header>
      <Pages/>
      <ProjectList />
    </div>
  );
}

export default App;
