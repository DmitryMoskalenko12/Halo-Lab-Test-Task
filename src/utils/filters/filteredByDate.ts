import { IDoctors } from "../../types/types";

export const filterByDate = (value: string, setFieldValue: Function, doctors: IDoctors[], setDoctors: Function) => {
  setFieldValue('Birthday', value);

  if (value) {
    const [day, month, year] = value.split("/");
    const birthday = new Date(Number(year), Number(month) - 1, Number(day));
    const currentDate = new Date();
    const age = Math.floor((currentDate.getTime() - birthday.getTime()) / (365.25 * 24 * 60 * 60 * 1000));

    if (value.length === 10) {
      if (age < 18) {
        const doctorsAll = doctors.filter(
          (doctor) => doctor.isPediatrician
        );
        setDoctors(doctorsAll);
      } 
       if (age >= 18) {
        const doctorsAll = doctors.filter(
          (doctor) =>
            doctor.isPediatrician === false
        );
        setDoctors(doctorsAll);
      }
    }
};
}