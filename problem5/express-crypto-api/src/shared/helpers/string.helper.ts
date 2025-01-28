import crypto from 'crypto';

export const generateRandomString = (length: number): string => {
    const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};

export const getFirstLetters = (str: string): string => {
    return str
        .split(' ')
        .map((word) => word.charAt(0))
        .join('');
};

export const md5 = (object: any): string => {
    return crypto.createHash('md5').update(JSON.stringify(object)).digest('hex');
};

export const toNonAccent = (str: string): string => {
    str = String(str)
        .normalize('NFKD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim()
        .replace(/[^A-Za-z0-9 -]/g, '');
    return str.replace(/\s+/g, ' ');
};

export const textToSlug = (str: string, noHyphens?: boolean): string => {
    str = String(str)
        .normalize('NFKD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '');

    if (noHyphens) {
        return str.replace(/\s+/g, ' ');
    }

    return str.replace(/\s+/g, '-').replace(/-+/g, '-');
};

export const convertDateToFormattedString = (date: Date): string => {
    const _date = new Date(date);
    _date.setHours(_date.getHours() + 7);

    return _date
        .toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        })
        .replace(/(\d+)\/(\d+)\/(\d+),\s(\d+):(\d+):(\d+)/, '$3-$1-$2 $4:$5:$6');
};
