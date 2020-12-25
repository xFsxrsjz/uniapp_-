<template>
	<view @touchstart="handleTouchstart" @touchend="handleTouchend">触屏事件</view>
</template>

<script>
	/* 
	 1给容器绑定触屏事件
	 2记录按下的事件
	  1.记录用户按下屏幕的时间 Date.now()时间戳 返回 1970 -1-1 到现在的毫秒数
	  2.记录用户按下的屏幕坐标
	 3记录用户离开的时间
	  1.离开屏幕的事件
	  2.离开屏幕的坐标
	  3.根据两个时间 运算 判断 用户按下屏幕时长是否合法
	  4.根据两对坐标判断距离是否合法 判断滑动的方向
	*/
	export default{
		data(){
			return {
				//按下的时间
				startTime:0,
				// 按下的坐标
				startX:0,
				startY:0,
			}
		},
		methods:{
			//用户按下屏幕
			handleTouchstart(event){
				console.log('手指按下屏幕',event)
				// console.log('按下：',event.changedTouches[0].clientX)
				// console.log('按下：',event.changedTouches[0].clientY)
				
				this.startTime=Date.now()
				this.startX=event.changedTouches[0].clientX
				this.startY=event.changedTouches[0].clientY
			},
			handleTouchend(event){
				console.log('手指离开屏幕')
				// console.log('离开：',event.changedTouches[0].clientX)
				// console.log('离开：',event.changedTouches[0].clientY)
				
				const endTime=Date.now()
				const endX=event.changedTouches[0].clientX
				const endY=event.changedTouches[0].clientY
				
				//判断按下的时长
				if(endTime-this.startTime>2000){
					return
				}
				
				//滑动方向
				let direction=''
				
				//先判断用户滑动的距离 合法则判断滑动方向 距离取绝对值 Math.abs()
				if(Math.abs(endX-this.startX)>10){
					//再判断滑动方向
					direction=endX-this.startX>0?"right":"left"
				}else{
					return
				}
				
				//用户做了合法操作
				console.log(direction)
			},
		}
	}
</script>

<style>
	view{
		width: 100%;
		height: 500rpx;
		background-color: #EBEEF5;
	}
</style>
