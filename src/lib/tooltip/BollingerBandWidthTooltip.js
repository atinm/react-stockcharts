"use strict";

import { format } from "d3-format";
import React, { Component } from "react";
import PropTypes from "prop-types";
import displayValuesFor from "./displayValuesFor";
import GenericChartComponent from "../GenericChartComponent";

import { isDefined, functor } from "../utils";
import ToolTipText from "./ToolTipText";
import ToolTipTSpanLabel from "./ToolTipTSpanLabel";

class BollingerBandWidthTooltip extends Component {
	constructor(props) {
		super(props);
		this.renderSVG = this.renderSVG.bind(this);
	}
	renderSVG(moreProps) {
		const { onClick, fontFamily, fontSize, yAccessor, displayFormat, className } = this.props;
		const { options, labelFill, textFill } = this.props;
		const { displayValuesFor } = this.props;
		const { chartConfig: { width, height } } = moreProps;

		const currentItem = displayValuesFor(this.props, moreProps);
		const bollingerBandWidth = isDefined(currentItem) && yAccessor(currentItem);
		const value = (bollingerBandWidth && displayFormat(bollingerBandWidth)) || "n/a";

		const { origin: originProp } = this.props;
		const origin = functor(originProp);
		const [x, y] = origin(width, height);

		const { sourcePath, windowSize, multiplier, movingAverageType } = options;
		const tooltipLabel = `BBWidth(${sourcePath}, ${windowSize}, ${multiplier}, ${movingAverageType}): `;
		return (
			<g transform={`translate(${ x }, ${ y })`}
				className={this.props.className} onClick={onClick}>
				<ToolTipText x={0} y={0}
					fontFamily={this.props.fontFamily} fontSize={this.props.fontSize}>
					<ToolTipTSpanLabel fill={labelFill}>{tooltipLabel}</ToolTipTSpanLabel>
					<tspan fill={textFill}>{value}</tspan>
				</ToolTipText>
			</g>
		);
	}
	render() {
		return <GenericChartComponent
			clip={false}
			svgDraw={this.renderSVG}
			drawOn={["mousemove"]}
		/>;
	}
}

BollingerBandWidthTooltip.propTypes = {
	origin: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.func
	]).isRequired,
	options: PropTypes.shape({
		windowSize: PropTypes.number.isRequired,
	}).isRequired,
	className: PropTypes.string,
	fontFamily: PropTypes.string,
	fontSize: PropTypes.number,
	onClick: PropTypes.func,
	yAccessor: PropTypes.func.isRequired,
	displayFormat: PropTypes.func.isRequired,
	displayValuesFor: PropTypes.func,
	textFill: PropTypes.string,
	labelFill: PropTypes.string,
};

BollingerBandWidthTooltip.defaultProps = {
	displayFormat: format(".2f"),
	displayValuesFor: displayValuesFor,
	origin: [0, 0],
	className: "react-stockcharts-tooltip",
};

export default BollingerBandWidthTooltip;