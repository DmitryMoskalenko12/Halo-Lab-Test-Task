import {
  IDoctors,
  ISpecialty,
  ICity,
  IGender,
  IValues,
} from '../../../types/types';

export const filterByGender = (
  values: IValues,
  filteredDoctors: IDoctors[],
  setDoctors: React.Dispatch<React.SetStateAction<IDoctors[]>>,
  filteredSpecialtys: ISpecialty[],
  setSpecialtys: React.Dispatch<React.SetStateAction<ISpecialty[]>>,
  gender: IGender[],
  setGender: React.Dispatch<React.SetStateAction<IGender[]>>,
  filteredCitys: ICity[],
  setFilteredCitys: React.Dispatch<React.SetStateAction<ICity[]>>,
) => {
  const filterSpecialtys = filteredSpecialtys.filter(specialty => {
    if (values.Sex === 'Female') {
      return (
        !specialty.params ||
        !specialty.params.gender ||
        specialty.params.gender === values.Sex
      );
    } else if (values.Sex === 'Male') {
      return (
        !specialty.params ||
        !specialty.params.gender ||
        specialty.params.gender === values.Sex
      );
    } else {
      return true;
    }
  });
  const setGenderOnly = gender.filter(sex => sex.value === values.Sex);
  const filterDoctors = filteredDoctors.filter(doc =>
    filterSpecialtys.find(spec => spec.id === doc.specialityId),
  );
  const filterCitys = filteredCitys.filter((city, i) =>
    filterDoctors.find(doc => doc.cityId === city.id),
  );

  setDoctors(filterDoctors);
  setGender(setGenderOnly);
  setFilteredCitys(filterCitys);
  setSpecialtys(filterSpecialtys);
};
