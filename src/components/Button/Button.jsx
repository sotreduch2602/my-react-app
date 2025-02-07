import { useState } from "react";
import "./Button.css";

const Button = () => {
  const [x, setX] = useState(0);

  const handleClick = () => {
    setX(x + 1);
  };

  return (
    <>
      {/* BT1 */}
      {/* <button onClick={handleClick} className={`text-${props.color}`}>
        {props.text} - {props.color}
      </button> */}

      {/* BT3 */}
      {/* <button onClick={props.onClick}>
        {props.children}
      </button> */}

      {/* BT4-UseState */}
      <button onClick={handleClick}>Click me! {x}</button>
    </>
  );
};

export default Button;
