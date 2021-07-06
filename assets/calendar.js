//$("#select-calendar").change(function(){console.log("a")})

let SIDEBAR_BTTNS = [
    // add note
    {
        icon: "add",
        label: "Add Note",
        callback: function(e){
            let el = `
            <div class="mb-3">
                <label for="notlabel" class="form-label">Note Label</label>
                <input type="text" class="form-control" id="notlabel" placeholder="Enter Note Label">
            </div>
            <div class="mb-3">
                <label for="notetype" class="form-label">Note Type</label>
                <select class="form-select" id="notetype" aria-label="Default Note Type">
                    <option selected value="info">Info</option>
                    <option value="danger">Danger</option>
                    <option value="warning">Warning</option>
                    <option value="success">Success</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="notedesc" class="form-label">Note Description</label>
                <textarea class="form-control" id="notedesc" rows="3"></textarea>
            </div>
            `;

            let btn = $("<button>",{class:"btn btn-success"}).click(function(e){
                let id = getSelected().attr("id");
                
                if( data[id] == undefined ){
                    data[id] = [];
                }
                data[id].push({
                    label: $("#notlabel").val(),
                    description: $("#notedesc").val(),
                    type: $("#notetype").val()
                });

                save();
                loadAssets()
            }).html("Add Note");
            $(".option-detail").html(el).append(btn).toggle();
        }
    },
    // delete note
    {
        icon: "delete",
        label: "Delete Note",
        callback: function(e){
            $(".option-detail").html("");
            let id = getSelected().attr("id");
            if( data[id] != undefined ){
                let list = $("<ul>",{class:"list-group list-group-flush"});
                
                for (let i = 0; i < data[id].length; i++) {
                    let item = `
                    <li class="list-group-item p-0 d-flex justify-content-between">
                        <span class="my-auto">${data[id][i].label}</span>
                        <button class="btn btn-danger remove-note" id="remove-${id}-${i}"> <i class="material-icons">delete</i> </button>
                    </li>
                    `
                    list.html( list.html() + item );
                }
                $(".option-detail").append(list).toggle();

                $(".remove-note").click(function(e){
                    let id = $(e.currentTarget).attr("id").split("remove-")[1].split("-");
                    let i = id[4];
                    id = `${id[0]}-${id[1]}-${id[2]}-${id[3]}`;
                    
                    $(e.currentTarget).parents("li").remove();

                    let badges = []; 
                    for (let k = 0; k < data[id].length; k++) {
                        if( k != i ){
                            badges.push(data[id][k]);
                        }
                    }

                    data[id] = badges;

                    save();
                    loadAssets();
                })

            }
        }
    },
    // edit note
    {
        icon: "create",
        label: "Edit Note",
        callback: function(e){

            $(".option-detail").html("");
            let id = getSelected().attr("id");
            if( data[id] != undefined ){
                let list = $("<ul>",{class:"list-group list-group-flush"});
                
                for (let i = 0; i < data[id].length; i++) {
                    let item = `
                    <li class="list-group-item p-0 d-flex justify-content-between">
                        <span class="my-auto">${data[id][i].label}</span>
                        <button class="btn btn-success edit-note" id="edit-${id}-${i}"> <i class="material-icons">create</i> </button>
                    </li>
                    `
                    list.html( list.html() + item );
                }
                $(".option-detail").append(list).toggle();

                $(".edit-note").click(function(e){
                    let id = $(e.currentTarget).attr("id").split("edit-")[1].split("-");
                    let i = id[4];
                    id = `${id[0]}-${id[1]}-${id[2]}-${id[3]}`;
                    
                    let el = `
                    <div class="mb-3">
                        <label for="notlabel" class="form-label">Note Label</label>
                        <input type="text" class="form-control" id="notlabel" placeholder="Enter Note Label" value="${data[id][i].label}">
                    </div>
                    <div class="mb-3">
                        <label for="notetype" class="form-label">Note Type</label>
                        <select class="form-select" id="notetype" aria-label="Default Note Type">
                            <option value="info">Info</option>
                            <option value="danger">Danger</option>
                            <option value="warning">Warning</option>
                            <option value="success">Success</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="notedesc" class="form-label">Note Description</label>
                        <textarea class="form-control" id="notedesc" rows="3">${data[id][i].description}</textarea>
                    </div>
                    `;
                    
                    let btn = $("<button>",{class:"btn btn-success"}).click(function(e){
                        
                        data[id][i] = {
                            label: $("#notlabel").val(),
                            description: $("#notedesc").val(),
                            type: $("#notetype").val()
                        };
        
                        save();
                        loadAssets()
                    }).html("Edit Note");
                    $(".option-detail").html(el).append(btn);
                    
                    $('#notetype').val(data[id][i].type);
                })

            }

        }
    },
    // add settings
    {
        icon: "settings",
        label: "Settings",
        callback: function(e){
            $(".option-detail").html("").hide();
            let $modal = $("<div>",{class:"modal fade modal-dialog-scrollable",id:"settingsModal"}).html(`
            <div class="modal-dialog">
                <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="list-group list-group-flush">

                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>	
                </div>
            </div>`);

            let $modal_list = $modal.find(".list-group");
            for(var i=0;i<$options.length;i++){
                let el = $("<button>",{class:"list-group-item list-group-item-action"}).text($options[i].label);
                el.click($options[i].callback);
                $modal_list.append(el);
            }

            $("body").append($modal);

            var myModal = new bootstrap.Modal(document.getElementById("settingsModal"), {
              keyboard: false
            });

            myModal.show();
        }
    }
]

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];




setSidebar();

let CURRENT_MONTH = new Date().getMonth();

function setMonth(m){
    initMonth( m );

    let def_week = [];
    let index = 0;
    while(index < 35){
        for (let i = index; i < index+7; i++) {
            def_week.push(def_days[i]);
        }
        let html = setWeek(def_week);

        def_week = [];
        index += 7;
        $(".calendar-table").html( $(".calendar-table").html() + html );
    }

    loadAssets();
}

setMonth( CURRENT_MONTH );

let lastRefresh = 600;

let $calendar_sec = $(".calendar-section"); 
$calendar_sec.scroll(function(e){

    if( lastRefresh < e.target.scrollTop + $calendar_sec.height() ){

        let month = def_days[ def_days.length -1 ].month;
        let day = def_days[ def_days.length -1 ].day;
        let year = def_days[ def_days.length -1 ].year;
        
        if(month_day[month] == day){
            day = 1;
            month++;
        }else{
            day++;
        }

        if(month>11){
            year++;
            month = 0;
        }
      

        def_days = [];

        initMonthWithTime( day, month, year );

        let def_week = [];
        let index = 0;
        while(index < 35){
            for (let i = index; i < index+7; i++) {
                def_week.push(def_days[i]);
            }
            let html = setWeek(def_week);

            def_week = [];
            index += 7;
            $(".calendar-table").html( $(".calendar-table").html() + html );
        }
        

        lastRefresh += 600;
        loadAssets();
        initSelect();
    }

    
})


function initSelect(){
    $(".widget-sec").click(function(e){
        $(".widget-sec.selected").removeClass("selected");
        $(e.currentTarget).addClass("selected");
    });
}

initSelect();
