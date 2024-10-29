import './tabs.scss';
import Tabs1 from "../../components-lib/tabs/Tabs1";

(function () {
	const tabs1 = document.querySelectorAll('.js-tabs1');
	let tabsCollection = {}

	tabs1.forEach(($tab) => {
		const tabName = $tab.getAttribute('data-name');

		tabsCollection[tabName] = new Tabs1($tab)
	})
})();
