import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { UserProvider } from "./contexts/UserContext";
import { GameProvider } from "./contexts/GameContext";
import WelcomeModal from "./components/WelcomeModal";
import Home from "./pages/Home";
import ModulePage from "./pages/ModulePage";
import LibraryPage from "./pages/LibraryPage";
import FieldNotesPage from "./pages/FieldNotesPage";
import CertificationPage from "./pages/CertificationPage";
import PreDemoChecklistPage from "./pages/PreDemoChecklistPage";
function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/module/:id" component={ModulePage} />
      <Route path="/library" component={LibraryPage} />
      <Route path="/field-notes" component={FieldNotesPage} />
      <Route path="/certification" component={CertificationPage} />
      <Route path="/pre-demo-checklist" component={PreDemoChecklistPage} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <UserProvider>
        <GameProvider>
          <TooltipProvider>
            <Toaster />
            <WelcomeModal />
            <Router />
          </TooltipProvider>
        </GameProvider>
        </UserProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
