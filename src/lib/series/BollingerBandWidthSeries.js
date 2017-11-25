"use strict";

import React, { Component } from "react";
import PropTypes from "prop-types";
import LineSeries from "./LineSeries";
import StraightLine from "./StraightLine";

class BollingerBandWidthSeries extends Component {
	render() {
		const { className, stroke, opacity } = this.props;
		const { yAccessor } = this.props;

		return (
			<g className={className}>
				<LineSeries
					className={className}
					yAccessor={yAccessor}
					stroke={stroke.line} fill="none" />
			</g>
		);
	}
}

BollingerBandWidthSeries.propTypes = {
	className: PropTypes.string,
	yAccessor: PropTypes.func.isRequired,
	stroke: PropTypes.shape({
		line: PropTypes.string.isRequired,
	}).isRequired,
};

BollingerBandWidthSeries.defaultProps = {
	className: "react-stockcharts-bollinger-band-width-series",
	stroke: {
		line: "#000000"
	},
};

export default BollingerBandWidthSeries;
