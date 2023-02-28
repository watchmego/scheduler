import { SideBar } from "./components/sideBar/SideBar";
import { CreateToDo } from "./components/todo/Create";
import { Main } from "./pages/home/Main";
import { Header } from "./components/header/header";
import { initDB } from "./components/db/initDb";
function App() {
  
  
  return (
    <div>
        <Header />
        <Main />
    </div>
  );
}

export default App;
