<template>
	<view @click="handleClick">
		<slot></slot>
	</view>
</template>

<script>
	export default{
		props:{
			list:Array,
			index:Number,
		},
		data(){
			return{
				
			}
		},
		/* 组件挂载完毕 */
		mounted() {
			// console.log(this.list)
		},
		methods:{
			handleClick(){
				//1缓存数据
				getApp().globalData.imgList=this.list
				getApp().globalData.imgIndex=this.index
				// 2.点击跳转
				/* 通过json的方式跳转 */
				uni.navigateTo({
					url:"/pages/imgDetail/index"
				})
			}
		},
	}
</script>

<style>
</style>
