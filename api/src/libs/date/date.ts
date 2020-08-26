import momentTimezone from 'moment-timezone';
import moment from 'moment';

const differenceInDays = (later, earlier) => {
  return moment(later)
    .milliseconds(0)
    .seconds(0)
    .minutes(0)
    .diff(
      moment(earlier)
        .milliseconds(0)
        .seconds(0)
        .minutes(0),
      'days'
    );
};

const datesBetween = (later, earlier): Date[] => {
  const numberDays = differenceInDays(later, earlier);

  return Array.from({ length: numberDays }).map((_, numberDate) => {
    return moment(earlier)
      .add(numberDate, 'd')
      .utc()
      .toDate();
  });
};

const toUtc = (date: Date) => momentTimezone.utc(date).format();

const toTimeZone = (date: Date, format = 'YYYY-MM-DD') =>
  momentTimezone
    .utc(date)
    .tz('Europe/Madrid')
    .format(format);

const addDay = (date: Date, number) => {
  return moment(date)
    .add(number, 'd')
    .toDate();
};

const set = (date: Date, options) => {
  return moment(date)
    .set(options)
    .toDate();
};

const format = (date: Date, format: string): string => moment(date).format(format);

export { addDay, toUtc, toTimeZone, differenceInDays, datesBetween, set, format };
