const MonthEnum = {
  Januari: 0,
  Februari: 1,
  Maret: 2,
  April: 3,
  Mei: 4,
  Juni: 5,
  Juli: 6,
  Agustus: 7,
  September: 8,
  Oktober: 9,
  November: 10,
  Desember: 11,
};

const IndexToMonthEnum = Object.keys(MonthEnum).reduce((acc, key) => {
  acc[MonthEnum[key]] = key;
  return acc;
}, {});

const fullTimeToDateString = (fullTime) => {
  const date = new Date(fullTime);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  return `${day} ${IndexToMonthEnum[month]} ${year}`;
};

export { MonthEnum, IndexToMonthEnum, fullTimeToDateString };
