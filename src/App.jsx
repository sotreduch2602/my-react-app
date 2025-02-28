import { BrowserRouter, Route, Routes } from "react-router-dom";
import StudentsList from "./routes/StudentsList";
import Home from "./routes/Home";
import StudentAdd from "./routes/StudentAdd";
import Error404 from "./routes/Error404";
import StudentEdit from "./routes/StudentEdit";
import StudentDetail from "./routes/StudentDetail";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="students">
            <Route index element={<StudentsList />} />
            <Route path="add" element={<StudentAdd />} />
            <Route path="edit/:id" element={<StudentEdit />} />
            <Route path="details/:id" element={<StudentDetail />} />
          </Route>

          <Route path="error">
            <Route path="404" element={<Error404 />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
