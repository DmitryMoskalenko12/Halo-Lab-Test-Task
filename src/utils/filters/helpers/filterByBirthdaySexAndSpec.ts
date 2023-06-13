import { IDoctors, ISpecialty, ICity, IValues } from '../../../types/types';
import calcAge from './calcAge';
export const filterByBirthdaySexAndSpec = (
  values: IValues,
  filteredDoctors: IDoctors[],
  setDoctors: React.Dispatch<React.SetStateAction<IDoctors[]>>,
  filteredSpecialtys: ISpecialty[],
  setSpecialtys: Function,
  filteredCitys: ICity[],
  setFilteredCitys: React.Dispatch<React.SetStateAction<ICity[]>>,
) => {
  const age = calcAge(values.Birthday);
  if (age <= 16 && age > 0) {
    const doctorsAll = filteredDoctors.filter(doctor => doctor.isPediatrician);
    const filteredSpec = filteredSpecialtys.find(
      spec =>
        spec.name === values.Specialty &&
        (((spec?.params?.maxAge || 17) <= 16 && age <= 16) ||
          !spec.params?.maxAge),
    );
    const filterDoctors = doctorsAll.filter(
      (doc, i) =>
        filteredSpec?.id === doc.specialityId &&
        (filteredSpec.params?.maxAge || !filteredSpec.params?.maxAge) &&
        (!filteredSpec.params ||
          !filteredSpec.params.gender ||
          filteredSpec.params.gender === values.Sex),
    );
    const filterCitys = filteredCitys.filter(city =>
      filterDoctors.find(doc => doc.isPediatrician && city.id === doc.cityId),
    );

    setDoctors(filterDoctors);
    setSpecialtys([{ ...filteredSpec }]);
    setFilteredCitys(filterCitys);
  }
  if (age > 16 && age <= 110) {
    const doctorsAll = filteredDoctors.filter(doctor => !doctor.isPediatrician);
    const filteredSpec = filteredSpecialtys.find(
      spec =>
        spec.name === values.Specialty &&
        (((spec?.params?.minAge || 0) >= 45 && age >= 45) ||
          !spec.params?.minAge),
    );
    const filterDoctors = doctorsAll.filter(
      (doc, i) =>
        filteredSpec?.id === doc.specialityId &&
        (filteredSpec.params?.minAge || !filteredSpec.params?.minAge) &&
        (!filteredSpec.params ||
          !filteredSpec.params.gender ||
          filteredSpec.params.gender === values.Sex),
    );
    const filterCitys = filteredCitys.filter(city =>
      filterDoctors.find(doc => !doc.isPediatrician && city.id === doc.cityId),
    );

    setDoctors(filterDoctors);
    setSpecialtys([{ ...filteredSpec }]);
    setFilteredCitys(filterCitys);
  }
};
