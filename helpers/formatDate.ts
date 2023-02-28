export const timestampToDate = (timeStamp: string, locale = 'en-GB'): string => {
    const dateFormat = new Date(timeStamp);
    const formatter = new Intl.DateTimeFormat(locale, {
        timeStyle: 'medium',
        dateStyle: 'medium'
    });
    return formatter.format(dateFormat);
};
