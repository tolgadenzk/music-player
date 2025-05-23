const container = document.querySelector(".container");
const image = document.querySelector("#music-image");
const title = document.querySelector("#music-details .title");
const singer = document.querySelector("#music-details .singer");
const prev = document.querySelector("#prev");
const play = document.querySelector("#play");
const next = document.querySelector("#next");
const duration = document.querySelector("#duration");
const currenttime = document.querySelector("#current-time");
const progressbar = document.querySelector("#progress-bar");
const volume = document.querySelector("#volume");
const volumeBar = document.querySelector("#volume-bar");
const ul = document.querySelector("#music-list ul")

const player = new MusicPlayer(musicList);



window.addEventListener("load", () => {
    let music = player.getMusic();
    displayMusic(music);
    displayMusicList(player.musicList);
    isPlayingNow();
});


function displayMusic(music) {
    title.innerHTML = music.getName();
    singer.innerHTML = music.singer;
    image.src = "img/" + music.img;
    audio.src = "mp3/" + music.file;
}

play.addEventListener("click", () => {

    const isMusicPlay = container.classList.contains("playing");
    isMusicPlay ? pauseMusic() : playMusic();   
});

prev.addEventListener("click", () => {prevMusic();});

next.addEventListener("click", () => {nextMusic();});

const prevMusic = () => {
    player.previous();
    let music =  player.getMusic();
    displayMusic(music);
    playMusic();
    isPlayingNow();
}; 

const nextMusic = () =>{
    player.next();
    let music =  player.getMusic();
    displayMusic(music);
    playMusic();
    isPlayingNow();
};

const pauseMusic = () => {
    container.classList.remove("playing");
    play.querySelector("i").classList = "fa-solid fa-play";
    audio.pause();
}

const playMusic = () => {
    container.classList.add("playing");
    play.querySelector("i").classList = "fa-solid fa-pause";
    audio.play();
}

const calculateTime = (seconds) => {    
    const minute = Math.floor(seconds / 60);
    const second = Math.floor(seconds % 60);
    const newsecond = second < 10 ? `0${second}` : `${second}`
    const sonuc = `${minute}:${newsecond}`;
    return sonuc;
} 


audio.addEventListener("loadedmetadata", () =>{
    duration.textContent = calculateTime(audio.duration);
    progressbar.max = Math.floor(audio.duration);
});

audio.addEventListener("timeupdate", () => {
    progressbar.value = Math.floor(audio.currentTime);
    currenttime.textContent = calculateTime(progressbar.value);

})

progressbar.addEventListener("input", () => {
  currenttime.textContent = calculateTime(progressbar.value); 
  audio.currentTime = progressbar.value; 
});


let muteState = "unmuted";

volumeBar.addEventListener("input", (e) => {
   const value = e.target.value;  // 0-100
   audio.volume =  value / 100;        //0-1
   if(value == 0) {
     audio.muted = true;
     muteState = "muted";
     volume.classList = "fa-solid fa-volume-xmark";
     
   }else{
        audio.muted = false;  
        muteState = "unmuted"; 
        volume.classList = "fa-solid fa-volume-high";       
   }
});



volume.addEventListener("click", () => {
   if(muteState === "unmuted")
    {
      audio.muted = true;  
      muteState = "muted";
      volume.classList = "fa-solid fa-volume-xmark";
      volumeBar.value = 0;
    }else{
        audio.muted = false;  
        muteState = "unmuted"; 
        volume.classList = "fa-solid fa-volume-high";
        volumeBar.value = 100;
    }
});


const displayMusicList = (list) => {
      for(let i=0; i< list.length; i++)
        {
           let liTag = 
           `<li li-index='${i}' onclick="selectedMusic(this)" class="list-group-item d-flex justify-content-between align-items-center">
                <span>${list[i].getName()}</span>
                <span id="music-${i}" class="badge bg-primary rounded-pill"></span> 
                <audio class="music-${i}" src="mp3/${list[i].file}"><audio>                       
             </li>`;
           
             ul.insertAdjacentHTML("beforeend", liTag);

            let liAudioDuration = ul.querySelector(`#music-${i}`);
            let liAudioTag = ul.querySelector(`.music-${i}`);

            liAudioTag.addEventListener("loadeddata", () => {
               liAudioDuration.innerText = calculateTime(liAudioTag.duration);              
            });


            
        }
}

const selectedMusic = (li) => {
    const index = li.getAttribute("li-index");
    player.index = index;
    displayMusic(player.getMusic());
    playMusic();
    isPlayingNow();
}

const isPlayingNow = () =>{
    for(let li of ul.querySelectorAll("li"))
        {
            if(li.classList.contains("playing"))
                {
                   li.classList.remove("playing"); 
                }

             if(li.getAttribute("li-index") == player.index) 
                {
                    li.classList.add("playing"); 
                }  
        }
}

audio.addEventListener("ended", () => {
    nextMusic();
});

document.addEventListener("DOMContentLoaded", () => {
    const hoverContainer = document.querySelector(".hover-effect");
    const card = hoverContainer.querySelector(".card");
  
    hoverContainer.addEventListener("mousemove", (e) => {
      const rect = hoverContainer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
  
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  
    hoverContainer.addEventListener("mouseleave", () => {
      card.style.setProperty("--mouse-x", `50%`);
      card.style.setProperty("--mouse-y", `50%`);
    });
  });
  