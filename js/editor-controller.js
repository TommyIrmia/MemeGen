'use strict';

var gElCanvas;
var gCtx;
var gIsSave = false;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];
var gStartPos;
var gIsChosen = false;

function addListeners() {
    addMouseListeners();
    addTouchListeners();
}

function resizeCanvas() {
    if (!gElCanvas) return;
    if (window.innerWidth > 980) {
        gElCanvas.width = 550;
        gElCanvas.height = 550;
    } else if (window.innerWidth > 650) {
        gElCanvas.width = 450;
        gElCanvas.height = 450;
    } else {
        gElCanvas.width = 365;
        gElCanvas.height = 365;
    }
    if (window.innerWidth < 330) return;
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

function onDown(ev) {
    gIsChosen = true;
    const pos = getEvPos(ev);

    if (!isLineClicked(pos)) return;
    setLineDrag(true);
    gStartPos = pos
    document.body.style.cursor = 'grabbing';
    renderInput();
    renderCanvas();
}

function onMove(ev) {
    if (!gIsChosen) return;

    const pos = getEvPos(ev);
    const line = getChosenLine(pos);
    if (!line) return;
    if (line.isDrag) {
        const pos = getEvPos(ev)
        const dx = pos.x - gStartPos.x
        const dy = pos.y - gStartPos.y
        moveLine(dx, dy)
        gStartPos = pos
        renderCanvas()
    }
}

function onUp() {
    gIsChosen = false;
    setLineDrag(false);
    document.body.style.cursor = 'grab'
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
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
    renderInput();
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

function onAddImg() {
    const data = gElCanvas.toDataURL();
    addImg(data);
}

function onDownloadCanvas(elLink) {
    const data = gElCanvas.toDataURL()
    console.log(data);
    elLink.href = data
}

function onSaveCanvas() {
    gIsSave = !gIsSave;
    renderCanvas();
    document.querySelector('.options-modal').classList.toggle('opacity');
    if (gIsSave) document.querySelector('.save').innerHTML = '▶ <img src="DESIGN/ICONS/discet.jpg">';
    else document.querySelector('.save').innerHTML = '◀ <img src="DESIGN/ICONS/discet.jpg">';
}

function onChooseText() {
    changeChosenLine();
    renderInput()
    renderCanvas();
}

function onRemoveText() {
    removeText();
    renderCanvas();
}

function onShareImg() {
    const imgDataUrl = gElCanvas.toDataURL("image/jpeg");
    console.log(imgDataUrl);
    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl);
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}`);

    }
    doUploadImg(imgDataUrl, onSuccess);
}

function renderInput() {
    const line = getLine();
    if (!line) {
        document.querySelector('[name="text"]').value = 'click on add line';
        return;
    }
    document.querySelector('[name="text"]').value = line.txt;
}