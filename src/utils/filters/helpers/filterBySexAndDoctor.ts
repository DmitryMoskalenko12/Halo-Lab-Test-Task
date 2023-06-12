import {
  IDoctors,
  ISpecialty,
  ICity,
  IGender,
  IValues,
} from '../../../types/types';
export const filterBySexAndDoctor = (
  values: IValues,
  filteredDoctors: IDoctors[],
  setDoctors: Function,
  filteredSpecialtys: ISpecialty[],
  setSpecialtys: Function,
  gender: IGender[],
  filteredCitys: ICity[],
  setFilteredCitys: Function,
) => {
  const getDoctor = values.Doctor.split(' ');
  const findDoctor = filteredDoctors.find(
    doc => doc.name === getDoctor[0] && doc.surname === getDoctor[1],
  );
  const findSex = gender.find(sex => sex.value === values.Sex);
  const setSpecialtyOnly = filteredSpecialtys.filter(
    spec =>
      spec.id === findDoctor?.specialityId &&
      (spec.params?.gender === findSex?.value || spec),
  );
  const findCity = filteredCitys.find(city => findDoctor?.cityId === city.id);
  console.log(typeof findDoctor);
  const checkDoctor =
    findDoctor === undefined
      ? { id: 1, name: 'Not', surname: 'found' }
      : { ...findDoctor };
  setFilteredCitys([{ ...findCity }]);
  setDoctors([checkDoctor]);
  setSpecialtys(setSpecialtyOnly);
};
