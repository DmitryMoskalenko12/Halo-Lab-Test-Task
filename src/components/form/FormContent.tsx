import classes from './FormContent.module.scss';
import { ErrorMessage, useFormikContext, Form } from 'formik';
import Button from '../../ui/button/Button';
import Input from '../../ui/input/Input';
import InputMask from '../../ui/inputMask/InputMask';
import Select from '../../ui/select/Select';
import { gender } from '../../utils/gender';
import { InitialValues } from '../../types/types';
import { Error, Touch } from '../../types/types';
import { useState, useEffect } from 'react';
import useFormService from '../../services/formService';
import forOptions from '../../utils/forOptions';
import { IDoctors, ISpecialty, ICity, IGender } from '../../types/types';
import filter from '../../utils/filters/filter';
import ButtonReset from '../../ui/buttonReset/ButtonReset';

const FormContent: React.FC<Error & Touch> = props => {
  const { getAllCitys, getAllDoctors, getAllSpecialtys } = useFormService();
  const [doctors, setDoctors] = useState<IDoctors[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<IDoctors[]>([]);
  const [doctorsSpecialty, setDoctorsSpecialty] = useState<ISpecialty[]>([]);
  const [filteredDoctorsSpec, setFilteredDoctorsSpec] = useState<ISpecialty[]>(
    [],
  );
  const [genders, setGenders] = useState<IGender[]>([]);

  const [citys, setCitys] = useState<ICity[]>([]);
  const [filteredCitys, setFilteredCitys] = useState<ICity[]>([]);

  const { values, setFieldValue, resetForm, errors } =
    useFormikContext<InitialValues>();

  useEffect(() => {
    getAllCitys()
      .then(citys => {
        setCitys(citys);
        setFilteredCitys(citys);
      })
      .catch(err => console.log(err));

    getAllDoctors()
      .then(doctors => {
        setDoctors(doctors);
        setFilteredDoctors(doctors);
      })
      .catch(err => console.log(err));

    getAllSpecialtys()
      .then(specialtys => {
        setDoctorsSpecialty(specialtys);
        setFilteredDoctorsSpec(specialtys);
      })
      .catch(err => console.log(err));
    const genders = [...gender];
    setGenders(genders);
  }, []);

  useEffect(() => {
    filter(
      values,
      doctors,
      filteredDoctors,
      setFilteredDoctors,
      doctorsSpecialty,
      filteredDoctorsSpec,
      setFilteredDoctorsSpec,
      citys,
      gender,
      setGenders,
      filteredCitys,
      setFilteredCitys,
      setFieldValue,
    );
  }, [
    values.Birthday,
    values.Doctor,
    values.City,
    values.Specialty,
    values.Sex,
  ]);

  const resetAllForm = () => {
    setFilteredDoctors(doctors);
    setFilteredDoctorsSpec(doctorsSpecialty);
    setFilteredCitys(citys);
    setGenders(gender);
    resetForm();
  };

  const sendForm = () => {
    setFilteredDoctors(doctors);
    setFilteredDoctorsSpec(doctorsSpecialty);
    setFilteredCitys(citys);
    setGenders(gender);
  };

  const disabledSend =
    !values.Birthday ||
    !values.City ||
    !values.Doctor ||
    !values.Sex ||
    !values.Name ||
    !!errors.Phone?.length ||
    !!errors.Name?.length ||
    !!errors.Birthday?.length ||
    !!errors.Email?.length;
  const disabledReset =
    !values.Birthday &&
    !values.City &&
    !values.Doctor &&
    !values.Phone &&
    !values.Sex &&
    !values.Specialty &&
    !values.Name &&
    !values.Email;

  const { transformeCities, transformeDoctors, transformeSpecialties } =
    forOptions(filteredDoctors, filteredCitys, filteredDoctorsSpec);

  return (
    <Form className={classes.Form} noValidate>
      <Input
        title='Name'
        name='Name'
        type='text'
        placeholder='Your name'
        error={props.name}
        touched={props.nameTouch}
      />
      <ErrorMessage className={classes.Required} name='Name' component='div' />

      <InputMask
        type='text'
        title='Birthday Date'
        name='Birthday'
        placeholder='dd/mm/yyyy'
        mask='99/99/9999'
        error={props.birthday}
        touched={props.birthdayTouch}
      />
      <ErrorMessage
        className={classes.Required}
        name='Birthday'
        component='div'
      />

      <Select
        title='Sex'
        options={genders}
        name='Sex'
        error={props.sex}
        touched={props.sexTouch}
      />
      <ErrorMessage className={classes.Required} name='Sex' component='div' />

      <Select
        title='City'
        options={transformeCities}
        name='City'
        error={props.city}
        touched={props.cityTouch}
      />
      <ErrorMessage className={classes.Required} name='City' component='div' />

      <Select
        title='Doctor Specialty'
        options={transformeSpecialties}
        name='Specialty'
        error={props.specialty}
        touched={props.specialtyTouch}
      />
      <ErrorMessage
        className={classes.Required}
        name='Specialty'
        component='div'
      />

      <Select
        title='Doctor'
        options={transformeDoctors}
        name='Doctor'
        error={props.doctor}
        touched={props.doctorTouch}
      />
      <ErrorMessage
        className={classes.Required}
        name='Doctor'
        component='div'
      />

      <Input
        title='Email'
        name='Email'
        type='text'
        placeholder='something@gmail.com'
        error={props.email}
        touched={props.emailTouch}
      />
      <ErrorMessage className={classes.Required} name='Email' component='div' />

      <Input
        title='Your number'
        name='Phone'
        type='number'
        placeholder='+380999999999'
        error={props.phone}
        touched={props.phoneTouch}
      />
      <ErrorMessage className={classes.Required} name='Phone' component='div' />
      <Button
        onClick={sendForm}
        title='Send'
        disabled={disabledSend}
        doc={transformeDoctors}
        spec={transformeSpecialties}
        city={transformeCities}
      />
      <ButtonReset
        title='Reset'
        onClick={resetAllForm}
        disabled={disabledReset}
      />
    </Form>
  );
};

export default FormContent;
