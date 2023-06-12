import classes from './ButtonReset.module.scss';

interface IProps {
  title: string;
  disabled: boolean;
  onClick: () => void;
}

const Button: React.FC<IProps> = ({ title, onClick, disabled }) => {
  return (
    <button onClick={onClick} className={classes.Button} disabled={disabled}>
      {title}
    </button>
  );
};

export default Button;
