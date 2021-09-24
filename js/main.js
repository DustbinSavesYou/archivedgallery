let tl = gsap.timeline()

const main = document.querySelector('main');
const nav = document.querySelector('nav');

// // detect when all thumbnails have been loaded
// let thumbnails = document.querySelectorAll('main img'), loader = document.querySelector('#loader');
// // let thumbnailCount = thumbnails.length, loadedCounter = 0;
// // let percentageIncrease = (100 / thumbnailCount);
// // let percentage = 0;

// // thumbnails.forEach(function(thumbnail, index){
// //     if (thumbnail.complete) {
// //         incrementCounter()
// //     } else {
// //         thumbnail.addEventListener( 'load', incrementCounter, false );
// //     }
// // })

// // function incrementCounter() {
// //     loadedCounter++
        
// //     percentage += percentageIncrease;
// //     document.querySelector('#percentage').innerHTML = `${Math.floor(percentage) + 1}%`;

// //     if (loadedCounter >= thumbnailCount) {
// //         // remove loader
// //         console.log(`${loadedCounter} out of ${thumbnailCount} images loaded`)

// //         tl.to(loader, {
// //             duration: 0.3,
// //             delay: 1,
// //             opacity: 0,
// //             display: 'none'
// //         }, "loaderHide")
// //     }
// // }
// 
// let percentage = {percentage: 0}
// tl.to(percentage, {
//     duration: 0.5,
//     percentage: 100,
//     ease: "steps(100)",
//     onUpdate: function(){
//         document.querySelector('#percentage').innerHTML = `${percentage.percentage}%`;
//     }
// })
// tl.to(loader, {
//     duration: 0.3,
//     opacity: 0,
//     display: 'none'
// }, "loaderHide")


// Images slide in animation
let windowHeight = window.innerHeight;

tl.from('.col-img img', {
    duration: 2,
    stagger: {
        from: 9,
        amount: 1.7
    }, 
    delay: 0,
    ease: "power4.out",

    y: windowHeight + 10,
    opacity: 0,
})


// heading animation
let headingHeight = document.querySelector('.heading h1').clientHeight,
headingDelay = 2;
const Hright = document.querySelector('.heading .right');
const Hleft = document.querySelector('.heading .left');
tl.from(Hleft, {
    duration: 0.6,
    y: -headingHeight - 0
}, "<+=2")
tl.from(Hright, {
    duration: 0.6,
    y: +headingHeight + 0
}, "<")

// change heading text animation function
function changeHeading(text) {
    // let text = img.dataset.text;
    let htl = gsap.timeline();
    htl.to(Hleft,
        {
            duration: 0.6,
            y: +headingHeight + 0,
            // ease: Power1.easeInOut
        })
    htl.to(Hright,
        {
            duration: 0.6,
            y: -headingHeight - 0,
            // ease: Power1.easeInOut
        },
        "<")
    
    
    htl.set(Hleft,
        {
            y: -headingHeight - 0,
        })
    htl.set(Hright, {
            y: +headingHeight + 0,
        })
    
    htl.to(Hleft,
        {
            duration: 0.6,
            y: -17,
            onStart: function() {
                Hleft.innerHTML = text;
            }
        })
    htl.to(Hright,
        {
            duration: 0.6,
            y: 17, 
            onStart: function() {
                Hright.innerHTML = text;
            }
        },
        "<")
}

//heading text changed everytime mouseover or mouseout is detected
let Archive2021 = 'Archive @2021';
document.querySelectorAll('.col-img img').forEach((img, index) => {
    img.addEventListener('mouseover', () => {
        changeHeading(img.dataset.text)
    })

    img.addEventListener('mouseout', () => {
        changeHeading(Archive2021)
    })
})


//col-icon is clicked, switch between column background color and greyscale
let col_icon = document.querySelector('#col-icon');
let counter = 0;
col_icon.addEventListener('click', function() {
    counter += 1;
    console.log(counter)
    if (counter > 3) {
        counter = 0;
    }
    if (counter == 0) {
        main.classList.remove('greyscale');
        main.classList.remove('col-bg');
    }
    if (counter == 1) {
        main.classList.add('greyscale');
        main.classList.remove('col-bg');
    }
    if (counter == 2) {
        main.classList.add('greyscale');
        main.classList.add('col-bg');
    }
    if (counter == 3) {
        main.classList.remove('greyscale');
        main.classList.add('col-bg');
    }
    // if (main.classList.contains('greyscale')) {
    //     main.classList.remove('greyscale')
    // } 
    // else {
    //     main.classList.add('greyscale')
    // }
})



// about page animations
let about_revealed = false;
let aboutLink = document.querySelector('#about-link');
let backgroundColor = 'rgb(250,250,250)', aboutBackgroundColor = 'rgb(0,0,0)';
aboutLink.addEventListener('click', function() {
    let abtl = gsap.timeline();
    let duration = 1;


    if (about_revealed == false) {
        about_revealed = true;

        abtl.set('#about', {zIndex: 3})
        abtl.to('#about', {
            duration: duration, 
            opacity: 1,
            ease: Power3.easeInOut
        }, 0)
        abtl.to('nav a', {color: 'white'}, 0)
        abtl.from('.column-text-inner', {
            duration: duration + 0.2,
            y: 310,
            ease: Power2.easeOut
        }, 0)

        abtl.to('.main-link', {
            opacity: 0,
            display: 'none'
        }, 0)
    }
    else {
        about_revealed = false;
        console.log('called')

        abtl.to('#about', {
            duration: duration, 
            opacity: 0,
            ease: Power3.easeInOut
        }, 0)
        abtl.to('nav a', {color: 'black'}, 0)
        abtl.to('.column-text-inner', {
            duration: duration + 0.2,
            y: -310,
            ease: Power2.easeOut
        }, 0)
        abtl.set('#about', {zIndex: -1})
        abtl.set('.column-text-inner', {
            y: 0
        })

        abtl.to('.main-link', {
            opacity: 1,
            display: 'block'
        }, ">")
    }
})


let link01 = document.querySelector('#link01');
link01.addEventListener('click', function(){
    let cs = gsap.timeline();
    // cs.set('main .column', {
    //     width: 0,
    //     paddingTop: '15%'
    // })
    // cs.to('main .selected', {
    //     position: 'absolute',
    //     width: '100%',
    //     flexFlow: 'row nowrap',
    //     gap: '3.2vw'
    // })
    cs.to('main .unselected', {
        duration: 0.3,
        opacity: 0
    })
    cs.to('main .selected', {
        duration: 0.3,
        opacity: 1,
    }, "<")
    let img1 = document.querySelectorAll('main .selected img')[0]
    let img2 = document.querySelectorAll('main .selected img')[1]
    cs.to(img1, {
        y: 30,
        x: -400,
        scale: 2
    })
})