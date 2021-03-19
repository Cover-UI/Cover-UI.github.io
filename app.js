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

let allKeys = ["advanced-theme-topic","customizer","getting-started","releasing-your-theme","submitting","theme-basics","template-files","theme-functonality","core-supported","theme-security"];
let sortedKeys = ["getting-started","theme-basics","template-files","theme-functonality","customizer","theme-security","advanced-theme-topic","releasing-your-theme"];



function isDir(path){return path.search("/") != -1;}
function setArray(o,l){
    if(o[l] == undefined){
        o[l] = [];
    }
}

function setPath(p){
    var arr = p.split("/");
    var path = [];
    for(var i = 1; i < arr.length; i++){
        path.push(arr[i]);
    }
    return path.join("/");
}

function setSingle(o){
    return `
    <li class="nav-item">
     
      <a class="nav-link text-muted" href="${o.url}">

        <span class="d-flex justify-content-between">
          <span class="d-block">
            ${o.title}
          </span>

        </span>
      </a>

    </li>
`;
}

function setPlural(l,arr){
    let subhtml = "";
    
    for(var i = 0; i < allKeys.length; i++){
        let k = allKeys[i];
        if(k in arr){
            subhtml += setSubPlural(capitalizeFirstLetter( k.replaceAll("-"," ") ),arr[k]);
        }
    }
    
    
    arr = arr.sort(compare);
    for(var i = 0; i < arr.length; i++){
        subhtml += setSubSingle(arr[i]);
    }
    
    
    return `
    <li class="nav-item">
          
            <a class="nav-link text-muted" data-bs-toggle="collapse" href="#${l}" role="button" aria-expanded="false" aria-controls="${l}">
          
            <span class="d-flex justify-content-between">
              <span class="d-block">
                ${l}
              </span>
                
              <i class="material-icons d-block">
                keyboard_arrow_down
              </i>
            
            </span>
          </a>
          
          <nav class="collapse" id="${l}">
            <ul class="list-group list-group-flush ms-3">
            
               ${subhtml}
              
            </ul>
           
          </nav>
          
        </li>
`;
}


function setSubSingle(o){
    return `
<li class="list-group-item">
  <a class="text-muted" href="${o.url}"> ${o.title}</a>
</li>
`
}

function setSubPlural(l,arr){
    let subhtml = "";
    arr = arr.sort(compare);
    
    for(var i = 0; i < arr.length; i++){
        subhtml += setSubSingle(arr[i]);
    }
    
    return `
<li class="list-group-item">
  <a class="nav-link text-muted" data-bs-toggle="collapse" href="#${l}" role="button" aria-expanded="false" aria-controls="${l}">
          
            <span class="d-flex justify-content-between">
              <span class="d-block">
                ${l}
              </span>
                
              <i class="material-icons d-block">
                keyboard_arrow_down
              </i>
            
            </span>
          </a>
          
          <nav class="collapse" id="${l}">
            <ul class="list-group list-group-flush ms-3">
            
              ${subhtml}
              
            </ul>
          </nav>
</li>
`
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function compare(a, b) {
  // Use toUpperCase() to ignore character casing
  const bandA = a.order;
  const bandB = b.order;

  let comparison = 0;
  if (bandA > bandB) {
    comparison = 1;
  } else if (bandA < bandB) {
    comparison = -1;
  }
  return comparison;
}


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
                setArray(docStructure,dirname)
                
                x.path = setPath( x.path );
                var _dir = isDir( x.path );

                if(!_dir){
                    docStructure[dirname].push(x);
                }else{
                    var dirname2 = x.path.split("/")[0];
                    setArray(docStructure[dirname],dirname2)
                    
                    docStructure[dirname][dirname2].push(x);
                }
            }
        })
        
        docStructure = docStructure.sort(compare);
        for(var i = 0; i < docStructure.length; i++){
            $("#wp-docs").html( $("#wp-docs").html() + setSingle( docStructure[i] ) );    
        }
        for(var i = 0; i < sortedKeys.length; i++){
            $("#wp-docs").html( $("#wp-docs").html() + setPlural( capitalizeFirstLetter( sortedKeys[i].replaceAll("-"," ") )  , docStructure[ sortedKeys[i] ] ) );    
        }
        
        var collapseElementList = [].slice.call(document.querySelectorAll('#wp-docs .collapse'))
        var collapseList = collapseElementList.map(function (collapseEl) {
          return new bootstrap.Collapse(collapseEl,{toggle:false})
        });
        
        collapseList.forEach((el)=>{
            $(el._triggerArray[0]).click(function(){el.toggle()});
        })
        
        
    },2000)
    
    
})



