let date = new Date;
let dow = date.getDay();        //day of week
let dom = date.getDate();       //day of month
let m   = date.getMonth();      //month
let y   = date.getFullYear();   //year
let fDomData = new Date(y, m, 1);   //pełne informacje o pierwszym dniu miesiąca
let lDomData = new Date(y, m+1, 0); //pełne informacje o ostatnim dniu miesiaca

let fDow = fDomData.getDay() || 7;  //niedziela to 0, 0 || 7 = 7
let lDow = lDomData.getDay() || 7;
let lDom = lDomData.getDate();

//pętla pokazująca dni poprzedniego miesiąca w pierwszym tygodniu
let id = 0;                                                //id komórki w kalendarzu
for( ; id < fDow; id++ ){
    document.getElementById("callendar").innerHTML += `[x]`;
}
//pętla pokazująca dni tego miesiaca w pierwszym tygodniu
for( i = 1; id <= 7; id++, i++ ){
    document.getElementById("callendar").innerHTML += `[${i}]`;
}

//pętla pokazująca pozostałe dni tego miesiąca
for( let r = 0; r < 5 && i <= lDom; r++ ){                  //tygodnie

    document.getElementById("callendar").innerHTML += `<br>`;

    for( let x = 0 ; x < 7 && i <= lDom; x++, i++ ){        //dni tygodnia
        document.getElementById("callendar").innerHTML += `[${i}]`;
    }
}

//pętla pokazująca dni następnego miesiaca w ostatnim tygodniu
for( let x = 7; x > lDow; x-- ) {
    document.getElementById("callendar").innerHTML += `[x]`;
}