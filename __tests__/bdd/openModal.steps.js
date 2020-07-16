import { defineFeature, loadFeature } from 'jest-cucumber';

import React from 'react'
import renderSnapshot from 'react-test-renderer'

import CurrentStoryPoint from '../../src/components/CurrentStoryPoint'
import store from '../../src/redux/store'

const feature = loadFeature('./__tests__/bdd/OpenModal.feature');

defineFeature(feature, test => {
    test('Opening the modal', ({ given, when, then }) => {

        let instance;

        given("I have a button for open a modal", () => {

            const tree = renderSnapshot.create(
                <CurrentStoryPoint  />
            )

            instance = tree.getInstance()
        });

        when('I click the button', () => {
            instance.showOptions()
        });

        then('updateModalVisibility in the redux state should be true', () => {
            expect(store.getState().modalVisibility).toEqual(true)
        });
    });
});