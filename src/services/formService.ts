import { useHttp } from '../hooks/http.hooks';

const useFormService = () => {
  const _citys = 'https://run.mocky.io/v3/9fcb58ca-d3dd-424b-873b-dd3c76f000f4';
  const _doctors =
    'https://run.mocky.io/v3/3d1c993c-cd8e-44c3-b1cb-585222859c21';
  const _specialtys =
    'https://run.mocky.io/v3/e8897b19-46a0-4124-8454-0938225ee9ca';

  const { request, process } = useHttp();

  const getAllDoctors = async () => {
    const res = await request(_doctors);
    const cloneDoctors = [...res];
    return cloneDoctors;
  };

  const getAllCitys = async () => {
    const res = await request(_citys);
    const cloneCitys = [...res];
    return cloneCitys;
  };

  const getAllSpecialtys = async () => {
    const res = await request(_specialtys);
    const cloneSpecialtys = [...res];
    return cloneSpecialtys;
  };

  return { getAllCitys, getAllDoctors, getAllSpecialtys, process };
};

export default useFormService;
