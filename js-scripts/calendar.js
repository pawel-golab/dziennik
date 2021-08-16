function generateAccualCalendar(
    y, m, el, 
    dTag, dTagClass, dTagStyle, dTagRest
)
{

    let out = '';

    let fDomData = new Date(y, m-1, 1);                     //pełne informacje o pierwszym dniu miesiąca
    let lDomData = new Date(y, m, 0);                       //pełne informacje o ostatnim dniu miesiaca

    let fDow = fDomData.getDay() || 7;                      //niedziela to 0, 0 || 7 = 7
    let lDow = lDomData.getDay() || 7;
    let lDom = lDomData.getDate();

                                                            //pętla pokazująca dni poprzedniego miesiąca w pierwszym tygodniu
    let x = 1;                                              //id komórki w kalendarzu
    for( ; x < fDow; x++ ){
        out += `<${dTag} ${dTagClass} ${dTagStyle} ${dTagRest}></${dTag}>`;
    }
                                                            //pętla pokazująca dni tego miesiaca w pierwszym tygodniu
    for( d = 1; x <= 7; x++, d++ ){
        out += `<${dTag} ${dTagClass} ${dTagStyle} ${dTagRest} data-day="${d}" data-month="${m}"> ${d} </${dTag}>`;
    }

                                                            //pętla pokazująca pozostałe dni tego miesiąca
    for( let r = 0; r < 5 && d <= lDom; r++ ){              //tygodnie
   
        for( let x = 0 ; x < 7 && d <= lDom; x++, d++ ){    //dni tygodnia
            out += `<${dTag} ${dTagClass} ${dTagStyle} ${dTagRest} data-day="${d}" data-month="${m}"> ${d} </${dTag}>`;
        }
    
    }
                                                            //pętla pokazująca dni następnego miesiaca w ostatnim tygodniu
    for( let x = 7; x > lDow; x-- ) {
        out += `<${dTag} ${dTagClass} ${dTagStyle} ${dTagRest}></${dTag}>`;
    }

    el.innerHTML = out;
}

function generateFullCalendar(
    y, m, el, 
    dTag, dTagClass, dTagStyle, dTagRest,
    dhTag, dhTagClass, dhTagStyle, dhTagRest,
    dcTag, dcTagClass, dcTagStyle, dcTagRest
)
{
    let out = '';

    let fDomData = new Date(y, m-1, 1);                     //pełne informacje o pierwszym dniu miesiąca
    let lDomData = new Date(y, m, 0);                       //pełne informacje o ostatnim dniu miesiaca

    let fDow = fDomData.getDay() || 7;                      //niedziela to 0, 0 || 7 = 7
    let lDow = lDomData.getDay() || 7;
    let lDom = lDomData.getDate();
                                                            //pętla pokazująca dni poprzedniego miesiąca w pierwszym tygodniu
    let x = 1;                                              //id komórki w kalendarzu
    for( ; x < fDow; x++ ){
        out += `<${dTag} ${dTagClass} ${dTagStyle} ${dTagRest}>
            <${dhTag} ${dhTagClass} ${dhTagStyle} ${dhTagRest}></${dhTag}>
            <${dcTag} ${dcTagClass} ${dcTagStyle} ${dcTagRest}></${dcTag}>
        </${dTag}>`;
    }
                                                            //pętla pokazująca dni tego miesiaca w pierwszym tygodniu
    for( d = 1; x <= 7; x++, d++ ){
        out += `<${dTag} ${dTagClass} ${dTagStyle} ${dTagRest}>
            <${dhTag} ${dhTagClass} ${dhTagStyle} ${dhTagRest}> ${d} </${dhTag}>
            <${dcTag} ${dcTagClass} ${dcTagStyle} ${dcTagRest} data-day="${d}" data-month="${m}"></${dcTag}>
        </${dTag}>`;
    }

                                                            //pętla pokazująca pozostałe dni tego miesiąca
    for( let r = 0; r < 5 && d <= lDom; r++ ){              //tygodnie

        for( let x = 0 ; x < 7 && d <= lDom; x++, d++ ){    //dni tygodnia
            out += `<${dTag} ${dTagClass} ${dTagStyle} ${dTagRest}>
                <${dhTag} ${dhTagClass} ${dhTagStyle} ${dhTagRest}> ${d} </${dhTag}>
                <${dcTag} ${dcTagClass} ${dcTagStyle} ${dcTagRest} data-day="${d}" data-month="${m}"></${dcTag}>
            </${dTag}>`;
        }
    
    }

    // out += `<${dTag} data-day="${m}-${d}" ${dTagClass} ${dTagStyle} ${dTagRest}> ${d} </${dTag}>`;
                                                            //pętla pokazująca dni następnego miesiaca w ostatnim tygodniu
    for( let x = 7; x > lDow; x-- ) {
        out += `<${dTag} ${dTagClass} ${dTagStyle} ${dTagRest}>
            <${dhTag} ${dhTagClass} ${dhTagStyle} ${dhTagRest}></${dhTag}>
            <${dcTag} ${dcTagClass} ${dcTagStyle} ${dcTagRest}></${dcTag}>
        </${dTag}>`;
    }

    el.innerHTML = out;

}
/**
 * 
 * @param {Number} y year (YYYY)
 * @param {Number} m month (mm)
 * @param {Element} el where to put calendar (.class / #id / id)
 * @param {Array} tags tags for: [dtag (day), dhTag (day header), dcTag (day conent)]
 * @param {Array} tagsClasses classes for tags [dTagClass, dhTagClass, dcTagClass]
 * @param {Array} tagsStyles styles for tags [dTagStyle, ..., todayStyle, weekendStyle]
 * @param {Array} tagsRest rest data for tags [dTagRest, ...]
 * @param {Boolean} strict true - generate calendar only days in this month
 */

function generateCalendar(
    y, m, el,
    tags, tagsClasses, tagsStyles, tagsRest,
    strict //#todo #5 implement strict mode in calendar
) //#todo #4 zmienić tą listę argumentów na (y,m,el, Tag[(d,w,h-header)], tagClass[(d,w,h)], tagStyle[(d,w,h)], tagRest[(d,w,h)] )
{
    /////////////////////////////////////////////////
    ////////// WERYFIKACJA ARGUMENTÓW DATY //////////
    /////////////////////////////////////////////////

    //m++; //w js 0 - styczeń, 11 - grudzień

    if( y < 2000 || y > 2200 ) return console.log("Wrong year. Year must be between 2000 and 2200");
    if( m < 1 || m > 12 ) return console.log("Wrong month. Month must be between 1 and 12");
    
    if( el[0] == '.' )
        el = document.getElementsByClassName(el.substring(1))[0];
    else {
        if( el[0] == '#' )
            el = el.substring(1);
        el = document.getElementById(el);
    }

    ///////////////////////////////////////////////////////
    ////////// WERYFIKACJA ARGUMENTÓW ZNACZNIKÓW //////////
    ///////////////////////////////////////////////////////
    //
    ////////// TAGI //////////

    tags.forEach((tag,i)=>{
        tags[i] = tag.replaceAll('<','').replaceAll('>','')
    })

    dTag = tags[0] ?? 'div';
    dhTag = tags[1];    // \/
    dcTag = tags[2];    //nie potrzebny coalesce - puste taki dh i dc oznaczają generowanie prostszego kalendarza/\

    ////////// KLASY TAGÓW //////////

    if(tagsClasses != null) {
        dTagClass = tagsClasses[0] != null
            ? 'class="' + tagsClasses[0] + '"'
            : '';
        dhTagClass = tagsClasses[1] != null
            ? 'class="' + tagsClasses[1] + '"'
            : '';
        dcTagClass =  tagsClasses[1] != null
            ? 'class="' + tagsClasses[1] + '"'
            : '';
    }
    else {
        dTagClass = dhTagClass = dcTagClass = '';
    }

    ////////// STYLE TAGÓW //////////

    if(!null0(tagsStyles)) {
        dTagStyle = !null0(tagsStyles[0])
            ? 'style="' + tagsStyles[0] + '"'
            : '';
        dhTagStyle = !null0(tagsStyles[1])
            ? 'style="' + tagsStyles[1] + '"'
            : '';
        dcTagStyle = !null0(tagsStyles[2])
            ? 'style="' + tagsStyles[2] + '"'
            : '';
    }
    else {
        dTagStyle = dhTagStyle = dcTagStyle = '';
    }
        
    ////////// POZOSTAŁE DANE TAGÓW //////////

    if(!null0(tagsRest)) {
        dTagRest = tagsRest[0] ?? '';
        dhTagRest = tagsRest[1] ?? '';
        dcTagRest = tagsRest[2] ?? '';
    }
    else {
        dTagRest = dhTagRest = dcTagRest = '';
    }

    //////////  //////////

    if( dhTag && dcTag )
        return generateFullCalendar(y, m, el, dTag, dTagClass, dTagStyle, dTagRest, dhTag, dhTagClass, dhTagStyle, dhTagRest, dcTag, dcTagClass, dcTagStyle, dcTagRest)
    
    return generateAccualCalendar(y, m, el, dTag, dTagClass, dTagStyle, dTagRest)
}