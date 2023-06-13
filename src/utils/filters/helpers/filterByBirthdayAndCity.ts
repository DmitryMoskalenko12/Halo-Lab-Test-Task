import calcAge from './calcAge';
import { IDoctors, ISpecialty, ICity, IValues } from '../../../types/types';
export const filterByBirthdayAndCity = (
  values: IValues,
  filteredDoctors: IDoctors[],
  setDoctors: React.Dispatch<React.SetStateAction<IDoctors[]>>,
  filteredSpecialtys: ISpecialty[],
  setSpecialtys: React.Dispatch<React.SetStateAction<ISpecialty[]>>,
  filteredCitys: ICity[],
  setFilteredCitys: React.Dispatch<React.SetStateAction<ICity[]>>,
  setFieldValue: Function,
) => {
  const age = calcAge(values.Birthday);
  if (age <= 16 && age > 0) {
    const doctorsAll = filteredDoctors.filter(doctor => doctor.isPediatrician);
    const filterSpecialtys = filteredSpecialtys.filter(spec =>
      doctorsAll.find(
        doc =>
          doc.specialityId === spec.id &&
          (((spec?.params?.maxAge || 17) <= 16 && age <= 16) ||
            !spec.params?.maxAge),
      ),
    );
    const filterDoctors = doctorsAll.filter(doc =>
      filterSpecialtys.find(spec => spec.id === doc.specialityId),
    );

    const filterCitys = filteredCitys.filter(city =>
      filterDoctors.find(doc => doc.isPediatrician && city.id === doc.cityId),
    );
    const findOnlyCity = filterCitys.find(city => city.name === values.City);
    const findOnlyDocTown = filterDoctors.filter(
      doc => doc.cityId === findOnlyCity?.id,
    );
    const findOnlySpec = filterSpecialtys.filter((spec, i) =>
      findOnlyDocTown.find(doc => doc.specialityId === spec.id),
    );

    setDoctors(findOnlyDocTown);
    setSpecialtys(findOnlySpec);
    findOnlyCity?.name
      ? setFilteredCitys([{ ...findOnlyCity }])
      : setFieldValue('City', 'Not found');
  }
  if (age > 16 && age <= 110) {
    const doctorsAll = filteredDoctors.filter(doctor => !doctor.isPediatrician);
    const filterSpecialtys = filteredSpecialtys.filter(spec =>
      doctorsAll.find(
        doc =>
          doc.specialityId === spec.id &&
          (((spec?.params?.minAge || 0) >= 45 && age >= 45) ||
            !spec.params?.minAge),
      ),
    );
    const filterDoctors = doctorsAll.filter(doc =>
      filterSpecialtys.find(spec => spec.id === doc.specialityId),
    );

    const filterCitys = filteredCitys.filter(city =>
      filterDoctors.find(doc => !doc.isPediatrician && city.id === doc.cityId),
    );
    const findOnlyCity = filterCitys.find(city => city.name === values.City);
    const findOnlyDocTown = filterDoctors.filter(
      doc => doc.cityId === findOnlyCity?.id,
    );
    const findOnlySpec = filterSpecialtys.filter((spec, i) =>
      findOnlyDocTown.find(doc => doc.specialityId === spec.id),
    );

    setDoctors(findOnlyDocTown);
    setSpecialtys(findOnlySpec);
    findOnlyCity?.name
      ? setFilteredCitys([{ ...findOnlyCity }])
      : setFieldValue('City', 'Not found');
  }
};
