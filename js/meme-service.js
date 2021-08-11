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
        size: 30,
        stroke: true,
        color: '#000000',
        fill: '#ffffff',
        font: 'impact',
        posX: 150,
        posY: 150
    }]
}

function getLine() {
    return gMeme.lines[0];
}

function isUserSelected() {
    return isSelectedImg;
}

function getMeme() {
    return gMeme;
}

function getImg() {
    const imgId = gMeme.selectedImgId;
    const img = gImgs.find((img) => {
        return imgId === img.id;
    })
    return img.url;
}

function changeText(txt) {
    gMeme.lines[0].txt = txt;
}

function changeFontSize(size) {
    gMeme.lines[0].size += size;
}

function setImgId(id) {
    gMeme.selectedImgId = id;
    isSelectedImg = true;
}

function setTextPos(diff, pos) {
    const line = getLine();
    if (!diff) {
        line.posX = 100;
    }
    line[pos] += diff;
}

function toggleStroke() {
    const line = getLine();
    line.stroke = !line.stroke;
    console.log(line.stroke);
}

function changeColor(type, val) {
    const line = getLine();
    line[type] = val;
}

function changeFont(val) {
    const line = getLine();
    line.font = val;
    console.log(line.font);
}


function uploadImg() {
    const imgDataUrl = gElCanvas.toDataURL("image/jpeg");

    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        document.querySelector('.user-msg').innerText = `Your photo is available here: ${uploadedImgUrl}`

        document.querySelector('.share-container').innerHTML = `
        <a class="btn" href="https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
           Share   
        </a>`
    }
    doUploadImg(imgDataUrl, onSuccess);
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