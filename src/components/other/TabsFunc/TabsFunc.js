import './TabsFunc.scss';

const TabsFunc = () => {
	/*const $tabsName = tabs.querySelectorAll('.tabs__name');
    const $tabsItem = tabs.querySelectorAll('.tabs__item');

    $tabsName.forEach((name, index) => {
        name.setAttribute('data-tab-index', `${index}`)
        name.addEventListener('click', selectTabName);
    })

    function selectTabName() {
        $tabsName.forEach(name => {
            name.classList.remove('active');
        })
        this.classList.add('active');
        openTabItem(this.getAttribute('data-tab-index'))
    }

    function openTabItem(blockNumber) {
        $tabsItem.forEach(name => {
            name.classList.remove('active');
        })
        $tabsItem[blockNumber].classList.add('active')
    }*/
	const $tabs = document.querySelectorAll('.tabs');

	$tabs.forEach((tabsBlock) => {
		const $tabsName = tabsBlock.querySelectorAll('.tabs__name');
		const $tabsItem = tabsBlock.querySelectorAll('.tabs__item');

		$tabsName.forEach((name, index) => {
			name.setAttribute('data-tab-index', `${index}`);
			name.addEventListener('click', selectTabName);
		});

		function selectTabName() {
			$tabsName.forEach((name) => {
				name.classList.remove('active');
			});
			this.classList.add('active');
			openTabItem(this.getAttribute('data-tab-index'));
		}

		function openTabItem(blockNumber) {
			$tabsItem.forEach((name) => {
				name.classList.remove('active');
			});
			$tabsItem[blockNumber].classList.add('active');
		}
	});
};

export default TabsFunc;
