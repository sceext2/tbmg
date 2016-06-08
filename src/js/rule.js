/* rule.js, tbmg/src/js/
 * rules of the tbmg Game
 */
'use strict';

function check_one_move(core, o, j) {
	// get min distent for check level
	const s = core._c_size;
	let min_d = Math.sqrt(s[0] * s[0] + s[1] * s[1]);
	// check each one
	for (let i = 0; i < core._ol.length; i++) {
		const one = core._ol[i];
		// except self
		if (i == j) {
			continue;
		}
		// make d
		const d = Math.sqrt(Math.pow(o.p[0] - one.p[0], 2) + Math.pow(o.p[1] - one.p[1], 2));
		if (d < min_d) {
			min_d = d;
		}
	}
	// d to reduce ball_r
	min_d -= core.conf.ball_r;
	
	const big_r = core.conf.move_random_r;
	const small_r = core.conf.move_sum_r;
	const near_r = core.conf.move_back_r;
	
	function sum_v(r) {
		const out = [0, 0];
		for (let i = 0; i < core._ol.length; i++) {
			const one = core._ol[i];
			if (i == j) {
				continue;
			}
			// check d
			const d = Math.sqrt(Math.pow(o.p[0] - one.p[0], 2) + Math.pow(o.p[1] - one.p[1], 2));
			if (d - core.conf.ball_r <= r) {
				out[0] += one.v[0];
				out[1] += one.v[1];
			}
		}
		return out;
	}
	
	const speed_k = core.conf.move_v / 1e3;
	// check level and change speed
	if (min_d <= near_r) {
		// just back speed
		o.v[0] = - o.v[0];
		o.v[1] = - o.v[1];
	} else if (min_d <= small_r) {
		const v = sum_v(small_r);
		// make new v
		const d = core._v_to_d(v[0], v[1]);
		o.v = core._d_to_v(d, speed_k);
	} else if (min_d <= big_r) {
		const v = sum_v(big_r);
		// make new v
		const d = core._v_to_d(- v[0], - v[1]);
		o.v = core._d_to_v(d, speed_k);
	} else {
		// check free flag
		if (!o.free) {
			// set random speed
			const d = core._gen_random_d();
			o.v = core._d_to_v(d, speed_k);
		}
		// set free flag
		o.free = true;
	}
	// check and set not free flag
	if (min_d <= big_r) {
		o.free = false;
	}
	
	// TODO check mouse position
}

module.exports = {
	check_one_move : check_one_move, 
};
/* end rule.js */


