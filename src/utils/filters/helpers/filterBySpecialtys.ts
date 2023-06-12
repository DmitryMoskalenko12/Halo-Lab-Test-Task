import {
  IDoctors,
  ISpecialty,
  ICity,
  IGender,
  IValues,
} from '../../../types/types';
export const filterBySpecialtys = (
  values: IValues,
  filteredDoctors: IDoctors[],
  setDoctors: Function,
  filteredSpecialtys: ISpecialty[],
  setSpecialtys: Function,
  gender: IGender[],
  setGender: Function,
  filteredCitys: ICity[],
  setFilteredCitys: Function,
) => {
  const findSpecialty = filteredSpecialtys.filter(
    spec => spec.name === values.Specialty,
  );
  const findSpecOnly = filteredSpecialtys.find(
    spec => spec.name === values.Specialty,
  );
  const filterDoctors = filteredDoctors.filter((doc, i) =>
    findSpecialty.find(spec => spec.id === doc.specialityId),
  );
  const filterCitys = filteredCitys.filter((city, i) =>
    filterDoctors.find(doc => doc.cityId === city.id),
  );
  const findGender = gender.filter(
    sex => findSpecOnly?.params?.gender === sex.value,
  );
  setFilteredCitys(filterCitys);
  setDoctors(filterDoctors);
  findGender.length === 0 ? setGender(gender) : setGender(findGender);
  setSpecialtys(findSpecialty);
};
