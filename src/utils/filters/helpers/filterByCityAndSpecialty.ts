import { IDoctors, ISpecialty, ICity, IValues } from '../../../types/types';
export const filterByCityAndSpecialty = (
  values: IValues,
  filteredDoctors: IDoctors[],
  setDoctors: Function,
  filteredSpecialtys: ISpecialty[],
  setSpecialtys: Function,
  filteredCitys: ICity[],
) => {
  const findCity = filteredCitys.find(city => city.name === values.City);
  const findSpec = filteredSpecialtys.find(
    spec => spec.name === values.Specialty,
  );
  const getDoctors = filteredDoctors.filter(
    doc => doc.specialityId === findSpec?.id,
  );
  const getDoctor = getDoctors.find(
    doc => doc.specialityId === findSpec?.id && doc.cityId === findCity?.id,
  );
  setSpecialtys([{ ...findSpec }]);
  setDoctors([{ ...getDoctor }]);
};
