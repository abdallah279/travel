// // Loader
// window.addEventListener('load', ()=>{
//     setTimeout(() => {
//       if(document.querySelector('.loader-bg')){
//         $('.loader-bg').fadeOut(700);
//       }
//     }, 1000);
// })

// Header Fixed
let header = document.querySelector('.navbar-m');
header.classList.toggle('active', window.scrollY > 0);

window.addEventListener('scroll', function(){
    // Header Fixed
    header.classList.toggle('active', window.scrollY > 0);
    // section active class
    sectionActive();
});

const collapseNavShow = document.querySelector('.coll-icon .show');
const collapseNavHide = document.querySelector('.coll-icon .hide');
const collapseNav = document.querySelector('.coll-icon');
const navbar = document.querySelector('.nav-desk');

collapseNav.addEventListener('click', ()=>{
    navbar.classList.toggle('active');
    collapseNav.classList.toggle('active')
})

// collapseNavShow.addEventListener('click', ()=>{
//     navbar.classList.add('active');
//     collapseNavHide.classList.add('active');
//     collapseNavShow.classList.remove('active');
//     // if(navbar.classList.contains('active')){
//     //     collapseNav.innerHTML = `<i class="fa-solid fa-xmark"></i>`
//     // } else{
//     //     collapseNav.innerHTML = `<i class="fa-solid fa-bars"></i>`
//     // }
// });

// collapseNavHide.addEventListener('click', ()=>{
//     navbar.classList.remove('active');
//     collapseNavShow.classList.add('active');
//     collapseNavHide.classList.remove('active');
// })

// section active class
let sections = document.querySelectorAll(".section-m");

function sectionActive(){
    let scrollPosition = document.documentElement.scrollTop;

    sections.forEach(section =>{
        if(scrollPosition >= section.offsetTop - section.offsetHeight * .5 &&
            scrollPosition < section.offsetTop + section.offsetHeight - section.offsetHeight * .5){

            let sectionId = section.attributes.id.value;

            removeActiveClasses();
            addActiveClass(sectionId);
        }
    });
}

let navLinks = document.querySelectorAll(".nav-list-m a");

// Remove All Active Classes
function removeActiveClasses(){
    navLinks.forEach(li =>{
        li.classList.remove('active');
    });
}

// Add Active Class To link Section
function addActiveClass(id){
    document.querySelector(`.nav-list-m a[href="#${id}"]`).classList.add('active');
}

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    let currentId = e.target.attributes.href.value;
    let section = document.querySelector(currentId);

    window.scroll({
      top: section.offsetTop,
      behavior: "smooth",
    });
  });
});


// Owl Carousel
$(document).ready(function(){
    $(".places").owlCarousel({
        loop:true,
        margin:25,
        rtl: true,
        nav:true,
        responsiveClass:true,
        autoplay:true,
        autoplayTimeout:3000,
        autoplayHoverPause:true,
        responsive:{
            0:{
                items:2,
            },
            600:{
                items:3
            },
            1000:{
                items:4
            }
        }
    });
});

const gallaryActive = document.querySelector('.gallary-active');
const thumbnails = document.querySelectorAll('.thumbnail');
const thumbnailsArray = Array.from(thumbnails);

if (window.matchMedia("(max-width: 650px)").matches) {
    thumbnailsArray.length = 3;
} else{
    thumbnailsArray.length = 5;
}

let timerInterval;
let time = 3000;

autoRotateImg();

function autoRotateImg(){
    timerInterval = setInterval(function(){
        thumbActiveImg = document.querySelector('.thumbnail.active');
        if(thumbActiveImg === thumbnailsArray[thumbnailsArray.length - 1]){
            let newImg = thumbnailsArray[0];
            updateActiveImg(newImg);
        }else{
            let newImg = thumbActiveImg.nextElementSibling;
            updateActiveImg(newImg);
        }
    }, time);
}


// Set Active Function
function updateActiveImg(img){
    thumbnails.forEach(thumb =>{
        thumb.classList.remove('active');
    });

    img.classList.add('active');
    gallaryActive.src = img.querySelector('img').src;
    $('.gallary-active').fadeOut(0);
    $('.gallary-active').fadeIn(400);
}


// Events
thumbnails.forEach(img =>{
    img.addEventListener('click', function(){
        updateActiveImg(img);
        clearInterval(timerInterval);
        autoRotateImg();
    })
});