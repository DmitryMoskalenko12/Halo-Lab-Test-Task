import classes from './Input.module.scss';
import { Field } from 'formik';
import cn from 'classnames';

interface IProps {
  title: string;
  name: string;
  placeholder: string;
  type: string;
  error: string | undefined;
  touched: boolean | undefined;
}

const Input: React.FC<IProps> = ({
  title,
  name,
  placeholder,
  type,
  error,
  touched,
}) => {
  return (
    <div className={classes.Wrapper}>
      <label className={classes.Label}>
        {title}
        <Field
          className={cn(classes.Input, { [classes.Error]: error && touched })}
          type={type}
          required
          placeholder={placeholder}
          name={name}
        />
      </label>
    </div>
  );
};

export default Input;
