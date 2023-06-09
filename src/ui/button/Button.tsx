import classes from './Button.module.scss';

interface IProps {
  title: string;
}

const Button: React.FC<IProps> = ({ title }) => {
  return (
    <button className={classes.Button}>
      {title}
    </button>
  );
};

export default Button;
