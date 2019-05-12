import localized from '../localization/index';

export const sortBy = [
  {
    label: localized.price,
    value: 'price',
    key: 'price',
  },
  {
    label: localized.date,
    value: 'date',
    key: 'date',
  },
  {
    label: localized.view,
    value: 'view',
    key: 'view',
  },
  {
    label: localized.booking,
    value: 'booking',
    key: 'booking',
  },
];

export const sortType = [
  {
    label: localized.asc,
    value: 'asc',
    key: 'asc',
  },
  {
    label: localized.desc,
    value: 'desc',
    key: 'desc',
  },
];

export const historySortBy = [
  {
    label: localized.my_booking.bookDayDesc,
    value: 'bookDayDesc',
    key: 'bookDayDesc',
  },
  {
    label: localized.my_booking.bookDayAsc,
    value: 'bookDayAsc',
    key: 'bookDayAsc',
  },
  {
    label: localized.my_booking.priceDesc,
    value: 'priceDesc',
    key: 'priceDesc',
  },
  {
    label: localized.my_booking.priceAsc,
    value: 'priceAsc',
    key: 'priceAsc',
  },
];

export const placeHolderSortBy = {
  label: localized.sortBy,
  value: null,
  color: '#9EA0A4',
}
export const placeHolderSortType = {
  label: localized.sortType,
  value: null,
  color: '#9EA0A4',
}
