import { IDoctors, ISpecialty } from '../../types/types';

export const filterBySpecialty = (
  value: string,
  doctors: IDoctors[],
  doctorsSpecialty: ISpecialty[],
  setFieldValue: Function,
  setDoctors: Function,
) => {
  if (value) {
    setFieldValue('Specialty', value);
    const specialty = doctorsSpecialty.find(
      specialty => specialty.name === value,
    );
    const doctorsAll = doctors.filter(doctor => {
      return doctor.specialityId === specialty?.id;
    });
    console.log(doctorsAll);
    setDoctors(doctorsAll);
  }
};
