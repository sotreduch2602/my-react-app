import Button from "./components/Button/Button";
import List from "./components/Lists/List";
function App() {
  return (
    <>
      {/* BT1 */}
      {/* <Button text="Đăng Nhập" color="blue" /> */}
      {/* BT2 */}
      <List></List>
      {/* BT3 */}
      <Button onClick={() => alert("Button clicked!")}>Click Nguyen</Button>
    </>
  );
}

export default App;
