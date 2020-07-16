import { defineFeature, loadFeature } from 'jest-cucumber'
import React from 'react'
import renderSnapshot from 'react-test-renderer'

import EstimationPoint from '../../src/components/EstimationPoint'
import store from '../../src/redux/store'
import { updateModalVisibility, updatePointEstimation } from '../../src/redux/actions'

const feature = loadFeature('./__tests__/bdd/SelectEstimationPoint.feature')

defineFeature(feature, test => {
    test('Selecting estimation point', ({ given, when, then }) => {

        let instance
        const close = jest.fn(() => { store.dispatch(updateModalVisibility(false)) })

        given("The current value of the points is 5 and I have the modal open", () => {

            store.dispatch(updatePointEstimation(5))
            store.dispatch(updateModalVisibility(true))

            const tree = renderSnapshot.create(
                <EstimationPoint
                    point={21}
                    time="3 days"
                    selected={false}
                    close={close}
                />
            )

            instance = tree.getInstance()
        })

        when('I click in 21 point option', () => {
            instance.selectPoint()
        })

        then('The modal should be closed', () => {
            expect(close.mock.calls.length).toBe(1)
        })

        then('updateModalVisibility in the redux state should be false', () => {
            expect(store.getState().modalVisibility).toEqual(false)
        })

        then('The current value for points should will be 21', () => {
            expect(store.getState().pointEstimation).toEqual(21)
        })
    })
})