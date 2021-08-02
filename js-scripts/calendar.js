let date = new Date;
let dow = date.getDay();    //day of week
let dom = date.getDate();   //day of month
let firstMonday;
console.log(firstMonday = dom % 7 - dow);