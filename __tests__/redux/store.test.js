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

    it('should show the modal', () => {
        const state = reducer(undefined, updateModalVisibility(true))
        const newState = { ...initialState, modalVisibility: true }
        expect(state).toEqual(newState)
    })

    it('should hide the modal', () => {
        const state = reducer(undefined, updateModalVisibility(false))
        const newState = { ...initialState, modalVisibility: false }
        expect(state).toEqual(newState)
    })

    it('should signal that a small screen is detected', () => {
        const state = reducer(undefined, setResponsiveEvent(false))
        const newState = { ...initialState, isSmallScreen: false }
        expect(state).toEqual(newState)
    })

    it('should signal that a large screen is detected', () => {
        const state = reducer(undefined, setResponsiveEvent(true))
        const newState = { ...initialState, isSmallScreen: true }
        expect(state).toEqual(newState)
    })
})
