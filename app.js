const search = document.querySelector("#search");
const s_form = document.querySelector(".search-form");
search.addEventListener("focus",s);
search.addEventListener("blur",a);
function s(e){
    s_form.style.border = "1px solid rgb(49, 155, 216)";
}
function a(e){
    s_form.style.border = "1px solid #dee2e6";
}



// Post Page
let conIn = 0;  



function showContentIndex(id,ind){
    const content = document.querySelector(id).children;
    for (let i = 0; i < content.length; i++) {
        const el = content[i];
        if(String(el) == "[object HTMLHeadingElement]"){
            const index = document.querySelector(ind);            
            let ele = document.createElement("a");
            ele.href = "#" + conIn;
            el.id = String(conIn);
            conIn++;
            let html = `<li class="list-group-item">${el.innerText}</li>`;
            ele.innerHTML = html;
            index.appendChild(ele); 
        }
    }
}

try {
    showContentIndex("#content","#index");
} catch (error) {
    console.log(error);
}



function unAuthMode(el="",state){
    let ele = document.querySelectorAll(el);
    if(state){
        ele.forEach(function(e){
            e.style.display = "";
        }) 
    }else{
        ele.forEach(function(e){
            e.style.display = "none";
        })
    }
}

let username = document.querySelector("#user");

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      userSession = true;
      unAuthMode(".unauth",false);
      unAuthMode(".auth",true);
      username.innerText = `Hi ${user.displayName}`;
    } else {
      userSession = false;
      unAuthMode(".unauth",true);
      unAuthMode(".auth",false);
    }
    DOMLoaded();
  });


function DOMLoaded() {
    document.querySelector(".preloader").style.display = "none";
    document.querySelector("body").classList.remove("preload");
}


document.querySelector("#signout").addEventListener("click",() => {
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
      }).catch(function(error) {
        // An error happened.
      });
})

let api = "";

fetch("/search.json").then(a => a.json()).then(b => api = b).catch(err => console.log(err));

let search_results = document.querySelector("#searchResults");
document.querySelector("#search").addEventListener("input",(e)=>{
    let val = e.target.value;
    let arr = [];
    if(api != "" && val != ""){
        val = val.toLowerCase();
        arr = api.filter((item) => item.title.toLowerCase().indexOf(val) >= 0 || item.category.toLowerCase().indexOf(val) >= 0 || item.tags.toLowerCase().indexOf(val) >= 0 );
        let cats = []
        console.log(arr);
        arr.forEach((item)=> cats.push(item.category));
        let html = "";
        for (let i = 0; i < cats.length; i++) {
            let el = cats[i];
            let els = arr.filter((item) => item.category.indexOf(el) >= 0);
            html = `<li class="list-group-item fw-bold search-cat">${el}</li>`;
            els.forEach((item)=>{
               html = `${html}<li class="list-group-item">
                            <a href="${item.url}">
                                <div class="text-dark">
                                    ${item.tags} / ${item.title}
                                </div>
                            </a>
                        </li>`; 
            });

        }
        search_results.style.display = "";
        search_results.innerHTML = html;
        
    }else{
        search_results.innerHTML = "";
        search_results.style.display = "none";
    }

});

var $cs = $(".component");
var $inp = $("#comp-search");

$inp.on('input',function(e){
    $cs.each((i,el)=>{
        let $e = $(el);
        let title = $e.find(".component-title").text().toLowerCase();
        let tags = $e.find(".component-tag").text().replace(/\s/g, '').split(",");
        
        if(title.indexOf($inp.val()) >= 0 || tags.filter((i) => i.indexOf($inp.val()) >= 0).length > 0 ){
            $e.show();
        }else{
            $e.hide();
        }
    });
})

let $area = $("#component-area");
$(".component").click(function(e){
    e.preventDefault();
    let title = $(e.currentTarget).find(".component-title").text();
    let img = $(e.currentTarget).find("img");
    try {
        let html = `
    <div class="card">
        <div class="card-body">
            <img class="d-block w-100" src="${img[0].src}">
            <div class="card-title text-center mt-2">${title}</div>
        </div>
    </div>
    `;
    $area.html(html);
    } catch (error) {
       console.log(error); 
    }
});