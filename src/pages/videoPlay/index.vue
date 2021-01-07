<!-- 
 视频播放、转发、声音开关功能 
 
 
 
 -->
<template>
	<view class="video_play">
		<image :src="videoObj.img"></image>
		<!-- 工具栏 -->
		<view class="video_tool">
			<view @click="handleMusic" :class="['iconfont',muted?'iconjingyin':'iconshengyin'] "></view>
			<view class="iconfont iconzhuanfa">
				<button open-type="share"></button>
			</view>
		</view>
		<!-- 视频 -->
		<view class="video_warp">
			<!-- 视频播放填充 objectFit="fill" -->
			<!-- <video :src="videoObj.video" objectFit="fill"></video> -->
			<video :muted="muted" :src="video" objectFit="fill"></video>
		</view>
		<!-- 下载 -->
		<view class="download">
			<view class="dowload_btn" @click="handleDownload">
				下载高清
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				videoObj:{},
				video:'http://157.122.54.189:9088/uploads/5e3ee07b042208394f8fe865.mp4',
				muted:false, //是否静音
			}
		},
		onLoad() {
			// console.log(getApp().globalData)
			this.videoObj=getApp().globalData.video
			console.log(this.videoObj)
		},
		methods:{
			handleMusic(){
				this.muted=!this.muted
			},
			async handleDownload(){
				await uni.showLoading({
					title:"下载中"
				})
				//downloadFile返回值是个数组，第一个值才是返回值对象
				/* 要下载的运程文件的路径
				url:this.videoObj.video 
				不加加括号拿到整段返回值*/
				/* 1将运城视频下载到小程序内存中 */
				const {tempFilePath} = (await uni.downloadFile({url:this.video}))[1]
				console.log({tempFilePath})
				/* 2将内存中的文件下载到本地 */
				await uni.saveVideoToPhotosAlbum({
					filePath:tempFilePath//文件零临时存储路径
				})
				uni.hideLoading()
				await uni.showToast({
					title:"下载成功"
				})
			}
		}
	}
</script>

<style lang="scss">
	.video_play{
		position: relative;
		height: 100%;
		image{
			position: absolute;
			width: 100%;
			height: 100%;
			z-index:-1;//不会挡住其他标签
			// 滤镜：背景模糊
			filter: blur(20rpx);
		}
		.video_tool{
			height:80rpx;
			display: flex;
			justify-content: flex-end;
			.iconfont{
				width: 80rpx;
				color:#fff;
				font-size: 50rpx;
				border-radius: 40rpx;
				background-color: rgba(0,0,0,.2);
				display: flex;
				justify-content: center;
				align-items: center;
				margin-right: 20rpx;
			}
			.iconzhuanfa{
				position:relative;
				
				button{
					position:absolute;
					width:100%;
					height: 100%;
					opacity: 0;
				}
			}
		}
		.video_warp{
			display: flex;
			justify-content: center;
			video{
				width: 360rpx;
				height: 600rpx;
			}
		}
		.download{
			display: flex;
			justify-content: center;
			margin-top: 30rpx;
			.dowload_btn{
				width: 360rpx;
				height: 80rpx;
				border-radius: 40rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				color: #fff;
				border: 1rpx solid #fff;
				background-color: rgba(0,0,0,.6);
			}
		}
	}
</style>
