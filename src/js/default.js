/* default.js, tbmg/src/js/
 * default config for tbmg
 */
'use strict';

const conf = {
	
	ball_count : 50, 	// [球] 物体数量
	ball_r : 10, 		// [球] 半径 (px)
	
	mouse_r: 20, 		// [鼠标] 半径 (px)
	
	move_v: 30, 		// [球] 移动速度, px/s
	
	// game rule config
	move_random_r: 100, 	// (px) 此半径内没有 其它物体 时, 随机选择方向 运动
	move_sum_r: 30, 	// (px) 此半径内有其它 球 时, 向 矢量和 的 正方向 运动 (切换速度)
				// 否则, 向 矢量和 的 反方向 运动
	move_back_r: 10, 	// (px) 此半径内有其它 球 时, 向 自身的 反方向 运动
	
	// style config
	ball_color: '#0000ff', 		// [球] 背景色
	ball_color_border: '#ffff00', 	// [球] 边框色
	ball_border_width: 4, 		// [球] 边框宽度 (px)
	
	m_color: '#ff0000', 		// [球] 背景色
	m_color_border: '#0000ff', 	// [球] 边框色
	m_border_width: 5, 		// [球] 边框宽度 (px)
	
	// limit config
	max_time_ms: 100, 	// 最大模拟间隔时间 (ms)
	
	// TODO
};

module.exports = conf;
/* end default.js */


