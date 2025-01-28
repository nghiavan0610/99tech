import * as momentTz from 'moment-timezone';
import moment from 'moment';

export class DatetimeHelper {
    public static getDateTimeInTz(tz: string, date?: Date): string {
        if (!date) {
            date = new Date();
        }
        return momentTz.tz(date, tz).format();
    }

    public static getFormatedShort(date: Date, separator: string = ''): string {
        const dd = date.getDate().toString().padStart(2, '0');
        const mm = (date.getMonth() + 1).toString().padStart(2, '0');
        const yy = date.getFullYear().toString().substring(2);
        return [dd, mm, yy].join(separator);
    }

    public static getStartOfDate(date: Date): string {
        return moment(date).startOf('date').format();
    }

    public static convertUnixToDate(unixTimestamp: number): string {
        return moment(parseInt((unixTimestamp * 1000).toString()))
            .utc()
            .format('YYYY-MM-DD');
    }

    public static calculateDiffDays(startDate: Date, endDate: Date): number {
        // Calculate the difference in milliseconds
        const differenceInMs = endDate.getTime() - startDate.getTime();

        // Convert milliseconds to days and round to the nearest integer
        const differenceInDays = Math.round(differenceInMs / (1000 * 60 * 60 * 24));

        return differenceInDays;
    }
}
