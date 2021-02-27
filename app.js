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

// auth

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
  });


function DOMLoaded() {
    $(".preloader").hide();
    $("body").removeClass("preload");
}


$("#signout").click(() => {
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
      }).catch(function(error) {
        // An error happened.
      });
})


$(document).ready(DOMLoaded);
