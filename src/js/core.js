/* core.js, tbmg/src/js/
 * core of tbmg
 */
'use strict';

const rule = require('./rule.js');

// tbmg core class
class tbmg_core extends Object {
	constructor() {
		super();
		
		// attributes
		this.conf = null;	// config info object
		
		// private attributes
		this._e_canvas = null;	// <canvas> html element
		this._c = null;		// canvas 2d context
		
		this._time_ms = 0;	// core time (ms)
		
		this._c_size = [0, 0];	// canvas size (px)
		this._m_p = [0, 0];	// current mouse position (px)
		
		this._ol = [];	// moving objects (balls)
			// {
			//	p : [x, y], 	// current position
			//	v : [x, y], 	// current speed
			//	free : false, 	// free status flag
			// }
		
		this._running = false;	// core running flag
		this._f_count = 0;	// draw frame count
	}
	
	// methods
	
	// reset (init) core
	reset() {
		// TODO
	}
	
	// start (resume) core running
	start() {
		// TODO
	}
	
	// pause core running
	pause() {
		// TODO
	}
	
	get_core_time() {
		return this._time_ms;
	}
	
	get_frame_count() {
		return this._f_count;
	}
	
	reset_frame_count() {
		this._f_count = 0;
	}
	
	// update canvas size
	update_size() {
		// TODO
	}
	
	// private methods
	
	// update objects (balls) move status, and check game rule
	_update() {
		// TODO
	}
	
	// core move function
	
	// generate a random direction
	_gen_random_d() {
	
	}
	
	// direction (arc [0, 2 * PI]) to v (x, y)
	_d_to_v(d) {
		// TODO
	}
	
	// v (x, y) to direction (arc [0, 2 * PI])
	_v_to_d(x, y) {
		// TODO
	}
	
	// draw the whole canvas
	_refresh() {
		// TODO
	}
	
	// init part
	
	// create moving object list
	_init_ol() {
		// TODO
	}
	
	// process one object moving
	_check_one() {
		// TODO
	}
	
	// callbacks
	
	// callback for window.requestAnimationFrame()
	_on_frame() {
		// TODO
	}
	
	// mouse move callback
	_on_mousemove() {
		// TODO
	}
	
	// base draw function
	
	_draw_ball() {
		// TODO
	}
	
	_draw_mouse() {
		// TODO
	}
	
	// low level canvas draw function
	_draw_round(x, y, r, width, color, border_color) {
		// TODO
	}
	
	// TODO
}

// TODO

module.exports = tbmg_core;
/* end core.js */


