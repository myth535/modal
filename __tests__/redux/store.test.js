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
})
