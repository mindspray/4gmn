let prepositions = [
  'at',
  'in',
  'within',
  'on',
  'before',
  'after',
  'during',
  'since',
  'until',
  'til',
  'till',
  'by',
  'from',
  'to',
  'between',
  'ago',
  'past',
  'present',
  'future',
  'last'
]

let units = [
  'second',
  'minute',
  'hour',
  'day',
  'week',
  'month',
  'year',
  'decade'
]

/*
This will break down the prepositions into more refined categories since some are redundant(i think?) such as before the current time, at the current time, or after
*/
let classifications = [];