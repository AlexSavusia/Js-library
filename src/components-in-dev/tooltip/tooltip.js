import { fadeIn } from '../../utils/utils';
import './tooltip.scss';

export default class tooltip {
    constructor(tooltip) {
        this.tooltip = tooltip;
        this.content = this.tooltip.querySelector('.js-tooltip-content');

        this.init();
    }

    init() {
        window.addEventListener('resize', () => {
            const rect = this.content.getBoundingClientRect();
            console.log(rect, 'content');
            this.content.style.left = `${(this.tooltip.innerWidth - rect.width) / 2}px`;
            this.content.style.top = `-${(this.tooltip.innerHeight - rect.height) / 2}px`;
        });
    }
}
