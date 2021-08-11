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
        size: 50,
        align: 'left',
        color: 'red',
        font: 'impact'
    }]
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
        console.log(img.id, imgId);
        return imgId === img.id;
    })
    return img.url;
}

function addText(txt) {
    gMeme.lines[0].txt = txt;
}

function changeFontSize(size) {
    gMeme.lines[0].size += size;
}

function setImgId(id) {
    gMeme.selectedImgId = id;
    isSelectedImg = true;
}