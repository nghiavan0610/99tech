import moment from 'moment-timezone';

const getDateTimeInTz = (tz: string, date: Date = new Date()): string => {
    return moment(date).tz(tz).format();
};

const getFormattedShort = (date: Date, separator: string = ''): string => {
    const dd = date.getDate().toString().padStart(2, '0');
    const mm = (date.getMonth() + 1).toString().padStart(2, '0');
    const yy = date.getFullYear().toString().substring(2);
    return [dd, mm, yy].join(separator);
};

const getStartOfDate = (date: Date): string => {
    return moment(date).startOf('date').format();
};

const convertUnixToDate = (unixTimestamp: number): string => {
    return moment(unixTimestamp * 1000)
        .utc()
        .format('YYYY-MM-DD');
};

const calculateDiffDays = (startDate: Date, endDate: Date): number => {
    const differenceInMs = endDate.getTime() - startDate.getTime();
    return Math.round(differenceInMs / (1000 * 60 * 60 * 24));
};

export { getDateTimeInTz, getFormattedShort, getStartOfDate, convertUnixToDate, calculateDiffDays };
