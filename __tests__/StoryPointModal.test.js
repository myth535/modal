import React from 'react'
import renderSnapshot from 'react-test-renderer'

import StoryPointModal from '../src/components/StoryPointModal'
import store from '../src/redux/store'
import { setResponsiveEvent } from '../src/redux/actions'

const dataModalAnimation = {
    modalAnimation: () => {},
    animatedScale: 2,
    animatedMarginTop: 80,
    animatedOpacity: 1,
}

describe('StoryPointModal component', () => {
    describe('StoryPointModal snapshot test', () => {
        it('should render correctly', () => {
            const tree = renderSnapshot
                .create(
                    <StoryPointModal dataModalAnimation={dataModalAnimation} />
                )
                .toJSON()
            expect(tree).toMatchSnapshot()
        })

        it('should update the state', () => {
            const tree = renderSnapshot.create(
                <StoryPointModal dataModalAnimation={dataModalAnimation} />
            )

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
        })

        it('should unsubscribe from the store when unmounting', () => {
            const tree = renderSnapshot.create(
                <StoryPointModal dataModalAnimation={dataModalAnimation} />
            )

            const instance = tree.getInstance()
            instance.setState({ unsubscribe: jest.fn() })
            instance.componentWillUnmount()
            expect(instance.state.unsubscribe.mock.calls.length).toBe(1)
        })
    })
})
