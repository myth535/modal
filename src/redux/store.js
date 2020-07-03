import {
    UPDATE_POINT_ESTIMATION,
    UPDATE_MODAL_VISIBILITY,
    SET_RESPONSIVE_EVENT,
} from './actions'

export const initialState = {
    pointEstimation: 5,
    modalVisibility: false,
    isSmallScreen: false,
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_POINT_ESTIMATION:
            return {
                ...state,
                pointEstimation: action.pointEstimation,
            }
        case UPDATE_MODAL_VISIBILITY:
            return {
                ...state,
                modalVisibility: action.modalVisibility,
            }
        case SET_RESPONSIVE_EVENT:
            return {
                ...state,
                isSmallScreen: action.isSmallScreen,
            }
        default:
            return state
    }
}
