export type TMonth =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';
export type TAcademicSemisterName = 'Autumn' | 'Summer' | 'Fall';
export type TAcademicSemisterCode = '01' | '02' | '03';
//for check semister code
export type TAcademicSemisterCodeMapper = {
  [key: string]: string;
};

export type TAcademicSemister = {
  name: TAcademicSemisterName;
  code: TAcademicSemisterCode;
  year: string;
  startMonth: TMonth;
  endMonth: TMonth;
};
export default TAcademicSemister;
