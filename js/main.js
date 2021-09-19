let windowHeight = window.innerHeight;

gsap.from('.col-img img', {
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

gsap.from('.heading h1', {
    duration: 1,
    delay: 2,
    scaleY: 0
})
