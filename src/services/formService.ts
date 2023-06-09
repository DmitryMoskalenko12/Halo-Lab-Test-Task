import { useHttp } from '../hooks/http.hooks';

const useFormService = () => {
  const _citys = 'https://run.mocky.io/v3/9fcb58ca-d3dd-424b-873b-dd3c76f000f4';
  const _doctors = 'https://run.mocky.io/v3/3d1c993c-cd8e-44c3-b1cb-585222859c21';
  const _specialtys = 'https://run.mocky.io/v3/e8897b19-46a0-4124-8454-0938225ee9ca';

  const { request, process } = useHttp();

  const getAllDoctors = async () => {
    const doc = [{"id":"1","name":"Aleks","surname":"Dyatloff","specialityId":"6","isPediatrician":true,"cityId":"3"},{"id":"2","name":"Asya","surname":"Plachkova","specialityId":"5","isPediatrician":true,"cityId":"3"},{"id":"3","name":"Vladislav","surname":"Strizinec","specialityId":"3","isPediatrician":true,"cityId":"3"},{"id":"4","name":"Elisaveta","surname":"Goroh","specialityId":"2","isPediatrician":false,"cityId":"1"},{"id":"5","name":"Aleksander","surname":"Romashkov","specialityId":"13","isPediatrician":true,"cityId":"2"},{"id":"6","name":"Dmitry","surname":"Kuzmin","specialityId":"7","isPediatrician":false,"cityId":"3"},{"id":"7","name":"Anastasia","surname":"Zinchenko","specialityId":"11","isPediatrician":true,"cityId":"6"},{"id":"8","name":"Zoe","surname":"Saldana","specialityId":"5","isPediatrician":false,"cityId":"7"},{"id":"9","name":"Jake","surname":"Mitt","specialityId":"4","isPediatrician":false,"cityId":"12"},{"id":"10","name":"Jack","surname":"Sparrow","specialityId":"10","isPediatrician":true,"cityId":"10"},{"id":"11","name":"Inna","surname":"Bread","specialityId":"12","isPediatrician":false,"cityId":"13"},{"id":"12","name":"John","surname":"Whikk","specialityId":"3","isPediatrician":false,"cityId":"14"},{"id":"13","name":"Andrei","surname":"Hovalski","specialityId":"8","isPediatrician":true,"cityId":"9"},{"id":"14","name":"Maksim","surname":"Karashenko","specialityId":"7","isPediatrician":false,"cityId":"4"},{"id":"15","name":"Anton","surname":"Polyakov","specialityId":"2","isPediatrician":true,"cityId":"5"},{"id":"16","name":"Vitya","surname":"Izvesnyakov","specialityId":"5","isPediatrician":false,"cityId":"8"}]
   /*  const res = await request(_doctors);
    const cloneDoctors = [...res]; */
    return /* cloneDoctors; */ doc
  };

  const getAllCitys = async () => {
    const city =  [{"id":"1","name":"Kyiv"},{"id":"2","name":"Kharkiv"},{"id":"3","name":"Odessa"},{"id":"4","name":"Dnieper"},{"id":"5","name":"Lviv"},{"id":"6","name":"Vinnitsa"},{"id":"7","name":"Zaporozhye"},{"id":"8","name":"Mariupol"},{"id":"9","name":"Nikolaev"},{"id":"10","name":"Kherson"},{"id":"11","name":"Lutsk"},{"id":"12","name":"Chernihiv"},{"id":"13","name":"Zhitomir"},{"id":"14","name":"Poltava"}]
    /* const res = await request(_citys); */
    /* const cloneCitys = [...res]; */
    return /* cloneCitys; */ city
  };

  const getAllSpecialtys = async () => {
    const spec = [{"id":"1","name":"Therapist"},{"id":"2","name":"Mammologist","params":{"gender":"Female"}},{"id":"3","name":"Andrologist","params":{"gender":"Male"}},{"id":"4","name":"Expert in narcology"},{"id":"5","name":"Beautician"},{"id":"6","name":"Surgeon"},{"id":"7","name":"Venereologist"},{"id":"8","name":"Urologist"},{"id":"9","name":"Gynecologist","params":{"gender":"Female"}},{"id":"10","name":"Cardiologist"},{"id":"11","name":"Pediatrician","params":{"maxAge":16}},{"id":"12","name":"Geriatrician","params":{"minAge":45}},{"id":"13","name":"Psychiatrist"}]
   /*  const res = await request(_specialtys);
    const cloneSpecialtys = [...res]; */
    return /* cloneSpecialtys */ spec;
  };

  return { getAllCitys, getAllDoctors, getAllSpecialtys, process };
};

export default useFormService;
