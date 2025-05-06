class Music{
    constructor(title, singer,img, file){
        this.title = title;
        this.singer = singer;
        this.img = img;
        this.file = file;
    }

    getName(){
        return this.title + " - " + this.singer;
    }
}

const musicList = [
    new Music("Dusk till Dawn","Zayn & Sia","1.jpeg","1.mp3"),
    new Music("Somewhere Only We Know","Keane","2.jpeg","2.mp3"),
    new Music("Yanlışlarla Karşılaştım","Wegh & Keskin","3.jpeg","3.mp3")
]