import { IDoctors, ICity, IValues } from '../../../types/types';
export const filterBySpecialtyAndDoctor = (
  values: IValues,
  filteredDoctors: IDoctors[],
  setDoctors: React.Dispatch<React.SetStateAction<IDoctors[]>>,
  filteredCitys: ICity[],
  setFilteredCitys: React.Dispatch<React.SetStateAction<ICity[]>>,
) => {
  const getDoctor = values.Doctor.split(' ');
  const findDoctor = filteredDoctors.filter(
    doc => doc.name === getDoctor[0] && doc.surname === getDoctor[1],
  );
  const filterCitys = filteredCitys.filter((city, i) => {
    return findDoctor.find(doc => doc.cityId === city.id);
  });
  setDoctors(findDoctor);
  setFilteredCitys(filterCitys);
};
