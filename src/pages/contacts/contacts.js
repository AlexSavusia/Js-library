import './contacts.scss';
import TabsClass from '../../components/other/TabsClass';
import DropdownBlockClass from '../../components/other/DropdownBlockClass';
import SliderMain from '../../components/other/SliderMain';

(function () {
    const tabs = document.querySelectorAll('.tabs');

    for (let i = 0; i < tabs.length; i++) {
        new TabsClass(tabs[i]);
    }
    new DropdownBlockClass('.dropdown-block');

    const slider = SliderMain({
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        slidesPerView: 2,
        slidesPerGroup: 1,
        spaceBetween: 20,
    });

    slider.on('slideChange', function () {
        console.log(222, 'doit');
    });
})();
