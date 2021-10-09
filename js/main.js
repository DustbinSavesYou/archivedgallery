let tl = gsap.timeline()

const main = document.querySelector('main');
const nav = document.querySelector('nav');

let windowHeight = window.innerHeight, windowWidth = window.innerWidth;

const order = [0,6,13,11,4,16,9,2,1,12,7,14,5,10,3,8,15] // 7 and 14 switched, 14 ^ 7
// const order = [0,6,13,11,4,16,9,2,1,12,7,14,17,5,10,18,19,3,8,15] // 7 and 14 switched, 14 ^ 7
let sortedImageList = []
//create list of all images, run loop through them for serial number, push them into array
let images = document.querySelectorAll('.col-img img');

for (let i = 0; i < images.length; i++) {
    images.forEach(function(img, index) {
        if (img.dataset.srno == order[i]) {
            // add it to ordered list
            sortedImageList.push(img)
        }
    })
}

 
// detect when all thumbnails have been loaded
let thumbnails = document.querySelectorAll('main img'), loader = document.querySelector('#loader');


let thumbnailCount = thumbnails.length, loadedCounter = 0;
let percentageIncrease = (100 / thumbnailCount);
let percentage = 0;

let headingHeight = document.querySelector('.heading h1').clientHeight,
headingDelay = 2;
const Hright = document.querySelector('.heading .right');
const Hleft = document.querySelector('.heading .left');

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

function imagesMove(direction ,timeline, position) {
    if (direction == 'up') {
        timeline.to(sortedImageList, {
            duration: 1.2,
            stagger: {
                from: 0,
                amount: 0.425 // 1.7
            }, 
            delay: 0,
            ease: Power1.easeIn,
            
            y: -windowHeight/1.4 - 10,
            opacity: -1,
            onComplete: function() {
                about_revealed = true;
                timeline.clear()
            }
        }, position)        
    }
    else if (direction == 'down'){
        timeline.to(sortedImageList, {
            duration: 1.2,
            stagger: {
                from: 16,
                amount: 0.425 // 1.7
            }, 
            delay: 0,
            ease: Power4.easeOut,
            
            y: 0,
            opacity: 1,
            onComplete: function(){
                about_revealed = false;
                timeline.clear()
            }
        }, position) 
    }
    else {
        throw '\nInvalid position parameter, must be "up" or "down".'
    }
}

function executeEntry() {
    // Images slide in animation

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
let aboutLink = document.querySelector('#about-link'), closeLink = document.querySelector('#close-link');
let backgroundColor = 'rgb(250,250,250)', aboutBackgroundColor = 'rgb(0,0,0)';
let duration = 0.7, tween;
let abtl = gsap.timeline();

aboutLink.addEventListener('click', function() {

    abtl.clear();
    abtl.play();
    abtl.set('.column-text-inner', {
        y: 0,
    })

    abtl.to('.nav', {
        duration: duration,
        y: -40,
        ease: Power2.easeOut
    }, "<")
    abtl.to('.about-nav', {
        duration: duration,
        y: -40,
        ease: Power2.easeOut
    }, "<")

    imagesMove('up', abtl, 0);
    
    abtl.set('#about', {zIndex: 3}, 0)
    abtl.to('#about', {
        duration: duration, 
        opacity: 1,
        ease: Power2.easeOut
    }, 0.25)
    
    abtl.from('.column-text-inner', {
        duration: duration + 0.5,
        y: 310,
        stagger: {
            from: 0,
            amount: 0.125
        },
        ease: Power4.easeOut,
    }, "<")

    
    abtl.to('.main-link', {
        opacity: 0,
        display: 'none',
    }, "<")


    abtl.remove(abtl.getChildren())
})

closeLink.addEventListener('click', function(){
        //hide about section or reverse timeline

        abtl.clear();
        abtl.play();

        abtl.to('.nav', {
            duration: duration,
            y: 0,
            ease: Power2.easeOut
        }, "<")
        abtl.to('.about-nav', {
            duration: duration,
            y: 0,
            ease: Power2.easeOut
        }, "<")
    
        imagesMove('down', abtl, 0);
        
        
        abtl.to('#about', {
            duration: duration, 
            opacity: 0,
            ease: Power2.easeInOut
        }, 0)
        
        
        abtl.to('.column-text-inner', {
            duration: duration + 0.4,
            y: 310,
            stagger: {
                from: 4,
                amount: 0.125
            },
            ease: Power1.easeInOut,
        }, "<")
        abtl.set('#about', {zIndex: -1}, ">")
        
        abtl.to('.main-link', {
            opacity: 1,
            display: 'block',
        }, "<")
        
        
        abtl.remove(abtl.getChildren())
})




let link01 = document.querySelector('#link01');
let cs = gsap.timeline();
let n;
link01.addEventListener('click', function(){
    let cs = gsap.timeline();
    if (n == 1) {
        cs.reverse()
    }


        let dataSrNo = parseInt(9);
        // console.log(typeof parseInt(image.dataset.srno))
        let SrNo = order.indexOf(dataSrNo);
        let imagesAbove = [], imagesBelow = [];
        
        sortedImageList.forEach((thumb, index) => {
            if (thumb.dataset.clno == sortedImageList[SrNo].dataset.clno) {
                // pass
            }
            else if (index > SrNo) {
                imagesBelow.push(thumb)
            }
            else {
                imagesAbove.push(thumb)
            }
        })
        
        cs.to(imagesAbove, {
            duration: 0.9,
            stagger: {
                from:SrNo,
                amount: 0.2125 // 1.7
            }, 
            delay: 0,
            ease: Power1.easeInOut,
            
            y: -windowHeight/1.4 - 10,
            opacity: -1,
            onComplete: function() {
                // tl.clear()
            }
        }) 
        cs.to(imagesBelow, {
            duration: 0.9,
            stagger: {
                from: SrNo,
                amount: 0.2125 // 1.7
            }, 
            delay: 0,
            ease: Power1.easeInOut,
            
            y: windowHeight/1.4 + 10,
            opacity: -1,
            onComplete: function() {
                // tl.clear()
            }
        }, "<")
    
    let img1 = document.querySelectorAll('main .selected img')[0]
    let img2 = document.querySelectorAll('main .selected img')[1]
    
    let img = img1
    // let iot = img.offsetTop, imgHeight = img.offsetHeight, imgcenter = img.offsetHeight / 2, icot = imgcenter + iot, cy = windowHeight / 2
    // console.log(iot)
    // let yt = cy - icot

    let iot = img.offsetTop, ih = img.offsetHeight, ihc = ih/2, ioc = iot + ihc;
    let wh = windowHeight, whc = wh/2, y = whc-ioc;
    // console.log(`a: ${a}, b: ${b}, c: ${c}, d: ${d}, e: ${e}, f: ${f}, y: ${y}, `)
    let iol = img.offsetLeft, iw = img.offsetWidth, iw3 = iw * 4, xo = -iol + iw3/2
    let scaleFactor = 4;
    cs.to(img, {
        duration: 1,
        y: y,
        x: xo,
        scale: scaleFactor,
        ease: Power3.easeOut
    }, "<+0.25")  


    iot = img2.offsetTop, ih = img2.offsetHeight, ihc = ih/2, ioc = iot + ihc;
    wh = windowHeight, whc = wh/2, y = whc-ioc;
    // console.log(`a: ${a}, b: ${b}, c: ${c}, d: ${d}, e: ${e}, f: ${f}, y: ${y}, `)
    iol = img2.offsetLeft, iw = img2.offsetWidth, iw3 = iw * 4, xo = -iol + iw3/2

    cs.to(img2, {
        duration: 1,
        delay: 0.1,
        y: y,
        x: xo + (iw * 4 + 25),
        scale: scaleFactor,
        ease: Power3.easeOut
    }, "<")  

    cs.to('.heading', {
        duration: 0.25, 
        opacity: 0
    }, 0)

    let widthOccupied = img1.offsetWidth + img2.offsetWidth + 50 // 50 is padding * 2

    n = 1
})


sortedImageList.forEach(function(image, index) {
    image.addEventListener('click', function(){
        let dataSrNo = parseInt(image.dataset.srno);
        // console.log(typeof parseInt(image.dataset.srno))
        let SrNo = order.indexOf(dataSrNo);
        let imagesAbove = [], imagesBelow = [];
        
        sortedImageList.forEach((thumb, index) => {
            if (index > SrNo) {
                imagesBelow.push(thumb)
            }
            else {
                imagesAbove.push(thumb)
            }
        })
        
        tl.to(imagesAbove, {
            duration: 0.9,
            stagger: {
                from:SrNo,
                amount: 0.2125 // 1.7
            }, 
            delay: 0,
            ease: Power1.easeInOut,
            
            y: -windowHeight/1.4 - 10,
            opacity: -1,
            onComplete: function() {
                // tl.clear()
            }
        }) 
        tl.to(imagesBelow, {
            duration: 0.9,
            stagger: {
                from: SrNo,
                amount: 0.2125 // 1.7
            }, 
            delay: 0,
            ease: Power1.easeInOut,
            
            y: windowHeight/1.4 + 10,
            opacity: -1,
            onComplete: function() {
                // tl.clear()
            }
        }, "<")
    })
})
