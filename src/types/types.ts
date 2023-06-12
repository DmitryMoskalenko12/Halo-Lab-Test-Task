export interface Data {
  id: string;
  value: string;
}

export interface IGender {
  id: string;
  value: string;
}

export interface ISexOption {
  id: string;
  value: string;
}

export interface InitialValues {
  Name: string;
  Birthday: string;
  Sex: string;
  City: string;
  Specialty: string;
  Doctor: string;
  Email: string;
  Phone: string;
}

export type Error = {
  name: string | undefined;
  birthday: string | undefined;
  sex: string | undefined;
  city: string | undefined;
  specialty: string | undefined;
  doctor: string | undefined;
  email: string | undefined;
  phone: string | undefined;
};

export type Touch = {
  nameTouch: boolean | undefined;
  birthdayTouch: boolean | undefined;
  sexTouch: boolean | undefined;
  cityTouch: boolean | undefined;
  specialtyTouch: boolean | undefined;
  doctorTouch: boolean | undefined;
  emailTouch: boolean | undefined;
  phoneTouch: boolean | undefined;
};

export interface ISpecialty {
  id: string;
  name: string;
  params?: {
    gender?: string;
    maxAge?: number;
    minAge?: number;
  };
}

export interface ICity {
  id: string;
  name: string;
}

export interface IDoctors {
  id: string;
  name: string;
  surname: string;
  specialityId: string;
  isPediatrician: boolean;
  cityId: string;
}

export interface IValues {
  Name: string;
  Birthday: string;
  Sex: string;
  City: string;
  Specialty: string;
  Doctor: string;
  Email: string;
  Phone: string;
}
