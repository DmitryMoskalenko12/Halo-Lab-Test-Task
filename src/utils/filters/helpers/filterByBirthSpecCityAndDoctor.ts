import { IDoctors, ISpecialty, ICity, IValues } from '../../../types/types';
import calcAge from './calcAge';

export const filterByBirthSpecCityAndDoctor = (
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
    const filterSpecialtys = filteredSpecialtys.filter(spec =>
      doctorsAll.find(
        doc => doc.specialityId === spec.id && ( ((spec?.params?.maxAge || 17) <= 16 && age <= 16) || !spec.params?.maxAge ) ,
      ),
    );
    const filterDoctors = doctorsAll.filter(doc => filterSpecialtys.find(spec => spec.id === doc.specialityId))
    const filterCitys = filteredCitys.filter(city =>
      filterDoctors.find(doc => doc.isPediatrician && city.id === doc.cityId),
    );

    setDoctors(filterDoctors);
    setSpecialtys(filterSpecialtys);
    setFilteredCitys(filterCitys);
  }
  if (age >= 16 && age <= 110) {
    const doctorsAll = filteredDoctors.filter(doctor => !doctor.isPediatrician);
    const filterSpecialtys = filteredSpecialtys.filter(spec =>
      doctorsAll.find(
        doc => doc.specialityId === spec.id && ( ((spec?.params?.minAge || 0) >= 45 && age >= 45) || !spec.params?.minAge ) ,
      ),
    );
    const filterDoctors = doctorsAll.filter(doc => filterSpecialtys.find(spec => spec.id === doc.specialityId))
    const filterCitys = filteredCitys.filter(city =>
      filterDoctors.find(doc => !doc.isPediatrician && city.id === doc.cityId),
    );

    setDoctors(filterDoctors);
    setFilteredCitys(filterCitys);
    setSpecialtys(filterSpecialtys);
  }
};
