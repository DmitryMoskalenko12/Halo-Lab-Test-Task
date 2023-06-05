import { ISpecialty } from "../../types/types";

export const handleSexChange = (value: string, doctorsSpecialty: ISpecialty[], setFieldValue: Function, setDoctorsSpecialty: Function ) => {
  setFieldValue("Sex", value);
  const filteredSpecialties = doctorsSpecialty.filter(specialty => {
    if (value === "Female") {
      return !specialty.params || !specialty.params.gender || specialty.params.gender === value;
    } else if (value === "Male") {
      return !specialty.params || !specialty.params.gender || specialty.params.gender === value;
    } else {
      return true;
    }
  });
  setDoctorsSpecialty(filteredSpecialties);
};