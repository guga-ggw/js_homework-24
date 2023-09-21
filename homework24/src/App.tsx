import InputForm from "./components/InputForm";
import "./App.css"
import TodoList from "./Pages/TodoList";

const App = () => {
  return (
    <div className="App">
      <InputForm />
      <div className="listsContainer">
        <TodoList isCompleted={false} />
        <TodoList isCompleted={true} />
      </div>
    </div>
  );
};

export default App;
