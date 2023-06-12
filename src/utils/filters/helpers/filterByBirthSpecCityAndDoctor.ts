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
        doc => doc.specialityId === spec.id && doc.isPediatrician,
      ),
    );
    const filterCitys = filteredCitys.filter(city =>
      doctorsAll.find(doc => doc.isPediatrician && city.id === doc.cityId),
    );
    const filteredDoctor = doctorsAll.filter((doc, i) =>
      filterSpecialtys.find(spec => spec.id === doc.specialityId),
    );

    setDoctors(filteredDoctor);
    setSpecialtys(filterSpecialtys);
    setFilteredCitys(filterCitys);
  }
  if (age >= 16 && age <= 110) {
    const doctorsAll = filteredDoctors.filter(doctor => !doctor.isPediatrician);
    const filterSpecialtys = filteredSpecialtys.filter(spec =>
      doctorsAll.find(
        doc => doc.specialityId === spec.id && !doc.isPediatrician,
      ),
    );
    const filterCitys = filteredCitys.filter(city =>
      doctorsAll.find(doc => doc.cityId === city.id),
    );
    const filteredDoctor = doctorsAll.filter(doc =>
      filterSpecialtys.find(
        spec => spec.id === doc.specialityId && !doc.isPediatrician,
      ),
    );
    setDoctors(filteredDoctor);
    setFilteredCitys(filterCitys);
    setSpecialtys(filterSpecialtys);
  }
};
