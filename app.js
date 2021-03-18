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

function isDir(path){return path.search("/") != -1;}

let docStructure = []; 
$(document).ready(function(){
    var api = false;
    fetch("/wp-docs-search.json").then(x=> x.json()).then(a=> {api = a;}).catch(e => console.log(e))
   
    
    setTimeout(function(){
        api.forEach(x => {
            x.path = x.path.split("_wp_theme_docs/")[1];
            var _dir = isDir( x.path );
            
            if(!_dir){
                docStructure.push(x);
            }else{
                var dirname = x.path.split("/")[0];
                docStructure[dirname] = [];
                
                x.path = x.path.split("/")[1];
                var _dir = isDir( x.path );

                if(!_dir){
                    docStructure[dirname].push(x);
                }else{
                    docStructure.push(x);

                }
            }
        })
        
        
    },2000)
})
