import { ICity, ISpecialty, IDoctors } from '../../types/types';
import { filterByDate } from './filteredByDate';

export const filteredByCityAndSpecialty = (
  valuesCity: string,
  valuesSpecialty: string,
  citys: ICity[],
  specialtys: ISpecialty[],
  doctors: IDoctors[],
  setDoctors: Function,
  valueGender: string,
  doctorValue: string,
  doctorsSpecialty: ISpecialty[],
  setFiltDocSpecialt: Function,
  valueSex: string,
  valuesBirthday: string,
  setCity: Function,
  setFieldValue: Function
) => {
  if (valuesCity && valuesSpecialty) {
    const filteredCity = citys.find(item => item.name === valuesCity);
    const filteredSpecialty = specialtys.find(
      item => item.name === valuesSpecialty,
    );
    const filteredDoctors = doctors.filter(
      (item, i) =>
        item.cityId === filteredCity?.id &&
        item.specialityId === filteredSpecialty?.id 
    );
    setFieldValue('Specialty', valuesSpecialty)
    setDoctors(filteredDoctors);
    
  }

/*   if (valueSex && valuesCity && valuesSpecialty && doctorValue) {
    const filteredSpecialtys = specialtys.find((spec, i) => spec.id ===  doctors[i].specialityId);
    const filteredDoctors = doctors.filter((doc, i) => doc.specialityId === filteredSpecialtys?.id);
    setDoctors(filteredDoctors)
  } */
};
