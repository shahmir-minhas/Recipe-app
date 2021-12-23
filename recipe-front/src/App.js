// recipe-front/src/App.js

import React from "react";
import { Routes, Route } from "react-router-dom";
import Index from "./Pages/Home/Index";
import Layout from "./Layout/Layout";
import RecipeIndex from "./Pages/Recipe/Index";
import PrivateRoute from "./Routes/PrivateRoute";
import Dashboard from "./Pages/Dashboard/Dashboard";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./scss/app.scss";

function App() {
  console.log("helo form app 3000");
  // const [data, setData] = React.useState(null);

  // React.useEffect(() => {
  //   fetch("/api")
  //     .then((res) => res.json())
  //     .then((data) => setData(data.message));
  // }, []);
  // console.log(data);
  return (
    <div className="App">
      <Layout />
      <main>
        <Routes>
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="/recipe/:id" element={<RecipeIndex />} />
          <Route path="/" element={<Index />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

// {
//   "client": "cd recipe-front && npm run-script build"
// }
