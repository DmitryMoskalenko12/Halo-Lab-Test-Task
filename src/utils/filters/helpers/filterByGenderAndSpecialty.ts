import { IDoctors, ISpecialty, ICity, IValues } from '../../../types/types';
export const filterByGenderAndSpecialty = (
  values: IValues,
  filteredDoctors: IDoctors[],
  setDoctors: Function,
  filteredSpecialtys: ISpecialty[],
  setSpecialtys: Function,
  filteredCitys: ICity[],
  setFilteredCitys: Function,
) => {
  const findSpecialtyOnly = filteredSpecialtys.filter(
    spec => spec.name === values.Specialty,
  );
  const findDoctorOnly = filteredDoctors.filter(doc =>
    findSpecialtyOnly.find(spec => spec.id === doc.specialityId),
  );
  const findCityOnly = filteredCitys.filter(city =>
    filteredDoctors.find(
      doc =>
        doc.cityId === city.id &&
        findSpecialtyOnly.find(spec => spec.id === doc.specialityId),
    ),
  );
  setFilteredCitys(findCityOnly);
  setDoctors(findDoctorOnly);
  setSpecialtys(findSpecialtyOnly);
};
