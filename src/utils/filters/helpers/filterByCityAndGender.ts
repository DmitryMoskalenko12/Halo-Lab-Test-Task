import {
  IDoctors,
  ISpecialty,
  ICity,
  IGender,
  IValues,
} from '../../../types/types';
export const filterByCityAndGender = (
  values: IValues,
  filteredDoctors: IDoctors[],
  setDoctors: React.Dispatch<React.SetStateAction<IDoctors[]>>,
  filteredSpecialtys: ISpecialty[],
  setSpecialtys: React.Dispatch<React.SetStateAction<ISpecialty[]>>,
  gender: IGender[],
  filteredCitys: ICity[],
  setFilteredCitys: Function,
) => {
  const filterCity = filteredCitys.filter(city => city.name === values.City);
  const findCity = filterCity.find(city => city.name === values.City);
  const findSex = gender.find(sex => sex.value === values.Sex);

  const filterDoctors = filteredDoctors.filter((doc, i) => {
    return filterCity.find(city => city.id === doc.cityId);
  });
  const filterSpecialty = filteredSpecialtys.filter((spec, i) => {
    return filterDoctors.find(
      doc =>
        doc.specialityId === spec.id &&
        (spec.params?.gender === findSex?.value || !spec.params?.gender),
    );
  });
  const filterDoctorsBySpec = filterDoctors.filter(doc =>
    filterSpecialty.find(spec => spec.id === doc.specialityId),
  );
  filterSpecialty.length === 0
    ? setDoctors([])
    : setDoctors(filterDoctorsBySpec);
  setSpecialtys(filterSpecialty);
  setFilteredCitys([{ ...findCity }]);
};
