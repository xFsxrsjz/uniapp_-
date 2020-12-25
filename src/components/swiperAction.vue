<!-- 
 1slot
 2对外提供数据 滑动的方向
 -->
<template>
	<view
		@touchstart="handleTouchstart"
		@touchend="handleTouchend"
	>
		事件
		<slot></slot>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				startTime:0,
				startX:0,
				startY:0
			}
		},
		methods:{
			handleTouchstart(event){
				this.startTime=Date.now()
				this.startX=event.changedTouches[0].clientX
				console.log(this.startTime,this.startX)
			},
			handleTouchend(event){
				const endTime=Date.now()
				const endX=event.changedTouches[0].clientX
				console.log(endTime,endX)
				
				if(endTime-this.startTime>2000){
					return
				}
				
				let direction=''
				
				if(Math.abs(endX-this.startX)>10){
					direction=endX-this.startX>0?"right":"left"
				}else{
					return
				}
				// console.log(direction)
				//子传父
				this.$emit("swiperAction",{direction})
			}
		}
	}
</script>

<style>
</style>
