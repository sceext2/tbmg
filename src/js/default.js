/* default.js, tbmg/src/js/
 * default config for tbmg
 */
'use strict';

const conf = {
	
	ball_count : 50, 	// [球] 物体数量
	ball_r : 4, 		// [球] 半径 (px)
	
	mouse_r: 30, 		// [鼠标] 半径 (px)
	
	move_v: 120, 		// [球] 移动速度, px/s
	
	// game rule config
	move_random_r: 40, 	// (px) 此半径内没有 其它物体 时, 随机选择方向 运动
	move_sum_r: 20, 	// (px) 此半径内有其它 球 时, 向 矢量和 的 正方向 运动 (切换速度)
				// 否则, 向 矢量和 的 反方向 运动
	move_back_r: 10, 	// (px) 此半径内有其它 球 时, 向 自身的 反方向 运动
	
	// style config
	bg_color: '#091827', 		// canvas 背景色
	
	ball_color: 'rgba(0, 0, 255, 0.5)', 		// [球] 背景色
	ball_color_border: 'rgba(255, 255, 0, 0.3)', 	// [球] 边框色
	ball_border_width: 3, 		// [球] 边框宽度 (px)
	
	m_color: 'rgba(255, 0, 0, 0.4)', 		// [球] 背景色
	m_color_border: 'rgba(0, 100, 255, 0.5)', 	// [球] 边框色
	m_border_width: 5, 		// [球] 边框宽度 (px)
	
	ball_speed_line_width: 2, 
	ball_speed_line_color: 'rgba(0, 200, 0, 0.1)', 
	
	// big round
	big_color: 'rgba(0, 0, 0, 0)', 
	big_color_border: 'rgba(0, 200, 0, 0.04)', 
	big_border_width: 1, 
	
	// small round
	small_color: 'rgba(0, 0, 255, 0.03)', 
	small_color_border: 'rgba(0, 255, 0, 0.06)', 
	small_border_width: 2, 
	
	// near round
	near_color: 'rgba(255, 0, 0, 0.05)', 
	near_color_border: 'rgba(255, 0, 0, 0.1)', 
	near_border_width: 3, 
	
	// limit config
	max_time_ms: 50, 	// 最大模拟间隔时间 (ms)
	
	// TODO
};

module.exports = conf;
/* end default.js */


