'use strict';

var gElCanvas;
var gCtx;
var gCurrMeme = getMeme();
var gIsSave = false;


function addListeners() {
    addMouseListeners();
    addTouchListeners();
}

function resizeCanvas() {
    console.log(window.innerWidth);
    if (!gElCanvas) return;
    if (window.innerWidth > 980) {
        gElCanvas.width = 550;
        gElCanvas.height = 550;
    };
    if (window.innerWidth < 400) return;
    const elContainer = document.querySelector('.canvas-container');
    gElCanvas.width = elContainer.offsetWidth
    renderCanvas();
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
    // createPosition()
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

function drawText() {
    const lines = getLines();

    lines.forEach(line => {

        gCtx.font = `${line.size}px ${line.font}`;
        gCtx.fillStyle = 'gray'
        gCtx.fillText(line.txt, line.posX, line.posY - 5);

        const textWidth = gCtx.measureText(line.txt).width;
        setLineWidth(textWidth, line)
        gCtx.lineWidth = 3;
        gCtx.font = `${line.size}px ${line.font}`;
        gCtx.strokeStyle = line.color;
        gCtx.fillStyle = line.fill;
        gCtx.fillText(line.txt, line.posX, line.posY);
        if (line.stroke) gCtx.strokeText(line.txt, line.posX, line.posY);
    })
}

function onChangeText(txt) {
    changeText(txt);
    renderCanvas();
}

function renderCanvas() {
    gCtx.save();
    const selectedImg = getImg();
    drawImg(selectedImg);
    setTimeout(drawText, 1);
    if (!gIsSave) setTimeout(highlightText, 1);
    gCtx.restore();

}

function highlightText() {
    const line = getLine();
    if (!line) return;
    gCtx.beginPath()
    gCtx.lineWidth = 3;
    gCtx.rect(line.posX - 10, line.posY - line.size, line.width + 20, line.size + 10)
    gCtx.strokeStyle = 'white'
    gCtx.stroke()
}

function onAddText() {
    createLine();
    const line = getLine();
    document.querySelector('[name="text"]').value = line.txt;
    renderCanvas();
}

function onFontSize(diff) {
    const size = (diff === '+') ? 2 : -2;
    changeFontSize(size);
    renderCanvas();
}

function onMoveText(dir) {
    const diff = (dir === "up") ? -10 : 10;
    setTextPos(diff, 'posY');
    renderCanvas();
}

function onAlignText(dir) {
    let diff;
    switch (dir) {
        case 'left':
            diff = -40;
            break;
        case 'right':
            diff = 40;
            break;
        case 'center':
            diff = false;
            break;
    }
    setTextPos(diff, 'posX');
    renderCanvas();
}

function onToggleStroke() {
    toggleStroke();
    renderCanvas();
}

function onChangeColor(type, val) {
    changeColor(type, val);
    renderCanvas();
}

function onChangeFont(val) {
    changeFont(val);
    renderCanvas();
}

function onDownloadCanvas(elLink) {
    const data = gElCanvas.toDataURL()
    elLink.href = data
}

function onSaveCanvas() {
    gIsSave = !gIsSave;
    renderCanvas();
    document.querySelector('.options-modal').classList.toggle('opacity');
}

function onChooseText() {
    setLineIdx();
    const line = getLine();
    document.querySelector('[name="text"]').value = line.txt;
    renderCanvas();
}

function onRemoveText() {
    removeText();
    renderCanvas();
}