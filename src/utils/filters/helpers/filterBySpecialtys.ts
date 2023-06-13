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
  setDoctors: React.Dispatch<React.SetStateAction<IDoctors[]>>,
  filteredSpecialtys: ISpecialty[],
  setSpecialtys: React.Dispatch<React.SetStateAction<ISpecialty[]>>,
  gender: IGender[],
  setGender: React.Dispatch<React.SetStateAction<IGender[]>>,
  filteredCitys: ICity[],
  setFilteredCitys: React.Dispatch<React.SetStateAction<ICity[]>>,
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
