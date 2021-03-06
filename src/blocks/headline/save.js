/**
 * Block: Headline
 */

import classnames from 'classnames';
import sanitizeSVG from '../../utils/sanitize-svg';
import Element from '../../components/element';

const {
	RichText,
} = wp.blockEditor;

const {
	applyFilters,
} = wp.hooks;

export default ( { attributes } ) => {
	const {
		uniqueId,
		className,
		anchor,
		element,
		content,
		icon,
		removeText,
		ariaLabel,
	} = attributes;

	let htmlAttributes = {
		className: classnames( {
			'gb-headline': true,
			[ `gb-headline-${ uniqueId }` ]: true,
			'gb-headline-text': ! icon,
			[ className ]: undefined !== className,
		} ),
		id: anchor ? anchor : null,
	};

	htmlAttributes = applyFilters( 'generateblocks.frontend.htmlAttributes', htmlAttributes, 'generateblocks/headline', attributes );

	return (
		<Element
			tagName={ element }
			htmlAttrs={ htmlAttributes }
		>
			{ !! icon &&
				<span
					className="gb-icon"
					aria-label={ !! removeText && !! ariaLabel ? ariaLabel : undefined }
					dangerouslySetInnerHTML={ { __html: sanitizeSVG( icon ) } }
				/>
			}

			{ ! removeText &&
				<RichText.Content
					value={ content }
					tagName={ !! icon ? 'span' : null }
					className={ !! icon ? 'gb-headline-text' : null }
				/>
			}
		</Element>
	);
};
