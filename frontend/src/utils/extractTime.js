export function extractTime(dataString){
    const date=new Date(dataString)
    const Day=date.getDay()
    const hours=padZero(date.getHours())
    const minutes=padZero(date.getMinutes())
    return `${Day} :${hours} : ${minutes}`
}
function  padZero(number){
    return number.toString().padStart(2,"0")
}