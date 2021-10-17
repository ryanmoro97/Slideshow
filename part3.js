var imageArray = {
    "url":["img1.jpeg","img2.jpeg","img3.jpeg","img4.jpeg","img5.jpeg",
        "img6.png","img7.jpeg","img8.jpeg","img9.jpeg","img10.jpeg","img11.jpeg",
        "img12.png","img13.jpeg","img14.png","img15.jpeg","img16.jpeg","img17.png",
        "img18.jpeg","img19.jpeg","img20.png"
    ],
    "caption":[
        "1. Revelstoke mountain peak",
        "2. Mountain biking in Whistler, BC",
        "3. Alpine hike lake",
        "4. This is my rig, custom 2018 shore",
        "5. Vancouver island coast",
        "6. Authentic icey artwork by yours truly",
        "7. A-line photo shoot - Whistler, BC",
        "8. Cliff jumping at Lions Bay",
        "9. Lion fish at the Vancouver aquarium",
        "10. Micheals birthday party",
        "11. My African cichlid children",
        "12. Soaking up some sun on the yacht",
        "13. Pemberton music festival",
        "14. This is one of my favourite fishes i have, his name is Booly",
        "15. This is my mini-cow kitty cat",
        "16. Proposing to my wife in Phoenix, AZ",
        "17. My first ever studio album, truly humbling",
        "18. Attending a wedding with a fresh mullet",
        "19. My cat again surrounded by a happy face of my favorite aloe drinks",
        "20. Gettin flexed on"
    ]
};
var imgNo = 0;
var order = "seq";
var togglePlay = "play";
var slideTimer;
var effect = 1;
var opacity = 1;
var canvas;
var img = new Image();
var drawInProgress = false;
var x = 0;
var reverse = false;
var imgLoaded = false;

function registerListeners() {
    var menuItem;
    menuItem = document.getElementById("leftarrow");
    menuItem.addEventListener("click",
        function () {
            if(!drawInProgress){
                if(imgNo === 0){
                    imgNo = 19;
                }
                else{
                    reverse = true;
                    imgNo--;
                }
                updateSlideshow();
            }
            clearInterval(slideTimer);
            slideTimer = setInterval(changePic, 4000);
        }, false);

    menuItem = document.getElementById("rightarrow");
    menuItem.addEventListener("click",
        function () {
            if(!drawInProgress){

                if(imgNo === 19){
                    imgNo = 0;
                }
                else{
                    imgNo++;
                }
                updateSlideshow();
            }
            clearInterval(slideTimer);
            slideTimer = setInterval(changePic, 4000);
        }, false);

    menuItem = document.getElementById("playimg");
    menuItem.addEventListener("click",
        function () {
            if(togglePlay === "play"){
                clearInterval(slideTimer);
                togglePlay = "pause";
            }
            else if(togglePlay === "pause"){
                slideTimer = setInterval(changePic, 4000);
                togglePlay = "play";
            }
        }, false);
    menuItem = document.getElementById("pause");
    menuItem.addEventListener("click",
        function () {
            if(togglePlay === "play"){
                clearInterval(slideTimer);
                togglePlay = "pause";
            }
            else if(togglePlay === "pause"){
                slideTimer = setInterval(changePic, 4000);
                togglePlay = "play";
            }
        }, false);

    menuItem = document.getElementById("random/seq");
    menuItem.addEventListener("click",
        function () {
            if(order === "seq"){
                document.getElementById("random/seq").innerHTML = "  Random  ";
                document.getElementById("buttons").style.display = "none";
                document.getElementById("pause").style.display = "block";
                order = "random";
            }
            else if(order === "random"){
                document.getElementById("random/seq").innerHTML = "Sequential";
                document.getElementById("pause").style.display = "none";
                document.getElementById("buttons").style.display = "block";
                order = "seq";
            }

        }, false);

    menuItem = document.getElementById("fade");
    menuItem.addEventListener("click",
        function () {
            effect = 1;

        }, false);

    menuItem = document.getElementById("genie");
    menuItem.addEventListener("click",
        function () {
            effect = 2;

        }, false);

    menuItem = document.getElementById("squeeze");
    menuItem.addEventListener("click",
        function () {
            effect = 3;
        }, false);
}

async function fadeIn() {
    if(effect === 1 && !drawInProgress){
        opacity = 0;
        while (opacity <= 100) {
            if(effect !== 1 || drawInProgress){
                canvas.globalAlpha = 1;
                canvas.drawImage(img, 0, 0, 520, 350);
                break;
            }
            canvas.globalAlpha = opacity / 100;
            canvas.drawImage(img, 0, 0, 520, 350);
            opacity++;

            await new Promise(r => setTimeout(r, 50));
        }
    }

}

async function genie() {
    if(!drawInProgress){
        drawInProgress = true;
        x = 0;
        while (x <= 520) {
            canvas.drawImage(img, 0, 0, x, x *(360/520));
            await new Promise(r => setTimeout(r, 50));
            x += 20;
        }
        drawInProgress = false;
    }
}

async function genieReverse() {
    if(!drawInProgress){
        drawInProgress = true;
        x = 520;
        while (x >= 0) {
            canvas.drawImage(img, x, x*(360/520), 520,  360);
            await new Promise(r => setTimeout(r, 50));
            x -= 20;
        }
        drawInProgress = false;
    }
    reverse = false;
}

async function squeezeIn() {
    if(!drawInProgress){
        drawInProgress = true;
        x = 0;
        while (x <= 265) {
            canvas.drawImage(img, x/2, x*(360/520), 520-(x*2), 360 - ((x/2) *(360/520)));
            await new Promise(r => setTimeout(r, 1));
            x++;
        }
        drawInProgress = false;
    }
    img.onload = function() {
        squeezeOut();
    }
    img.src = "../shared/slideshow/" + imageArray.url[imgNo];
    imgLoaded = true;
}

async function squeezeOut() {
    if(!drawInProgress){
        drawInProgress = true;
        x = 265;
        while (x >= 0) {
            canvas.drawImage(img, x/2, x*(360/520), 520-(x*2), 360 - ((x/2) *(360/520)));
            await new Promise(r => setTimeout(r, 1));
            x -=2;
        }
        drawInProgress = false;
    }
    reverse = false;
}


function updateSlideshow(){
    document.getElementById("caption").innerHTML = imageArray.caption[imgNo];

    img.onload = function() {
        if(effect === 1) {
            opacity = 0;
            fadeIn();
        }
        else if(effect === 2){
            if(reverse === true){
                genieReverse();
            }else{
                genie();
            }
        }
        else if(effect === 3){
            squeezeIn();
        }
    };
    if(effect !== 3){
        img.src = "../shared/slideshow/" + imageArray.url[imgNo];
        imgLoaded = true;
    }else{
        squeezeIn();
    }


}

function changePic(){
    if(!drawInProgress){
        if(order === "seq"){
            if(imgNo === 19){
                imgNo = 0;
            }
            else{
                imgNo++;
            }
            updateSlideshow();
        }
        else if(order === "random"){
            imgNo = Math.floor(Math.random() * 20);
            updateSlideshow();
        }
    }
}

function setup() {
    slideTimer = setInterval(changePic, 4000);
    registerListeners();
    updateSlideshow();
    document.getElementById("random/seq").innerHTML = "Sequential";
    order = "seq";
    document.getElementById("pause").style.display = "none";
    canvas = document.getElementById("mycanvas").getContext("2d");


}

window.addEventListener( "load",setup , false );