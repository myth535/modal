export const UPDATE_POINT_ESTIMATION = 'UPDATE_POINT_ESTIMATION'
export const UPDATE_MODAL_VISIBILITY = 'UPDATE_MODAL_VISIBILITY'
export const SET_RESPONSIVE_EVENT = 'SET_RESPONSIVE_EVENT'

export function updatePointEstimation(pointEstimation) {
    return {
        type: UPDATE_POINT_ESTIMATION,
        pointEstimation,
    }
}

export function updateModalVisibility(modalVisibility) {
    return {
        type: UPDATE_MODAL_VISIBILITY,
        modalVisibility,
    }
}

export function setResponsiveEvent(isSmallScreen) {
    return {
        type: SET_RESPONSIVE_EVENT,
        isSmallScreen,
    }
}
