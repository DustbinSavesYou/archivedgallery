let link01 = document.querySelector('#link01');
link01.addEventListener('click', function(){
    let cs = gsap.timeline();
    cs.to('.col-img img', {
        duration: 1.2, //2
        stagger: {
            from: 1,
            amount: 0.85  //1.7
        }, 
        delay: 0,
        ease: "power2.out",
    
        y: -windowHeight - 10,
        // opacity: 0,
    })    

    let img1 = document.querySelectorAll('main .selected img')[0]
    let img2 = document.querySelectorAll('main .selected img')[1]

    let img = img2
    // let iot = img.offsetTop, imgHeight = img.offsetHeight, imgcenter = img.offsetHeight / 2, icot = imgcenter + iot, cy = windowHeight / 2
    // console.log(iot)
    // let yt = cy - icot

    let iot = img.offsetTop, ih = img.offsetHeight, ihc = ih/2, ioc = iot + ihc;
    let wh = windowHeight, whc = wh/2, y = whc-ioc;
    // console.log(`a: ${a}, b: ${b}, c: ${c}, d: ${d}, e: ${e}, f: ${f}, y: ${y}, `)
    let iol = img.offsetLeft, iw = img.offsetWidth, iw3 = iw * 3, xo = -iol + iw3/2

    cs.to(img, {
        duration: 0.6,
        y: y,
        x: xo,
        scale: 3,
    })  
})






let link02 = document.querySelector('#link02');
link02.addEventListener('click', function(){
    let ls = gsap.timeline();
    sortedImageList.forEach((img, index) => {
        let duration, a, b, c, d, e, offsetRight, fluctuation, fluctuation2;
        fluctuation = Math.random() * (30 - (-30)) - 30;
        fluctuation2 = Math.random() * (30 - (-30)) - 30;
        a = 250, b = img.offsetTop;
        offsetRight = windowWidth - (img.offsetLeft + img.offsetWidth) - a + fluctuation;
        duration = 1.1;
        c = (b - a) + fluctuation2;
        
        ls.to(img, {
            duration: duration,
            y: -c,
            x: offsetRight,
            scale: 2,
            filter: 'saturate(0)',
            ease: Power2.easeInOut,
        }, "<")
    })
})


aboutLink.addEventListener('click', function() {
    let abtl = gsap.timeline();
    let duration = 1;


    if (about_revealed == false) {
        about_revealed = true;

        // abtl.to(sortedImageList, {
        //     duration: 1.5, //2
        //     stagger: {
        //         from: 0,
        //         amount: 0.85  //1.7
        //     }, 
        //     delay: 0,
        //     ease: "power2.out",
        
        //     y: -windowHeight - 10,
        //     opacity: -0.2,
        // }) 

        abtl.set('#about', {zIndex: 3}, 0)
        abtl.to('#about', {
            duration: duration, 
            opacity: 1,
            ease: Power3.easeInOut
        }, 0)
        abtl.to('nav a', {color: 'white'}, 0)
        abtl.from('.column-text-inner', {
            duration: duration + 0.2,
            y: 310,
            ease: Power3.easeOut
        }, 0)

        abtl.to('.main-link', {
            opacity: 0,
            display: 'none'
        }, 0)
    }
    else {
        about_revealed = false;
        console.log('called')

        abtl.set(sortedImageList, {
            // duration: 2,
            // stagger: {
                // from: 0,
                // amount: 1.7 // 1.7
            // }, 
            // delay: 0,
            // ease: "power4.out",
            y: windowHeight/1.4 + 10,
            opacity: -1,
        })

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

        abtl.to(sortedImageList, {
            duration: 1.5,
            stagger: {
                from: 0,
                amount: 0.85 // 1.7
            }, 
            delay: 0,
            ease: "power4.out",
    
            y: 0,
            opacity: 1,
        }, "<")

        abtl.set('#about', {zIndex: -1})
        abtl.set('.column-text-inner', {
            y: 0
        })
    

        abtl.to('.main-link', {
            opacity: 1,
            display: 'block'
        }, "<")

        
    }
})



collectionImagesIndex = [
    [sortedImageList[0], sortedImageList[1]],
    [sortedImageList[2], sortedImageList[3]],
    [sortedImageList[4], sortedImageList[5]],
    [sortedImageList[6], sortedImageList[7], sortedImageList[8]],
    [sortedImageList[9], sortedImageList[10]],
    [sortedImageList[11], sortedImageList[12]],
    [sortedImageList[13], sortedImageList[14], sortedImageList[15]],
    [sortedImageList[16]]
]



    // abtl.play()
    // if (about_revealed == false) {
    //     about_revealed = true;
        
        
    //     // abtl.set(sortedImageList, {
    //         //     y: windowHeight/1.4 + 10,
    //         //     opacity: -1,
    //         // })
    //         abtl.set('.column-text-inner', {
    //             y: 0,
    //         })
            
    //     // abtl.to(sortedImageList, {
    //     //     duration: 1.2,
    //     //     stagger: {
    //     //         from: 16,
    //     //         amount: 0.425 // 1.7
    //     //     }, 
    //     //     delay: 0,
    //     //     ease: Power2.easeIn,
    
    //     //     y: +windowHeight/1.4 - 10,
    //     //     opacity: -1,
    //     // })
        
    //     abtl.to(sortedImageList, {
    //         duration: 1.2,
    //         stagger: {
    //             from: 0,
    //             amount: 0.425 // 1.7
    //         }, 
    //         delay: 0,
    //         ease: Power2.easeIn,
    
    //         y: -windowHeight/1.4 - 10,
    //         opacity: -1,
    //     })
        
    //     abtl.set('#about', {zIndex: 3}, 0)
    //     abtl.to('#about', {
    //         duration: duration, 
    //         opacity: 1,
    //         ease: Power2.easeInOut
    //     }, 0.25)

    //     abtl.to('nav a', {color: 'white'}, "<")
    //     abtl.from('.column-text-inner', {
    //         duration: duration + 0.2,
    //         y: 310,
    //         ease: Power2.easeOut
    //     }, "<")

    //     abtl.to('.main-link', {
    //         opacity: 0,
    //         display: 'none'
    //     }, "<")
    // }
    // else {
    //     about_revealed = false;
    //     // abtl.reverse()
    // }
