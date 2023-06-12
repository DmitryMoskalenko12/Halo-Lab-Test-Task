import { IDoctors, ISpecialty, ICity, IValues } from '../../../types/types';
import calcAge from './calcAge';
export const filterByBirthdayAndGender = (
  values: IValues,
  filteredDoctors: IDoctors[],
  setDoctors: Function,
  filteredSpecialtys: ISpecialty[],
  setSpecialtys: Function,
  filteredCitys: ICity[],
  setFilteredCitys: Function,
) => {
  const age = calcAge(values.Birthday);
  if (age < 16 && age > 0) {
    const doctorsAll = filteredDoctors.filter(doctor => doctor.isPediatrician);
    const filteredSpec = filteredSpecialtys.filter(spec =>
      doctorsAll.find(
        doc =>
          doc.specialityId === spec.id &&
          (spec.params?.maxAge || !spec.params?.maxAge) &&
          (!spec.params ||
            !spec.params.gender ||
            spec.params.gender === values.Sex),
      ),
    );
    const filterDoctors = doctorsAll.filter((doc, i) =>
      filteredSpec.find(spec => spec.id === doc.specialityId),
    );
    const filterCitys = filteredCitys.filter(city =>
      filterDoctors.find(doc => doc.isPediatrician && city.id === doc.cityId),
    );

    setDoctors(filterDoctors);
    setSpecialtys(filteredSpec);
    setFilteredCitys(filterCitys);
  }
  if (age >= 16 && age <= 110) {
    const doctorsAll = filteredDoctors.filter(doctor => !doctor.isPediatrician);
    const filteredSpec = filteredSpecialtys.filter(spec =>
      doctorsAll.find(
        doc =>
          doc.specialityId === spec.id &&
          (spec.params?.minAge || !spec.params?.minAge) &&
          (!spec.params ||
            !spec.params.gender ||
            spec.params.gender === values.Sex),
      ),
    );
    const filterDoctors = doctorsAll.filter((doc, i) =>
      filteredSpec.find(spec => spec.id === doc.specialityId),
    );
    const filterCitys = filteredCitys.filter(city =>
      filterDoctors.find(doc => !doc.isPediatrician && city.id === doc.cityId),
    );

    setDoctors(filterDoctors);
    setSpecialtys(filteredSpec);
    setFilteredCitys(filterCitys);
  }
};
