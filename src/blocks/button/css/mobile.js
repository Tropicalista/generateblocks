/* eslint-disable quotes */
import buildCSS from '../../../utils/build-css';
import valueWithUnit from '../../../utils/value-with-unit';

const { Component } = wp.element;
const { applyFilters } = wp.hooks;

export default class MobileCSS extends Component {
	render() {
		const {
			attributes,
		} = this.props;

		const {
			url,
			uniqueId,
			removeText,
			letterSpacingMobile,
			fontSizeMobile,
			fontSizeUnit,
			marginTopMobile,
			marginRightMobile,
			marginBottomMobile,
			marginLeftMobile,
			marginUnit,
			paddingTopMobile,
			paddingRightMobile,
			paddingBottomMobile,
			paddingLeftMobile,
			paddingUnit,
			borderSizeTopMobile,
			borderSizeRightMobile,
			borderSizeBottomMobile,
			borderSizeLeftMobile,
			borderRadiusTopRightMobile,
			borderRadiusBottomRightMobile,
			borderRadiusBottomLeftMobile,
			borderRadiusTopLeftMobile,
			borderRadiusUnit,
			iconPaddingTopMobile,
			iconPaddingRightMobile,
			iconPaddingBottomMobile,
			iconPaddingLeftMobile,
			iconPaddingUnit,
			iconSizeMobile,
			iconSizeUnit,
		} = attributes;

		let selector = 'a.gb-button-' + uniqueId;

		if ( ! url ) {
			selector = '.gb-button-' + uniqueId;
		}

		let cssObj = [];

		cssObj[ '.block-editor-block-list__block ' + selector ] = [ {
			'padding-top': valueWithUnit( paddingTopMobile, paddingUnit ),
			'padding-right': valueWithUnit( paddingRightMobile, paddingUnit ),
			'padding-bottom': valueWithUnit( paddingBottomMobile, paddingUnit ),
			'padding-left': valueWithUnit( paddingLeftMobile, paddingUnit ),
			'border-top-left-radius': valueWithUnit( borderRadiusTopLeftMobile, borderRadiusUnit ),
			'border-top-right-radius': valueWithUnit( borderRadiusTopRightMobile, borderRadiusUnit ),
			'border-bottom-right-radius': valueWithUnit( borderRadiusBottomRightMobile, borderRadiusUnit ),
			'border-bottom-left-radius': valueWithUnit( borderRadiusBottomLeftMobile, borderRadiusUnit ),
			'font-size': valueWithUnit( fontSizeMobile, fontSizeUnit ),
			'letter-spacing': valueWithUnit( letterSpacingMobile, 'em' ),
			'margin-top': valueWithUnit( marginTopMobile, marginUnit ),
			'margin-right': valueWithUnit( marginRightMobile, marginUnit ),
			'margin-bottom': valueWithUnit( marginBottomMobile, marginUnit ),
			'margin-left': valueWithUnit( marginLeftMobile, marginUnit ),
		} ];

		if ( borderSizeTopMobile || borderSizeRightMobile || borderSizeBottomMobile || borderSizeLeftMobile ) {
			cssObj[ '.block-editor-block-list__block ' + selector ].push( {
				'border-top-width': valueWithUnit( borderSizeTopMobile, 'px' ),
				'border-right-width': valueWithUnit( borderSizeRightMobile, 'px' ),
				'border-bottom-width': valueWithUnit( borderSizeBottomMobile, 'px' ),
				'border-left-width': valueWithUnit( borderSizeLeftMobile, 'px' ),
				'border-style': 'solid',
			} );
		}

		cssObj[ '.block-editor-block-list__block ' + selector + ' .gb-icon' ] = [ {
			'padding-top': ! removeText ? valueWithUnit( iconPaddingTopMobile, iconPaddingUnit ) : false,
			'padding-right': ! removeText ? valueWithUnit( iconPaddingRightMobile, iconPaddingUnit ) : false,
			'padding-bottom': ! removeText ? valueWithUnit( iconPaddingBottomMobile, iconPaddingUnit ) : false,
			'padding-left': ! removeText ? valueWithUnit( iconPaddingLeftMobile, iconPaddingUnit ) : false,
			'font-size': valueWithUnit( iconSizeMobile, iconSizeUnit ),
		} ];

		cssObj = applyFilters( 'generateblocks.editor.mobileCSS', cssObj, this.props, 'button' );

		return (
			<style>{ buildCSS( cssObj ) }</style>
		);
	}
}
/* eslint-enable quotes */
