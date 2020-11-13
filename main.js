//Nav js
function closeBtn(x){
    x.classList.toggle("nav-btn-close");
}
function openNav(x){
    var tmp= document.querySelector('.main');
    var tmp2= document.querySelector('.nav-links');
    if(x.style.width=="250px"){
        x.style.width="50px";
        tmp.style.marginLeft="50px";
        tmp2.style.display="none";
        tmp.style.backgroundColor="white";
    }else{
        x.style.width="250px";
        tmp.style.marginLeft="250px";
        tmp.style.backgroundColor="rgba(0,0,0,0.4)";
        tmp2.style.display="block";
    }
}

//main page preview
var viewIndex=0;
function viewer(){
    var tmp=document.querySelectorAll(".view");
    var i;
    for(i=0;i<tmp.length;i++){
        tmp[i].style.display="none";
    }
    viewIndex++;
    if(viewIndex>tmp.length){
        viewIndex=1;
    }
    tmp[viewIndex-1].style.display="block";
    setTimeout(viewer,5000);
}
