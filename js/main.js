let tl = gsap.timeline()

const main = document.querySelector('main');
const nav = document.querySelector('nav');

let windowHeight = window.innerHeight, windowWidth = window.innerWidth;

const order = [0,6,13,11,4,16,9,2,1,12,7,14,5,10,3,8,15] // 7 and 14 switched, 14 ^ 7
let sortedImageList = []
//create list of all images, run loop through them for serial number, push them into array
let images = document.querySelectorAll('.col-img img');
 
// detect when all thumbnails have been loaded
let thumbnails = document.querySelectorAll('main img'), loader = document.querySelector('#loader');


let thumbnailCount = thumbnails.length, loadedCounter = 0;
let percentageIncrease = (100 / thumbnailCount);
let percentage = 0;

thumbnails.forEach(function(thumbnail, index){
    if (thumbnail.complete) {
        incrementCounter()
    } else {
        thumbnail.addEventListener( 'load', incrementCounter, false );
    }
})

function incrementCounter() {
    loadedCounter++
        
    percentage += percentageIncrease;
    document.querySelector('#percentage').innerHTML = `${Math.floor(percentage) + 1}%`;

    if (loadedCounter >= thumbnailCount) {
        // remove loader
        console.log(`${loadedCounter} out of ${thumbnailCount} images loaded`)

        tl.to(loader, {
            duration: 0.3,
            opacity: 0,
            display: 'none'
        })
        executeEntry()
    }
}

// let percentage = {percentage: 0}
// tl.to(percentage, {
//     duration: .5,
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

function executeEntry() {
    // Images slide in animation

    for (let i = 0; i < images.length; i++) {
        images.forEach(function(img, index) {
            if (img.dataset.srno == order[i]) {
                // add it to ordered list
                sortedImageList.push(img)
            }
        })
    }

    tl.from(sortedImageList, {
        duration: 2,
        stagger: {
            from: 0,
            amount: 0.85 // 1.7
        }, 
        delay: 0,
        ease: "power4.out",

        y: windowHeight + 10,
        opacity: -0.2,
    })


    // heading animation
    let headingHeight = document.querySelector('.heading h1').clientHeight,
    headingDelay = 2;
    const Hright = document.querySelector('.heading .right');
    const Hleft = document.querySelector('.heading .left');
    tl.from(Hleft, {
        duration: 1.1,
        y: -headingHeight - 0,
        ease: "power4.out"
    }, "<+=2")
    tl.from(Hright, {
        duration: 1.1,
        y: +headingHeight + 0,
        ease: "power4.out"
    }, "<")

    // change heading text animation function
    function changeHeading(text) {
        // let text = img.dataset.text;
        let htl = gsap.timeline();
        htl.to(Hleft,
            {
                duration: 0.7,
                y: +headingHeight + 0,
                ease: "power2.out",
                // ease: Power1.easeInOut
            })
        htl.to(Hright,
            {
                duration: 0.7,
                y: -headingHeight - 0,
                ease: "power2.out",
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
                duration: 0.7,
                y: -17,
                ease: "power2.out",
                onStart: function() {
                    Hleft.innerHTML = text;
                }
            })
        htl.to(Hright,
            {
                duration: 0.7,
                y: 17, 
                ease: "power2.out",
                onStart: function() {
                    Hright.innerHTML = text;
                }
            },
            "<")
    }

    //heading text changed everytime mouseover or mouseout is detected
    let Archive2021 = 'Archive <span>@</span>2021';
    document.querySelectorAll('.col-img img').forEach((img, index) => {
        img.addEventListener('mouseover', () => {
            changeHeading(img.dataset.text)
        })

        img.addEventListener('mouseout', () => {
            changeHeading(Archive2021)
        })
    })


}

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
        main.classList.remove('col-bg-2');
    }
    if (counter == 1) {
        main.classList.add('greyscale');
    }
    if (counter == 2) {
        main.classList.add('col-bg');
    }
    if (counter == 3) {
        main.classList.add('col-bg-2');
        main.classList.remove('col-bg');
    }
})



// about page animations
let about_revealed = false;
let aboutLink = document.querySelector('#about-link');
let backgroundColor = 'rgb(250,250,250)', aboutBackgroundColor = 'rgb(0,0,0)';
let abtl = gsap.timeline();
aboutLink.addEventListener('click', function() {
    let duration = 0.9;

    abtl.play()
    if (about_revealed == false) {
        about_revealed = true;
        
        
        // abtl.set(sortedImageList, {
            //     y: windowHeight/1.4 + 10,
            //     opacity: -1,
            // })
            abtl.set('.column-text-inner', {
                y: 0,
            })
            
        abtl.to(sortedImageList, {
            duration: 1.2,
            stagger: {
                from: 16,
                amount: 0.425 // 1.7
            }, 
            delay: 0,
            ease: Power2.easeIn,
    
            y: +windowHeight/1.4 - 10,
            opacity: -1,
        })

        abtl.set('#about', {zIndex: 3}, 0)
        abtl.to('#about', {
            duration: duration, 
            opacity: 1,
            ease: Power2.easeInOut
        }, 0.25)

        abtl.to('nav a', {color: 'white'}, "<")
        abtl.from('.column-text-inner', {
            duration: duration + 0.2,
            y: 310,
            ease: Power2.easeOut
        }, "<")

        abtl.to('.main-link', {
            opacity: 0,
            display: 'none'
        }, "<")
    }
    else {
        about_revealed = false;
        abtl.reverse()
    }
})



let link01 = document.querySelector('#link01');
let cs = gsap.timeline();
link01.addEventListener('click', function(){
    cs.to(sortedImageList, {
        duration: 1, //2
        stagger: {
            from: 0,
            amount: 0.425  //1.7
        }, 
        delay: 0,
        ease: "power2.out",
    
        y: -windowHeight - 10,
        opacity: -0.2,
    }) 
    cs.to('.collection-view', {
        duration: 0.2,
        display: 'block',
        opacity: 1
    }, ">-0.5")
})

