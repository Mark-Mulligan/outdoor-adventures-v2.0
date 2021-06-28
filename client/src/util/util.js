export const stateList = [
  { value: 'tx', label: 'Texas' },
  { value: 'fl', label: 'Florida' },
  { value: 'nm', label: 'New Mexico' },
  { value: 'ok', label: 'Oklahoma' },
  { value: 'ut', label: 'Utah' },
  { value: 'nv', label: 'Nevada' },
];

export const designationList = [
  { value: 'national park', label: 'national park' },
  { value: 'national historical park', label: 'national historical park' },
  { value: 'national monument', label: 'national monument' },
  { value: 'national historic trail', label: 'national historic trail' },
  { value: 'national historic area', label: 'national historic area' },
  { value: 'national historic site', label: 'national historic site' },
  { value: 'naotional battlefield', label: 'national battlefiled' },
  { value: 'park', label: 'park' },
  { value: 'national memorial', label: 'national memorial' },
  { value: 'national seashore', label: 'national seashore' },
];

export const debounceFunction = (func, delay) => {
  let timer;
  return function () {
    let self = this;
    let args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(self, args);
    }, delay);
  };
};
