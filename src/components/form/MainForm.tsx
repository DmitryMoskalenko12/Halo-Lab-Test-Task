import { Formik } from 'formik';
import { validationSchema } from '../../utils/validation';
import { initialValues } from '../../utils/initialValues';
import FormContent from './FormContent';

const MainForm: React.FC = () => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        alert(JSON.stringify(values, null, 2));
        resetForm({ values: initialValues });
      }}
    >
      {({ errors, touched }) => (
        <FormContent
          city={errors.City}
          sex={errors.Sex}
          birthday={errors.Birthday}
          doctor={errors.Doctor}
          email={errors.Email}
          specialty={errors.Specialty}
          phone={errors.Phone}
          name={errors.Name}
          cityTouch={touched.City}
          sexTouch={touched.Sex}
          birthdayTouch={touched.Birthday}
          doctorTouch={touched.Doctor}
          emailTouch={touched.Email}
          specialtyTouch={touched.Specialty}
          phoneTouch={touched.Phone}
          nameTouch={touched.Name}
        />
      )}
    </Formik>
  );
};
export default MainForm;
