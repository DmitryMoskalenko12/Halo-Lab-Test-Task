import { IDoctors, ISpecialty, IValues } from '../../../types/types';
import calcAge from './calcAge';
export const filterByBirthdaySexCityAndDoc = (
  values: IValues,
  filteredDoctors: IDoctors[],
  setDoctors: React.Dispatch<React.SetStateAction<IDoctors[]>>,
  filteredSpecialtys: ISpecialty[],
  setSpecialtys: React.Dispatch<React.SetStateAction<ISpecialty[]>>,
  setFieldValue: Function,
) => {
  const age = calcAge(values.Birthday);
  if (age <= 16 && age > 0) {
    const getDoctor = values.Doctor.split(' ');
    const findDoctor = filteredDoctors.find(
      doc => doc.name === getDoctor[0] && doc.surname === getDoctor[1],
    );
    const doctorsAll = filteredDoctors.filter(doctor => doctor.isPediatrician);
    const filterSpecialtys = filteredSpecialtys.filter(spec =>
      doctorsAll.find(
        doc =>
          doc.specialityId === spec.id &&
          (((spec?.params?.maxAge || 17) <= 16 && age <= 16) ||
            !spec.params?.maxAge) &&
          (!spec.params ||
            !spec.params.gender ||
            spec.params.gender === values.Sex),
      ),
    );
    const filterDoctors = doctorsAll.filter(doc =>
      filterSpecialtys.find(spec => spec.id === doc.specialityId),
    );
    const setDoctor = filterDoctors.find(
      doc =>
        doc.name === findDoctor?.name && doc.surname === findDoctor?.surname,
    );
    const setSpec = filterSpecialtys.find(
      spec => spec.id === setDoctor?.specialityId,
    );
    setDoctor?.name && setDoctor.surname
      ? setDoctors([{ ...setDoctor }])
      : setFieldValue('Doctor', 'Not found');
    setSpec?.name
      ? setSpecialtys([{ ...setSpec }])
      : setFieldValue('Specialty', 'Not found');
  }
  if (age > 16 && age <= 110) {
    const getDoctor = values.Doctor.split(' ');
    const findDoctor = filteredDoctors.find(
      doc => doc.name === getDoctor[0] && doc.surname === getDoctor[1],
    );
    const doctorsAll = filteredDoctors.filter(doctor => !doctor.isPediatrician);
    const filterSpecialtys = filteredSpecialtys.filter(spec =>
      doctorsAll.find(
        doc =>
          doc.specialityId === spec.id &&
          (((spec?.params?.minAge || 0) >= 45 && age >= 45) ||
            !spec.params?.minAge) &&
          (!spec.params ||
            !spec.params.gender ||
            spec.params.gender === values.Sex),
      ),
    );
    const filterDoctors = doctorsAll.filter(doc =>
      filterSpecialtys.find(spec => spec.id === doc.specialityId),
    );
    const setDoctor = filterDoctors.find(
      doc =>
        doc.name === findDoctor?.name && doc.surname === findDoctor?.surname,
    );
    const setSpec = filterSpecialtys.find(
      spec => spec.id === setDoctor?.specialityId,
    );
    setDoctor?.name && setDoctor.surname
      ? setDoctors([{ ...setDoctor }])
      : setFieldValue('Doctor', 'Not found');
    setSpec?.name
      ? setSpecialtys([{ ...setSpec }])
      : setFieldValue('Specialty', 'Not found');
  }
};
