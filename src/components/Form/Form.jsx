import { useState, useEffect } from "react";

const Form = () => {
  const [value, setvalue] = useState("");
  const [list, setList] = useState(["abc", "def", "ghi"]);

  const handleChange = (e) => {
    setvalue(e.target.value);
  };

  const handleClick = () => {
    setList([...list, value]);
    setvalue("");
  };

  useEffect(() => {
    console.log("List updated:", list);
  }, [list]);

  return (
    <>
      <input type="text" onChange={handleChange} value={value} />
      <button onClick={handleClick}>Submit</button>

      <ul>
        {list.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </>
  );
};

export default Form;
<></>;
