/**
 * Internal dependencies
 */
import { completeWizard, cleanUpSettings, moveToTemplateModeScreen, moveToTechnicalScreen, clickNextButton } from '../../utils/onboarding-wizard-utils';

/**
 * @see https://github.com/ampproject/amp-wp/issues/5024
 */
describe( 'Template mode revisit', () => {
	beforeAll( async () => {
		await completeWizard( { technical: true, mode: 'standard' } );
	} );

	afterAll( async () => {
		await cleanUpSettings();
	} );

	it( 'has selected option and allows moving forward when technical question is unchanged', async () => {
		await moveToTemplateModeScreen( { technical: true } );

		await expect( page ).not.toMatchElement( '.amp-info' ); // 'Previously selected' element.
		await expect( page ).toMatchElement( '#template-mode-standard-container input[type="radio"]:checked' );
		await expect( page ).toMatchElement( '#next-button:not(:disabled)' );
	} );

	it( 'has no selected option, "currently" selected, and disabled button when technical question has changed', async () => {
		await moveToTechnicalScreen();

		await expect( page ).toClick( '#technical-background-disable' );
		await clickNextButton();

		await expect( page ).toMatchElement( '.amp-info' ); // 'Previously selected' element.
		await expect( page ).not.toMatchElement( '.template-mode-selection input[type="radio"]:checked' );
		await expect( page ).toMatchElement( '#next-button:disabled' );
	} );
} );
