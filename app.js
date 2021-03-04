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

let username = document.querySelector(".user");

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      userSession = true;
      unAuthMode(".unauth",false);
      unAuthMode(".auth",true);
      username.innerHTML = `<a class="nav-link single " href="#">Hi ${user.email}</a>`;
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
