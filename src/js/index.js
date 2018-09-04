import smoothScroll from './smoothScroll';

const jumpLinks = document.querySelectorAll('.js-smooth-jump-link');

[...jumpLinks].forEach((el) => {
  el.addEventListener('click', (e) => {
    const pageFragmentToScrollTo = e.target.getAttribute('href');
    const elementToScrollTo = document.querySelector(pageFragmentToScrollTo);

    smoothScroll(
      elementToScrollTo,
      700,
      'easeOutQuint',
    );
  });
});
