import Collection from '../pages/Collection'

import Search from '../pages/collection/Search'
import PlacementSuccess from '../pages/collection/PlacementSuccess'

export default [{
	path: '/collection',
	name: 'collection',
	meta: {
		title: '收藏',
		showTabar: true,
	},
	component: Collection
}, {
	path: '/collection/search',
	name: 'search',
	meta: {
		title: '收藏',
	},
	component: Search,
}, {
	path: '/collection/placementSuccess',
	name: 'search',
	meta: {
		title: '微信',
	},
	component: PlacementSuccess,
}]