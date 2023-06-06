import { ICity, ISpecialty, IDoctors } from '../../types/types';

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
) => {
  if (valuesCity && valuesSpecialty) {
    const filteredCity = citys.find(item => item.name === valuesCity);
    const filteredSpecialty = specialtys.find(
      item => item.name === valuesSpecialty,
    );
    const filteredDoctors = doctors.filter(
      item =>
        item.cityId === filteredCity?.id &&
        item.specialityId === filteredSpecialty?.id
    );
    setDoctors(filteredDoctors);
  }

  if (valuesCity && valuesSpecialty && valueSex) {
    const filteredCity = citys.find(item => item.name === valuesCity);
    const filteredSpecialty = specialtys.find(
      item =>
        item.name === valuesSpecialty &&
        (item.params?.gender === valueSex || !item.params?.gender),
    );
    const filteredDoctors = doctors.filter(
      item =>
        item.cityId === filteredCity?.id &&
        item.specialityId === filteredSpecialty?.id,
    );
    setDoctors(filteredDoctors);
  }

  /* if (
    valuesCity &&
    valuesSpecialty &&
    valueSex &&
    doctorValue &&
    valuesBirthday
  ) {
    const filteredCity = citys.find(item => item.name === valuesCity);
    const filteredSpecialty = specialtys.find(
      item =>
        item.name === valuesSpecialty &&
        (item.params?.gender === valueSex || !item.params?.gender),
    );

    const filteredDoctors = doctors.filter(
      item =>
        item.cityId === filteredCity?.id &&
        item.specialityId === filteredSpecialty?.id &&
        item.isPediatrician,
    );
    setDoctors(filteredDoctors);
  } */
};
