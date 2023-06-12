import calcAge from './calcAge';
import { IDoctors, ISpecialty, ICity, IValues } from '../../../types/types';
export const filterByBirthdayAndCity = (
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
    const findOnlyCity = filterCitys.find(city => city.name === values.City);
    const findOnlyDocTown = doctorsAll.filter(
      doc => doc.cityId === findOnlyCity?.id,
    );
    const findOnlySpec = filterSpecialtys.filter((spec, i) =>
      findOnlyDocTown.find(doc => doc.specialityId === spec.id),
    );

    setDoctors(findOnlyDocTown);
    setSpecialtys(findOnlySpec);
    setFilteredCitys([{ ...findOnlyCity }]);
  }
  if (age >= 16 && age <= 110) {
    const doctorsAll = filteredDoctors.filter(doctor => !doctor.isPediatrician);
    const filterSpecialtys = filteredSpecialtys.filter(spec =>
      doctorsAll.find(
        doc => doc.specialityId === spec.id && !doc.isPediatrician,
      ),
    );
    const filterCitys = filteredCitys.filter(city =>
      doctorsAll.find(doc => !doc.isPediatrician && city.id === doc.cityId),
    );
    const findOnlyCity = filterCitys.find(city => city.name === values.City);
    const findOnlyDocTown = doctorsAll.filter(
      doc => doc.cityId === findOnlyCity?.id,
    );
    const findOnlySpec = filterSpecialtys.filter((spec, i) =>
      findOnlyDocTown.find(doc => doc.specialityId === spec.id),
    );

    setDoctors(findOnlyDocTown);
    setSpecialtys(findOnlySpec);
    setFilteredCitys([{ ...findOnlyCity }]);
  }
};
