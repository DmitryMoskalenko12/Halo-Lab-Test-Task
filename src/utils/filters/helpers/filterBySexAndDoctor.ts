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
  setDoctors: React.Dispatch<React.SetStateAction<IDoctors[]>>,
  filteredSpecialtys: ISpecialty[],
  setSpecialtys: React.Dispatch<React.SetStateAction<ISpecialty[]>>,
  gender: IGender[],
  filteredCitys: ICity[],
  setFilteredCitys: Function,
  setFieldValue: Function,
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
  findDoctor?.name && findDoctor.surname
    ? setDoctors([{ ...findDoctor }])
    : setFieldValue('Doctor', 'Not found');
  setFilteredCitys([{ ...findCity }]);
  setSpecialtys(setSpecialtyOnly);
};
