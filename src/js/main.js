/* main.js, tbmg/src/js/
 * entry file of tbmg
 */
'use strict';

const conf = require('./default.js');
const lan = require('./lan.js');
const core = require('./core.js');

// global data
const etc = {};
etc.core = null;	// the tbmg core object


function start_init() {
	
	init_hide_show_about();
	
	init_core();
	// TODO
}

// init hide/show about page function
function init_hide_show_about() {
	
	const title = $('.title span');
	const about = $('.about');
	
	let show = false;
	
	function on_click() {
		if (show) {
			// hide it
			about.removeClass('show');
			console.log('main: hide about page');
			
			show = false;
		} else {
			// check and pause core
			if (etc.core != null) {
				etc.core.pause();
			}
			
			// show it
			about.addClass('show');
			console.log('main: show about page');
			
			show = true;
		}
	}
	
	title.on('click', on_click);
}

// init core
function init_core() {
	// create a core and set it
	const c = new core();
	c.conf = conf;
	
	// set canvas
	const canvas = $('#c_0');
	c.set_canvas(canvas);
	// init core
	c.reset();
	
	// set start callback
	canvas.on('click', () => {
		c.start();
		
		// log
		console.log('main: game start ');
	});
	
	// set pause callback
	init_pause(c);
	
	// init fps count
	init_fps_count(c);
	
	etc.core = c;	// save core
	// draw first frame after core init done
	c.refresh();
}

function init_pause(core) {
	
	// set anykep up pause
	$('body').on('keyup', () => {
		core.pause();
		
		console.log('main: pause game');
	});
	
	// set click fps counter to pause
	$('.footer').on('click', () => {
		core.pause();
		
		console.log('main: pause game (fps) ');
	});
}

function init_fps_count(core) {
	const out = $('#c_time_fps');
	let old_time = 0;
	
	// check fps each time
	function do_fps() {
		// get core info
		const fps = core.get_frame_count();
		core.reset_frame_count();
		
		const time_ms = core.get_core_time();
		// make game speed (x)
		const dt_ms = time_ms - old_time;
		old_time = time_ms;
		
		const x = Math.round(dt_ms) / 1e3;
		
		// make text
		const t = x + 'x ' + fps + 'fps ' + ms_to_time(time_ms);
		// update text
		out.text(t);
		
		// set next callback
		setTimeout(() => {
			do_fps();
		}, 1e3);
	}
	
	do_fps();
}

// base format function
function ms_to_time(ms) {
	const s = Math.floor(ms / 1e3);
	const o_ms = Math.round(ms - s * 1e3);
	
	const m = Math.floor(s / 60);
	const o_s = s - m * 60;
	
	const h = Math.floor(m / 60);
	const o_m = m - h * 60;
	
	function fill_zero(n, l) {
		let out = n.toString();
		while (out.length < l) {
			out = '0' + out;
		}
		return out;
	}
	
	// format text
	const t_ms = fill_zero(o_ms, 3);
	const t_s = fill_zero(o_s, 2);
	const t_m = fill_zero(o_m, 2);
	const t_h = fill_zero(h, 2);
	
	const out = t_h + ':' + t_m + ':' + t_s + '.' + t_ms;
	return out;
}

// start init after dom loaded, with jquery-2
$(start_init);

// TODO exports for DEBUG
/* end main.js */


