export function yyyymmdd(date: Date) {
    let month = date.getMonth() + 1;
    let day = date.getDate();

    const Month = month >= 10 ? month : '0' + month;
    const Day = day >= 10 ? day : '0' + day;

    return date.getFullYear().toString() + '-' + Month + '-' + Day;
}