import { initialState, reducer } from '../../src/redux/store'
import {
    updatePointEstimation,
    updateModalVisibility,
    setResponsiveEvent,
} from '../../src/redux/actions'

describe('Redux Reducers', () => {
    it('should return the initial state', () => {
        const state = reducer(undefined, {})
        expect(state).toEqual(initialState)
    })

    it('should update the story points with 1', () => {
        const state = reducer(undefined, updatePointEstimation(1))
        const newState = { ...initialState, pointEstimation: 1 }
        expect(state).toEqual(newState)
    })

    it('should update the story points with 5', () => {
        const state = reducer(undefined, updatePointEstimation(5))
        const newState = { ...initialState, pointEstimation: 5 }
        expect(state).toEqual(newState)
    })
})
