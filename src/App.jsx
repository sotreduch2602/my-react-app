import { BrowserRouter, Route, Routes } from "react-router-dom";
import StudentsList from "./routes/StudentsList";
import Home from "./routes/Home";
import StudentAdd from "./routes/StudentAdd";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="students">
            <Route index element={<StudentsList />} />
            <Route path="add" element={<StudentAdd />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
