const mainbox = document.getElementById("box1"),
songimage= document.querySelector(".music-image img"),
songname= document.querySelector(".music-details .mname"),
songartist=document.querySelector(".music-details .aname"),
songaudio=document.querySelector("#main-audio"),
playbtn=document.querySelector(".play"),
revbtn=document.querySelector(".prev"),
fwdbtn=document.querySelector(".next"),
pbar=document.querySelector(".progress-bar"),
pspace=document.querySelector(".progress-space"),
ctime=document.querySelector(".latest"),
ttime=document.querySelector(".latests"),
rptbtn=document.querySelector(".rptbtn"),
songlist=document.querySelector(".music-list"),
showallsong= document.querySelector(".more"),
closeallsong=document.querySelector("#close"),
LIST=document.querySelector("#c")
LI=document.querySelector("#d")

let mysongindex =2;

window.addEventListener("load",()=>{
    loadSong(mysongindex);
})

function loadSong(indexnum){
    songname.innerText=mymusic[indexnum-1].name;
    songartist.innerText=mymusic[indexnum-1].artist;
    songimage.src=`image/${mymusic[indexnum-1].img}`;
    songaudio.src=`songs/${mymusic[indexnum-1].src}`;
}

function playmusic(){
   mainbox.classList.add("paused")
    playbtn.querySelector("span").innerText="pause"
    songaudio.play()

}
function pausemusic(){
  mainbox.classList.remove("paused")
    playbtn.querySelector("span").innerText="play_arrow"
    songaudio.pause()

}
playbtn.addEventListener("click",()=>{
  let is = mainbox.classList.contains("paused")
    is ? pausemusic():playmusic()
    console.log("hgfhnfgsx")
});


function aglagana(){
    mysongindex++;
    mysongindex >mymusic.length? mysongindex=1:mysongindex=mysongindex;
    loadSong(mysongindex)
    playmusic();
}

function peechlagana(){
    mysongindex--;
    mysongindex<1? mysongindex=mymusic.length:mysongindex=mysongindex;
    loadSong(mysongindex)
    playmusic();
}

fwdbtn.addEventListener("click",()=>{
   
    aglagana();
})
revbtn.addEventListener("click",()=>{
peechlagana()
})

songaudio.addEventListener("timeupdate",(e)=>{
  const currenttime=e.target.currentTime;
  const totalduration=e.target.duration;
  let pwidth=currenttime/totalduration*100;
  pbar.style.width=`${pwidth}%`;
 
  let totalmin=Math.floor(e.target.currentTime/60);
  let totalsec = Math.floor(e.target.currentTime%60);
  if(totalsec<10){
    totalsec=`0${totalsec}`
  }
  ctime.innerText=`${totalmin}:${totalsec}`
  let totalmins=Math.floor(e.target.duration/60);
  let totalsecs = Math.floor(e.target.duration%60);
  ttime.innerText=`${totalmins}:${totalsecs}`





})

pspace.addEventListener("click",(e)=>{
    let progresswidth=pspace.clientWidth;
    let click =e.offsetX;
    let td=songaudio.duration
   songaudio.currentTime=(click/progresswidth)*td
   playmusic()

})
rptbtn.addEventListener("click",()=>{
    let text=rptbtn.innerText;
    switch(text){
        case "repeat":
            rptbtn.innerText="repeat_one";
            rptbtn.setAttribute("title","loop me chalega")
            break;


            case "repeat_one":
            rptbtn.innerText="repeat";
            rptbtn.setAttribute("title","shuffle hoga")
            break;
            

    }
})
songaudio.addEventListener("click",()=>{
    switch(text){
        case "repeat":
           aglagana();
            break;


            case "repeat_one":
            songaudio.currentTime=0;
            loadSong(mysongindex);
            breakk;
            

    }
})


showallsong.addEventListener("click",()=>{
songlist.classList.toggle("show")

})
closeallsong.addEventListener("click",()=>{
    songlist.classList.toggle("show")
})

for(let i=0;i<mymusic.length;i++){
    let lis = ` <li  li-index="${i+1}">
    <div class="row">
      <span>${mymusic[i].name}</span>
      <p>${mymusic[i].artist}</p>
    </div>
    <audio class="${mymusic[i].src}" src=${mymusic[i].src}"></audio>

  </li>`;

LIST.insertAdjacentHTML("beforeend",lis)
// console.log(LIST)


// let audiotime=LIST.querySelector(`${mymusic[i].src}`)
// let au =LIST.querySelector(`.${mymusic[i].src}`)


// au.addEventListener("loadeddata",()=>{
//     let aud=au.duration
//     let totalmin=Math.floor(e.target.currentTime/60);
//   let totalsec = Math.floor(e.target.currentTime%60);
//   if(totalsec<10){
//     totalsec=`0${totalsec}`
//   }
//     audiotime.innerText=(`${totalmin}:${totalsec}`)
  
  
// });
}

const all = LIST.querySelectorAll("li")
for(j=0;j<mymusic.length;j++){
    if(all[j].getAttribute("li-index")==mysongindex)
    all[j].classList.add(".playing")
all[j].setAttribute("onclick","clicked(this)")
}

function clicked(element){
    let a=element.getAttribute("li-index");
    mysongindex=a
    loadSong(mysongindex)
    playmusic()
}
