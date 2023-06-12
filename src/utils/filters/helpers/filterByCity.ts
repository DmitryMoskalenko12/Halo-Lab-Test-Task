import {
  IDoctors,
  ISpecialty,
  ICity,
  IGender,
  IValues,
} from '../../../types/types';

export const filterByCity = (
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
  const findCity = filteredCitys.filter(city => city.name === values.City);
  const filterDoctors = filteredDoctors.filter((doc, i) =>
    findCity.find(city => city.id === doc.cityId),
  );
  const filterSpecialty = filteredSpecialtys.filter((spec, i) =>
    filterDoctors.find(doc => doc.specialityId === spec.id),
  );
  const findSex = gender.filter(sex =>
    filterSpecialty.find(
      spec => spec.params?.gender === sex.value || !spec.params?.gender,
    ),
  );
  if (filterDoctors) {
    setDoctors(filterDoctors);
  }
  if (filterSpecialty) {
    setSpecialtys(filterSpecialty);
  }
  if (findCity) {
    setFilteredCitys(findCity);
  }
  if (findSex) {
    setGender(findSex);
  }
};
