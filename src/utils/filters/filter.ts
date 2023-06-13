import { IDoctors, ISpecialty, ICity, IGender } from '../../types/types';
import { IValues } from '../../types/types';
import { filterByBirthday } from './helpers/filterByBirthday';
import { filterByCity } from './helpers/filterByCity';
import { filterByBirthdayAndCity } from './helpers/filterByBirthdayAndCity';
import { filterByDoctors } from './helpers/filterByDoctors';
import { filterByBirthdayAndDoctor } from './helpers/filterByBirthdayAndDoctors';
import { filterBySpecialtys } from './helpers/filterBySpecialtys';
import { filterByBirthdayAndSpecialtys } from './helpers/filterByBirthdayAndSpecialtys';
import { filterByCityAndSpecialty } from './helpers/filterByCityAndSpecialty';
import { filterByGender } from './helpers/filterByGender';
import { filterByBirthdayAndGender } from './helpers/filterByBirthdayAndGender';
import { filterByGenderAndSpecialty } from './helpers/filterByGenderAndSpecialty';
import { filterByBirthdaySexAndSpec } from './helpers/filterByBirthdaySexAndSpec';
import { filterBySpecialtyAndDoctor } from './helpers/filterBySpecialtyAndDoctor';
import { filterByCityAndGender } from './helpers/filterByCityAndGender';
import { filterBySexAndDoctor } from './helpers/filterBySexAndDoctor';
import { filterByCitySpecialtyAndSex } from './helpers/filterByCitySpecialtyAndSex';
import { filterByBirthSpecCityAndDoctor } from './helpers/filterByBirthSpecCityAndDoctor';
import { filterByCityAndDoctor } from './helpers/filterByCityAndDoctor';
import { filterByBirthdaySexCityAndDoc } from './helpers/filterByBirthdaySexCityAndDoc';

const filter = (
  values: IValues,
  doctors: IDoctors[],
  filteredDoctors: IDoctors[],
  setDoctors: React.Dispatch<React.SetStateAction<IDoctors[]>>,
  specialtys: ISpecialty[],
  filteredSpecialtys: ISpecialty[],
  setSpecialtys: React.Dispatch<React.SetStateAction<ISpecialty[]>>,
  city: ICity[],
  gender: IGender[],
  setGender: React.Dispatch<React.SetStateAction<IGender[]>>,
  filteredCitys: ICity[],
  setFilteredCitys: React.Dispatch<React.SetStateAction<ICity[]>>,
  setFieldValue: Function,
) => {
  if (values.Birthday.length === 10) {
    filterByBirthday(
      values,
      doctors,
      filteredDoctors,
      setDoctors,
      specialtys,
      filteredSpecialtys,
      setSpecialtys,
      city,
      gender,
      setGender,
      filteredCitys,
      setFilteredCitys,
    );
  } else {
    setDoctors(doctors);
    setFilteredCitys(city);
    setGender(gender);
    setSpecialtys(specialtys);
  }

  if (values.City) {
    filterByCity(
      values,
      filteredDoctors,
      setDoctors,
      filteredSpecialtys,
      setSpecialtys,
      gender,
      setGender,
      filteredCitys,
      setFilteredCitys,
    );
  }

  if (values.Birthday.length === 10 && values.City) {
    filterByBirthdayAndCity(
      values,
      filteredDoctors,
      setDoctors,
      filteredSpecialtys,
      setSpecialtys,
      filteredCitys,
      setFilteredCitys,
      setFieldValue,
    );
  }

  if (values.City && values.Doctor) {
    filterByCityAndDoctor(
      values,
      filteredDoctors,
      filteredSpecialtys,
      setSpecialtys,
      setDoctors,
    );
  }

  if (values.Doctor && !values.City && !values.Specialty) {
    filterByDoctors(
      values,
      filteredDoctors,
      setDoctors,
      filteredSpecialtys,
      setSpecialtys,
      gender,
      setGender,
      filteredCitys,
      setFilteredCitys,
      setFieldValue,
    );
  }

  if (values.Birthday.length === 10 && values.Doctor) {
    filterByBirthdayAndDoctor(
      values,
      filteredDoctors,
      setDoctors,
      setFieldValue,
    );
  }

  if (values.Specialty) {
    filterBySpecialtys(
      values,
      filteredDoctors,
      setDoctors,
      filteredSpecialtys,
      setSpecialtys,
      gender,
      setGender,
      filteredCitys,
      setFilteredCitys,
    );
  }

  if (values.Birthday.length === 10 && values.Specialty) {
    filterByBirthdayAndSpecialtys(
      values,
      filteredDoctors,
      setDoctors,
      filteredSpecialtys,
      setSpecialtys,
      filteredCitys,
      setFilteredCitys,
    );
  }

  if (values.City && values.Specialty) {
    filterByCityAndSpecialty(
      values,
      filteredDoctors,
      setDoctors,
      filteredSpecialtys,
      setSpecialtys,
      filteredCitys,
    );
  }

  if (values.Sex) {
    filterByGender(
      values,
      filteredDoctors,
      setDoctors,
      filteredSpecialtys,
      setSpecialtys,
      gender,
      setGender,
      filteredCitys,
      setFilteredCitys,
    );
  }

  if (values.Birthday.length === 10 && values.Sex) {
    filterByBirthdayAndGender(
      values,
      filteredDoctors,
      setDoctors,
      filteredSpecialtys,
      setSpecialtys,
      filteredCitys,
      setFilteredCitys,
    );
  }

  if (values.Sex && values.Specialty) {
    filterByGenderAndSpecialty(
      values,
      filteredDoctors,
      setDoctors,
      filteredSpecialtys,
      setSpecialtys,
      filteredCitys,
      setFilteredCitys,
    );
  }
  if (values.Birthday.length === 10 && values.Sex && values.Specialty) {
    filterByBirthdaySexAndSpec(
      values,
      filteredDoctors,
      setDoctors,
      filteredSpecialtys,
      setSpecialtys,
      filteredCitys,
      setFilteredCitys,
    );
  }
  if (values.Specialty && values.Doctor) {
    filterBySpecialtyAndDoctor(
      values,
      filteredDoctors,
      setDoctors,
      filteredCitys,
      setFilteredCitys,
    );
  }

  if (values.City && values.Sex) {
    filterByCityAndGender(
      values,
      filteredDoctors,
      setDoctors,
      filteredSpecialtys,
      setSpecialtys,
      gender,
      filteredCitys,
      setFilteredCitys,
    );
  }

  if (values.Sex && values.Doctor) {
    filterBySexAndDoctor(
      values,
      filteredDoctors,
      setDoctors,
      filteredSpecialtys,
      setSpecialtys,
      gender,
      filteredCitys,
      setFilteredCitys,
      setFieldValue,
    );
  }

  if (values.City && values.Specialty && values.Sex) {
    filterByCitySpecialtyAndSex(
      values,
      filteredDoctors,
      setDoctors,
      filteredSpecialtys,
      filteredCitys,
    );
  }
  if (
    values.Birthday.length === 10 &&
    values.Sex &&
    values.City &&
    values.Doctor
  ) {
    filterByBirthdaySexCityAndDoc(
      values,
      filteredDoctors,
      setDoctors,
      filteredSpecialtys,
      setSpecialtys,
      setFieldValue,
    );
  }

  if (
    values.Birthday.length === 10 &&
    values.Specialty &&
    values.City &&
    values.Doctor
  ) {
    filterByBirthSpecCityAndDoctor(
      values,
      filteredDoctors,
      setDoctors,
      filteredSpecialtys,
      setSpecialtys,
      filteredCitys,
      setFilteredCitys,
    );
  }
};

export default filter;
