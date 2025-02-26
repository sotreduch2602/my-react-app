import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home";
import Navigation from "./layouts/navigation";
import StudentsList from "./pages/students/StudentsList";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigation />}>
            <Route index element={<Home />} />
            <Route path="students">
              <Route index element={<StudentsList />} />
              <Route path="add" element={<></>} />
              <Route path="edit/:id" element={<></>} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
