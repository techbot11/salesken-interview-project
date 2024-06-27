export function Logout() {
  localStorage.clear();
  window.location.href = "/login";
}

export function GetYears() {
  const currentYear = new Date().getFullYear();
  const resultArr = [];
  let year = 1901;
  while (year <= currentYear) {
    resultArr.push(year);
    ++year;
  }
  return resultArr.reverse();
}
