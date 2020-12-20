<template>
	<view class="background" style="background-image: url(../../static/imgs/chris.png);background-size:100% 100%;">
		<Button class="start" plain hover-class="hover" @tap="toStart">
			圣 诞 快 乐
		</Button>
	</view>
</template>

<script>
	export default{
		methods:{
			toStart(){
				console.log('圣 诞 快 乐')
				wx.reLaunch({
					url: "../home/index"
				})
			}
		},
	}
</script>

<style lang="scss">
	.background{
		position: relative;
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		.start{
			position:absolute;
			bottom: 150rpx;
			color: #007100;
			background-color: #851205;
			font-size: 35rpx;
			border-color: #55557f;
		}
		.hover{
			background-color: #55557f;
		}
	}
</style>
