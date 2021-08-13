'use strict';
var gKeywords = {
    'happy': 12,
    'funny': 1,
    'love': 1,
    'mad': 1,
    'awkward': 1,
    'shock': 1,
    'success': 1,
    'animal': 1,
    'baby': 1,
    'celeb': 1,
    'sleep': 1,
    'scared': 1
}

var isSelectedImg = false;

var gImgs = [{ id: 1, url: '../imgs/meme-imgs/1.jpg', keywords: ['funny', 'awkward', 'celeb'] },
    { id: 2, url: 'imgs/meme-imgs/2.jpg', keywords: ['animal', 'happy', 'love'] },
    { id: 3, url: 'imgs/meme-imgs/3.jpg', keywords: ['baby', 'animal', 'sleep'] },
    { id: 4, url: 'imgs/meme-imgs/4.jpg', keywords: ['animal', 'sleep', 'funny'] },
    { id: 5, url: 'imgs/meme-imgs/5.jpg', keywords: ['success', 'baby', 'funny'] },
    { id: 6, url: 'imgs/meme-imgs/6.jpg', keywords: ['funny', 'celeb', 'shock'] },
    { id: 7, url: 'imgs/meme-imgs/7.jpg', keywords: ['funny', 'baby', 'shock'] },
    { id: 8, url: 'imgs/meme-imgs/8.jpg', keywords: ['shock', 'celeb', 'awkward'] },
    { id: 9, url: 'imgs/meme-imgs/9.jpg', keywords: ['baby', 'funny', 'success'] },
    { id: 10, url: 'imgs/meme-imgs/10.jpg', keywords: ['celeb', 'funny', 'happy'] },
    { id: 11, url: 'imgs/meme-imgs/11.jpg', keywords: ['awkward', 'celeb', 'funny'] },
    { id: 12, url: 'imgs/meme-imgs/12.jpg', keywords: ['shock', 'celeb', 'mad'] },
    { id: 13, url: 'imgs/meme-imgs/13.jpg', keywords: ['success', 'celeb', 'happy'] },
    { id: 14, url: 'imgs/meme-imgs/14.jpg', keywords: ['shock', 'celeb', 'mad'] },
    { id: 15, url: 'imgs/meme-imgs/15.jpg', keywords: ['awkward', 'celeb', 'shock'] },
    { id: 16, url: 'imgs/meme-imgs/16.jpg', keywords: ['funny', 'shock', 'awkward'] },
    { id: 17, url: 'imgs/meme-imgs/17.jpg', keywords: ['celeb', 'mad', 'success'] },
    { id: 18, url: 'imgs/meme-imgs/18.jpg', keywords: ['shock', 'success', 'scared'] },
];

var gMeme = {
    selectedImgId: 2,
    selectedLineIdx: 0,
    lines: [{
        txt: 'Change text here',
        size: 35,
        stroke: true,
        color: '#000000',
        fill: '#ffffff',
        font: 'impact',
        posX: getCanvasSize() / 2 - 234 / 2,
        posY: 70,
        isDrag: false
    }]
}

var gChosenLine = gMeme.lines[0];



function isLineClicked(clickedPos) {
    const clickedLine = getChosenLine(clickedPos);
    gChosenLine = clickedLine;
    return clickedLine;
}

function getChosenLine(clickedPos) {
    if (gMeme.lines.length === 1) {
        gChosenLine = gMeme.lines[0];
        return gChosenLine;
    }

    const lines = getLines();
    const clickedLine = lines.find((line) => {
        const lineX = line.posX + line.width;
        const lineY = line.posY - line.size;
        const lineArea = { x: lineX, y: lineY };
        return (clickedPos.x >= line.posX - 10 && clickedPos.x <= lineArea.x + 15 &&
            clickedPos.y <= line.posY + 20 && clickedPos.y >= lineArea.y - 5);
    })
    gChosenLine = clickedLine;
    return gChosenLine;
}

function setLineDrag(isDrag) {
    if (!gChosenLine) return;
    gChosenLine.isDrag = isDrag
}

function moveLine(dx, dy) {
    const line = gChosenLine;
    line.posX += dx
    line.posY += dy
}

function getCanvasSize() {
    if (window.innerWidth > 980) return 550;
    else if (window.innerWidth > 650) return 450
    else return 365;
}

function createLine() {
    const pos = createPos()
    gMeme.lines.push({
        txt: 'Change text here',
        size: 35,
        stroke: true,
        color: '#000000',
        fill: '#ffffff',
        font: 'impact',
        posX: pos.x,
        posY: pos.y,
    })
    gMeme.selectedLineIdx = gMeme.lines.length - 1;
    gChosenLine = gMeme.lines[gMeme.selectedLineIdx]
}

function createPos() {
    const line = getLine();
    const lines = getLines();
    const topPos = { x: 153, y: 70 };
    if (lines.length === 0) return topPos;

    const bottomPos = { x: gElCanvas.width / 2 - 243 / 2, y: gElCanvas.height - line.size };
    const centerPos = { x: gElCanvas.width / 2 - 243 / 2, y: gElCanvas.height / 2 + line.size / 2 }

    if (lines.length === 1) return bottomPos;
    if (lines.length > 1) return centerPos;
}

function getLine() {
    gMeme.selectedLineIdx = gMeme.lines.findIndex(line => {
        if (!gChosenLine) return true;
        return (line.posX === gChosenLine.posX && line.posY === gChosenLine.posY);
    })
    return gMeme.lines[gMeme.selectedLineIdx];
}

function getLines() {
    return gMeme.lines;
}

function isUserSelected() {
    return isSelectedImg;
}

function getMeme() {
    return gMeme;
}

function getImgs() {
    return gImgs;
}

function getImg() {
    const imgId = gMeme.selectedImgId;
    const img = gImgs.find((img) => {
        return imgId === img.id;
    })
    return img.url;
}

function changeText(txt) {
    if (!gChosenLine) return;
    gChosenLine.txt = txt;
}

function changeFontSize(size) {
    if (!gChosenLine) return;
    gChosenLine.size += size;
}

function setUserSelection() {
    isSelectedImg = false;
}

function setImgId(id) {
    gMeme.selectedImgId = id;
    isSelectedImg = true;
}

function setTextPos(diff, pos) {
    if (!gChosenLine) return;
    if (!diff) {
        gChosenLine.posX = gElCanvas.width / 2 - gChosenLine.width / 2;
    }
    gChosenLine[pos] += diff;
}

function setLineWidth(width, line) {
    line.width = width;
}

function toggleStroke() {
    if (!gChosenLine) return;
    gChosenLine.stroke = !gChosenLine.stroke;
}

function changeColor(type, val) {
    if (!gChosenLine) return;
    gChosenLine[type] = val;
}

function changeFont(val) {
    if (!gChosenLine) return;
    gChosenLine.font = val;
}

function changeChosenLine() {
    const lines = getLines();
    if (lines.length === 0) return;
    gMeme.selectedLineIdx++
        if (gMeme.selectedLineIdx >= lines.length) gMeme.selectedLineIdx = 0;
    gChosenLine = lines[gMeme.selectedLineIdx]
}

function removeText() {
    const lines = getLines();
    if (lines.length === 0) return;
    lines.splice(gMeme.selectedLineIdx, 1);
    gMeme.selectedLineIdx = 0;
    gChosenLine = gMeme.lines[gMeme.selectedLineIdx]
}

function doUploadImg(imgDataUrl, onSuccess) {

    const formData = new FormData();
    formData.append('img', imgDataUrl)

    fetch('//ca-upload.com/here/upload.php', {
            method: 'POST',
            body: formData
        })
        .then(res => res.text())
        .then((url) => {
            console.log('Got back live url:', url);
            onSuccess(url)
        })
        .catch((err) => {
            console.error(err)
        })
}