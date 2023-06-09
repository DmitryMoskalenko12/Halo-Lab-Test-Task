import classes from './ButtonReset.module.scss';

interface IProps {
  title: string;
  onClick: () => void;
}

const Button: React.FC<IProps> = ({ title, onClick }) => {
  return (
    <button onClick={onClick} className={classes.Button}>
      {title}
    </button>
  );
};

export default Button;