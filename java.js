
const artCards = document.querySelectorAll('.art-card');
const topImage = document.querySelector('.top-image');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('show');
    }
  });
},{threshold:0.2});

artCards.forEach(card => observer.observe(card));
if(topImage) observer.observe(topImage);

artCards.forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const midX = rect.width/2;
    const midY = rect.height/2;
    const rotateX = -(y - midY)/15;
    const rotateY = (x - midX)/15;
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  card.addEventListener('mouseleave', () => card.style.transform = '');
});


const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const lightboxTitle = document.querySelector('.lightbox-title');
const lightboxDate = document.querySelector('.lightbox-date');
const lightboxDescription = document.querySelector('.lightbox-description');
const closeBtn = document.querySelector('.lightbox .close');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
let currentIndex = 0;

function openLightbox(index){
  const card = artCards[index];
  lightbox.classList.add('active');

  lightboxImg.src = card.querySelector('img').src;
  lightboxTitle.textContent = card.dataset.title;
  lightboxDate.textContent = card.dataset.date || '';
  lightboxDescription.textContent = card.dataset.description || '';

  lightbox.classList.remove('show-info');
  setTimeout(() => { lightbox.classList.add('show-info'); }, 100);

  currentIndex = index;
}

artCards.forEach((card,i)=> card.addEventListener('click', ()=> openLightbox(i)));
closeBtn.addEventListener('click', ()=> lightbox.classList.remove('active'));
lightbox.addEventListener('click', e => { if(e.target===lightbox) lightbox.classList.remove('active'); });
prevBtn.addEventListener('click', ()=> openLightbox((currentIndex-1+artCards.length)%artCards.length));
nextBtn.addEventListener('click', ()=> openLightbox((currentIndex+1)%artCards.length));


const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let w, h, particles=[];

function initParticles(){
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  particles = [];
  for(let i=0;i<200;i++){ 
    particles.push({
      x: Math.random()*w,
      y: Math.random()*h,
      r: Math.random()*2+1,
      dx: Math.random()*0.5-0.25,
      dy: Math.random()*0.5+0.3  
    });
  }
}

function drawParticles(){
  ctx.clearRect(0,0,w,h);
  particles.forEach(p=>{
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle='rgba(255,255,255,0.7)';
    ctx.fill();
    p.x += p.dx; p.y += p.dy;
    if(p.x>w) p.x=0; if(p.x<0) p.x=w;
    if(p.y>h) p.y=0;  
  });
  requestAnimationFrame(drawParticles);
}

window.addEventListener('resize', initParticles);
window.addEventListener('load', initParticles);
drawParticles();
