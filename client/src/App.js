import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ManagerLayout from "./components/ManagerLayout/ManagerLayout";
import Layout from "./components/layout/Layout";
import routes from "./router/routes";

function App() {
  return (
    <Router>
      <Routes>
        {routes.map((route, index) => {
          let CurrentLayout = Layout;
          if (route.layout === "management") {
            CurrentLayout = ManagerLayout;
          }
          return <Route key={index} path={route.path} element={<CurrentLayout>{route.element}</CurrentLayout>} />;
        })}
      </Routes>
    </Router>
  );
}

export default App;
