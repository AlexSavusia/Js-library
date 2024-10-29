import { fadeIn } from '../../../utils/utils';
import './TabsClass.scss';

export default class Tabs {
    constructor(tabs) {
        this.$tab = tabs;
        this.$tabsList = this.$tab.querySelector('.js-tabs-list');
        this.$tabsContent = this.$tab.querySelector('.js-tabs-content');
        this.$tabName = this.$tabsList.querySelectorAll('.js-tabs-name');
        this.$tabItem = this.$tabsContent.children;

        this.init();
    }

    init() {
        this.$tabName.forEach((name, index) => {
            name.setAttribute('data-tab-index', `${index}`);
            name.addEventListener('click', this.changeTab.bind(this));
        });
        this.openTabItem(0);
    }

    changeTab(e) {
        const targetTab = e.target.closest('.js-tabs-name');
        const blockNumber = targetTab.getAttribute('data-tab-index');

        this.$tabName.forEach((name) => {
            name.classList.remove('active');
        });

        targetTab.classList.add('active');

        this.openTabItem(blockNumber);
    }

    openTabItem(blockNumber) {
        Array.from(this.$tabItem).forEach((item) => {
            // item.classList.remove('active');
            item.style.display = 'none';
        });
        fadeIn(this.$tabItem[blockNumber], 500);
        // this.$tabItem[blockNumber].classList.add('active');
    }
}
