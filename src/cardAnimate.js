import gsap from "gsap";

const hoverCard = document.querySelector('.hoverCard');
const hoverCardBodyShowOnHover = document.querySelector('.hoverCard__showOnHover');

hoverCard.addEventListener('mouseenter', function() {
  gsap.to(hoverCardBodyShowOnHover, { duration: 0.5, display: 'block', height: 'auto', ease: 'power4.out' });
});

hoverCard.addEventListener('mouseleave', function() {
  gsap.to(hoverCardBodyShowOnHover, { duration: 0.5, height: 0, ease: 'power4.out', onComplete: function() {
    this.targets()[0].style.display = 'none';
  }});
});