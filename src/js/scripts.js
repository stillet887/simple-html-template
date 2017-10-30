const product_form = document.querySelector('.product__form');
const product_image = document.querySelector('.product__image');

product_form.addEventListener('click', event => {
    const el = event.target;
    if(el.classList.contains('product__option')) {
        const option_group = el.parentNode;
        if(option_group.classList.contains('product__colors')) {
            const src = 'img/tshirts/tshirt_' + el.dataset.color + '.jpg';
            product_image.setAttribute('src', src);
        }

        const options = option_group.querySelectorAll('.product__option');
        options.forEach( option => {
            option.classList.remove('product__option_checked');
        });
        el.classList.add('product__option_checked');
    }
});
