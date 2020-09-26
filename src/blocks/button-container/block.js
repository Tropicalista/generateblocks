/**
 * Block: Button Container
 */

//import './style.scss';
import './editor.scss';

import editButtonContainer from './edit';
import saveButtonContainer from './save';
import blockAttributes from './attributes';
import getIcon from '../../utils/get-icon';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

/**
 * Register our Button Container block.
 *
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'generateblocks/button-container', {
	title: __( 'Buttons', 'generateblocks' ),
	description: __( 'Drive conversions with beautiful buttons.', 'generateblocks' ),
	icon: getIcon( 'button' ),
	category: 'generateblocks',
	keywords: [
		__( 'button' ),
		__( 'buttons' ),
		__( 'generate' ),
	],
	attributes: blockAttributes,
	supports: {
		anchor: true,
		className: false,
	},
	edit: editButtonContainer,
	save: saveButtonContainer,
	deprecated: [
		{
			attributes: blockAttributes,
			supports: {
				anchor: false,
				className: false,
				customClassName: false,
			},
			migrate( attributes ) {
				const oldClasses = ( attributes.cssClasses ? attributes.cssClasses : undefined );
				const oldAnchor = ( attributes.elementId ? attributes.elementId : undefined );

				return {
					...attributes,
					className: oldClasses ? oldClasses : undefined,
					anchor: oldAnchor ? oldAnchor : undefined,
				};
			},
			save: saveButtonContainer,
		},
	],
} );
