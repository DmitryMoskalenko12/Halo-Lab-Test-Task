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
  setDoctors: React.Dispatch<React.SetStateAction<IDoctors[]>>,
  filteredSpecialtys: ISpecialty[],
  setSpecialtys: React.Dispatch<React.SetStateAction<ISpecialty[]>>,
  gender: IGender[],
  setGender: React.Dispatch<React.SetStateAction<IGender[]>>,
  filteredCitys: ICity[],
  setFilteredCitys: React.Dispatch<React.SetStateAction<ICity[]>>,
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
