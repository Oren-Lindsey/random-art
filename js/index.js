const imgDiv = document.getElementById('pictureDiv')
const titleText = document.getElementById('title')
const dataText1 = document.getElementById('data1')
const dataText2 = document.getElementById('data2')
const link = document.getElementById('link')
const loader = document.getElementById('loading')

fetch('https://Random-Art.s40.repl.co/api/random')
  .then(res => res.json())
  .then(data => {
    populatePage(data)
  })

function populatePage(art) {
  loading.setAttribute('hidden', "")
  const newImg = document.createElement('img')
  newImg.src = art.primaryImage;
  newImg.id = 'image'
  newImg.className = 'img-zoomable'
  newImg.alt = art.title;
  imgDiv.append(newImg)
  titleText.innerText = art.title;
  dataText1.innerText = `${art.artistDisplayName}, ${art.medium}`;
  link.href = art.objectURL;
  link.innerText = 'View it on the Met\'s website'
  const zooming = new Zooming({
    'preloadImage': true,
    'bgColor': '#000000',
    onBeforeOpen: function (target) {
      document.querySelector('meta[name="theme-color"]').setAttribute('content', 'black')
    },
    onBeforeClose: function (target) {
      senseTheme()
    }
  })
  zooming.listen('.img-zoomable')
}
function switchTheme(theme) {
  if (theme == 'dark') {
    document.querySelector('meta[name="theme-color"]').setAttribute('content', 'black')
  } else {
    document.querySelector('meta[name="theme-color"]').setAttribute('content', 'white')
  }
}
function senseTheme() {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    switchTheme('dark')
  } else {
    switchTheme('light')
  }
}
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
  const newColorScheme = event.matches ? "dark" : "light";
  switchTheme(newColorScheme)
});
