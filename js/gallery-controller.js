'use strict';

function onInit() {
    if (isUserSelected()) {
        gElCanvas = document.querySelector('canvas');
        gCtx = gElCanvas.getContext('2d');

        addListeners()
        addEventListener('resize', resizeCanvas)
        const line = getLine();

        document.querySelector('[name="text"]').value = line.txt;
        document.querySelector('.editor-container').classList.remove('none');

        resizeCanvas();
        renderCanvas()
    } else {
        document.querySelector('.editor-container').classList.add('none');
        renderGallery();
    }

}

function onGallery() {
    setUserSelection();
    document.querySelector('.gallery-container').classList.remove('none');
    onInit();
}

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


function onChooseImg(id) {
    setImgId(id);
    document.querySelector('.gallery-container').classList.add('none');
    onInit();
}