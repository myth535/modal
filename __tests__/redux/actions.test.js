import {
    UPDATE_POINT_ESTIMATION,
    UPDATE_MODAL_VISIBILITY,
    SET_RESPONSIVE_EVENT,
    updatePointEstimation,
    updateModalVisibility,
    setResponsiveEvent,
} from '../../src/redux/actions'

describe('Redux Actions', () => {
    it('should create an action to update the story points', () => {
        const expectedAction = {
            type: UPDATE_POINT_ESTIMATION,
            pointEstimation: 1,
        }
        expect(updatePointEstimation(1)).toEqual(expectedAction)
    })

    it('should create an action to update the story points', () => {
        const expectedAction = {
            type: UPDATE_POINT_ESTIMATION,
            pointEstimation: 21,
        }
        expect(updatePointEstimation(21)).toEqual(expectedAction)
    })
})
