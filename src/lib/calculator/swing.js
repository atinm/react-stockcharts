"use strict";

import { slidingWindow } from "../utils";
import { Swing as defaultOptions } from "./defaultOptionsForComputation";

export default function() {
	let options = defaultOptions;

	function calculator(data) {
		const { sourcePath } = options;

		const source = sourcePath === "high/low"
			? d => { return { date: d.date, high: d.high, low: d.low }; }
			: d => { return { date: d.date, high: d.close, low: d.close }; };

		const algo = slidingWindow()
			.windowSize(2)
			.source(source)
			.accumulator(([prev, curr]) => {
				if (curr.high > prev.high && curr.low > prev.low) {
					return { date: curr.date, swing: 1 };
				} else if (curr.high < prev.high && curr.low < prev.low) {
					return { date: curr.date, swing: -1 };
				} else {
					return { date: curr.date, swing: 0 };
				}
			});

		return algo(data);
	}
	calculator.undefinedLength = function() {
		return 1;
	};
	calculator.options = function(x) {
		if (!arguments.length) {
			return options;
		}
		options = { ...defaultOptions, ...x };
		return calculator;
	};

	return calculator;
}
