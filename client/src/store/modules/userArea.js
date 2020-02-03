export default {
    actions: {
        toggleUserArea(ctx, isShow) {
            ctx.commit('toggleUserArea', isShow)
        }
    },

    mutations: {
        toggleUserArea(state, isShow) {
            state.isShowUserArea = isShow;
        }
    },

    state: {
        isShowUserArea: false,
    },

    getters: {
        getUserAreaState(state) {
            return state.isShowUserArea;
        }
    }
}