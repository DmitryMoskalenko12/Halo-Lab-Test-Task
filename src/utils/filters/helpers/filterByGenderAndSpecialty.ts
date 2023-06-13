import { IDoctors, ISpecialty, ICity, IValues } from '../../../types/types';
export const filterByGenderAndSpecialty = (
  values: IValues,
  filteredDoctors: IDoctors[],
  setDoctors: React.Dispatch<React.SetStateAction<IDoctors[]>>,
  filteredSpecialtys: ISpecialty[],
  setSpecialtys: React.Dispatch<React.SetStateAction<ISpecialty[]>>,
  filteredCitys: ICity[],
  setFilteredCitys: React.Dispatch<React.SetStateAction<ICity[]>>,
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
