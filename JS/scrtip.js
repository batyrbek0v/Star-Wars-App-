const BASE_URL = 'https://swapi.dev/api/'

const $container = document.querySelector('.container')
const $wrapper = document.querySelector('.wrapper')
const $prev = document.querySelector('.prev')
const $next = document.querySelector('.next')
const $currentPage = document.querySelector('.currentPage')
const $allPages = document.querySelector('.allPages')
const $pagination = document.querySelector('.pagination')



let offSetCounter = 0
let currentPage = 1
let selectPage = 1	
const ALL_PAGES = Math.ceil(82 / 10)




function getUrl(url, query,callback) {
    fetch(`${url}?${query}`)
    .then(r => r.json())
    .then(res => {
        callback(res)
    })
}

window.addEventListener('load' , () => {
    getUrl(`${BASE_URL}people/`, 'page2', cb => {
        cardTemplate(cb.results)
    })
})

function cardTemplate(base) {
    const template = base.map(({url,name,}) => `
        <div class="card">
            <div class="card_title">
                <h1>${name}</h1>
            </div>
            <div class="card_image">
                <img src="https://cdn.worldvectorlogo.com/logos/star-wars-2.svg">
            </div>
            <div class="card_footer">
                <button onclick="moreInfo('${url}')" class="footer_btn">More</button>
            </div>
        </div>
  `
  ).join('')
    $container.innerHTML = template
    console.log(base);
}

function moreInfo(url) {
    getUrl(url, '', cb => {
        $wrapper.innerHTML = `
            <div class="more_wrapper">
                <div class="wrapper_header">
                    <h1>${cb.name}</h1>
                </div>
                <div class="wrapper_list">
                    <ul class="list">
                        <li>Birth: ${cb.birth_year}</li>
                        <li>Gender: ${cb.gender}</li>
                        <li>Hair color: ${cb.hair_color}</li>
                        <li>Weight: ${cb.mass}</li>
                        <li>Height: ${cb.height}</li>
                        <li>Skin color: ${cb.skin_color}</li>
                    </ul>
                </div>
                <div class="wrapper_footer">
                    <button onclick="goBack()" class="btn_footer">Back</button>
                </div>
            </div>
        `
    })
}

function goBack() {
    window.location.reload()
}


window.addEventListener('load' , () => {
    $allPages.innerHTML = ALL_PAGES
	$currentPage.innerHTML = currentPage
	$prev.setAttribute('disabled', true)

})

$next.addEventListener('click', e => {
	e.preventDefault()
	currentPage++

	changePage()

    if(currentPage === ALL_PAGES){
        $next.setAttribute("disabled", true)
    }
    
	$prev.removeAttribute('disabled')

	getUrl(`${BASE_URL}people`, `page=${currentPage}`, cb => {
        console.log(cb);
		cardTemplate(cb.results)
	})
})

$prev.addEventListener('click', e => {
	e.preventDefault()
	currentPage-- 

	if(currentPage === 1){
		$prev.setAttribute('disabled', true)
	}

	changePage()

	$next.removeAttribute('disabled')
	
	getUrl(`${BASE_URL}people` , `page=${currentPage}`, cb => {
		cardTemplate(cb.results)
        console.log(cb);
	})
})

function changePage() {
    $currentPage.innerHTML = currentPage;
}


var swiper = new Swiper(".mySwiper", {
    cssMode: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
    },
    mousewheel: true,
    keyboard: true,
});