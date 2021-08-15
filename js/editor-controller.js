'use strict';

var gElCanvas;
var gCtx;
var gIsSave = false;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];
var gStartPos;
var gIsChosen = false;


function renderCanvas() {
    gCtx.save();
    const selectedImg = getImg();
    drawImg(selectedImg);
    setTimeout(drawText, 1);
    if (!gIsSave) setTimeout(highlightText, 1);
    gCtx.restore();
}

function resizeCanvas() {
    if (!gElCanvas) return;
    if (window.innerWidth < 330) return;

    if (window.innerWidth > 980) gElCanvas.width = gElCanvas.height = 550;
    else if (window.innerWidth > 650) gElCanvas.width = gElCanvas.height = 450;
    else gElCanvas.width = gElCanvas.height = 365;

    renderCanvas();
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

function onDown(ev) {
    if (gIsSave) {
        document.querySelector('.canvas:hover').style.cursor = "not-allowed";
        return;
    }

    gIsChosen = true;
    const pos = getEvPos(ev);

    if (!isLineClicked(pos)) return;
    setLineDrag(true);
    gStartPos = pos;
    document.querySelector('.canvas').style.cursor = 'grabbing';
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
        gStartPos = pos;
        renderCanvas()
    }
}

function onUp() {
    gIsChosen = false;
    setLineDrag(false);
    document.querySelector('.canvas').style.cursor = 'grab'
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
        if (line.shadow) {
            gCtx.font = `${line.size}px ${line.font}`;
            gCtx.fillStyle = 'lightgray'
            gCtx.fillText(line.txt, line.posX, line.posY - 5);
        }

        const textWidth = gCtx.measureText(line.txt).width;
        setLineWidth(textWidth, line)
        gCtx.lineWidth = 2;
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

function onToggleShadow() {
    toggleShadow();
    renderCanvas();
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
    changeFontSize(diff);
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

function onChooseText() {
    changeChosenLine();
    renderInput()
    renderCanvas();
}

function onRemoveText() {
    removeText();
    renderInput()
    renderCanvas();
}

function onSaveCanvas() {
    gIsSave = !gIsSave;
    if (gIsSave) document.querySelector('.save').innerHTML = '▶ <img src="DESIGN/ICONS/discet.jpg">';
    else document.querySelector('.save').innerHTML = '◀ <img src="DESIGN/ICONS/discet.jpg">';
    renderCanvas();
    document.querySelector('.options-modal').classList.toggle('opacity');
}

function onDownloadCanvas(elLink) {
    const data = gElCanvas.toDataURL()
    console.log(data);
    elLink.href = data
}

function onAddImg(elBtn) {
    if (elBtn.innerText === 'Added to Meme-Tab') return;

    const data = gElCanvas.toDataURL();
    addImg(data);

    const elSaveBtn = document.querySelector('.option-btn.save-btn');
    elSaveBtn.innerText = 'Added to Meme-Tab';
    elSaveBtn.style.fontSize = '14px'
}

function toggleSaveBtn() {
    const elSaveBtn = document.querySelector('.option-btn.save-btn');
    elSaveBtn.innerText = 'Added to Meme-Tab'
    elSaveBtn.style.fontSize = '14px'
}

function onShareImg() {
    const imgDataUrl = gElCanvas.toDataURL("image/jpeg");
    console.log(imgDataUrl);

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

// SOON
function renderEmojis() {
    const elEmojiContainer = document.querySelector('.emojis-container');
    const emojis = getEmojis();
    const arrowHTML = '<div class="arrow">◁</div>';
    const arrow2HTML = '<div class="arrow">▷</div>';
    var strHTMLs = emojis.map(emoji => {
        return `<div class="emoji" onclick="onAddEmoji('${emoji.url}')"><img src="${emoji.url}"></div>`;
    })

    elEmojiContainer.innerHTML = arrowHTML + strHTMLs.join('') + arrow2HTML;
}

function onAddEmoji(emojiUrl) {
    createEmoji(emojiUrl);
    drawEmoji();
}

function drawEmoji() {
    // const emoji = getEmoji();
    // var img = new Image()
    // img.src = emoji.url;
    // img.onload = () => {
    //     gCtx.drawImage(img, 220, 220, 100, 100)
    // }
    document.querySelector('.emojis-container').innerHTML = '<h1>Soon.....</h1>'
}