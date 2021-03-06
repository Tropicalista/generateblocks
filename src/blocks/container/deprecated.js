/**
 * External dependencies
 */
import classnames from 'classnames';
import Element from '../../components/element';
import blockAttributes from './attributes';

const {
	applyFilters,
} = wp.hooks;

const {
	InnerBlocks,
} = wp.blockEditor;

const deprecated = [
	// v1 of container block. Deprecated the gb-grid-column wrapper in save component.
	{
		attributes: blockAttributes,
		supports: {
			align: false,
			anchor: false,
			className: false,
			customClassName: false,
		},
		migrate( attributes ) {
			const oldClasses = attributes.cssClasses ? attributes.cssClasses : attributes.className;
			const oldAnchor = attributes.elementId ? attributes.elementId : attributes.anchor;

			return {
				...attributes,
				className: oldClasses,
				anchor: oldAnchor,
				cssClasses: '',
				elementId: '',
			};
		},
		save( { attributes } ) {
			const {
				uniqueId,
				tagName,
				elementId,
				cssClasses,
				isGrid,
				align,
			} = attributes;

			const ConditionalWrap = ( { condition, wrap, children } ) => condition ? wrap( children ) : children;

			let htmlAttributes = {
				className: classnames( {
					'gb-container': true,
					[ `gb-container-${ uniqueId }` ]: true,
					[ `${ cssClasses }` ]: '' !== cssClasses,
					[ `align${ align }` ]: !! align && ! isGrid,
				} ),
				id: elementId ? elementId : null,
			};

			htmlAttributes = applyFilters( 'generateblocks.frontend.htmlAttributes', htmlAttributes, 'generateblocks/container', attributes );

			return (
				<ConditionalWrap
					condition={ isGrid }
					wrap={ children => <div className={ classnames( {
						'gb-grid-column': true,
						[ `gb-grid-column-${ uniqueId }` ]: true,
					} ) }>{ children }</div> }
				>
					<Element
						tagName={ tagName }
						htmlAttrs={ htmlAttributes }
					>
						{ applyFilters( 'generateblocks.frontend.insideContainer', '', attributes ) }
						<div className={ classnames( {
							'gb-inside-container': true,
						} ) }>
							<InnerBlocks.Content />
						</div>
					</Element>
				</ConditionalWrap>
			);
		},
	},
];

export default deprecated;
