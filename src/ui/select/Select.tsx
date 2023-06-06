import React from 'react';
import classes from './Select.module.scss';
import { Data } from '../../types/types';
import { Field } from 'formik';
import cn from 'classnames';

interface IProps {
  title: string;
  options: Data[];
  name: string;
  error: string | undefined;
  touched: boolean | undefined;
}

const Select: React.FC<IProps> = ({ title, options, name, error, touched }) => {
  const setOptions = () => {
    if (options.length === 0) {
      return <option value=''>Not Found</option>;
    }

    return (
      <>
        <option value='' selected disabled>{`Select ${title}`}</option>
        {options.map(item => (
          <option value={item.value} key={item.id}>
            {item.value}
          </option>
        ))}
      </>
    );
  };

  return (
    <label className={classes.Label}>
      {title}
      <Field
        className={cn(classes.Select, { [classes.Error]: error && touched })}
        as='select'
        id={name}
        name={name}
      >
        {setOptions()}
      </Field>
    </label>
  );
};

export default Select;
