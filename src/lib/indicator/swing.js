"use strict";

import { rebind, merge } from "../utils";

import { swing } from "../calculator";

import baseIndicator from "./baseIndicator";

const ALGORITHM_TYPE = "Swing";

export default function() {

	const base = baseIndicator()
		.type(ALGORITHM_TYPE);

	const underlyingAlgorithm = swing();

	const mergedAlgorithm = merge()
		.algorithm(underlyingAlgorithm)
		.merge((datum, indicator) => {
			datum.swing = indicator;
		});

	const indicator = function(data, options = { merge: true }) {
		if (options.merge) {
			return mergedAlgorithm(data);
		}
		return underlyingAlgorithm(data);
	};
	rebind(indicator, base, "id", "accessor", "stroke", "fill", "echo", "type");
	rebind(indicator, underlyingAlgorithm, "options");
	rebind(indicator, mergedAlgorithm, "merge", "skipUndefined");

	return indicator;
}
