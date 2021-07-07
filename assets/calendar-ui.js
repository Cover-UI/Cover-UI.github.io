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


function initMonth(m){
    let x = new Date();
    x.setDate( x.getDate() - x.getDay() )
    
    for (let i = 1; i < 36; i++) {
        
        x.setDate( x.getDate() + 1 );
        def_days.push({
            day: x.getDate(),
            month: x.getMonth(),
            year: x.getFullYear()
        });
        
    }
    
}

// init month with certain time

function initMonthWithTime(d,m,y){
    let x = new Date(`${m+ 1} ${d} ${y}`);
    
    for (let i = 1; i < 36; i++) {
        
        
        def_days.push({
            day: x.getDate(),
            month: x.getMonth(),
            year: x.getFullYear()
        });
        x.setDate( x.getDate() + 1 );
        
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

function loadAssets(calendar = "main-calendar"){
    load(calendar);

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


function save(calendar = "main-calendar"){
    let d = JSON.parse( localStorage.getItem("sd-calendar-data") );
    d[calendar] = data;
    localStorage.setItem("sd-calendar-data", JSON.stringify(d) );
}

function load(calendar = "main-calendar"){
    let d = JSON.parse( localStorage.getItem("sd-calendar-data") );
    data = d != undefined ? d[calendar] : {};
}

$("#select-calendar").change(function(e){
    loadAssets( $(e.target).val() );
    
});
