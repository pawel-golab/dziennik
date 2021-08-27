class Calendar{

    constructor(
        y = new Date().getFullYear(),
        m = new Date().getMonth(), el,
        dayTag, dayHeaderTag, dayContentTag,
        dayClass, dayHeaderClass, dayContentClass,
        dayStyle, dayHeaderStyle, dayContentStyle,
        dayRest, dayHeaderRest, dayContentRest
    )
    {        
        if( null0(y) || parseInt(y) != y || y < 2000 || y > 2200 ) //pierwszy warunek raczej opcjonalny
            this.Y = new Date().getFullYear();
        else
            this.Y = y;
        
        if( null0(m) || parseInt(m) != m || m < 1 || m > 12 )
            this.M = new Date().getMonth()+1;
        else
            this.M = m;


        this.SetPlaceholder(el);
        this.SetDayTags(dayTag, dayHeaderTag, dayContentTag);
        this.SetDayClasses(dayClass, dayHeaderClass, dayContentClass);
        this.SetDayStyles(dayStyle, dayHeaderStyle, dayContentStyle);
        this.SetDayRest(dayRest, dayHeaderRest, dayContentRest);
        
    };
    /**
     * Gets element that will store whole calendar
     * @param {string} el class (.class) or id (#id / id)
     */
    SetPlaceholder(el){
        if( !null0(el) ){
            if( el[0] == '.' )
                this.El = document.getElementsByClassName(el.substring(1))[0];
            else {
                if( el[0] == '#' )
                    el = el.substring(1);
                this.El = document.getElementById(el);
            }
        }
        else cl('Warning! Calendar.el cannot be null');
    };
    /**
     * Html tags that will store day cards
     * @param {String} dayTag stores whole date card (header+content)
     * @param {String} dayHeaderTag stores header part of day card (day number + etc.)
     * @param {String} dayContentTag stores content part of day card (tasks) 
     */
    SetDayTags(dayTag, dayHeaderTag, dayContentTag){
        if( !null0(dayTag) ){
            this.DayTag = dayTag.replaceAll('<','').replaceAll('>','')
        }
        else this.DayTag = "div"

        if( !null0(dayHeaderTag) ){
            this.DayHeaderTag = dayHeaderTag.replaceAll('<','').replaceAll('>','')
        }
        else this.DayHeaderTag = "div"

        if( !null0(dayContentTag) ){
            this.DayContentTag = dayContentTag.replaceAll('<','').replaceAll('>','')
        }
        else this.DayContentTag = "div"
    };
    /**
     * Class names that will be added to day cards
     * @param {*} dayClass class name of whole day card (header+content)
     * @param {*} dayHeaderClass class name of header part of day card
     * @param {*} dayContentClass class name of content part of day card
     */
    SetDayClasses(dayClass, dayHeaderClass, dayContentClass){
        this.DayClass = null0(dayClass)
            ? ''
            : 'class="' + dayClass + '"';
        this.DayHeaderClass = null0(dayHeaderClass)
            ? ''
            : 'class="' + dayClass + '"';
        this.DayContentClass =  null0(dayContentClass)
            ? ''
            : 'class="' + dayContentClass + '"';
    };
    /**
     * css style that will be added to day cards
     * @param {*} dayStyle style of whole day card (header+content)
     * @param {*} dayHeaderStyle style of header part of day card
     * @param {*} dayContentStyle style of content part of day card
     */
    SetDayStyles(dayStyle, dayHeaderStyle, dayContentStyle){
        this.DayStyle = !null0(dayStyle)
            ? ''
            : 'style="' + dayStyle+ '"';
        this.DayHeaderStyle = !null0(dayHeaderStyle)
            ? ''
            : 'style="' + dayHeaderStyle + '"';
        this.DayContentStyle = !null0(dayContentStyle)
            ? ''
            : 'style="' + dayContentStyle + '"';
    };

    SetDayRest(dayRest, dayHeaderRest, dayContentRest){
        this.DayRest = dayRest ?? '';
        this.DayHeaderRest = dayHeaderRest ?? '';
        this.DayContentRest = dayContentRest ?? '';
    };

    GenerateSimpleCalendar(){
        let y = this.Y, m = this.M,
        dT = this.DayTag, dC = this.DayClass, dS = this.DayStyle, dR = this.DayRest;

        let out = '';

        let fDomData = new Date(y, m-1, 1);                     //pełne informacje o pierwszym dniu miesiąca
        let lDomData = new Date(y, m, 0);                       //pełne informacje o ostatnim dniu miesiaca

        let fDow = fDomData.getDay() || 7;                      //niedziela to 0, 0 || 7 = 7
        let lDow = lDomData.getDay() || 7;
        let lDom = lDomData.getDate();

                                                                //pętla pokazująca dni poprzedniego miesiąca w pierwszym tygodniu
        let x = 1;                                              //id komórki w kalendarzu
        for( ; x < fDow; x++ ){
            out += `<${dT} ${dC} ${dS} ${dR}></${dT}>`;
        }
                                                                //pętla pokazująca dni tego miesiaca w pierwszym tygodniu
        for( var d = 1; x <= 7; x++, d++ ){
            out += `<${dT} ${dC} ${dS} ${dR} data-day="${d}" data-month="${m}" data-calendar="content"> ${d} </${dT}>`;
        }

                                                                //pętla pokazująca pozostałe dni tego miesiąca
        for( let r = 0; r < 5 && d <= lDom; r++ ){              //tygodnie
    
            for( let x = 0 ; x < 7 && d <= lDom; x++, d++ ){    //dni tygodnia
                out += `<${dT} ${dC} ${dS} ${dR} data-day="${d}" data-month="${m}" data-calendar="content"> ${d} </${dT}>`;
            }
        
        }
                                                                //pętla pokazująca dni następnego miesiaca w ostatnim tygodniu
        for( let x = 7; x > lDow; x-- ) {
            out += `<${dT} ${dC} ${dS} ${dR}></${dT}>`;
        }

        this.El.innerHTML = out;
    };
    GenerateFullCalendar(){
        let y = this.Y, m = this.M,
        dT = this.DayTag, dhT = this.DayHeaderTag, dcT = this.DayContentTag,
        dC = this.DayClass, dhC = this.DayHeaderClass, dcC = this.DayContentClass,
        dS = this.DayStyle, dhS = this.DayHeaderStyle, dcS = this.DayContentStyle,
        dR = this.DayRest, dhR = this.DayHeaderRest, dcR = this.DayContentRest;

        let out = '';

        let fDomData = new Date(y, m-1, 1);                     //pełne informacje o pierwszym dniu miesiąca
        let lDomData = new Date(y, m, 0);                       //pełne informacje o ostatnim dniu miesiaca

        let fDow = fDomData.getDay() || 7;                      //niedziela to 0, 0 || 7 = 7
        let lDow = lDomData.getDay() || 7;
        let lDom = lDomData.getDate();

                                                                //pętla pokazująca dni poprzedniego miesiąca w pierwszym tygodniu
        let x = 1;                                              //id komórki w kalendarzu
        for( ; x < fDow; x++ ){
            out += `<${dT} ${dC} ${dS} ${dR}>
                <${dhT} ${dhC} ${dhS} ${dhR}></${dhT}>
                <${dcT} ${dcC} ${dcS} ${dcR}></${dcT}>
            </${dT}>`;
        }
                                                                //pętla pokazująca dni tego miesiaca w pierwszym tygodniu
        for( var d = 1; x <= 7; x++, d++ ){
            out += `<${dT} ${dC} ${dS} ${dR} data-day="${d}" data-month="${m}">
                <${dhT} ${dhC} ${dhS} ${dhR}> ${d} </${dhT}>
                <${dcT} ${dcC} ${dcS} ${dcR} data-calendar="content"></${dcT}>
            </${dT}>`;
        }

                                                                //pętla pokazująca pozostałe dni tego miesiąca
        for( let r = 0; r < 5 && d <= lDom; r++ ){              //tygodnie

            for( let x = 0 ; x < 7 && d <= lDom; x++, d++ ){    //dni tygodnia
                out += `<${dT} ${dC} ${dS} ${dR} data-day="${d}" data-month="${m}">
                    <${dhT} ${dhC} ${dhS} ${dhR}> ${d} </${dhT}>
                    <${dcT} ${dcC} ${dcS} ${dcR} data-calendar="content"></${dcT}>
                </${dT}>`;
            }
        
        }

        // out += `<${dT} data-day="${m}-${d}" ${dC} ${dS} ${dR}> ${d} </${dT}>`;
                                                                //pętla pokazująca dni następnego miesiaca w ostatnim tygodniu
        for( let x = 7; x > lDow; x-- ) {
            out += `<${dT} ${dC} ${dS} ${dR}>
                <${dhT} ${dhC} ${dhS} ${dhR}></${dhT}>
                <${dcT} ${dcC} ${dcS} ${dcR}></${dcT}>
            </${dT}>`;
        }

        this.El.innerHTML = out;
    };
}

function generateCalendar(
)
{
    ////////// GENERACJA KALENDARZA //////////

    if( dhT && dcT )
        generateFullCalendar(y, m, el, dT, dC, dS, dR, dhT, dhC, dhS, dhR, dcT, dcC, dcS, dcR)
    else
        generateAccualCalendar(y, m, el, dT, dC, dS, dR)

    ////////// nałożenie klas i stylów na "dzień dzisiejszy" //////////

    // zamienienie stringa z css'e, na tablicę w której każdy wiersz to: atrybut:wartość
    let todayStyles = null0(tagsStyles[3])
        ? ''
        : tagsStyles[3].split(';');
        // // alternatywa
        // : tagsStyles[3].match('.*;')
            // ? tagsStytles[3].substring(0,-1).split(';')
            // : tagsStytles[3].split(';');

    $(el).find(`[data-day="${new Date().getDate()}"][data-month="${m}"]`).each( function()
    {
        // co jeżeli będzie: atrybut1:wartość1;atrybuty2:wartość2; lub nawet ;;, ;;; etc.:
        if(!null0(tagsClasses[3])){
            $(this).addClass(tagsClasses[3]);
        }

        for( let todayStyle of todayStyles ) {
            todayStyle = todayStyle.split(':');
            
            $(this).css(todayStyle[0]?.trim(),todayStyle[1]?.trim());
        }
    })

    ////////// nałożenie klas i stylów na weekendy //////////
    let lastDay = new Date(y,m,0);
    let firstSaturday = (lastDay.getDate()-lastDay.getDay()-1) % 7;
    lastDay = lastDay.getDate();

    let weekendStyles = null0(tagsStyles[4])
        ? ''
        : tagsStyles[4].split(';');

    for( let i = firstSaturday; i < lastDay; i+=6 ) {
        $(el).find(`[data-day="${i}"][data-month="${m}"]`).each( function(){
            $(this).addClass(tagsClasses[4]);

            for( let weekendStyle of weekendStyles ) {
                weekendStyle = weekendStyle.split(':');
                
                $(this).css(weekendStyle[0]?.trim(),weekendStyle[1]?.trim());
            }
        });
        i++;
        $(el).find(`[data-day="${i}"][data-month="${m}"]`).each( function(){
            $(this).addClass(tagsClasses[4]);

            for( let weekendStyle of weekendStyles ) {
                weekendStyle = weekendStyle.split(':');
                
                $(this).css(weekendStyle[0]?.trim(),weekendStyle[1]?.trim());
            }
        });
    }
}