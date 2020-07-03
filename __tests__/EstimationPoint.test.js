import React from 'react'
import renderSnapshot from 'react-test-renderer'

import EstimationPoint from '../src/components/EstimationPoint'
import store from '../src/redux/store'
import { setResponsiveEvent } from '../src/redux/actions'

describe('EstimationPoint component', () => {
    describe('EstimationPoint snapshot test', () => {
        it('should render correctly', () => {
            const tree = renderSnapshot
                .create(
                    <EstimationPoint
                        point={3}
                        time="1 Day"
                        selected={true}
                        close={() => {}}
                    />
                )
                .toJSON()
            expect(tree).toMatchSnapshot()
        })

        it('Text inside the button should be 3', () => {
            const tree = renderSnapshot
                .create(
                    <EstimationPoint
                        point={3}
                        time="1 Day"
                        selected={true}
                        close={() => {}}
                    />
                )
                .toJSON()
        })

        it('should update the state', () => {
            const tree = renderSnapshot.create(
                <EstimationPoint
                    point={3}
                    time="1 Day"
                    selected={true}
                    close={() => {}}
                />
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
                <EstimationPoint
                    point={3}
                    time="1 Day"
                    selected={true}
                    close={() => {}}
                />
            )

            const instance = tree.getInstance()
            instance.setState({ unsubscribe: jest.fn() })
            instance.componentWillUnmount()
            expect(instance.state.unsubscribe.mock.calls.length).toBe(1)
        })

        it('should select the story point', () => {
            const tree = renderSnapshot.create(
                <EstimationPoint
                    point={3}
                    time="1 Day"
                    selected={true}
                    close={() => {}}
                />
            )

            const instance = tree.getInstance()
            instance.selectPoint()
            expect(store.getState().pointEstimation).toEqual(3)
        })
    })
})
