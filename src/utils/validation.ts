import * as Yup from 'yup';

export const validationSchema = Yup.object({
  Name: Yup.string()
    .min(2, 'Minimum 2 letters.')
    .required('Required field!')
    .matches(/^[^\d]+$/, 'The name should not contain numbers.')
    .matches(
      /^[A-Za-zА-Яа-яЁёЇїІіЄєҐґ\s]+$/,
      'Name should only contain letters',
    ),
  Birthday: Yup.string()
    .min(10, 'Please enter a valid date format.')
    .test('valid-date', 'Invalid date of birth.', value => {
      if (!value) return true;
      const [day, month, year] = value.split('/');

      const isDayValid = parseInt(day, 10) >= 1 && parseInt(day, 10) <= 31;
      const isMonthValid =
        parseInt(month, 10) >= 1 && parseInt(month, 10) <= 12;
      const isYearValid = parseInt(year, 10) >= 1925;

      return isDayValid && isMonthValid && isYearValid;
    })
    .required('Required field!'),
  Sex: Yup.string().required('Required field!'),
  City: Yup.string().required('Required field!'),
  Specialty: Yup.string().required('Required field!'),
  Doctor: Yup.string()
    .required('Required field!'),
  Email: Yup.string().email('Invalid email address.'),
  Phone: Yup.string()
    .matches(/^380\d{9}$/, 'Invalid phone number format.')
    .required('Required field!'),
});
