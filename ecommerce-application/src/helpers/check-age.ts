export function checkAge(date: Date): boolean {
  const currentDate = new Date();
  let age = currentDate.getFullYear() - date.getFullYear();
  const thisYearBirthday =
    currentDate.getMonth() > date.getMonth() || (currentDate.getMonth() === date.getMonth() && currentDate.getDate() >= date.getDate());
  if (!thisYearBirthday) age--;
  return age >= 13;
}