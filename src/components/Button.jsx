import "./Button.css";

const Button = (props) => {
  return (
    <>
      <button className={`text-${props.color}`}>
        {props.text} - {props.color}
      </button>
    </>
  );
};

export default Button;