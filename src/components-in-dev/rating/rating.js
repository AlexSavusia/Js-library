import { fadeIn } from '../../utils/utils';
import './rating.scss';

export default class Rating {
    constructor(ratings) {
        this.ratings = ratings;
        this.ratingActive = null;
        this.ratingValue = null;

        this.init();
    }

    init() {
        // Пробегаем по рейтингам по всей странице
        this.ratings.forEach((elem, index) => {
            const rating = this.ratings[index];
            this.initRating(rating);
            this.sendEvaluation(rating);
        });
    }

    // Инициализируем конкретный рейтинг
    initRating(rating) {
        this.initRatingValue(rating);
        this.setActiveRatingWidth();

        if (rating.classList.contains('js-rating-set')) {
            this.setRating(rating);
        }
    }

    // Инициализируем перемнные
    initRatingValue(rating) {
        this.ratingActive = rating.querySelector('.js-rating-active');
        this.ratingValue = rating.querySelector('.js-rating-value');
    }

    // Изменяем ширину активных звезд
    setActiveRatingWidth(index = this.ratingValue.textContent) {
        const ratingActiveWidth = index / 0.05;
        this.ratingActive.style.width = `${ratingActiveWidth}%`;
    }

    // Устанавливаем рейтинг
    setRating(rating) {
        this.ratingItems = rating.querySelectorAll('.js-rating-item');
        this.ratingItems.forEach((item, index) => {
            item.addEventListener('mouseenter', () => {
                // Обновление переменных
                this.initRatingValue(rating);
                // Обновление активных звезд
                this.setActiveRatingWidth(item.value);
            });
            item.addEventListener('mouseleave', () => {
                // Обновление активных звезд
                this.setActiveRatingWidth();
            });
            item.addEventListener('click', () => {
                // Обновление переменных
                this.initRatingValue(rating);
                //Установка оценки
                this.ratingValue.textContent = index + 1;
            });
        });
    }

    sendEvaluation(rating) {
        const button = rating.querySelector('.js-rating-button');
        button.addEventListener('click', () => {
            //Отправка выбранного значение на сервер
            console.log(this.ratingValue.textContent, 'rating value');
        });
    }
}
