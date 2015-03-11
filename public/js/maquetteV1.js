$(function(){
	var gauge1 = c3.generate({
		bindto: '#gauge1',
		data: {
			columns: [
				['data', 61]
			],
			type: 'gauge'
		},
		gauge: {
	//        label: {
	//            format: function(value, ratio) {
	//                return value;
	//            },
	//            show: false // to turn off the min/max labels.
	//        },
	//    min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
	//    max: 100, // 100 is default
	//    units: ' %',
	//    width: 39 // for adjusting arc thickness
		},
		color: {
			pattern: ['#60B044', '#F6C600', '#F97600', '#FF0000'], // the three color levels for the percentage values.
			threshold: {
	//            unit: 'value', // percentage is default
	//            max: 200, // 100 is default
				values: [30, 60, 90, 100]
			}
		},
		size: {
			height: 180
		},
		tooltip : {
			show : false
		}
	});
});

$(function(){
	var gauge1 = c3.generate({
		bindto: '#gauge2',
		data: {
			columns: [
				['data', 95]
			],
			type: 'gauge'
		},
		gauge: {
	//        label: {
	//            format: function(value, ratio) {
	//                return value;
	//            },
	//            show: false // to turn off the min/max labels.
	//        },
	//    min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
	//    max: 100, // 100 is default
	//    units: ' %',
	//    width: 39 // for adjusting arc thickness
		},
		color: {
			pattern: ['#60B044', '#F6C600', '#F97600', '#FF0000'], // the three color levels for the percentage values.
			threshold: {
	//            unit: 'value', // percentage is default
	//            max: 200, // 100 is default
				values: [30, 60, 90, 100]
			}
		},
		size: {
			height: 180
		},
		tooltip : {
			show : false
		}
	});
});


$(function(){
	var gauge1 = c3.generate({
		bindto: '#gauge3',
		data: {
			columns: [
				['data', 18]
			],
			type: 'gauge'
		},
		gauge: {
	//        label: {
	//            format: function(value, ratio) {
	//                return value;
	//            },
	//            show: false // to turn off the min/max labels.
	//        },
	//    min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
	//    max: 100, // 100 is default
	//    units: ' %',
	//    width: 39 // for adjusting arc thickness
		},
		color: {
			pattern: ['#60B044', '#F6C600', '#F97600', '#FF0000'], // the three color levels for the percentage values.
			threshold: {
	//            unit: 'value', // percentage is default
	//            max: 200, // 100 is default
				values: [30, 60, 90, 100]
			}
		},
		size: {
			height: 180
		},
		tooltip : {
			show : false
		}
	});
});