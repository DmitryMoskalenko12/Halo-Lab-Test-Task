import classes from './Button.module.scss';

interface IProps {
  title: string;
  disabled: boolean;
  onClick: () => void;
}

const Button: React.FC<IProps> = ({ title, onClick, disabled }) => {
  return (
    <button disabled={disabled} onClick={onClick} className={classes.Button}>
      {title}
    </button>
  );
};

export default Button;
