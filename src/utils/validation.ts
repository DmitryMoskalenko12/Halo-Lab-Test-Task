import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
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

      const dayValid = parseInt(day, 10) >= 1 && parseInt(day, 10) <= 31;
      const monthValid = parseInt(month, 10) >= 1 && parseInt(month, 10) <= 12;
      const yearValid =
        parseInt(year, 10) >= 1913 && parseInt(year, 10) <= 2023;

      return dayValid && monthValid && yearValid;
    })
    .required('Required field!'),
  Sex: Yup.string().required('Required field!'),
  City: Yup.string().required('Required field!'),
  Doctor: Yup.string().required('Required field!'),
  Email: Yup.string()
    .test(
      'emailOrMobile',
      'Email or Mobile number is required.',
      function (value) {
        const mobileNumber = this.parent.Phone;
        return !!value || !!mobileNumber;
      },
    )
    .matches(/^[a-zA-Z0-9]+@[a-zA-Z]+(\.[a-zA-Z]+)+$/, 'Invalid email format')
    .email('Invalid email address.'),

  Phone: Yup.string()
    .test(
      'emailOrMobile',
      'Email or Mobile number is required.',
      function (value) {
        const email = this.parent.Email;
        return !!value || !!email;
      },
    )
    .matches(/^380\d{9}$/, 'Invalid phone number format.'),
});
