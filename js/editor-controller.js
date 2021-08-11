'use strict';

var gElCanvas;
var gCtx;
var gSelectedImg = getImg(0);
var gCurrMeme = getMeme();


function onInit() {
    gElCanvas = document.querySelector('canvas');
    gCtx = gElCanvas.getContext('2d');


    addListeners()
    drawImg();
    onAddText();
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

function drawImg() {
    var img = new Image()
    img.src = gSelectedImg.url;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    }
}

function onAddText() {
    const txt = document.querySelector('[name="text"]').value;
    addText(txt);

    gCurrMeme.lines.forEach((line) => {
        console.log(line);
        drawText(line.txt, 100, 100, line.size, line.color, line.font)
    })
}


function drawText(txt, x, y, size, color, font) {
    gCtx.fillStyle = 'white'
    gCtx.font = `${size}px ${font}`;
    gCtx.fillText(txt, x, y - 5);

    gCtx.lineWidth = 3;
    gCtx.strokeStyle = color;
    gCtx.fillStyle = 'white'
    gCtx.font = `${size}px ${font}`;
    gCtx.fillText(txt, x, y)
    gCtx.strokeText(txt, x, y)
}

function onFontSize(diff) {
    let size = (diff === '+') ? 10 : -10;
    changeFontSize(size);
}