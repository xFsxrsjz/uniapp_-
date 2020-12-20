<template>
	<view>
		<view class="back" @tap="back">(๑•̀ㅂ•́)و✧哈！</view>
	</view>
</template>

<script>
	export default{
		methods:{
			back(){
				wx.navigateTo({
					url:('../starting/index')
				})
			}
		}
	}
</script>

<style>
	.back{
		
	}
</style>
