import { ISpecialty, ICity, IDoctors } from '../../types/types';

export const handleDoctorChange = (
  value: string,
  doctors: IDoctors[],
  citys: ICity[],
  specialty: ISpecialty[],
  setFieldValue: Function,
) => {
  const nameDoctor = value.split(' ');
  const selectedDoctor = doctors.find(
    doctor => doctor.name === nameDoctor[0] && doctor.surname === nameDoctor[1],
  );
  if (selectedDoctor) {
    const selectedCity = citys.find(city => city.id === selectedDoctor.cityId);
    const selectedSpecialty = specialty.find(
      specialty => specialty.id === selectedDoctor.specialityId,
    );
    if (selectedCity) {
      setFieldValue('City', selectedCity.name);
    }
    if (selectedSpecialty) {
      setFieldValue('Specialty', selectedSpecialty.name);
    }
  }
};
