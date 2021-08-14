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
        renderCanvas();
    } else {
        document.querySelector('.meme-container').classList.add('none');
        document.querySelector('.editor-container').classList.add('none');
        renderGallery();
        renderKeywords();
    }
}

function onSearch(ev) {
    ev.preventDefault();
    const filterBy = document.querySelector('[name="search"]').value;
    setFilter(filterBy);
    renderGallery();
}

function onKeySearch(filterBy) {
    setFilter(filterBy);
    const keywords = getKeywords();
    keywords[filterBy]++;
    renderGallery();
    renderKeywords();
}

function onMeme() {
    document.querySelector('.editor-container').classList.add('none');
    document.querySelector('.gallery-container').classList.add('none');
    document.querySelector('.meme-container').classList.remove('none');
    onToggleMenu();
    renderMemes();
}

function onGallery() {
    setUserSelection();
    document.querySelector('.gallery-container').classList.remove('none');
    onToggleMenu()
    onInit();
}

function renderMemes() {
    let id = 0;
    const imgUrls = getSavedMemes();
    var strHTMLs = imgUrls.map((imgUrl) => {
        id++;
        return `<div onclick="onOpenMemeModal('${imgUrl}')" class="img"><img src="${imgUrl}" alt=""></div>`
    });

    const elMemeGallery = document.querySelector('.ready-memes-container');
    elMemeGallery.innerHTML = strHTMLs.join('');
}


function onOpenMemeModal(url) {
    document.body.classList.remove('fade-out');
    document.querySelector('.meme-modal').classList.remove('none');
    document.querySelector('.meme-content-modal .img').innerHTML = `<img src="${url}">`;
}

function onCloseMemeModal() {
    document.body.classList.add('fade-out');
    setTimeout(() => {
        document.querySelector('.meme-modal').classList.add('none');
    }, 500)
}

function renderGallery() {
    const imgs = getImgs();
    var strHTMLs = imgs.map((img) => {
        return `<div class="img" onclick="onChooseImg(${img.id})"><img src="imgs/meme-imgs/${img.id}.jpg" alt=""></div>`
    });

    const elGallery = document.querySelector('.imgs-container');
    elGallery.innerHTML = strHTMLs.join('');
}

function onChooseImg(id) {
    setImgId(id);
    document.querySelector('.gallery-container').classList.add('none');
    onInit();
}

function renderKeywords() {
    const keywords = getKeywords();
    const keywordsArr = Object.entries(keywords);
    var strHTMLs = keywordsArr.map(word => {
        return `<div style="font-size:${word[1]*2}px;" class="keyword flex align-center" 
        onclick="onKeySearch('${word[0]}')">${word[0].charAt(0).toUpperCase() + word[0].slice(1)}</div>`
    })
    const elSearchContainer = document.querySelector('.search-words-container');
    elSearchContainer.innerHTML = strHTMLs.join('');

}

function onToggleKeywords() {
    const elBtn = document.querySelector('.more-btn')
    const elKeywords = document.querySelectorAll('.keyword');
    if (elBtn.innerText === 'More...') {
        elKeywords.forEach(keyword => {
            keyword.style.display = 'flex';
        })
        elBtn.innerText = 'Less...'
    } else {
        let i = 0;
        elKeywords.forEach(keyword => {
            i++;
            if (window.innerWidth > 650) {
                if (i > 5) keyword.style.display = 'none';
            } else {
                if (i > 3) keyword.style.display = 'none'
            }
        })
        elBtn.innerText = 'More...'
    }
}

function onToggleAboutModal() {
    document.querySelector('.about-modal').classList.toggle('none');
    document.body.classList.toggle('modal-open');
    onToggleMenu()
}

function onToggleMenu() {
    document.body.classList.toggle('menu-open');
}