import { IDoctors, ISpecialty, ICity, IGender } from "../../types/types";
import { IValues } from "../../types/types";
import calcAge from "./helpers/calcAge";

const filter = (values: IValues, doctors: IDoctors[], filteredDoctors:IDoctors[], setDoctors: Function, specialtys: ISpecialty[], filteredSpecialtys: ISpecialty[], setSpecialtys: Function, city: ICity[], setFieldValue: Function, setCitys: Function, gender: IGender[], setGender: Function, filteredCitys: ICity[], setFilteredCitys: Function, resetForm: Function) => {


  if (values.Birthday.length === 10) {
    const age = calcAge(values.Birthday);
    if (values.Birthday.length === 10) {
      if (age < 16 && age > 0) {
        const doctorsAll = filteredDoctors.filter(doctor => doctor.isPediatrician);
        const filterSpecialtys = filteredSpecialtys.filter(spec => doctorsAll.find(doc => doc.specialityId === spec.id && doc.isPediatrician))
        const filterCitys = filteredCitys.filter(city => doctorsAll.find(doc => doc.cityId === city.id));
        setDoctors(doctorsAll);
        setFilteredCitys(filterCitys)
        setSpecialtys(filterSpecialtys)
      }
      if (age >= 16 && age <= 110) {
        const doctorsAll = filteredDoctors.filter(
          doctor => !doctor.isPediatrician,
        );
        const filterSpecialtys = filteredSpecialtys.filter(spec => doctorsAll.find(doc => doc.specialityId === spec.id && !doc.isPediatrician))
        const filterCitys = filteredCitys.filter(city => doctorsAll.find(doc => doc.cityId === city.id));
        setDoctors(doctorsAll)
        setFilteredCitys(filterCitys);
        setSpecialtys(filterSpecialtys);
      } 
    } else {
      setDoctors(doctors)
      setFilteredCitys(city);
      setGender(gender);
      setSpecialtys(specialtys)
    }
  } else {
    setDoctors(doctors)
    setFilteredCitys(city);
    setGender(gender);
    setSpecialtys(specialtys)
  }

  if ((values.Birthday.length !== 10 && values.Birthday) && values.City) {
    resetForm()
  }
  if ((values.Birthday.length !== 10 && values.Birthday) &&  values.Doctor) {
    resetForm()
  }
  if ((values.Birthday.length !== 10 && values.Birthday) && values.Sex ) {
    resetForm()
  }
   if ((values.Birthday.length !== 10 && values.Birthday) && values.Specialty) {
    resetForm()
  }


  if (values.City) {
    const findCity = filteredCitys.filter(city => city.name === values.City);
    const filterDoctors = filteredDoctors.filter((doc, i) => findCity.find(city => city.id === doc.cityId));
    const filterSpecialty = filteredSpecialtys.filter((spec, i) => filterDoctors.find(doc => doc.specialityId === spec.id));
    const findSex = gender.filter(sex => filterSpecialty.find(spec => spec.params?.gender === sex.value || !spec.params?.gender))
    if (filterDoctors) {
      setDoctors(filterDoctors)
    }
    if (filterSpecialty) {
      setSpecialtys(filterSpecialty)
    }
    if (findCity) {
      setFilteredCitys(findCity)
    }
    if (findSex) {
      setGender(findSex)
    }
  } 

  if (values.Birthday.length === 10 && values.City) {
   
    const age = calcAge(values.Birthday);
    if (age < 16 && age > 0) {
      const doctorsAll = filteredDoctors.filter(doctor => doctor.isPediatrician);
      const filterSpecialtys = filteredSpecialtys.filter(spec => doctorsAll.find(doc => doc.specialityId === spec.id && doc.isPediatrician))
      const filterCitys = filteredCitys.filter(city => doctorsAll.find(doc => doc.isPediatrician && city.id === doc.cityId));
      const findOnlyCity = filterCitys.find(city => city.name === values.City)
      const findOnlyDocTown = doctorsAll.filter(doc => doc.cityId === findOnlyCity?.id)
      const findOnlySpec = filterSpecialtys.filter((spec,i) => findOnlyDocTown.find(doc => doc.specialityId === spec.id))
      
      setDoctors(findOnlyDocTown)
      setSpecialtys(findOnlySpec)
      setFilteredCitys([{...findOnlyCity}]);
    }
    if (age >= 16 && age <= 110) {
      const doctorsAll = filteredDoctors.filter(
        doctor => !doctor.isPediatrician,
      );
      const filterSpecialtys = filteredSpecialtys.filter(spec => doctorsAll.find(doc => doc.specialityId === spec.id && !doc.isPediatrician))
      const filterCitys = filteredCitys.filter(city => doctorsAll.find(doc => !doc.isPediatrician && city.id === doc.cityId));
      const findOnlyCity = filterCitys.find(city => city.name === values.City)
      const findOnlyDocTown = doctorsAll.filter(doc => doc.cityId === findOnlyCity?.id)
      const findOnlySpec = filterSpecialtys.filter((spec,i) => findOnlyDocTown.find(doc => doc.specialityId === spec.id))
 
      setDoctors(findOnlyDocTown)
      setSpecialtys(findOnlySpec)
      setFilteredCitys([{...findOnlyCity}]);
    } 
  }

   if (values.City && values.Doctor) {
    const getDoctor = values.Doctor.split(' ');
    const findDoctor = filteredDoctors.find(doc => doc.name === getDoctor[0] && doc.surname === getDoctor[1])
    const findSpec = filteredSpecialtys.filter(spec =>  findDoctor?.specialityId === spec.id);  
    setSpecialtys(findSpec)  
  }

  if (values.Doctor) {
    const getDoctor = values.Doctor.split(' ');
    const findDoctor = filteredDoctors.find(doc => doc.name === getDoctor[0] && doc.surname === getDoctor[1]);
    const findDoctorOnly = filteredDoctors.filter(doc => doc?.name === findDoctor?.name && doc?.surname === findDoctor?.surname)
    const findSpec = filteredSpecialtys.filter(spec =>  findDoctor?.specialityId === spec.id); 
    const findCity = filteredCitys.filter(city => city.id === findDoctor?.cityId);
    const findGender = gender.filter((sex, i) => findSpec.find(spec => spec.params?.gender === sex.value));
    setDoctors(findDoctorOnly)
    setSpecialtys(findSpec);
    setFilteredCitys(findCity);
    findGender.length === 0 ? setGender(gender) : setGender(findGender);
  }
  if (values.Birthday.length === 10 && values.Doctor ) {
    const age = calcAge(values.Birthday);
    if (age < 16 && age > 0) {
      const doctorsAll = filteredDoctors.filter(doctor => doctor.isPediatrician);
      const getDoctor = values.Doctor.split(' ');
      const findDoctor = filteredDoctors.find(doc => doc.name === getDoctor[0] && doc.surname === getDoctor[1]);
      const findOnlyDoctor = doctorsAll.find(doc => doc.name === findDoctor?.name && doc.surname === findDoctor.surname)
      const checkDoctor =  findOnlyDoctor === undefined ? {id: 1, name: 'Not', surname: 'found'} : {...findOnlyDoctor}
      setDoctors([checkDoctor]);
    }
    if (age >= 16 && age <= 110) {
      const doctorsAll = filteredDoctors.filter(
        doctor => !doctor.isPediatrician
      );
      const getDoctor = values.Doctor.split(' ');
      const findDoctor = filteredDoctors.find(doc => doc.name === getDoctor[0] && doc.surname === getDoctor[1]);
      const findOnlyDoctor = doctorsAll.find(doc => doc.name === findDoctor?.name && doc.surname === findDoctor?.surname)
      const checkDoctor =  findOnlyDoctor === undefined ? {id: 1, name: 'Not', surname: 'found'} : {...findOnlyDoctor}
      setDoctors([checkDoctor]);
    } 
  }
  if (values.Specialty) {
    const findSpecialty = filteredSpecialtys.filter(spec => spec.name === values.Specialty);
    const findSpecOnly = filteredSpecialtys.find(spec => spec.name === values.Specialty);
    const filterDoctors = filteredDoctors.filter((doc,i) => findSpecialty.find(spec => spec.id === doc.specialityId));
    const filterCitys = filteredCitys.filter((city, i) => filterDoctors.find(doc => doc.cityId === city.id));
    const findGender = gender.filter((sex) => findSpecOnly?.params?.gender === sex.value);
    setFilteredCitys(filterCitys);
    setDoctors(filterDoctors);
    findGender.length === 0 ? setGender(gender) : setGender(findGender);
    setSpecialtys(findSpecialty);
  }
  
  if (values.Birthday.length === 10 && values.Specialty ) {
    const age = calcAge(values.Birthday);
    if (age < 16 && age > 0) {
      const doctorsAll = filteredDoctors.filter(
        doctor => doctor.isPediatrician,
      );
      const findOnlySpec = filteredSpecialtys.find(spec => doctorsAll.find(doc => doc.specialityId === spec.id && doc.isPediatrician))
      const findOnlyDoctors = doctorsAll.filter(doc => doc.specialityId === findOnlySpec?.id);
      const filterCitys = filteredCitys.filter(city => findOnlyDoctors.find(doc => doc.isPediatrician && city.id === doc.cityId));
  
      setDoctors(findOnlyDoctors)
      setSpecialtys([{...findOnlySpec}])
      setFilteredCitys(filterCitys);
    }
    if (age >= 16 && age <= 110) {

      const doctorsAll = filteredDoctors.filter(
        doctor => !doctor.isPediatrician,
      );
      const findOnlySpec = filteredSpecialtys.find(spec => doctorsAll.find(doc => doc.specialityId === spec.id && !doc.isPediatrician))
      const findOnlyDoctors = doctorsAll.filter(doc => doc.specialityId === findOnlySpec?.id);
      const filterCitys = filteredCitys.filter(city => findOnlyDoctors.find(doc => !doc.isPediatrician && city.id === doc.cityId));
  
      setDoctors(findOnlyDoctors)
      setSpecialtys([{...findOnlySpec}])
      setFilteredCitys(filterCitys);
    } 
  }

  if (values.City && values.Specialty) {
    const findCity = filteredCitys.find(city => city.name === values.City);
    const findSpec = filteredSpecialtys.find(spec => spec.name === values.Specialty);
    const getDoctors = filteredDoctors.filter(doc => doc.specialityId === findSpec?.id);
    const getDoctor = getDoctors.find(doc => doc.specialityId === findSpec?.id && doc.cityId === findCity?.id)
    setSpecialtys([{...findSpec}])
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
    const filterDoctors = filteredDoctors.filter(doc => filterSpecialtys.find(spec => spec.id === doc.specialityId));
    const filterCitys = filteredCitys.filter((city, i) => filterDoctors.find(doc => doc.cityId === city.id))
  
    setDoctors(filterDoctors);
    setGender(setGenderOnly);
    setFilteredCitys(filterCitys);
    setSpecialtys(filterSpecialtys);
  }

  if (values.Birthday.length === 10 && values.Sex ) {
    const age = calcAge(values.Birthday);
    if (age < 16 && age > 0) {
    
      const doctorsAll = filteredDoctors.filter(
        doctor => doctor.isPediatrician,
      );
      const filteredSpec = filteredSpecialtys.filter(spec => doctorsAll.find(doc => doc.specialityId === spec.id && (spec.params?.maxAge || !spec.params?.maxAge) && (!spec.params ||
        !spec.params.gender ||
        spec.params.gender === values.Sex)))
      const filterDoctors = doctorsAll.filter((doc, i) => filteredSpec.find(spec => spec.id === doc.specialityId));
      const filterCitys = filteredCitys.filter(city => filterDoctors.find(doc => doc.isPediatrician && city.id === doc.cityId));
  
      setDoctors(filterDoctors)
      setSpecialtys(filteredSpec)
      setFilteredCitys(filterCitys);
    }
    if (age >= 16 && age <= 110) {

      const doctorsAll = filteredDoctors.filter(
        doctor => !doctor.isPediatrician,
      );
      const filteredSpec = filteredSpecialtys.filter(spec => doctorsAll.find(doc => doc.specialityId === spec.id && (spec.params?.minAge || !spec.params?.minAge) && (!spec.params ||
        !spec.params.gender ||
        spec.params.gender === values.Sex)))
      const filterDoctors = doctorsAll.filter((doc, i) => filteredSpec.find(spec => spec.id === doc.specialityId));
      const filterCitys = filteredCitys.filter(city => filterDoctors.find(doc => !doc.isPediatrician && city.id === doc.cityId));
  
      setDoctors(filterDoctors)
      setSpecialtys(filteredSpec)
      setFilteredCitys(filterCitys);
    } 
  }

  if (values.Sex && values.Specialty) {
    const findSpecialtyOnly = filteredSpecialtys.filter(spec => spec.name === values.Specialty);
    const findDoctorOnly = filteredDoctors.filter(doc => findSpecialtyOnly.find(spec => spec.id === doc.specialityId));
    const findCityOnly = filteredCitys.filter(city => filteredDoctors.find(doc => doc.cityId === city.id && findSpecialtyOnly.find(spec => spec.id === doc.specialityId)));
    setFilteredCitys(findCityOnly);
    setDoctors(findDoctorOnly)
    setSpecialtys(findSpecialtyOnly)
  }
  if (values.Birthday.length === 10 && values.Sex && values.Specialty) {
    const age = calcAge(values.Birthday);
    if (age < 16 && age > 0) {
    
      const doctorsAll = filteredDoctors.filter(
        doctor => doctor.isPediatrician,
      );
      const filteredSpec = filteredSpecialtys.find(spec => spec.name === values.Specialty);
      const filterDoctors = doctorsAll.filter((doc, i) => filteredSpec?.id === doc.specialityId && (filteredSpec.params?.maxAge || !filteredSpec.params?.maxAge) && (!filteredSpec.params ||
        !filteredSpec.params.gender ||
        filteredSpec.params.gender === values.Sex));
      const filterCitys = filteredCitys.filter(city => filterDoctors.find(doc => doc.isPediatrician && city.id === doc.cityId ));
  
      setDoctors(filterDoctors)
      setSpecialtys([{...filteredSpec}])
      setFilteredCitys(filterCitys);
    }
    if (age >= 16 && age <= 110) {

      const doctorsAll = filteredDoctors.filter(
        doctor => !doctor.isPediatrician,
      );
      const filteredSpec = filteredSpecialtys.find(spec => spec.name === values.Specialty);
      const filterDoctors = doctorsAll.filter((doc, i) => filteredSpec?.id === doc.specialityId && (filteredSpec.params?.minAge || !filteredSpec.params?.minAge) && (!filteredSpec.params ||
        !filteredSpec.params.gender ||
        filteredSpec.params.gender === values.Sex));
      const filterCitys = filteredCitys.filter(city => filterDoctors.find(doc => !doc.isPediatrician && city.id === doc.cityId));
  
      setDoctors(filterDoctors)
      setSpecialtys([{...filteredSpec}])
      setFilteredCitys(filterCitys);
    } 
  }
  if (values.Specialty && values.Doctor) {
    const getDoctor = values.Doctor.split(' ');
    const findDoctor = filteredDoctors.filter(doc => doc.name === getDoctor[0] && doc.surname === getDoctor[1]);
    const filterCitys = filteredCitys.filter((city,i) => {
      return findDoctor.find(doc => doc.cityId === city.id)
    });
    setDoctors(findDoctor)
    setFilteredCitys(filterCitys)
  }

  if (values.City && values.Sex) {
    const findCity = filteredCitys.filter(city => city.name === values.City);
    const findSex = gender.find(sex => sex.value === values.Sex);

    const filterDoctors = filteredDoctors.filter((doc, i) => {
      return findCity.find(city => city.id === doc.cityId)
    });
    const filterSpecialty = filteredSpecialtys.filter((spec, i) => {
      return filterDoctors.find(doc => doc.specialityId === spec.id && (spec.params?.gender === findSex?.value || !spec.params?.gender))
    });
    const filterDoctorsBySpec = filterDoctors.filter(doc => filterSpecialty.find(spec => spec.id === doc.specialityId));
    filterSpecialty.length === 0 ? setDoctors([]): setDoctors(filterDoctorsBySpec)
    setSpecialtys(filterSpecialty)
  }

  if (values.Sex && values.Doctor) {
    const getDoctor = values.Doctor.split(' ');
    const findDoctor = filteredDoctors.find(doc => doc.name === getDoctor[0] && doc.surname === getDoctor[1]);
    const findSex = gender.find(sex => sex.value === values.Sex);
    const setSpecialtyOnly = filteredSpecialtys.filter(spec => spec.id === findDoctor?.specialityId && (spec.params?.gender === findSex?.value || spec))
    const findCity = filteredCitys.find(city => findDoctor?.cityId === city.id);
    console.log(typeof findDoctor)
    const checkDoctor =  findDoctor === undefined ? {id: 1, name: 'Not', surname: 'found'} : {...findDoctor}
    setFilteredCitys([{...findCity}]);
    setDoctors([checkDoctor])
    setSpecialtys(setSpecialtyOnly)
  }

  if (values.City && values.Specialty && values.Sex) {
    const findCity = filteredCitys.find(city => city.name === values.City);
    const findSpec = filteredSpecialtys.find(spec => spec.name === values.Specialty);
    const getDoctors = filteredDoctors.filter(doc => doc.specialityId === findSpec?.id && doc.cityId === findCity?.id);
    setDoctors(getDoctors)
  }

  if ((values.Birthday.length === 10 && values.Specialty && values.City && values.Doctor) ) {
    const age = calcAge(values.Birthday);
    if (age < 16 && age > 0) {
      const doctorsAll = filteredDoctors.filter(doctor => doctor.isPediatrician);
      const filterSpecialtys = filteredSpecialtys.filter(spec => doctorsAll.find(doc => doc.specialityId === spec.id && doc.isPediatrician))
      const filterCitys = filteredCitys.filter(city => doctorsAll.find(doc => doc.isPediatrician && city.id === doc.cityId));
      const filteredDoctor = doctorsAll.filter((doc, i) => filterSpecialtys.find(spec => spec.id === doc.specialityId))
   
      setDoctors(filteredDoctor);
      setSpecialtys(filterSpecialtys);
      setFilteredCitys(filterCitys)
    }
    if (age >= 16 && age <= 110) {
      const doctorsAll = filteredDoctors.filter(
        doctor => !doctor.isPediatrician,
      );
      const filterSpecialtys = filteredSpecialtys.filter(spec => doctorsAll.find(doc => doc.specialityId === spec.id && !doc.isPediatrician))
      const filterCitys = filteredCitys.filter(city => doctorsAll.find(doc => doc.cityId === city.id));
      const filteredDoctor = doctorsAll.filter(doc => filterSpecialtys.find(spec => spec.id === doc.specialityId && !doc.isPediatrician))
      setDoctors(filteredDoctor);
      setFilteredCitys(filterCitys);
      setSpecialtys(filterSpecialtys);
    } 
  }

}

export default filter;