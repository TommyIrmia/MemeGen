'use strict';

var gElCanvas;
var gCtx;
var gCurrMeme = getMeme();


function onInit() {
    if (isUserSelected()) {
        gElCanvas = document.querySelector('canvas');
        gCtx = gElCanvas.getContext('2d');
        addListeners()

        renderCanvas()

        const line = getLine();
        document.querySelector('[name="text"]').value = line.txt;
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

function drawText() {
    const line = getLine();
    console.log(line.font);
    gCtx.fillStyle = 'gray'
    gCtx.font = `${line.size}px ${line.font}`;
    gCtx.fillText(line.txt, line.posX, line.posY - 5);

    gCtx.lineWidth = 3;
    gCtx.strokeStyle = line.color;
    gCtx.fillStyle = line.fill;
    gCtx.font = `${line.size}px ${line.font}`;
    gCtx.fillText(line.txt, line.posX, line.posY);
    if (line.stroke) gCtx.strokeText(line.txt, line.posX, line.posY);
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
    gCtx.restore();
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

function downloadCanvas(elLink) {
    const data = gElCanvas.toDataURL()
    elLink.href = data
}