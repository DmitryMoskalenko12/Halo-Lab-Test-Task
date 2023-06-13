import {
  IDoctors,
  ISpecialty,
  ICity,
  IValues,
  IGender,
} from '../../../types/types';
export const filterByDoctors = (
  values: IValues,
  filteredDoctors: IDoctors[],
  setDoctors: React.Dispatch<React.SetStateAction<IDoctors[]>>,
  filteredSpecialtys: ISpecialty[],
  setSpecialtys: React.Dispatch<React.SetStateAction<ISpecialty[]>>,
  gender: IGender[],
  setGender: React.Dispatch<React.SetStateAction<IGender[]>>,
  filteredCitys: ICity[],
  setFilteredCitys: React.Dispatch<React.SetStateAction<ICity[]>>,
  setFieldValue: Function,
) => {
  const getDoctor = values.Doctor.split(' ');
  const findDoctor = filteredDoctors.find(
    doc => doc.name === getDoctor[0] && doc.surname === getDoctor[1],
  );
  const findDoctorOnly = filteredDoctors.filter(
    doc =>
      doc?.name === findDoctor?.name && doc?.surname === findDoctor?.surname,
  );
  const findSpec = filteredSpecialtys.filter(
    spec => findDoctor?.specialityId === spec.id,
  );
  const findCity = filteredCitys.filter(city => city.id === findDoctor?.cityId);
  const findGender = gender.filter((sex, i) =>
    findSpec.find(spec => spec.params?.gender === sex.value),
  );
  setFieldValue('Specialty', findSpec[0]?.name);
  setFieldValue('City', findCity[0]?.name);
  setDoctors(findDoctorOnly);
  setSpecialtys(findSpec);
  setFilteredCitys(findCity);
  findGender.length === 0 ? setGender(gender) : setGender(findGender);
};
