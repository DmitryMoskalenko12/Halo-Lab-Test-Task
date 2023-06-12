import { IDoctors, IValues } from '../../../types/types';
import calcAge from './calcAge';

export const filterByBirthdayAndDoctor = (
  values: IValues,
  filteredDoctors: IDoctors[],
  setDoctors: Function,
) => {
  const age = calcAge(values.Birthday);
  if (age < 16 && age > 0) {
    const doctorsAll = filteredDoctors.filter(doctor => doctor.isPediatrician);
    const getDoctor = values.Doctor.split(' ');
    const findDoctor = filteredDoctors.find(
      doc => doc.name === getDoctor[0] && doc.surname === getDoctor[1],
    );
    const findOnlyDoctor = doctorsAll.find(
      doc =>
        doc.name === findDoctor?.name && doc.surname === findDoctor.surname,
    );
    const checkDoctor =
      findOnlyDoctor === undefined
        ? { id: 1, name: 'Not', surname: 'found' }
        : { ...findOnlyDoctor };
    setDoctors([checkDoctor]);
  }
  if (age >= 16 && age <= 110) {
    const doctorsAll = filteredDoctors.filter(doctor => !doctor.isPediatrician);
    const getDoctor = values.Doctor.split(' ');
    const findDoctor = filteredDoctors.find(
      doc => doc.name === getDoctor[0] && doc.surname === getDoctor[1],
    );
    const findOnlyDoctor = doctorsAll.find(
      doc =>
        doc.name === findDoctor?.name && doc.surname === findDoctor?.surname,
    );
    const checkDoctor =
      findOnlyDoctor === undefined
        ? { id: 1, name: 'Not', surname: 'found' }
        : { ...findOnlyDoctor };
    setDoctors([checkDoctor]);
  }
};
