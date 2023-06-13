import { IDoctors, ISpecialty, ICity, IValues } from '../../../types/types';
import calcAge from './calcAge';
export const filterByBirthdayAndGender = (
  values: IValues,
  filteredDoctors: IDoctors[],
  setDoctors: React.Dispatch<React.SetStateAction<IDoctors[]>>,
  filteredSpecialtys: ISpecialty[],
  setSpecialtys: React.Dispatch<React.SetStateAction<ISpecialty[]>>,
  filteredCitys: ICity[],
  setFilteredCitys: React.Dispatch<React.SetStateAction<ICity[]>>,
) => {
  const age = calcAge(values.Birthday);
  if (age <= 16 && age > 0) {
    const doctorsAll = filteredDoctors.filter(doctor => doctor.isPediatrician);
    const filteredSpec = filteredSpecialtys.filter(spec =>
      doctorsAll.find(
        doc =>
          doc.specialityId === spec.id &&
          (spec.params?.maxAge || !spec.params?.maxAge) &&
          (!spec.params ||
            !spec.params.gender ||
            spec.params.gender === values.Sex) &&
          (((spec?.params?.maxAge || 17) <= 16 && age <= 16) ||
            !spec.params?.maxAge),
      ),
    );
    const filterDoctors = doctorsAll.filter(doc =>
      filteredSpec.find(spec => spec.id === doc.specialityId),
    );
    const filterCitys = filteredCitys.filter(city =>
      filterDoctors.find(doc => doc.isPediatrician && city.id === doc.cityId),
    );

    setDoctors(filterDoctors);
    setSpecialtys(filteredSpec);
    setFilteredCitys(filterCitys);
  }
  if (age > 16 && age <= 110) {
    const doctorsAll = filteredDoctors.filter(doctor => !doctor.isPediatrician);
    const filteredSpec = filteredSpecialtys.filter(spec =>
      doctorsAll.find(
        doc =>
          doc.specialityId === spec.id &&
          (spec.params?.minAge || !spec.params?.minAge) &&
          (!spec.params ||
            !spec.params.gender ||
            spec.params.gender === values.Sex) &&
          (((spec?.params?.minAge || 0) >= 45 && age >= 45) ||
            !spec.params?.minAge),
      ),
    );
    const filterDoctors = doctorsAll.filter(doc =>
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
