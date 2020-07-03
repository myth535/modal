import React from 'react'
import renderSnapshot from 'react-test-renderer'

import CurrentStoryPoint from '../src/components/CurrentStoryPoint'
import store from '../src/redux/store'
import { updateModalVisibility } from '../src/redux/actions'

const dataModalAnimation = {
    modalAnimation: () => {},
    animatedScale: 2,
    animatedMarginTop: 80,
    animatedOpacity: 1,
}

describe('CurrentStoryPoint component', () => {
    describe('CurrentStoryPoint snapshot test', () => {
        it('should render correctly', () => {
            const tree = renderSnapshot
                .create(
                    <CurrentStoryPoint
                        dataModalAnimation={dataModalAnimation}
                    />
                )
                .toJSON()
            expect(tree).toMatchSnapshot()
        })

        it('should show the options', () => {
            const tree = renderSnapshot.create(
                <CurrentStoryPoint dataModalAnimation={dataModalAnimation} />
            )

            const instance = tree.getInstance()
            instance.showOptions()
            expect(store.getState().modalVisibility).toEqual(true)
        })

        it('should update the state', () => {
            const tree = renderSnapshot.create(
                <CurrentStoryPoint dataModalAnimation={dataModalAnimation} />
            )

            const instance = tree.getInstance()
            instance.updateState()
            expect(store.getState()).toEqual({
                isSmallScreen: false,
                modalVisibility: true,
                pointEstimation: 5,
            })

            store.dispatch(updateModalVisibility(false))
            expect(store.getState()).toEqual({
                isSmallScreen: false,
                modalVisibility: false,
                pointEstimation: 5,
            })
        })

        it('should unsubscribe from the store when unmounting', () => {
            const tree = renderSnapshot.create(
                <CurrentStoryPoint dataModalAnimation={dataModalAnimation} />
            )

            const instance = tree.getInstance()
            instance.setState({ unsubscribe: jest.fn() })
            instance.componentWillUnmount()
            expect(instance.state.unsubscribe.mock.calls.length).toBe(1)
        })

        it('should accept becoming the responder', () => {
            const tree = renderSnapshot.create(
                <CurrentStoryPoint dataModalAnimation={dataModalAnimation} />
            )

            const instance = tree.getInstance()
            const isResponder = instance.setResponder()
            expect(isResponder).toEqual(true)
        })
    })
})
