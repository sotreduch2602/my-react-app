import "./Button.css";

const Button = (props) => {
  const handleClick = () => {
    alert("Button clicked!");
  };

  return (
    <>
      {/* <button onClick={handleClick} className={`text-${props.color}`}>
        {props.text} - {props.color}
      </button> */}
      <button onClick={props.onClick}>
        {props.children}
      </button>
    </>
  );
};

export default Button;
