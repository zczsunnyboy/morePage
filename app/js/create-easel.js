import '@/css/create-easel.less'
import createjs from 'createjs-cmd'

console.log(createjs)
//创建一个阶段，得到一个参考的画布
let canvas = document.getElementById("myCanvas");
let stage = new createjs.Stage(canvas);

let handleTicker=()=>{
  //更新阶段将呈现下一帧
  stage.update();
};
//添加一个Ticker类帮助避免多次调用update方法
createjs.Ticker.addEventListener("tick", handleTicker);

//创建一个形状的显示对象
let circle = new createjs.Shape();
circle.graphics.beginFill("red").drawCircle(0, 0, 40);
//形状实例的设置位置
circle.x = circle.y = 50;
circle.handleClick=circle.on('click',(e)=>{
  console.log('off')
  circle.off('click',circle.handleClick)
})
//添加形状实例到舞台显示列表
stage.addChild(circle);



