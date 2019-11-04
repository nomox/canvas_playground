const letters = [
	[
		[10, 10],
		[20, 10],
		[30, 20],
		[30, 10],
		[40, 10],
		[40, 20],
		[50, 10],
		[60, 10],
		[45, 25],
		[60, 40],
		[50, 40],
		[40, 30],
		[40, 40],
		[30, 40],
		[30, 30],
		[20, 40],
		[10, 40],
		[25, 25],
		[10, 10]
	],
	[
		[70, 10],
		[80, 10],
		[90, 20],
		[100, 10],
		[110, 10],
		[80, 40],
		[70, 40],
		[85, 25],
		[70, 10]
	],
	[
		[120, 10],
		[150, 10],
		[150, 30],
		[130, 30],
		[130, 40],
		[120, 40],
		[120, 10]
	],
	[
		[130, 15],
		[140, 15],
		[140, 25],
		[130, 25],
		[130, 15]
	],
	[
		[160, 10],
		[190, 10],
		[190, 15],
		[170, 15],
		[170, 20],
		[190, 20],
		[190, 40],
		[160, 40],
		[160, 10]
	],
	[
		[170, 25],
		[180, 25],
		[180, 35],
		[170, 35],
		[170, 25]
	],
	[
		[200, 40],
		[220, 10],
		[230, 10],
		[250, 40],
		[240, 40],
		[233, 30],
		[217, 30],
		[210, 40],
		[200, 40]
	],
	[
		[225, 15],
		[230, 25],
		[220, 25],
		[225, 15]
	]
];

const cube = [
	[
		[30, 30, 30],
		[-30, 30, 30],
		[-30, -30, 30],
		[30, -30, 30],
		[30, 30, 30],
	],
	[
		[30, 30, -30],
		[-30, 30, -30],
		[-30, -30, -30],
		[30, -30, -30],
		[30, 30, -30],
	],
	[
		[ 30, 30,-30],
		[ 30, 30, 30],
	],
	[
		[ -30, 30,-30],
		[ -30, 30, 30],
	],
	[
		[ 30, -30,-30],
		[ 30, -30, 30],
	],
	[
		[ -30, -30,-30],
		[ -30, -30, 30]
	]
];

function init() {
	let ctx = document.getElementById("canvas").getContext('2d');
	
	initDraw(ctx);
}

function initDraw(ctx) {
	draw();

	var count = 0;
	var phi = 0;
	function draw() {
		count++;
		phi = sin(count/16);
		ctx.clearRect(0, 0, 256, 256);
	
		for (let n of letters) {
			ctx.beginPath();
			for (let tr of n) {
				// tr = rotate(m, sin(phi));
				tr = transform(tr, [-110, -20]);
				tr = rotateY(tr, count/48);
				tr = rotateX(tr, phi/4);
				// tr = rotateZ(tr, sin(count/48));

				tr = projection(tr, 250);
				tr = transform(tr, [128, 128]);
				ctx.lineTo(tr[0], tr[1]);
			}
			ctx.stroke();
		}
		// ctx.fillText("phi: "+count,10,10);
	
		requestAnimationFrame(draw);
	}
}
window.onload = function()  {
	init();
};

function projection(vec3, f) {
	let [x = 0, y = 0, z = 0] = vec3;
	let d = f/(f+z);
	let u = x * d;
	let v = y * d;
	return [u, v]
}

// Rotate 2d
function rotate(vec2, a) {
	let [x, y] = vec2;
	let m1 = [
		[cos(a), -sin(a)],
		[sin(a), cos(a)]
	];
	let m2 = [
		[x],
		[y]
	];
	let m = multiply(m1, m2);
	return [m[0][0], m[1][0]];
}

function transform(vec3, tr) {
	let [x = 0, y = 0, z = 0] = vec3;
	let [xt = 0, yt = 0, zt = 0] = tr;

	return [x + xt, y + yt, z + zt];
}

function rotateX(vec3, a) {
	let m1 = [
		[1, 0, 0],
		[0, cos(a), -sin(a)],
		[0, sin(a), cos(a)],
	];
	return rotate3dm(vec3, m1);
}
function rotateY(vec3, a) {
	let m1 = [
		[cos(a), 0, sin(a)],
		[0, 1, 0],
		[-sin(a), 0, cos(a)],
	];
	return rotate3dm(vec3, m1);
}
function rotateZ(vec3, a) {
	let m1 = [
		[cos(a), -sin(a), 0],
		[sin(a), cos(a), 0],
		[0, 0, 1]
	];
	return rotate3dm(vec3, m1);
}

function rotate3dm(vec3, m1) {
	let [x = 0, y = 0, z = 0] = vec3;
	let m2 = [
		[x],
		[y],
		[z]
	];
	let m = multiply(m1, m2);
	return [m[0][0], m[1][0], m[2][0]];
}

function sin(a) {
	return Math.sin(a);
}
function cos(a) {
	return Math.cos(a);
}
function multiply(m1, m2) {
  let result = [];
	for (let i = 0; i < m1.length; i++) {
		result[i] = [];
		for (let j = 0; j < m2[0].length; j++) {
			let sum = 0;
			for (let k = 0; k < m1[0].length; k++) {
				sum += m1[i][k] * m2[k][j];
			}
			result[i][j] = sum;
		}
	}
	return result;
}