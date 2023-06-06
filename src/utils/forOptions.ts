import { IDoctors, ICity, ISpecialty } from '../types/types';

const forOptions = (
  doctors: IDoctors[],
  cities: ICity[],
  specialties: ISpecialty[],
) => {
  const transformeCities = cities.map((city, i) => ({
    id: String(i),
    value: city.name,
  }));

  const transformeSpecialties = specialties.map((spec, i) => ({
    id: String(i),
    value: spec.name,
  }));

  const transformeDoctors = doctors.map(doctor => ({
    id: doctor.id,
    value: `${doctor.name} ${doctor.surname}`,
  }));

  return { transformeCities, transformeSpecialties, transformeDoctors };
};

export default forOptions;
