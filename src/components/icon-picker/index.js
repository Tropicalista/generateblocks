/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import './editor.scss';
import socialSvgs from './svgs-social';
import generalSvgs from './svgs-general';

/**
 * WordPress dependencies
 */
const {
	__
} = wp.i18n;

const {
	Component,
	Fragment,
	renderToString
} = wp.element;

const {
	compose
} = wp.compose;

const {
	BaseControl,
	SelectControl,
	ToggleControl,
	TextControl,
	Tooltip,
	Button,
	Popover,
	Dropdown,
} = wp.components;

/**
 * Typography Component
 */
class IconPicker extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {
		const {
			className,
			setAttributes,
			valueIcon,
			attrIcon,
			valueIconLocation,
			attrIconLocation,
			locationOptions,
			valueRemoveText,
			attrRemoveText,
			valueAriaLabel,
			attrAriaLabel,
		} = this.props;

		const sanitizeSVG = ( svg ) => {
			return DOMPurify.sanitize( svg, { USE_PROFILES: { svg: true, svgFilters: true } } );
		}

		return (
			<Fragment>
				<Dropdown
					contentClassName="components-icon-picker-dropdown"
					focusOnMount={ 'container' }
					renderToggle={ ( { isOpen, onToggle } ) => (
						<Tooltip text={ __( 'Choose Icon', 'flexblocks' ) }>
							<button
								type="button"
								aria-expanded={ isOpen }
								className="components-icon-picker-item"
								onClick={ onToggle }
								aria-label={ __( 'Custom color picker' ) }
							>
								<span dangerouslySetInnerHTML={ { __html: sanitizeSVG( valueIcon ) } } />
							</button>
						</Tooltip>
					) }
					renderContent={ () => (
						<div className="icon-chooser-container">
							<BaseControl className="fx-svg-html">
								<TextControl
									label={ __( 'Icon SVG HTML', 'flexblocks' ) }
									value={ valueIcon }
									onChange={ ( value ) => {
										setAttributes( {
											[ this.props[ 'attrIcon' ] ]: sanitizeSVG( value )
										} );
									} }
								/>
							</BaseControl>

							<BaseControl label={ __( 'General', 'flexblocks' ) }>
								<ul className="fx-icon-chooser">
								{
									Object.keys( generalSvgs ).map( ( svg, i ) => {
										return (
											<li key={ `editor-pblock-types-list-item-${ i }` }>
												<Tooltip text={ ( generalSvgs[ svg ]['label'] ) }>
													<Button
														isLarge
														className="editor-block-list-item-button"
														onClick={ () => {
															setAttributes( {
																[ this.props[ 'attrIcon' ] ]: renderToString( generalSvgs[ svg ]['icon'] )
															} );
														} }
													>
														<span className="editor-block-types-list__item-icon">
															{ generalSvgs[ svg ]['icon'] }
														</span>
													</Button>
												</Tooltip>
											</li>
										);
									} )
								}
								</ul>
							</BaseControl>

							<BaseControl label={ __( 'Social', 'flexblocks' ) }>
								<ul className="fx-icon-chooser">
								{
									Object.keys( socialSvgs ).map( ( svg, i ) => {
										return (
											<li key={ `editor-pblock-types-list-item-${ i }` }>
												<Tooltip text={ ( socialSvgs[ svg ]['label'] ) }>
													<Button
														isLarge
														className="editor-block-list-item-button"
														onClick={ () => {
															setAttributes( {
																[ this.props[ 'attrIcon' ] ]: renderToString( socialSvgs[ svg ]['icon'] )
															} );
														} }
													>
														<span className="editor-block-types-list__item-icon">
															{ socialSvgs[ svg ]['icon'] }
														</span>
													</Button>
												</Tooltip>
											</li>
										);
									} )
								}
								</ul>
							</BaseControl>
						</div>
					) }
				/>

				<BaseControl className="advanced-icon-controls">
					<Button
						isLarge
						className="reset-icon"
						onClick={ () => {
							setAttributes( {
								[ this.props[ 'attrIcon' ] ]: ''
							} );
						} }
					>
						<span className="editor-block-types-list__item-icon">
							{ __( 'Reset', 'flexblocks' ) }
						</span>
					</Button>
				</BaseControl>

				{ ( typeof valueIconLocation !== 'undefined' ) &&
					<SelectControl
						label={ __( 'Icon Location', 'flexblocks' ) }
						value={ valueIconLocation }
						options={ locationOptions }
						onChange={ ( value ) => {
							setAttributes( {
								[ this.props[ 'attrIconLocation' ] ]: value
							} );
						} }
					/>
				}

				{ ( typeof valueRemoveText !== 'undefined' ) &&
					<ToggleControl
						label={ __( 'Remove Text', 'flexblocks' ) }
						checked={ !! valueRemoveText }
						onChange={ ( value ) => {
							setAttributes( {
								[ this.props[ 'attrRemoveText' ] ]: value
							} );
						} }
					/>
				}

				{ typeof valueAriaLabel !== 'undefined' && !! valueRemoveText &&
					<TextControl
						label={ __( 'ARIA Label', 'flexblocks' ) }
						help={ __( 'Helpful to people using screen readers.', 'flexblocks' ) }
						value={ valueAriaLabel }
						onChange={ ( value ) => {
							setAttributes( {
								[ this.props[ 'attrAriaLabel' ] ]: value
							} );
						} }
					/>
				}
			</Fragment>
		);
	}
}

export default IconPicker;
