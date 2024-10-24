const Button = (props) => {
  return (
    <div>
      <input
        type={props.type}
        value={props.value}
        id="submit"
        style={{ width: props.width }}
        {...props}
      />
    </div>
  );
};

export default Button;
