interface ButtonProps {
  text: string;
  classes: string;
}

const Button: React.FC<ButtonProps> = ({ text, classes, ...rest }) => {
  const _className = `px-10 py-2 border rounded-md ${classes || ''}`;

  return (
    <button className={_className} {...rest}>
      {text}
    </button>
  );
}

export default Button;
