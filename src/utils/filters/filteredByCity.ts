import { IDoctors, ICity } from '../../types/types';

export const filteredByCity = (
  value: string,
  doctors: IDoctors[],
  filteredDoctors: IDoctors[],
  cities: ICity[],
  setFieldValue: Function,
  setDoctors: Function,
) => {
  if (value) {
    setFieldValue('City', value);
    const city = cities.find(city => city.name === value);
    const doctorsAll = doctors.filter(
      (doctor, i) => doctor.cityId === city?.id,
    );
    setDoctors(doctorsAll);
  }
};
