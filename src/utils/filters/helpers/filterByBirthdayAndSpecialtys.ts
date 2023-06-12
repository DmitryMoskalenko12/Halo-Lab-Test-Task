import { IDoctors, ISpecialty, ICity, IValues } from '../../../types/types';
import calcAge from './calcAge';
export const filterByBirthdayAndSpecialtys = (
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
    const findOnlySpec = filteredSpecialtys.find(spec =>
      doctorsAll.find(
        doc => doc.specialityId === spec.id && doc.isPediatrician,
      ),
    );
    const findOnlyDoctors = doctorsAll.filter(
      doc => doc.specialityId === findOnlySpec?.id,
    );
    const filterCitys = filteredCitys.filter(city =>
      findOnlyDoctors.find(doc => doc.isPediatrician && city.id === doc.cityId),
    );

    setDoctors(findOnlyDoctors);
    setSpecialtys([{ ...findOnlySpec }]);
    setFilteredCitys(filterCitys);
  }
  if (age >= 16 && age <= 110) {
    const doctorsAll = filteredDoctors.filter(doctor => !doctor.isPediatrician);
    const findOnlySpec = filteredSpecialtys.find(spec =>
      doctorsAll.find(
        doc => doc.specialityId === spec.id && !doc.isPediatrician,
      ),
    );
    const findOnlyDoctors = doctorsAll.filter(
      doc => doc.specialityId === findOnlySpec?.id,
    );
    const filterCitys = filteredCitys.filter(city =>
      findOnlyDoctors.find(
        doc => !doc.isPediatrician && city.id === doc.cityId,
      ),
    );

    setDoctors(findOnlyDoctors);
    setSpecialtys([{ ...findOnlySpec }]);
    setFilteredCitys(filterCitys);
  }
};
