import { IDoctors, ISpecialty, ICity } from "../../types/types";

interface values {
  Name: string,
  Birthday: string,
  Sex: string,
  City: string,
  Specialty: string,
  Doctor:string,
  Email: string,
  Phone: string,
}

const filter = (values: values, doctors: IDoctors[], filteredDoctors:IDoctors[], setDoctors: Function, specialtys: ISpecialty[], filteredSpecialtys: ISpecialty[], setSpecialtys: Function, city: ICity[], setFieldValue: Function, ) => {

/* фильтрация по дате рождения */

  if (values.Birthday && !values.City && !values.Doctor && !values.Sex && !values.Specialty) {
    setFieldValue('Birthday', values.Birthday);
    const [day, month, year] = values.Birthday.split('/');
    const birthday = new Date(Number(year), Number(month) - 1, Number(day));
    const currentDate = new Date();
    const age = Math.floor(
      (currentDate.getTime() - birthday.getTime()) /
        (365.25 * 24 * 60 * 60 * 1000),
    );
    if (values.Birthday.length === 10) {
      if (age < 16) {
        const doctorsAll = doctors.filter(doctor => doctor.isPediatrician);
        setDoctors(doctorsAll);
      }

      if (age >= 16) {
        const doctorsAll = doctors.filter(
          doctor => doctor.isPediatrician === false,
        );
        setDoctors(doctorsAll);
      } 
    } else {
      setDoctors(doctors)
    }
  } else {
    setDoctors(doctors)
  }

/* фильтрация по городу */

  if (values.City && !values.Doctor && !values.Sex && !values.Specialty && !values.Birthday) {
    setFieldValue('City', values.City);
    const citys = city.find(city => city.name === values.City);
    const doctorsAll = doctors.filter(
      (doctor, i) => doctor.cityId === citys?.id,
    );
    setDoctors(doctorsAll);
  }
/* фильтрация по полу */

  if (values.Sex) {
    setFieldValue('Sex', values.Sex);
    const filteredSpecialties = specialtys.filter(specialty => {
      if (values.Sex === 'Female') {
        return (
          !specialty.params ||
          !specialty.params.gender ||
          specialty.params.gender === values.Sex
        );
      } else if (values.Sex === 'Male') {
        return (
          !specialty.params ||
          !specialty.params.gender ||
          specialty.params.gender === values.Sex
        );
      } else {
        return true;
      }
    });
   
    setSpecialtys(filteredSpecialties);
  }

/* автоматически ставим специальность и город от выбранного доктора */

  if ((!values.Sex || values.Sex) && !values.Birthday && !values.City && values.Doctor && !values.Specialty) {
    const nameDoctor = values.Doctor.split(' ');
    const selectedDoctor = doctors.find(
      doctor => doctor.name === nameDoctor[0] && doctor.surname === nameDoctor[1],
    );
    if (selectedDoctor) {
      const selectedCity = city.find(city => city.id === selectedDoctor.cityId);
      const selectedSpecialty = specialtys.find(
        specialty => specialty.id === selectedDoctor.specialityId,
      );
      if (selectedCity) {
        setFieldValue('City', selectedCity.name);
      }
      if (selectedSpecialty) {
        setFieldValue('Specialty', selectedSpecialty.name);
      }
    }
  }

/* фильтрация докторов по специальности */

  if (!values.Sex && !values.Birthday && !values.City && !values.Doctor && values.Specialty) {
    setFieldValue('Specialty', values.Specialty);
    const specialty = filteredSpecialtys.find(
      specialty => specialty.name === values.Specialty,
    );
    const doctorsAll = doctors.filter(doctor => {
      return doctor.specialityId === specialty?.id;
    });
    setDoctors(doctorsAll);
  }

  /* Вариации */

  if (values.City && values.Specialty && values.Doctor) {
    const filteredCity = city.find(item => item.name === values.City);
    const filteredSpecialty = specialtys.find(
      item => item.name === values.Specialty,
    );
    const filteredDoctors = doctors.filter(
      (item, i) =>
        item.cityId === filteredCity?.id &&
        item.specialityId === filteredSpecialty?.id 
    );
    setFieldValue('Specialty', values.Specialty)
    setDoctors(filteredDoctors);
    
  }

  if (values.Doctor && values.City && !values.Specialty ) {
    const nameDoctor = values.Doctor.split(' ');
    const selectedDoctor = doctors.find(
      doctor => doctor.name === nameDoctor[0] && doctor.surname === nameDoctor[1],
    );

    const selectedSpecialty = specialtys.find(
      specialty => specialty.id === selectedDoctor?.specialityId,
    );

    if (selectedDoctor) {
      setFieldValue('Specialty', selectedSpecialty?.name)
    }
  }

  if (values.City && values.Specialty && !values.Doctor ) {
    const citys = city.find(city => city.name === values.City);
    const spec = specialtys.find(spec => spec.name === values.Specialty);
    const filteredDoctors = doctors.find(doc => doc.cityId === citys?.id && doc.specialityId === spec?.id )
    setFieldValue('Doctor', filteredDoctors?.name || 'Not found')
  } 

  if (values.Specialty && !values.Doctor && !values.City) {
    const specialty = specialtys.find(spec => spec.name === values.Specialty);
    const doctorsAll = doctors.filter(
      (doctor, i) => doctor.specialityId === specialty?.id,
    );
    setDoctors(doctorsAll);
  }

  if (values.Specialty && values.Doctor && !values.City) {
    const nameDoctor = values.Doctor.split(' ');
    const selectedDoctor = doctors.find(
      doctor => doctor.name === nameDoctor[0] && doctor.surname === nameDoctor[1],
    );
   if (selectedDoctor) {
    const citys = city.find(
      (city, i) => city.id === selectedDoctor.cityId,
    );
    setFieldValue('City', citys?.name)
   }
  }

  if (values.Sex && values.City && !values.Doctor && !values.Specialty) {
    setFieldValue('City', values.City);
    const citys = city.find(city => city.name === values.City);
    const doctorsAll = doctors.filter(
      (doctor, i) => doctor.cityId === citys?.id,
    );
    setDoctors(doctorsAll);
  }

}

export default filter;