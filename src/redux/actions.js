export const UPDATE_POINT_ESTIMATION = 'UPDATE_POINT_ESTIMATION'

export function updatePointEstimation(pointEstimation) {
    return {
        type: UPDATE_POINT_ESTIMATION,
        pointEstimation,
    }
}
