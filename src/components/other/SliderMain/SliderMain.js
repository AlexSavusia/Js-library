import './SliderMain.scss';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

const SliderMain = (option) => {
	return new Swiper('.slider-main', option);
};

export default SliderMain;
