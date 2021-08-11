'use strict';

function renderGallery() {
    let id = 0;
    const imgs = getImgs();
    var strHTMLs = imgs.map((img) => {
        id++;
        return `<div class="img" onclick="onChooseImg(${id})"><img src="imgs/meme-imgs/${id}.jpg" alt=""></div>`
    });

    const elGallery = document.querySelector('.imgs-container');
    elGallery.innerHTML = strHTMLs.join('');
}

function renderImg(img) {
    console.log(img);
}

function onChooseImg(id) {
    setImgId(id);
    document.querySelector('.gallery-container').classList.add('none');
    onInit();
}