'use strict';

var gElCanvas;
var gCtx;
var gCurrMeme = getMeme();


function onInit() {
    if (isUserSelected()) {
        gElCanvas = document.querySelector('canvas');
        gCtx = gElCanvas.getContext('2d');
        addListeners()

        const selectedImg = getImg();
        drawImg(selectedImg);

        setTimeout(drawText, 1, 100, 100);

        const line = gCurrMeme.lines[0];
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

function drawText(x, y) {
    const line = gCurrMeme.lines[0];
    gCtx.fillStyle = 'white'
    gCtx.font = `${line.size}px ${line.font}`;
    gCtx.fillText(line.txt, x, y - 5);

    gCtx.lineWidth = 3;
    gCtx.strokeStyle = line.color;
    gCtx.fillStyle = 'white'
    gCtx.font = `${line.size}px ${line.font}`;
    gCtx.fillText(line.txt, x, y);
    gCtx.strokeText(line.txt, x, y);
}

function onChangeText(txt) {
    changeText(txt);
    gCtx.save();
    const selectedImg = getImg();
    drawImg(selectedImg);
    setTimeout(drawText, 1, 100, 100);
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
    let size = (diff === '+') ? 10 : -10;
    changeFontSize(size);
}