import classes from './InputMask.module.scss';
import ReactInputMask from 'react-input-mask';
import { useField } from 'formik';
import cn from 'classnames';

interface IProps {
  title: string;
  placeholder: string;
  name: string;
  mask: string;
  type: string;
  error: string | undefined;
  touched: boolean | undefined;
}

const InputMask: React.FC<IProps> = ({
  title,
  name,
  placeholder,
  mask,
  type,
  error,
  touched,
}) => {
  const [field] = useField(name);

  return (
    <label className={classes.Label}>
      {title}
      <ReactInputMask
        className={cn(classes.Input, { [classes.Error]: error && touched })}
        {...field}
        mask={mask}
        placeholder={placeholder}
        maskChar={null}
        type={type}
        name={name}
      />
    </label>
  );
};

export default InputMask;
