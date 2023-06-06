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
import { handleDoctorChange } from '../../utils/filters/handleDoctorChange';
import { filteredByCity } from '../../utils/filters/filteredByCity';
import { filterBySpecialty } from '../../utils/filters/filteredBySpecialty';
import { handleSexChange } from '../../utils/filters/handleSexChange';
import { IDoctors, ISpecialty, ICity } from '../../types/types';
import { filterByDate } from '../../utils/filters/filteredByDate';
import { filteredByCityAndSpecialty } from '../../utils/filters/filteredByCityAndSpecialty';

const FormContent: React.FC<Error & Touch> = props => {
  const { getAllCitys, getAllDoctors, getAllSpecialtys } = useFormService();

  const [doctors, setDoctors] = useState<IDoctors[]>([]);
  const [doctorsSpecialty, setDoctorsSpecialty] = useState<ISpecialty[]>([]);
  const [filteredDoctorsSpec, setFilteredDoctorsSpec] = useState<ISpecialty[]>(
    [],
  );
  const [citys, setCitys] = useState<ICity[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<IDoctors[]>([]);

  const { values, setFieldValue } = useFormikContext<InitialValues>();

  useEffect(() => {
    getAllCitys()
      .then(citys => setCitys(citys))
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
  }, []);

  const resetStateInitial = () => {
    setFilteredDoctors(doctors);
    setFilteredDoctorsSpec(doctorsSpecialty);
  };

  console.log('jjj');
  useEffect(() => {
    handleSexChange(
      values.Sex,
      doctorsSpecialty,
      setFieldValue,
      setFilteredDoctorsSpec,
    );
  }, [values.Sex]);

  useEffect(() => {
    handleDoctorChange(
      values.Doctor,
      doctors,
      citys,
      doctorsSpecialty,
      setFieldValue,
    );
  }, [values.Doctor]);

  useEffect(() => {
    filteredByCity(
      values.City,
      doctors,
      filteredDoctors,
      citys,
      setFieldValue,
      setFilteredDoctors,
    );
  }, [values.City]);

  useEffect(() => {
    filterBySpecialty(
      values.Specialty,
      doctors,
      doctorsSpecialty,
      setFieldValue,
      setFilteredDoctors,
    );
  }, [values.Specialty]);

  useEffect(() => {
    filterByDate(values.Birthday, setFieldValue, filteredDoctors, setFilteredDoctors);
  }, [values.Birthday]);

  useEffect(() => {
    filteredByCityAndSpecialty(
      values.City,
      values.Specialty,
      citys,
      doctorsSpecialty,
      doctors,
      setFilteredDoctors,
      values.Sex,
      values.Doctor,
      doctorsSpecialty,
      setFilteredDoctorsSpec,
      values.Sex,
      values.Birthday,
      setCitys,
    );
  }, [values.City, values.Specialty, values.Sex, values.Doctor]);

  const { transformeCities, transformeDoctors, transformeSpecialties } =
    forOptions(filteredDoctors, citys, filteredDoctorsSpec);

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
        options={gender}
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

      <Button onClick={resetStateInitial} title='Send' />
    </Form>
  );
};

export default FormContent;
