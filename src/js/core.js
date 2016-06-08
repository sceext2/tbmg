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
		this._waiting = false;	// waiting for frame callback
		this._f_count = 0;	// draw frame count
		
		this._old_ms = 0;	// old ms after last frame callback
		
		this._flag_added_resize_callback = false;
	}
	
	// methods
	
	set_canvas(canvas) {
		this._e_canvas = canvas;
		
		// get context
		this._c = this._e_canvas[0].getContext('2d');
		
		this.update_size();
		
		// set on mouse move
		this._e_canvas.on('mousemove', (event) => {
			this._on_mousemove(event);
		});
	}
	
	// reset (init) core
	reset() {
		// create object list
		this._init_ol();
		
		// other resets
		this.reset_frame_count();
		// reset core time
		this._time_ms = 0;
		
		// set window resize callback
		if (!this._flag_added_resize_callback) {
			$(window).resize(() => {
				this.update_size();
			});
			this._flag_added_resize_callback = true;
		}
		this.update_size();
	}
	
	// start (resume) core running
	start() {
		// check and set running flag
		if (this._running) {
			return;	// just ignore it
		} else {
			this._running = true;
		}
		// update _old_ms
		this._old_ms = new Date().getTime();
		// start running
		this._set_request_frame();
	}
	
	_set_request_frame() {
		if (this._waiting) {
			return;	// prevent set callback twice
		}
		if (this._running) {
			window.requestAnimationFrame(() => {
				this._waiting = false;
				
				this._on_frame();
				// auto set next frame
				this._set_request_frame();
				// add frame count
				this._f_count += 1;
			});
			this._waiting = true;
		}
	}
	
	// pause core running
	pause() {
		// just set flag
		this._running = false;
		
		// refresh after pause
		this.refresh();
	}
	
	is_running() {
		return this._running;
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
		const p = this._e_canvas.parent();
		const x = p.width();
		const y = p.height();
		
		this._c_size = [x, y];
		
		// update canvas size
		this._e_canvas[0].width = x;
		this._e_canvas[0].height = y;
		
		// refresh after reset size
		this.refresh();
		
		// log
		console.log('core: canvas resize to ' + x + ' x ' + y);
	}
	
	// private methods
	
	// update objects (balls) move status, and check game rule
	_update() {
		// do move objects
		this._do_move();
		
		// check rules and update objects status
		for (let i = 0; i < this._ol.length; i++) {
			rule.check_one_move(this, this._ol[i], i);
		}
		
		// check objects move out-of border
		this._check_out_border();
	}
	
	// core move function
	
	_do_move() {
		// get delta time (ms)
		const new_ms = new Date().getTime();
		let dt = new_ms - this._old_ms;
		// update _old_ms
		this._old_ms = new_ms;
		
		// check max dt
		const max_dt = this.conf.max_time_ms;
		if (dt > max_dt) {
			dt = max_dt;
		}
		
		// process each ol move
		for (let i = 0; i < this._ol.length; i++) {
			this._check_one(this._ol[i], dt);
		}
		
		// update core time
		this._time_ms += dt;
	}
	
	// generate a random direction
	_gen_random_d() {
		const out = Math.random() * 2 * Math.PI;
		return out;
	}
	
	// direction (arc [0, 2 * PI]) to v (x, y)
	_d_to_v(d, k) {
		const x = Math.cos(d) * k;
		const y = Math.sin(d) * k;
		
		return [x, y];
	}
	
	// v (x, y) to direction (arc [0, 2 * PI])
	_v_to_d(x, y) {
		const r = Math.sqrt(x * x + y * y);
		if (r <= 0) {
			return 0;
		}
		const cos_t = x / r;
		let d = Math.acos(cos_t);
		if (y < 0) {
			d += Math.PI;
		}
		return d;
	}
	
	// draw the whole canvas
	refresh() {
		// draw background first
		const bg = this.conf.bg_color;
		const c = this._c;
		const s = this._c_size;
		
		c.fillStyle = bg;
		c.fillRect(0, 0, s[0], s[1]);
		
		// draw each ball
		for (let i = 0; i < this._ol.length; i++) {
			this._draw_ball(this._ol[i]);
		}
		
		this._draw_mouse();
	}
	
	// init part
	
	// create moving object list
	_init_ol() {
		const c_s = this._c_size;	// current canvas size
		const count = this.conf.ball_count;
		
		const speed_k = this.conf.move_v / 1e3;	// px / ms
		
		// create each object, add add it to ol list
		for (let i = 0; i < count; i++) {
			const one = {
				p : [0, 0], 
				v : [0, 0], 
				free : false, 
			};
			// gerenate a random position
			function make_random_one(max) {
				return (Math.random() * max);
			}
			
			const x = make_random_one(c_s[0]);
			const y = make_random_one(c_s[1]);
			one.p = [x, y];
			// set random speed
			const d = this._gen_random_d();
			one.v = this._d_to_v(d, speed_k);
			one.free = true;
			
			this._ol.push(one);
		}
	}
	
	// process one object moving
	_check_one(one, dt) {
		one.p[0] += one.v[0] * dt;
		one.p[1] += one.v[1] * dt;
	}
	
	_check_out_border() {
		const s = this._c_size;	// current canvas size
		// check each ball out-of border, not care the r
		for (let i = 0; i < this._ol.length; i++) {
			const one = this._ol[i];
			const p = one.p;
			for (let j = 0; j <= 1; j++) {
				// check left (top)
				if (p[j] < 0) {
					one.p[j] = 0;	// reset position to 0
					if (one.v[j] < 0) {
						one.v[j] = - one.v[j];	// reset speed
					}
				} else if (p[j] > s[j]) {	// check right (bottom)
					one.p[j] = s[j];
					if (one.v[j] > 0) {
						one.v[j] = - one.v[j];
					}
				}
			}
		}
	}
	
	// callbacks
	
	// callback for window.requestAnimationFrame()
	_on_frame() {
		this._update();
		this.refresh();
	}
	
	// mouse move callback
	_on_mousemove(event) {
		const x = event.offsetX;
		const y = event.offsetY;
		
		this._m_p = [x, y];
	}
	
	// base draw function
	
	_draw_ball(one) {
		const c = this.conf;
		
		const ball_r = c.ball_r;
		// draw big round and small round
		const big_r = c.move_random_r + ball_r;
		const small_r = c.move_sum_r + ball_r;
		const near_r = c.move_back_r + ball_r;
		
		this._draw_round(one.p[0], one.p[1], big_r, c.big_border_width, c.big_color, c.big_color_border);
		this._draw_round(one.p[0], one.p[1], small_r, c.small_border_width, c.small_color, c.small_color_border);
		this._draw_round(one.p[0], one.p[1], near_r, c.near_border_width, c.near_color, c.near_color_border);
		
		// draw main round
		this._draw_round(one.p[0], one.p[1], ball_r, c.ball_border_width, c.ball_color, c.ball_color_border);
		
		// draw speed line
		const sp = one.p;	// start point
		const ep = [sp[0] + one.v[0] * 1e3, sp[1] + one.v[1] * 1e3];	// end point
		
		// check game running
		if (this._running) {
			// do draw line
			const t = this._c;
			t.beginPath();
			t.moveTo(sp[0], sp[1]);
			t.lineTo(ep[0], ep[1]);
			t.lineCap = 'round';
			t.lineWidth = c.ball_speed_line_width;
			t.strokeStyle = c.ball_speed_line_color;
			t.stroke();
		}
	}
	
	_draw_mouse() {
		const p = this._m_p;	// current mouse position
		const c = this.conf;
		
		this._draw_round(p[0], p[1], c.mouse_r, c.m_border_width, c.m_color, c.m_color_border);
	}
	
	// low level canvas draw function
	_draw_round(x, y, r, width, color, border_color) {
		const c = this._c;
		
		c.fillStyle = color;
		c.strokeStyle = border_color;
		c.lineWidth = width;
		
		c.beginPath();
		c.arc(x, y, r, 0, 2 * Math.PI);
		c.closePath();
		
		c.stroke();
		c.fill();
	}
}

module.exports = tbmg_core;
/* end core.js */


