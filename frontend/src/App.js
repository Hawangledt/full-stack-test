import Routes from "./routes";
import { UserProvider } from "./hooks"

function App() {
  return (
    <UserProvider>
      <Routes/>
    </UserProvider>
  );
}

export default App;
