/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';
import {
	PanelBody,
	TextControl,
	Placeholder,
	SelectControl,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import { LayoutControls, MediaPlaceholder } from '../../../components';

export const name = 'amp/amp-ooyala-player';

export const settings = {
	title: __( 'AMP Ooyala Player', 'amp' ),
	description: __( 'Displays an Ooyala video.', 'amp' ),
	category: 'embed',
	icon: 'embed-generic',
	keywords: [
		__( 'Embed', 'amp' ),
		__( 'Ooyala video', 'amp' ),
	],

	// @todo Add data-config attribute?
	attributes: {
		dataEmbedCode: {
			source: 'attribute',
			selector: 'amp-ooyala-player',
			attribute: 'data-embedcode',
		},
		dataPlayerId: {
			source: 'attribute',
			selector: 'amp-ooyala-player',
			attribute: 'data-playerid',
		},
		dataPcode: {
			source: 'attribute',
			selector: 'amp-ooyala-player',
			attribute: 'data-pcode',
		},
		dataPlayerVersion: {
			default: 'v3',
			source: 'attribute',
			selector: 'amp-ooyala-player',
			attribute: 'data-playerversion',
		},
		ampLayout: {
			default: 'responsive',
			source: 'attribute',
			selector: 'amp-ooyala-player',
			attribute: 'layout',
		},
		width: {
			default: 600,
			source: 'attribute',
			selector: 'amp-ooyala-player',
			attribute: 'width',
		},
		height: {
			default: 400,
			source: 'attribute',
			selector: 'amp-ooyala-player',
			attribute: 'height',
		},
	},

	edit( props ) {
		const { attributes, setAttributes } = props;
		const { dataEmbedCode, dataPlayerId, dataPcode, dataPlayerVersion } = attributes;
		const ampLayoutOptions = [
			{ value: 'responsive', label: __( 'Responsive', 'amp' ) },
			{ value: 'fixed', label: __( 'Fixed', 'amp' ) },
			{ value: 'fill', label: __( 'Fill', 'amp' ) },
			{ value: 'flex-item', label: __( 'Flex-item', 'amp' ) },

		];
		let url = false;
		if ( dataEmbedCode && dataPlayerId && dataPcode ) {
			url = `http://cf.c.ooyala.com/${ dataEmbedCode }`;
		}
		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Ooyala settings', 'amp' ) }>
						<TextControl
							label={ __( 'Video embed code (required)', 'amp' ) }
							value={ dataEmbedCode }
							onChange={ ( value ) => ( setAttributes( { dataEmbedCode: value } ) ) }
						/>
						<TextControl
							label={ __( 'Player ID (required)', 'amp' ) }
							value={ dataPlayerId }
							onChange={ ( value ) => ( setAttributes( { dataPlayerId: value } ) ) }
						/>
						<TextControl
							label={ __( 'Provider code for the account (required)', 'amp' ) }
							value={ dataPcode }
							onChange={ ( value ) => ( setAttributes( { dataPcode: value } ) ) }
						/>
						<SelectControl
							label={ __( 'Player version', 'amp' ) }
							value={ dataPlayerVersion }
							options={ [
								{ value: 'v3', label: __( 'V3', 'amp' ) },
								{ value: 'v4', label: __( 'V4', 'amp' ) },
							] }
							onChange={ ( value ) => ( setAttributes( { dataPlayerVersion: value } ) ) }
						/>
						<LayoutControls { ...props } ampLayoutOptions={ ampLayoutOptions } />
					</PanelBody>
				</InspectorControls>
				{ url && <MediaPlaceholder name={ __( 'Ooyala Player', 'amp' ) } url={ url } /> }
				{ ! url && (
					<Placeholder label={ __( 'Ooyala Player', 'amp' ) }>
						<p>{ __( 'Add required data to use the block.', 'amp' ) }</p>
					</Placeholder>
				) }
			</Fragment>
		);
	},

	save( { attributes } ) {
		const { dataEmbedCode, dataPlayerId, dataPcode, dataPlayerVersion, ampLayout, height, width } = attributes;

		const ooyalaProps = {
			layout: ampLayout,
			height,
			'data-embedcode': dataEmbedCode,
			'data-playerid': dataPlayerId,
			'data-pcode': dataPcode,
			'data-playerversion': dataPlayerVersion,
		};
		if ( 'fixed-height' !== ampLayout && width ) {
			ooyalaProps.width = width;
		}
		return (
			<amp-ooyala-player { ...ooyalaProps }></amp-ooyala-player>
		);
	},
};
