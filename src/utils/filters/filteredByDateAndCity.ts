import { ICity, ISpecialty, IDoctors } from '../../types/types';
import { filterByDate } from './filteredByDate';

export const filteredByDateAndCity = (
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
  setFieldValue: Function,
  filteredDoctor:IDoctors[]
) => {
if (valuesCity && valuesBirthday) {
  const [day, month, year] = valuesBirthday.split('/');
  const birthday = new Date(Number(year), Number(month) - 1, Number(day));
  const currentDate = new Date();
  const age = Math.floor(
    (currentDate.getTime() - birthday.getTime()) /
      (365.25 * 24 * 60 * 60 * 1000),
  );
  const city = citys.find(item => item.name === valuesCity);

  if (age < 16) {
    const filteredDoctors = filteredDoctor.filter(doc => doc.cityId && city?.id && doc.isPediatrician);
    setDoctors(filteredDoctors)
  }
  if (age >= 16) {
    const filteredDoctors = filteredDoctor.filter(doc => doc.cityId && city?.id && doc.isPediatrician === false);
    setDoctors(filteredDoctors)
  }

}
};