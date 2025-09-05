import "./App.css";
import Dashboard from "@/components/Dashboard";
import { ThemeProvider } from "@/components/provider/ThemeProvider";
// import AppRoutes from "./AppRoutes";
// import { ModeToggle } from "./components/ModeToggle";

function App() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // window.electron.hey()

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {/* <ModeToggle /> */}
      {/* <AppRoutes/> */}
      <Dashboard />
    </ThemeProvider>
  );
}

export default App;
