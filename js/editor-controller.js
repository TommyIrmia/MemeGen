'use strict';

var gElCanvas;
var gCtx;
var gCurrMeme = getMeme();


function onInit() {
    if (isUserSelected()) {
        var selectedImg = getImg();
        drawImg(selectedImg);
        const line = gCurrMeme.lines[0];
        setTimeout(drawText, 1, line.txt, 100, 100, line.size, line.color, line.font);
        document.querySelector('[name="text"]').value = line.txt;
        gElCanvas = document.querySelector('canvas');
        gCtx = gElCanvas.getContext('2d');
        addListeners()
        document.querySelector('.editor-container').classList.remove('none');
    } else {
        document.querySelector('.editor-container').classList.add('none');
    }

}

function addListeners() {
    addMouseListeners();
    addTouchListeners();
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}

function onMove() {
    // console.log('move');
}

function onDown(ev) {
    // drawText('Dogs', 100, 100)
}

function onUp() {
    // console.log('up');
}

function drawImg(selectedImg) {
    var img = new Image()
    img.src = selectedImg;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    }
}

function drawText(txt, x, y, size, color, font) {
    gCtx.fillStyle = 'white'
    gCtx.font = `${size}px ${font}`;
    gCtx.fillText(txt, x, y - 5);

    gCtx.lineWidth = 3;
    gCtx.strokeStyle = color;
    gCtx.fillStyle = 'white'
    gCtx.font = `${size}px ${font}`;
    gCtx.fillText(txt, x, y);
    gCtx.strokeText(txt, x, y);
}

// function onAddText() {
//     let txt = document.querySelector('[name="text"]').value;
//     if (!txt) {
//         txt = gMeme.lines[0].txt;
//         document.querySelector('[name="text"]').value = txt;
//     } else {
//         addText(txt);
//     }

//     gCurrMeme.lines.forEach((line) => {
//         console.log(line);
//         drawText(line.txt, 100, 100, line.size, line.color, line.font)
//     })
// }



function onFontSize(diff) {
    let size = (diff === '+') ? 10 : -10;
    changeFontSize(size);
}