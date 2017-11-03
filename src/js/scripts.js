const productForm = document.querySelector('.product__form');
const productImage = document.querySelector('.product__image');
const navButton = document.querySelector('.nav-button');
const navMenu = document.querySelector('.nav-strip');

productForm.addEventListener('click', event => {
    const el = event.target;
    if(el.classList.contains('product__option')) {
        const optionGroup = el.parentNode;
        if(optionGroup.classList.contains('product__colors')) {
            const src = 'img/tshirts/tshirt_' + el.dataset.color + '.jpg';
            productImage.setAttribute('src', src);
        }

        const options = optionGroup.querySelectorAll('.product__option');
        options.forEach( option => {
            option.classList.remove('product__option_checked');
        });
        el.classList.add('product__option_checked');
    }
});

navButton.addEventListener('click', () => {
    navMenu.classList.toggle('nav-strip_open');
});
