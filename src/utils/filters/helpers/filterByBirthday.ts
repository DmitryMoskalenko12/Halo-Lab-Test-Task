import {
  IDoctors,
  ISpecialty,
  ICity,
  IGender,
  IValues,
} from '../../../types/types';
import calcAge from './calcAge';
export const filterByBirthday = (
  values: IValues,
  doctors: IDoctors[],
  filteredDoctors: IDoctors[],
  setDoctors: Function,
  specialtys: ISpecialty[],
  filteredSpecialtys: ISpecialty[],
  setSpecialtys: Function,
  city: ICity[],
  gender: IGender[],
  setGender: Function,
  filteredCitys: ICity[],
  setFilteredCitys: Function,
) => {
  const age = calcAge(values.Birthday);
  if (values.Birthday.length === 10) {
    if (age <= 16 && age > 0) {
      const doctorsAll = filteredDoctors.filter(
        doctor => doctor.isPediatrician,
      );
      const filterSpecialtys = filteredSpecialtys.filter(spec =>
        doctorsAll.find(
          doc => doc.specialityId === spec.id && ( ((spec?.params?.maxAge || 17) <= 16 && age <= 16) || !spec.params?.maxAge ) ,
        ),
      );
      const filterDoctors = doctorsAll.filter(doc => filterSpecialtys.find(spec => spec.id === doc.specialityId))
      const filterCitys = filteredCitys.filter(city =>
        filterDoctors.find(doc => doc.cityId === city.id),
      );
      setDoctors(filterDoctors);
      setFilteredCitys(filterCitys);
      setSpecialtys(filterSpecialtys);
    }
    if (age > 16 && age <= 110) {
      const doctorsAll = filteredDoctors.filter(
        doctor => !doctor.isPediatrician,
      );
      const filterSpecialtys = filteredSpecialtys.filter(spec =>
        doctorsAll.find(
          doc => doc.specialityId === spec.id && ( ((spec?.params?.minAge || 0) >= 45 && age >= 45) || !spec.params?.minAge ) ,
        ),
      );
      const filterDoctors = doctorsAll.filter(doc => filterSpecialtys.find(spec => spec.id === doc.specialityId))
      const filterCitys = filteredCitys.filter(city =>
        filterDoctors.find(doc => doc.cityId === city.id),
      );
      setDoctors(filterDoctors);
      setFilteredCitys(filterCitys);
      setSpecialtys(filterSpecialtys);
    }
  } else {
    setDoctors(doctors);
    setFilteredCitys(city);
    setGender(gender);
    setSpecialtys(specialtys);
  }
};
