import { IDoctors, ISpecialty, ICity, IValues } from '../../../types/types';
export const filterByCitySpecialtyAndSex = (
  values: IValues,
  filteredDoctors: IDoctors[],
  setDoctors: React.Dispatch<React.SetStateAction<IDoctors[]>>,
  filteredSpecialtys: ISpecialty[],
  filteredCitys: ICity[],
) => {
  const findCity = filteredCitys.find(city => city.name === values.City);
  const findSpec = filteredSpecialtys.find(
    spec => spec.name === values.Specialty,
  );
  const getDoctors = filteredDoctors.filter(
    doc => doc.specialityId === findSpec?.id && doc.cityId === findCity?.id,
  );
  setDoctors(getDoctors);
};
