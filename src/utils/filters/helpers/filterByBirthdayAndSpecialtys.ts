import { IDoctors, ISpecialty, ICity, IValues } from '../../../types/types';
import calcAge from './calcAge';
export const filterByBirthdayAndSpecialtys = (
  values: IValues,
  filteredDoctors: IDoctors[],
  setDoctors: React.Dispatch<React.SetStateAction<IDoctors[]>>,
  filteredSpecialtys: ISpecialty[],
  setSpecialtys: Function,
  filteredCitys: ICity[],
  setFilteredCitys: React.Dispatch<React.SetStateAction<ICity[]>>,
) => {
  const age = calcAge(values.Birthday);
  if (age < 16 && age > 0) {
    const doctorsAll = filteredDoctors.filter(doctor => doctor.isPediatrician);
    const filterSpec = filteredSpecialtys.filter(spec =>
      doctorsAll.find(
        doc => doc.specialityId === spec.id && doc.isPediatrician,
      ),
    );
    const findOnlySpec = filterSpec.find(
      spec => spec.name === values.Specialty,
    );
    const filterOnlyDoctors = doctorsAll.filter(
      doc => findOnlySpec?.id === doc.specialityId,
    );
    const filterCitys = filteredCitys.filter(city =>
      filterOnlyDoctors.find(
        doc => doc.isPediatrician && city.id === doc.cityId,
      ),
    );

    setDoctors(filterOnlyDoctors);
    setSpecialtys([{ ...findOnlySpec }]);
    setFilteredCitys(filterCitys);
  }
  if (age >= 16 && age <= 110) {
    const doctorsAll = filteredDoctors.filter(doctor => !doctor.isPediatrician);
    const filterSpec = filteredSpecialtys.filter(spec =>
      doctorsAll.find(
        doc => doc.specialityId === spec.id && !doc.isPediatrician,
      ),
    );
    const findOnlySpec = filterSpec.find(
      spec => spec.name === values.Specialty,
    );
    const filterOnlyDoctors = doctorsAll.filter(
      doc => findOnlySpec?.id === doc.specialityId,
    );
    const filterCitys = filteredCitys.filter(city =>
      filterOnlyDoctors.find(
        doc => !doc.isPediatrician && city.id === doc.cityId,
      ),
    );

    setDoctors(filterOnlyDoctors);
    setSpecialtys([{ ...findOnlySpec }]);
    setFilteredCitys(filterCitys);
  }
};
