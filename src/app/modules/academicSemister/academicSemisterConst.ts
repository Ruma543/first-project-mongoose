import {
  TAcademicSemisterCode,
  TAcademicSemisterCodeMapper,
  TAcademicSemisterName,
  TMonth,
} from './academicS.interface';

export const Months: TMonth[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
export const AcademicSemisterName: TAcademicSemisterName[] = [
  'Autumn',
  'Summer',
  'Fall',
];
export const AcademicSemisterCode: TAcademicSemisterCode[] = ['01', '02', '03'];
export const academicSemisterCodeMapper: TAcademicSemisterCodeMapper = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};
