import areaActions from './area/actions'
import areaMutations from './area/mutations'
const props = {
    list: [],
    pagination: {}
}
const state = {
    area: {
        ...props,
        province: []
    }
}

export default {
    state,
    actions: { ...areaActions },
    mutations: { ...areaMutations }
}
