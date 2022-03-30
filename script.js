// variables
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
const imageContainer = document.querySelector('.image');
const button = document.querySelector('button');
const html = document.querySelector('html');
const checkbox = document.querySelector('input[name=theme]');


// events
button.onclick = () => updateImage();

imageContainer.onclick = () => updateAll();

// methods random photos generator
function getState() {
    const imageSource = document.querySelector('.image img').src;
    const index = favorites.indexOf(imageSource);
    const existsInLocalStorage = index != -1;

    return { imageSource, index, existsInLocalStorage }
}

function updateAll() {
    updateFavorites();
    updateClasses();
}

function updateFavorites() {
    const { imageSource, index, existsInLocalStorage } = getState();

    existsInLocalStorage ? favorites.splice(index, 1) : favorites.push(imageSource)
        
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

function updateClasses() {
    const { existsInLocalStorage } = getState();

    imageContainer.classList.remove('fav');

     if (existsInLocalStorage) {
        imageContainer.classList.add('fav');
     } 
}

async function updateImage() {
    await getExternalImage();
    updateClasses();
}

async function getExternalImage() {
    const response = await fetch('https://source.unsplash.com/random');

    imageContainer.innerHTML = `<img src="${response.url}" >` ;
}

// method light/dark mode

const getStyle = (element, style) => window.getComputedStyle(element).getPropertyValue(style)


const initialColors = {
    bg: getStyle(html, "--bg"),
    btn: getStyle(html, "--btn"),
    btnHover: getStyle(html, "--btn-hover"),
}

const darkMode = {
    bg: "#130F0D",
    btn: "#FD951F",
    btnHover: "#DD7B0C"
}

const transformKey = key => "--" + key.replace(/([A-Z])/, "-$1").toLowerCase();

const changeColors = (colors) => {
    Object.keys(colors).map(key => {
        html.style.setProperty(transformKey(key), colors[key])
    })

}

// event light/dark mode

checkbox.addEventListener("change", ({target}) => {
    target.checked ? changeColors(darkMode) : changeColors(initialColors);
})








