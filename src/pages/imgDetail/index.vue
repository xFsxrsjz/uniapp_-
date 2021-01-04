<!--
 图片详情页面 会先执行图片的渲染 数据加载在后 所以直接写会拿不到图片信息
 moment.js处理时间格式
  fromNow()显示XXX月前
  moment.locale("zh-cn")使用中文语言
 下载图片 
  uni.downloadFile()
  uni.saveImageToPhotosAlbum()
 -->
<template>
	<view>
		<!-- 用户信息 -->
		<view class="user_info">
			<view class="user_icon">
				<image :src="imgDetail.user.avatar" mode="widthFix"></image>
			</view>
			<view class="user_desc">
				<view class="user_name">{{imgDetail.user.name}}</view>
				<view class="user_time">{{imgDetail.cnTime}}</view>
			</view>
		</view>
		<!-- 高清大图 -->
		<view class="height_img">
			<swiper-action @swiperAction="handleSwiperAction">
				<image mode="widthFix" :src="imgDetail.newThumb"></image>
			</swiper-action>
		</view>
		<!-- 点赞收藏 -->
		<view class="user_rank">
			<view class="rank">
				<text class="iconfont iconshengdanjie-liwu">{{imgDetail.rank}}</text>
			</view>
			<view class="user_collect">
				<text class="iconfont iconshengdanjie-liwu">收藏</text>
			</view>
		</view>
		<!-- 专辑 -->
		<view class="album_wrap">
			<view class="album_title">相关</view>
			<view class="album_list">
				<view class="album_item" v-for="item in album" :key="item.id">
				<!-- <view class="album_item"> -->
					<view class="album_cover">
						<image :src="imgDetail.thumb"></image>
					</view>
					<view class="album_info">
						<view class="album_info_text">专辑</view>
						<view class="album_info_name">{{item.name}}小熊猫</view>
						<text class="iconfont iconshengdanshu2"></text>
					</view>
				</view>
			</view>
		</view>
		<!-- 最热评论 -->
		<view class="comment hot" v-if="hot.length">
			<view class="comment_title">
				<text class="iconfont iconshengdanmao1"></text>
				<text class="comment_text">最热评论</text>
			</view>
			<view class="comment_list">
				<view class="comment_item" v-for="item in hot" :key="item.id">
					<view class="comment_user">
						<view class="user_icon">
							<image :src="item.user.avatar"></image>
						</view>
						<view class="user_name">
							<view class="user_nickname">{{item.user.name}}</view>
							<view class="user_time">
								{{item.cnTime}}
							</view>
						</view>	
					</view>
					<view class="comment_desc"> 
						<view class="comment_content">
							<text>{{item.content}}</text>
						</view>
						<view class="comment_like">
							<text class="iconfont iconshengdanjie-liwu"></text>
							<text>{{item.size}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 最新图片 -->
		<view class="comment hot"  v-if="comment.length">
			<view class="comment_title">
				<text class="iconfont iconpinglun"></text>
				<text class="comment_text">最新评论</text>
			</view>
			<view class="comment_list">
				<view class="comment_item" v-for="item in comment" :key="item.id">
					<view class="comment_user">
						<view class="user_icon">
							<image :src="item.user.avatar"></image>
						</view>
						
						<view class="user_name">
							<view class="user_nickname">{{item.user.name}}</view>
							<view class="user_time">
								{{item.cnTime}}
							</view>
						</view>
					</view>
					<view class="comment_desc">
						<view class="comment_content">
							<text>{{item.content}}</text>
						</view>
						<view class="comment_like">
							<text class="iconfont iconshengdanjie-liwu"></text>
							<text>{{item.size}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 下载图片 -->
		<view class="download">
			<view class="download_btn" @click="handleDownload">
				下载图片
			</view>
		</view>
	</view>
</template>

<script>
	import swiperAction from "@/components/swiperAction.vue"
	import moment from "moment"
	//设置语言为中文
	moment.locale('zh-cn')
	export default{
		data(){
			return{
				imgDetail:{},	//图片信息
				album:[],		//专辑数据
				comment:[],		//最新评论
				hot:[],			//最热评论
				imgIndex:0,		//图片索引
			}
		},
		components:{
			swiperAction
		},
		onLoad() {
			const {imgIndex}=getApp().globalData
			
			this.imgIndex=imgIndex
			this.getData()
		},
		methods:{
			getData(){
				const {imgList}=getApp().globalData
				this.imgDetail=imgList[this.imgIndex]
				console.log('imgDetail',this.imgDetail)
				this.imgDetail.newThumb=this.imgDetail.thumb+this.imgDetail.rule.replace('$<Height>',350)
				
				// xxx年前的数据
				// atime单位为秒,moment接收单位毫秒
				this.imgDetail.cnTime = moment(this.imgDetail.atime * 1000).fromNow()
				this.getComment(this.imgDetail.id)
			},
			getComment(id){
				console.log('id',id)
				this.request({
					url:`http://157.122.54.189:9088/image/v2/wallpaper/wallpaper/${id}/comment`,
				}).then(result=>{
					console.log('result',result)
					this.album = result.res.album
					
					// 给hot数组中的对象添加一个时间属性 xxx月前
					result.res.hot.forEach(
					  v => (v.cnTime = moment(v.atime * 1000).fromNow())
					);
					result.res.comment.forEach(
					  v => (v.cnTime = moment(v.atime * 1000).fromNow())
					);

					this.comment= result.res.comment
					this.hot= result.res.hot
					console.log('hot',this.hot) 
				})
			},
			//滑动事件
			handleSwiperAction(e){
				//接收子组件参数
				console.log(e)
				/* 
				 1用户左滑imgindex++
				 2用户右滑imgindex--
				 3判断数组是否越界
				 4左滑时 e.direction==="left"&&this.imgindex<imglist.length-1
				 5右滑时 e.direction==="right"&&this.imgindex>0
				 */
				const {imgList}=getApp().globalData
				if(e.direction==="left"&&this.imgIndex<imgList.length-1){
					//可以进行++
					this.imgIndex++
					this.getData()
				}else if(e.direction==="right"&&this.imgindex>0){
					//右滑 加载上一页的
					this.imgIndex--
					this.getData()
				}else{
					uni.showToast({
						title:"圣诞快乐",
						icon:"none"
					})
				}
			},//点击下载图片
			async handleDownload(){
				await uni.showLoading({
					title:"下载中"
				})
				
				//1 将远程文件下载到小程序的内存中 tempFilePath
				/* uni.downloadFile({
					url:this.imgDetail.img
				}).then(result=>{
					console.log(result)
				}) */
				const downloadRes = await uni.downloadFile({url:this.imgDetail.img})
				//将下载的的图片存放在临时路径中
				const {tempFilePath} = downloadRes[1]
				console.log(tempFilePath)
				
				//2 将小程序中的零时文件存在本地
				// uni.saveImageToPhotosAlbum({
				// 	filePath:tempFilePath
				// }).then(saveRes=>{
				// 	console.log(saveRes)
				// })
				const saveRes = await uni.saveImageToPhotosAlbum({ filePath:tempFilePath })
				console.log('saveRes',saveRes)
				
				//提示
				if(saveRes[0]===null){
					uni.hideLoading()
					await uni.showToast({
						title:'下载成功',
						icon:'none'
					})
					return 
				}
				uni.hideLoading()
				await uni.showToast({
					title:'下载失败',
					icon:'none'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.user_info{
		display: flex;
		padding: 20rpx;
		.user_icon{
			padding: 0 20rpx;
			image{
				width: 88rpx;
				border-radius: 50%;
			}
		}
		.user_desc{
			.user_name{
				font-weight: 600;
			}
			.user_time{
				color: $main;
				font-size:24rpx;
				padding: 10rpx 0;
			}
		}
	}
	.user_rank{
		display: flex;
		height:80rpx;
		border: 1rpx solid #eee;
		.rank{
			flex:1;
			display: flex;
			justify-content: center;
			align-items: center;
			.iconfont{
			}
			text{
				font-size: 28rpx;
			}
		}
		.user_collect{
			flex:1;
			display: flex;
			justify-content: center;
			align-items: center;
			.iconfont{
			}
			text{
				font-size: 28rpx;
			}
		}
	}
	// 专辑
	.album_wrap {
	  padding: 20rpx;
	  .album_title {
	    padding: 10rpx 0;
	  }
	  .album_list {
	    .album_item {
	      display: flex;
	      padding: 10rpx 0;
	      border-bottom: 10rpx solid #eee;
	      .album_cover {
	        flex: 1;
	        image {
	          width: 180rpx;
	          height: 180rpx;
	        }
	      }
	      .album_info {
	        flex: 3;
	        padding-left: 20rpx;
	        position: relative;
	        .album_info_text {
	          width: 100rpx;
	          height: 50rpx;
	          background-color: $main;
	          color: #fff;
	          display: flex;
	          justify-content: center;
	          align-items: center;
	        }
	        .album_name {
	          padding: 10rpx 0;
	          color: #888;
	        }
	        .iconfont {
	          font-size: 40rpx;
	          position: absolute;
	          top: 50%;
	          // css3 变换 转换
	          transform: translateY(-50%);
	          right: 10%;
	          color: #000;
	        }
	      }
	    }
	  }
	}
	.comment{
		.comment_title{
			padding: 15rpx;
			.iconfont{
				color: red;
				font-size: 40rpx;
			}
			.comment_text{
				font-weight:600;
				font-size:28rpx;
				color: #666;
				margin-left:10rpx;
			}
		}
		.comment_list{
			border-bottom: 10rpx solid #eee;
			margin: 15rpx;
			.comment_item{
				border-top: 1rpx solid #eee;
				margin:15rpx 0;
				padding:15rpx 0;
				// 用户信息
				.comment_user{
					display: flex;
					.user_icon{
						image{
							width: 80rpx;
							height: 80rpx;
						}
					}
					.user_name{
						padding:0 10rpx;
						.user_nickname{
							font-weight: 600;
							padding-bottom: 10rpx ;
							color: #000;
						}
						.user_time{
							color: #bbb;
						}
					}
				}
			}
			// 评论数据
			.comment_desc{
				margin: 15rpx 0;
				display: flex;
				justify-content: space-between;
				.comment_content{ 
					text{
						padding-left: 98rpx;
						display: inline;
						float: left;
					}
				}
				.comment_like{
					.iconfont{
						
					}
				}
			}
		}
	}
	.download{
		height:120rpx;
		display: flex;
		align-items:center;
		justify-content: center;
		.download_btn{
			width: 90%;
			height:85%;
			border-radius: 20rpx;
			background-color: $main;
			color:#fff;
			font-size:40rpx;
			// font-weight: 600;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
</style>
