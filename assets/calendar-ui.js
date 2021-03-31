function getSelected(){
    return $(".widget-sec.selected");
}

function setSidebar(){
    for (let i = 0; i < SIDEBAR_BTTNS.length; i++) {
        const btn = SIDEBAR_BTTNS[i];
        let el = $("<button>",{class:"list-group-item list-group-item-action d-flex"});
        el.html(`<i class="material-icons">${btn.icon}</i><span class="mx-3 my-auto">${btn.label}</span>`);
        el.click(btn.callback);
        $("#sidebar-buttons").append(el);   
    }
}

function setWeek(weekDays){
    let html_1 = $("<tr>");
    for (let i = 0; i < 7; i++) {
        const day = weekDays[i];
        html_1.append( $("<td>").html(`${day.day} ${MONTHS[day.month]} ${day.year}`) )
    }

    let html_2 = $("<tr>");
    for (let i = 0; i < 7; i++) {
        const day = weekDays[i];
        html_2.append( $("<td>",{class:"p-0"}).append( $("<div>",{class:"p-2 widget-sec",id:`day-${day.day}-${day.month}-${day.year}`}) ) )
    }

    return html_1[0].outerHTML + html_2[0].outerHTML;
}


function initTooltips(){
    var tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    for (let i = 0; i < tooltips.length; i++) {
        const tt = tooltips[i];
        new bootstrap.Tooltip(tt, {})
    }
}


let def_days = [];
const month_day = [31,28,31,30,31,30,31,31,30,31,30,31];

function set_def_days(){
    for (let i = 0; i < 35; i++) {
        def_days.push({
            day: 0,
            month: 0,
            year: 0
        });
    }
}

set_def_days();


function initMonth(m){
    let now = new Date();
    now = new Date(`${m+ 1} 1 ${now.getFullYear()}`);
    let index = 0;
    let begin = now.getDay();

    if(begin-1 > 0){
        let month = now.getMonth();
        let day = 0;
        let year = 0;

        if(month == 0){
            month = 11;
            day = month_day[11];
            year = now.getFullYear() -1;

        }else{
            day = month_day[now.getMonth()-1];
            year = now.getFullYear();
        }

        
        index = day;
        for (let i = begin-2; i > -1; i--) {
            def_days[i] = {
                day: index,
                month: month,
                year: year
            }
            index--;
            
        }
    }

    index = 1;
    for (let i = begin-1; i < month_day[now.getMonth()]; i++) {
        def_days[i] = {
            day: index,
            month: now.getMonth(),
            year: now.getFullYear()
        }
        index++;
    }

    month = now.getMonth();
    day = 0;
    year = 0;
    
    if(month == 11){
        month = 0;
        day = month_day[0];
        year = now.getFullYear() +1;

    }else{
        day = month_day[now.getMonth()+1];
        year = now.getFullYear();
        month++;
    }

    
    index = 1;

    for (let i = 0; i < def_days.length; i++) {
        if( def_days[i].day == 0){
            def_days[i]= {
                day: index,
                month: month,
                year: year
            };
            index++;
        }
        
    }
}

// init month with certain time

function initMonthWithTime(d,m,y){
    let now = new Date(`${m+ 1} ${d} ${y}`);

    let index = now.getDate();
    let l = month_day[now.getMonth()] - index+1;
    for (let i = 0; i < l; i++) {

        def_days[i] = {
            day: index,
            month: now.getMonth(),
            year: now.getFullYear()
        }
        index++;
    }

    let month = now.getMonth();
    let day = 0;
    let year = 0;
    
    if(month == 11){
        month = 0;
        day = month_day[0];
        year = now.getFullYear() +1;

    }else{
        day = month_day[now.getMonth()+1];
        year = now.getFullYear();
        month++;
    }

    index = 1;

    for (let i = 0; i < def_days.length; i++) {
        if( def_days[i].day == 0){
            def_days[i]= {
                day: index,
                month: month,
                year: year
            };
            index++;
        }
        
    }
}

function renderBadge(label,desc,type){
    let types = {
        info: {
            icon: "info",
            bg: "info"
        },
        danger: {
            icon: "error",
            bg: "danger"
        },
        warning: {
            icon: "notification_important",
            bg: "warning"
        },
        success: {
            icon: "done",
            bg: "success"
        },
    }

    return `<span class="badge bg-${types[type].bg}" data-bs-toggle="tooltip" data-bs-placement="bottom" title="${desc}"><i class="material-icons badge-icon">${types[type].icon}</i>${label}</span>`;

}

function loadAssets(){
    load();

    $(".widget-sec").each(function(i,e){

        if(data[e.id] != undefined){
            let badges = data[e.id];
            let html = "";
            
            for (let i = 0; i < badges.length; i++) {
                html += renderBadge( badges[i].label, badges[i].description, badges[i].type);
            }

            $(`#${e.id}`).html(html);
        }
        
    });

    initTooltips();
}


function save(){
    localStorage.setItem("sd-calendar-data", JSON.stringify(data) );
}

function load(){
    let d = JSON.parse( localStorage.getItem("sd-calendar-data") );
    data = d != undefined ? d : {};
}