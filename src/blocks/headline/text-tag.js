const { createElement } = wp.element;
const { applyFilters } = wp.hooks;

export default function Text( { attributes, tagName, id, className, style, children } ) {
	if ( ! id ) {
		id = null;
	}

	const htmlAttributes = {
		id: id,
		className: className,
		style: style,
	};

	return createElement(
		tagName,
		applyFilters( 'generateblocks.frontend.htmlAttributes', htmlAttributes, 'generateblocks/headline', attributes ),
		children
	);
}
