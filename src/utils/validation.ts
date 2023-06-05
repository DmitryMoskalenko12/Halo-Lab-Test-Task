import * as Yup from 'yup';

export const validationSchema = Yup.object({
  Name: Yup.string()
             .min(2, 'Минимум 2 символа')
             .required('Обязательное поле!')
             .matches(/^[^\d]+$/, 'Имя не должно содержать числа')
             .matches(/^[A-Za-zА-Яа-яЁёЇїІіЄєҐґ\s]+$/, 'Name should only contain letters'),
  Birthday: Yup.string()
            .min(10, 'Введите правильный формат даты')
            .test('valid-date', 'Неверная дата рождения', value => {
              if (!value) return true;
              const [day, month, year] = value.split('/');
              
              const isDayValid = parseInt(day, 10) >= 1 && parseInt(day, 10) <= 31;
              const isMonthValid = parseInt(month, 10) >= 1 && parseInt(month, 10) <= 12;
              const isYearValid = parseInt(year, 10) >= 1925;
              
              return isDayValid && isMonthValid && isYearValid;
            })
            .required('Обязательное поле!'),
  Sex: Yup.string()
            .min(2, 'Минимум 2 символа')
            .required('Обязательное поле!'),
  City: Yup.string()
            .required('Обязательное поле!'),
  Specialty: Yup.string()
            .required('Обязательное поле!'),
  Doctor: Yup.string()
            .min(2, 'Минимум 2 символа')
            .required('Обязательное поле!'),
  Email: Yup.string()
            .email('Неправильный емейл адрес'),
  Phone: Yup.string()
            .matches(/^380\d{9}$/, 'Неверный формат телефона')
            .required('Обязательное поле!')
            }
  )