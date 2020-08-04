// форматирует дату для сервера
export function formatDatetimeForServer(datetime) {
    let date = datetime.split("T")[0].split("-");
    date = date[2] + '.' + date[1] + '.' + date[0];
    let time = datetime.split("T")[1];
    return date + ' ' + time
}