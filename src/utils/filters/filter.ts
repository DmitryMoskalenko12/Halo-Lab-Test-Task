import { IDoctors, ISpecialty, ICity, IGender } from "../../types/types";
import { IValues } from "../../types/types";
import calcAge from "./helpers/calcAge";

const filter = (values: IValues, doctors: IDoctors[], filteredDoctors:IDoctors[], setDoctors: Function, specialtys: ISpecialty[], filteredSpecialtys: ISpecialty[], setSpecialtys: Function, city: ICity[], setFieldValue: Function, setCitys: Function, gender: IGender[], setGender: Function, filteredCitys: ICity[], setFilteredCitys: Function) => {

/* фильтрация докторов в зависимости от даты рождения пациента */

  if (values.Birthday) {
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
    const filterDoctors = filteredDoctors.filter((doc, i) => {
      return findCity.find(city => city.id === doc.cityId)
    });
    const filterSpecialty = filteredSpecialtys.filter((spec, i) => {
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

  if (values.Doctor) {
    const getDoctor = values.Doctor.split(' ');
    const findDoctor = filteredDoctors.find(doc => doc.name === getDoctor[0] && doc.surname === getDoctor[1]);
    const findDoctorOnly = filteredDoctors.filter(doc => doc.name === findDoctor?.name && doc.surname === findDoctor.surname)
    const findSpec = filteredSpecialtys.filter(spec =>  findDoctor?.specialityId === spec.id); 
    const findCity = filteredCitys.filter(city => city.id === findDoctor?.cityId);
  /*   ))))) */
    const findGender = gender.filter((sex, i) => findSpec.find(spec => spec.params?.gender === sex.value));
    setDoctors(findDoctorOnly)
    setSpecialtys(findSpec);
    setCitys(findCity);
    findGender.length === 0 ? setGender(gender) : setGender(findGender);
  }

  if (values.Specialty) {
    const findSpecialty = filteredSpecialtys.filter(spec => spec.name === values.Specialty);
    const findSpecOnly = filteredSpecialtys.find(spec => spec.name === values.Specialty);
    const filterDoctors = filteredDoctors.filter((doc,i) => findSpecialty.find(spec => spec.id === doc.specialityId));
    const filterCitys = filteredCitys.filter((city, i) => filterDoctors.find(doc => doc.cityId === city.id));
    const findGender = gender.filter((sex) => findSpecOnly?.params?.gender === sex.value);
    setCitys(filterCitys);
    setDoctors(filterDoctors);
    findGender.length === 0 ? setGender(gender) : setGender(findGender);
    setSpecialtys(findSpecialty);
  }

  if (values.City && values.Specialty) {
    const findCity = city.find(city => city.name === values.City);
    const findSpec = filteredSpecialtys.find(spec => spec.name === values.Specialty);
    const getDoctors = filteredDoctors.filter(doc => doc.specialityId === findSpec?.id);
    const getDoctor = getDoctors.find(doc => doc.specialityId === findSpec?.id && doc.cityId === findCity?.id)

    setDoctors([{...getDoctor}]);
  }

  if (values.Sex) {
    const filterSpecialtys = filteredSpecialtys.filter(specialty => {
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
    })
    const setGenderOnly = gender.filter(sex => sex.value === values.Sex);
    setGender(setGenderOnly);
    setSpecialtys(filterSpecialtys);
    console.log(filterSpecialtys)
  }

  if (values.Sex && values.Specialty) {
    const findSpecialtyOnly = filteredSpecialtys.find(spec => spec.name === values.Specialty);
    setSpecialtys([{...findSpecialtyOnly}])
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

  if (values.City && values.Sex) {
    const findCity = filteredCitys.filter(city => city.name === values.City);
    const findSex = gender.find(sex => sex.value === values.Sex);

    const filterDoctors = filteredDoctors.filter((doc, i) => {
      return findCity.find(city => city.id === doc.cityId)
    });

    const filterSpecialty = filteredSpecialtys.filter((spec, i) => {
      return filterDoctors.find(doc => doc.specialityId === spec.id && (spec.params?.gender === findSex?.value || spec))
    });
    filterSpecialty.length === 0 ? setDoctors([]): setDoctors(filterDoctors)
    setSpecialtys(filterSpecialty)
  }

  if (values.Sex && values.Doctor) {
    const getDoctor = values.Doctor.split(' ');
    const findDoctor = filteredDoctors.find(doc => doc.name === getDoctor[0] && doc.surname === getDoctor[1]);
    const findSex = gender.find(sex => sex.value === values.Sex);
    const setSpecialtyOnly = filteredSpecialtys.filter(spec => spec.id === findDoctor?.specialityId && (spec.params?.gender === findSex?.value || spec))
    setDoctors([{...findDoctor}])
    setSpecialtys(setSpecialtyOnly)
  }

  if (values.City && values.Specialty && values.Sex) {
    const findCity = city.find(city => city.name === values.City);
    const findSpec = filteredSpecialtys.find(spec => spec.name === values.Specialty);
    const getDoctors = filteredDoctors.filter(doc => doc.specialityId === findSpec?.id && doc.cityId === findCity?.id);
    setDoctors(getDoctors)
  }

}

export default filter;