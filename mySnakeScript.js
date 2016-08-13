
	// 定义当前移动的方向
	var nowDirection = "right";
	// 定义接下来要移动的方向
	var nextDirection = "right";
	// 获取游戏区域
	var screens = document.getElementById("screen");
	// 获取游戏区域宽高
	var screensWidth = parseInt(screens.style.width);
	var screensHeight = parseInt(screens.style.height);
	// 定时移动和获取焦点的setInterval返回的ID
	var pauseMove = null;
	var pauseFocus = null
	// 获取食物
	// var food = document.getElementById("food");
	// 蛇移动速度
	var speed = 20;
	// 是否开始
	var isStart = false;


	function start () {
		 // 游戏区域获得焦点
		 screens.focus() ;
		 // 监听键盘事件并且调用方向控制方法
		 screens.onkeydown = function (e) {
		 	 controlDirection(e); 
		 }
		
		 // foodLocator(food);

		 if (!isStart) {
			pauseFocus = setInterval("screenFocus()", 10);
			 // 每过一百毫秒移动一次
			pauseMove = setInterval("snakeMove()", 100);
		}
	}
	// 暂停游戏
	function pause () {
		// 暂停移动
		  clearInterval(pauseMove);
		  // 暂停得到焦点
		  clearInterval(pauseFocus);
		  // 暂停后可以再次开启，isStart设为false
		  isStart = false;

	}
	// 屏幕获取焦点
	function screenFocus () {
		  screens.focus();
	}
	//控制蛇头方向
	function controlDirection (e) {
		 e = e||window.event;
		 // 监听键盘事件，改变方向
		 if (e.keyCode == 37&&nowDirection != "right") {
		 	nextDirection = "left";
		 }else if (e.keyCode == 38&&nowDirection != "down") {
		 	nextDirection = "up";
		 }else if (e.keyCode == 39&&nowDirection != "left") {
		 	nextDirection = "right";	
		 }else if (e.keyCode == 40&&nowDirection != "up") {
		 	nextDirection = "down";
		 }

	}  
	// 移动函数
	function snakeMove () {
		isStart = true;
		// 获取蛇的整个身体部分
		 var snakeBody = document.getElementsByClassName("snake") ;
		 // 记录蛇头的位置
		 var snakeHeadLeft = snakeBody[0].style.left;
		 var snakeHeadTop = snakeBody[0].style.top;

		 // 移动蛇头
		 // 改变当前移动的方向
		 nowDirection = nextDirection;
		 if (nextDirection == "left") {
		 	snakeBody[0].style.left = (parseInt(snakeHeadLeft) - speed + screensWidth)%screensWidth + "px";
		 }else if (nextDirection == "right") {
		 	snakeBody[0].style.left = (parseInt(snakeHeadLeft) +speed)%screensWidth + "px";	
		 }else if (nextDirection == "up") {
		 	snakeBody[0].style.top = (parseInt(snakeHeadTop) - speed + screensHeight)%screensHeight + "px";
		 }else if (nextDirection == "down") {
		 	snakeBody[0].style.top = (parseInt(snakeHeadTop) + speed)%screensHeight + "px";	
		 }
		 // 移动蛇身体
		 var snakeCurrentNodeLeft = null,
		 	snakeCurrentNodeTop = null,
		 	snakeNextNodeLeft = snakeHeadLeft,
		 	snakeNextNodeTop = snakeHeadTop;
		 for(var i = 1;i < snakeBody.length;i++){
		 	// 保存当前节点的坐标
		 	snakeCurrentNodeTop = snakeBody[i].style.top;
		 	snakeCurrentNodeLeft = snakeBody[i].style.left;
		 	// 移动当前节点
		 	snakeBody[i].style.left = snakeNextNodeLeft;
		 	snakeBody[i].style.top = snakeNextNodeTop;
		 	// 初始化下个节点的移动位置
		 	snakeNextNodeLeft = snakeCurrentNodeLeft;
		 	snakeNextNodeTop = snakeCurrentNodeTop;
		 }
		 // 判断是否吃到食物
		 if (isEatFood(snakeBody)) {
		 	// 吃到则蛇身加长
		 	snakeBodyAdd(snakeBody,snakeHeadLeft,snakeHeadTop);
		 }

	}
	// 判定是否吃到食物
	function isEatFood (snakeBody) {
		 // 获取食物
		 var food = document.getElementById("food") ;
		 // 获取蛇头
		 var snakeHead = document.getElementById("snakeHead");
		 // 判定蛇头与食物重合
		 if (snakeHead.style.left == food.style.left&&snakeHead.style.top == food.style.top) {
		 	// 生成新食物并返回true
		 	newFood(food);
		 	return true;
		 }
		 return false;
	}
	// 蛇身增长
	function snakeBodyAdd (snakeBody,snakeHeadLeft,snakeHeadTop) {
		 var newBodyNode = snakeBody[snakeBody.length-1].cloneNode(true);
		 newBodyNode.style.left = snakeHeadLeft;
		 newBodyNode.style.top = snakeHeadTop;
		 screens.appendChild(newBodyNode) ;
	}
	// 生成新的食物
	function newFood (food) {
		// 随机生成新的食物节点位置
		 var newFoodLeft = parseInt(Math.random()*((screensWidth-20)/20))*20 + "px";
		 var newFoodTop = parseInt(Math.random()*((screensHeight-20)/20))*20 + "px";
		 // 更新食物位置
		 food.style.left = newFoodLeft;
		 food.style.top = newFoodTop; 
	}
	





























	// 分别绑定开始和暂停
	var startBtn = document.getElementById("startBtn");
	startBtn.onclick = start;
	var pauseBtn = document.getElementById("pauseBtn");
	pauseBtn.onclick = pause;



