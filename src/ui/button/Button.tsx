import classes from './Button.module.scss';
import { Data } from '../../types/types';
interface IProps {
  title: string;
  disabled: boolean;
  doc: Data[];
  spec: Data[];
  city: Data[];
  onClick: () => void;
}

const Button: React.FC<IProps> = ({
  title,
  onClick,
  disabled,
  doc,
  spec,
  city,
}) => {
  return (
    <button
      disabled={
        disabled || doc.length === 0 || spec.length === 0 || city.length === 0
      }
      onClick={onClick}
      className={classes.Button}
    >
      {title}
    </button>
  );
};

export default Button;
