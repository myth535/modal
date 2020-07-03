import React from 'react'

import StoryPointEstimation from '../src/components/StoryPointEstimation'
import store from '../src/redux/store'
import { setResponsiveEvent, updateModalVisibility } from '../src/redux/actions'

import renderSnapshot from 'react-test-renderer'

describe('StoryPointEstimation component', () => {
    describe('StoryPointEstimation snapshot test', () => {
        it('should render correctly', () => {
            const tree = renderSnapshot
                .create(<StoryPointEstimation />)
                .toJSON()
            expect(tree).toMatchSnapshot()
        })

        it('should unsubscribe from the store when unmounting', () => {
            const tree = renderSnapshot.create(<StoryPointEstimation />)

            const instance = tree.getInstance()
            instance.setState({ unsubscribe: jest.fn() })
            instance.componentWillUnmount()
            expect(instance.state.unsubscribe.mock.calls.length).toBe(1)
        })

        it('should update the state', () => {
            const tree = renderSnapshot.create(<StoryPointEstimation />)

            const instance = tree.getInstance()
            instance.updateState()
            expect(store.getState()).toEqual({
                isSmallScreen: false,
                modalVisibility: false,
                pointEstimation: 5,
            })

            store.dispatch(setResponsiveEvent(true))
            expect(store.getState()).toEqual({
                isSmallScreen: true,
                modalVisibility: false,
                pointEstimation: 5,
            })

            store.dispatch(updateModalVisibility(true))
            expect(store.getState()).toEqual({
                isSmallScreen: true,
                modalVisibility: true,
                pointEstimation: 5,
            })
        })

        it('should accept being responder', () => {
            const tree = renderSnapshot.create(<StoryPointEstimation />)

            const instance = tree.getInstance()
            const isResponder = instance.setResponder()

            expect(isResponder).toBeTruthy()
        })

        it('should signal is in small screen', () => {
            const tree = renderSnapshot.create(<StoryPointEstimation />)

            const instance = tree.getInstance()
            instance.onLayoutChange({ nativeEvent: { layout: { width: 100 } } })
            expect(store.getState().isSmallScreen).toBeTruthy()
        })

        it('should signal is in large screen', () => {
            const tree = renderSnapshot.create(<StoryPointEstimation />)

            const instance = tree.getInstance()
            instance.onLayoutChange({
                nativeEvent: { layout: { width: 1000 } },
            })
            expect(store.getState().isSmallScreen).toBeFalsy()
        })
    })
})
