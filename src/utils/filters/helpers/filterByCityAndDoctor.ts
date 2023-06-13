import { IDoctors, ISpecialty, IValues } from '../../../types/types';
export const filterByCityAndDoctor = (
  values: IValues,
  filteredDoctors: IDoctors[],
  filteredSpecialtys: ISpecialty[],
  setSpecialtys: React.Dispatch<React.SetStateAction<ISpecialty[]>>,
  setDoctors: Function,
) => {
  const getDoctor = values.Doctor.split(' ');
  const findDoctor = filteredDoctors.find(
    doc => doc.name === getDoctor[0] && doc.surname === getDoctor[1],
  );
  const findSpec = filteredSpecialtys.filter(
    spec => findDoctor?.specialityId === spec.id,
  );

  setDoctors([{ ...findDoctor }]);
  setSpecialtys(findSpec);
};
