const calcAge = (values: string) => {
  const [day, month, year] = values.split('/');
  const birthday = new Date(Number(year), Number(month) - 1, Number(day));
  const currentDate = new Date();
  const age = Math.floor(
    (currentDate.getTime() - birthday.getTime()) /
      (365.25 * 24 * 60 * 60 * 1000),
  );
  return age;
};
export default calcAge;
