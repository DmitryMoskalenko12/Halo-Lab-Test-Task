import { IDoctors, ISpecialty, ICity, IGender } from "../../types/types";
import { IValues } from "../../types/types";
import calcAge from "./helpers/calcAge";

const filter = (values: IValues, doctors: IDoctors[], filteredDoctors:IDoctors[], setDoctors: Function, specialtys: ISpecialty[], filteredSpecialtys: ISpecialty[], setSpecialtys: Function, city: ICity[], setFieldValue: Function, setCitys: Function, gender: IGender[], setGender: Function, filteredCitys: ICity[], setFilteredCitys: Function) => {

/* фильтрация докторов в зависимости от дата рождения пациента */

  if (values.Birthday) {
    setFieldValue('Birthday', values.Birthday);
    const age = calcAge(values.Birthday);
    if (values.Birthday.length === 10) {
      if (age < 16 && age > 0) {
        const doctorsAll = doctors.filter(doctor => doctor.isPediatrician);
        setDoctors(doctorsAll);
      }
      if (age >= 16 && age <= 110) {
        const doctorsAll = doctors.filter(
          doctor => !doctor.isPediatrician,
        );
        setDoctors(doctorsAll);
      } 
    } else {
      setDoctors(doctors)
    }
  } else {
    setDoctors(doctors)
  }
/* _________________________________ */
  if (values.City) {
    const findCity = filteredCitys.filter(city => city.name === values.City);
    const filterDoctors = doctors.filter((doc, i) => {
      return findCity.find(city => city.id === doc.cityId)
    });
    const filterSpecialty = specialtys.filter((spec, i) => {
      return filterDoctors.find(doc => doc.specialityId === spec.id)
    });

    if (filterDoctors.length > 0) {
      setDoctors(filterDoctors)
    }
    if (filterSpecialty.length > 0) {
      setSpecialtys(filterSpecialty)
    }
    if (findCity.length > 0) {
      setCitys(findCity)
    }
  } 

   if (values.City && values.Doctor) {
    const getDoctor = values.Doctor.split(' ');
    const findDoctor = filteredDoctors.find(doc => doc.name === getDoctor[0] && doc.surname === getDoctor[1])
    console.log(findDoctor)
    const findSpec = filteredSpecialtys.filter(spec =>  findDoctor?.specialityId === spec.id);  
    setSpecialtys(findSpec)  
  }

  if (values.City && values.Specialty) {
    const findSpec = filteredSpecialtys.find(spec => spec.name === values.Specialty);
    const getDoctor = filteredDoctors.filter(doc => doc.specialityId === findSpec?.id);
    setDoctors(getDoctor);
  }

  if (values.Doctor) {
    const getDoctor = values.Doctor.split(' ');
    const findDoctor = filteredDoctors.find(doc => doc.name === getDoctor[0] && doc.surname === getDoctor[1])
    const findSpec = filteredSpecialtys.filter(spec =>  findDoctor?.specialityId === spec.id); 
    const findCity = filteredCitys.filter(city => city.id === findDoctor?.cityId);
    setSpecialtys(findSpec);
    setCitys(findCity);
  }

  if (values.Specialty) {
    const findSpecialty = filteredSpecialtys.find(spec => spec.name === values.Specialty);
    const filterDoctors = filteredDoctors.filter(doc => doc.specialityId === findSpecialty?.id);
    const filterCitys = filteredCitys.filter((city, i) => filterDoctors.find(doc => doc.cityId === city.id));
    setCitys(filterCitys)
    setDoctors(filterDoctors)
  }

  if (values.Specialty && values.Doctor) {
    const getDoctor = values.Doctor.split(' ');
    const findDoctor = filteredDoctors.filter(doc => doc.name === getDoctor[0] && doc.surname === getDoctor[1]);
    const filterCitys = filteredCitys.filter((city,i) => {
      return findDoctor.find(doc => doc.cityId === city.id)
    });
    setDoctors(findDoctor)
    setCitys(filterCitys)
  }

  if (values.Specialty && values.City) {
    const findCity = filteredCitys.find(city => city.name === values.City);
    const findDoctor = filteredDoctors.filter(doc => doc.cityId === findCity?.id);
    setDoctors(findDoctor);
  }

}

export default filter;