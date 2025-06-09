function startFlip() {
  const flip = document.querySelector('.flip');
  flip.style.transform = 'rotateY(-180deg)';
  setTimeout(() => {
    window.location.href = 'page1.html';
  }, 1000);
}
