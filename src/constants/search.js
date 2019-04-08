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
