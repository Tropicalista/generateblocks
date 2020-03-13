/**
 * External dependencies
 */
import classnames from 'classnames';
import './editor.scss';
import getIcon from '../../utils/get-icon';

/**
 * WordPress dependencies
 */
const { __, _x, sprintf } = wp.i18n;
const { Component, Fragment } = wp.element;
const { BaseControl, Button, Tooltip, ButtonGroup } = wp.components;

class DimensionsControl extends Component {

	constructor( props ) {
		super( ...arguments );
		this.onChangeTop = this.onChangeTop.bind( this );
		this.onChangeRight = this.onChangeRight.bind( this );
		this.onChangeBottom = this.onChangeBottom.bind( this );
		this.onChangeLeft = this.onChangeLeft.bind( this );
		this.onChangeAll = this.onChangeAll.bind( this );
		this.syncUnits = this.syncUnits.bind( this );
		this.onChangeUnits = this.onChangeUnits.bind( this );
	}

	onReset( type ) {
		this.props.setAttributes( { [ this.props[ type ] ]: '' } );
	}

	onChangeTop( value ) {
		this.props.setAttributes( { [ this.props[ 'attrTop' ] ]: value } );
	}

	onChangeRight( value ) {
		this.props.setAttributes( { [ this.props[ 'attrRight' ] ]: value } );
	}

	onChangeBottom( value ) {
		this.props.setAttributes( { [ this.props[ 'attrBottom' ] ]: value } );
	}

	onChangeLeft( value ) {
		this.props.setAttributes( { [ this.props[ 'attrLeft' ] ]: value } );
	}

	onChangeAll( value ) {
		this.props.setAttributes( { [ this.props[ 'attrTop' ] ]: value, [ this.props[ 'attrRight' ] ]: value, [ this.props[ 'attrBottom' ] ]: value, [ this.props[ 'attrLeft' ] ]: value } );
	}

	syncUnits( value ) {
		var numbers = [ this.props.attributes[ this.props.attrTop ], this.props.attributes[ this.props.attrRight ], this.props.attributes[ this.props.attrBottom ], this.props.attributes[ this.props.attrLeft ]];

		const syncValue = Math.max.apply( null, numbers );

		this.props.setAttributes( {
			[ this.props[ 'attrSyncUnits' ] ]: ! this.props.attributes[ this.props.attrSyncUnits ],
			[ this.props[ 'attrTop' ] ]: syncValue.toString(), [ this.props[ 'attrRight' ] ]: syncValue.toString(), [ this.props[ 'attrBottom' ] ]: syncValue.toString(), [ this.props[ 'attrLeft' ] ]: syncValue.toString()
		} );
	}

	onChangeUnits( value ) {
		this.props.setAttributes( { [ this.props[ 'attrUnit' ] ]: value } );
	}

	render() {

		const {
			attributes,
			label = __( 'Margin', 'generateblocks' ),
			onChange,
			setAttributes,
			type = 'margin',
			unit,
			units = true,
			attrTop,
			attrRight,
			attrBottom,
			attrLeft,
			attrSyncUnits,
			attrUnit,
			labelTop = __( 'Top', 'generateblocks' ),
			labelRight = __( 'Right', 'generateblocks' ),
			labelBottom = __( 'Bottom', 'generateblocks' ),
			labelLeft = __( 'Left', 'generateblocks' ),
			displayUnit,
		} = this.props;

		const classes = classnames(
			'components-base-control',
			'components-gblocks-dimensions-control',
		);

		const onChangeTopValue = ( event ) => {
			var newValue = event.target.value;

			if ( '' === newValue ) {
				this.onReset( 'attrTop' );
				return;
			}

			if ( this.props.attributes[ this.props.attrSyncUnits ] ) {
				this.onChangeAll( newValue );
			} else {
				this.onChangeTop( newValue );
			}
		};

		const onChangeRightValue = ( event ) => {
			var newValue = event.target.value;

			if ( '' === newValue ) {
				this.onReset( 'attrRight' );
				return;
			}

			if ( this.props.attributes[ this.props.attrSyncUnits ] ) {
				this.onChangeAll( newValue );
			} else {
				this.onChangeRight( newValue );
			}
		};

		const onChangeBottomValue = ( event ) => {
			var newValue = event.target.value;

			if ( '' === newValue ) {
				this.onReset( 'attrBottom' );
				return;
			}

			if ( this.props.attributes[ this.props.attrSyncUnits ] ) {
				this.onChangeAll( newValue );
			} else {
				this.onChangeBottom( newValue );
			}
		};

		const onChangeLeftValue = ( event ) => {
			var newValue = event.target.value;

			if ( '' === newValue ) {
				this.onReset( 'attrLeft' );
				return;
			}

			if ( this.props.attributes[ this.props.attrSyncUnits ] ) {
				this.onChangeAll( newValue );
			} else {
				this.onChangeLeft( newValue );
			}
		};

		let unitSizes = [
			{
				name: _x( 'Pixel', 'A size unit for CSS markup', 'generateblocks' ),
				unitValue: 'px',
			},
			{
				name: _x( 'Em', 'A size unit for CSS markup', 'generateblocks' ),
				unitValue: 'em',
			},
			{
				name: _x( 'Percentage', 'A size unit for CSS markup', 'generateblocks' ),
				unitValue: '%',
			},
		];

		return (
			<Fragment>
				<div className={ classes }>
					<div className="components-gblocks-dimensions-control__header">
						<div className="components-gblocks-dimensions-control__label">
							{ label }
						</div>

						{ ( typeof attributes[ attrUnit ] !== 'undefined' ) ?
							<div className="components-gblocks-control__units">
								<ButtonGroup className="components-gblocks-dimensions-control__units" aria-label={ __( 'Select Units', 'generateblocks' ) }>
									{ unitSizes.map( ( unit ) =>
										/* translators: %s: values associated with CSS syntax, 'Pixel', 'Em', 'Percentage' */
										<Tooltip text={ sprintf( __( '%s Units', 'generateblocks' ), unit.name ) } key={ unit.unitValue }>
											<Button
												key={ unit.unitValue }
												className={ 'components-gblocks-dimensions-control__units--' + unit.name }
												isSmall
												isPrimary={ attributes[ attrUnit ] === unit.unitValue }
												aria-pressed={ attributes[ attrUnit ] === unit.unitValue }
												/* translators: %s: values associated with CSS syntax, 'Pixel', 'Em', 'Percentage' */
												aria-label={ sprintf( __( '%s Units', 'generateblocks' ), unit.name ) }
												onClick={ () => this.onChangeUnits( unit.unitValue ) }
											>
												{ unit.unitValue }
											</Button>
										</Tooltip>
									) }
								</ButtonGroup>
							</div> : null
						}

						{ ( typeof displayUnit !== 'undefined' ) &&
							<div className="components-gblocks-control__units">
								<Tooltip text={ __( 'Pixel Units' ) } key={ 'px-unit' }>
									<Button
										key={ 'px-unit' }
										isSmall
										isPrimary={ true }
										/* translators: %s: values associated with CSS syntax, 'Pixel', 'Em', 'Percentage' */
										aria-label={ __( 'Pixel Units' ) }
									>
										{ displayUnit }
									</Button>
								</Tooltip>
							</div>
						}
					</div>

					<div className="components-gblocks-dimensions-control__inputs">
						<input
							className="components-gblocks-dimensions-control__number"
							type="number"
							onChange={ onChangeTopValue }
							aria-label={ sprintf( __( '%s Top', 'generateblocks' ), label ) }
							value={ attributes[ attrTop ] ? attributes[ attrTop ] : '' }
							min={ type == 'padding' ? 0 : undefined }
							data-attribute={ type }
						/>
						<input
							className="components-gblocks-dimensions-control__number"
							type="number"
							onChange={ onChangeRightValue }
							aria-label={ sprintf( __( '%s Right', 'generateblocks' ), label ) }
							value={ attributes[ attrRight ] ? attributes[ attrRight ] : '' }
							min={ type == 'padding' ? 0 : undefined }
							data-attribute={ type }
						/>
						<input
							className="components-gblocks-dimensions-control__number"
							type="number"
							onChange={ onChangeBottomValue }
							aria-label={ sprintf( __( '%s Bottom', 'generateblocks' ), label ) }
							value={ attributes[ attrBottom ] ? attributes[ attrBottom ] : '' }
							min={ type == 'padding' ? 0 : undefined }
							data-attribute={ type }
						/>
						<input
							className="components-gblocks-dimensions-control__number"
							type="number"
							onChange={ onChangeLeftValue }
							aria-label={ sprintf( __( '%s Left', 'generateblocks' ), label ) }
							value={ attributes[ attrLeft ] ? attributes[ attrLeft ] : '' }
							min={ type == 'padding' ? 0 : undefined }
							data-attribute={ type }
						/>
						<Tooltip text={ !! attributes[ attrSyncUnits ] ? __( 'Unsync', 'generateblocks' ) : __( 'Sync', 'generateblocks' ) } >
							<Button
								className="components-gblocks-dimensions-control_sync"
								aria-label={ __( 'Sync Units', 'generateblocks' ) }
								isPrimary={ attributes[ attrSyncUnits ] ? attributes[ attrSyncUnits ] : false }
								aria-pressed={ attributes[ attrSyncUnits ] ? attributes[ attrSyncUnits ] : false }
								onClick={ ( value ) => this.syncUnits( value, '' ) }
								isSmall
							>
								{ !! attributes[ attrSyncUnits ] ? getIcon( 'sync' ) : getIcon( 'sync' ) }
							</Button>
						</Tooltip>
					</div>

					<div className='components-gblocks-dimensions-control__input-labels'>
						<span className='components-gblocks-dimensions-control__number-label'>{  labelTop }</span>
						<span className='components-gblocks-dimensions-control__number-label'>{  labelRight }</span>
						<span className='components-gblocks-dimensions-control__number-label'>{  labelBottom }</span>
						<span className='components-gblocks-dimensions-control__number-label'>{  labelLeft }</span>
						<span className='components-gblocks-dimensions-control__number-label'></span>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default DimensionsControl;
