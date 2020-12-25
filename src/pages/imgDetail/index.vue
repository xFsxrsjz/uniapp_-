<!--
 图片详情页面 会先执行图片的渲染 数据加载在后 所以直接写会拿不到图片信息
 moment.js处理时间格式
  fromNow()显示XXX月前
  moment.locale("zh-cn")使用中文语言
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
				<text class="iconfont icondianzan">{{imgDetail.rank}}</text>
			</view>
			<view class="user_collect">
				<text class="iconfont iconshoucang">收藏</text>
			</view>
		</view>
		<!-- 专辑 -->
		<view class="album_wrap">
			<view class="album_title">相关</view>
			<view class="album_list">
				<!-- <view class="album_item" v-for="item in album" :key="item.id"> -->
				<view class="album_item">
					<view class="album_cover">
						<image :src="imgDetail.thumb"></image>
					</view>
					<view class="album_info">
						<view class="album_info_text">专辑</view>
						<view class="album_info_name">{{item.name}}小熊猫</view>
						<text class="iconfont iconiconfontjiantou4"></text>
					</view>
				</view>
			</view>
		</view>
		<!-- 最热评论 -->
		<view class="comment hot">
			<view class="comment_title">
				<text class="iconfont iconhot1"></text>
				<text class="comment_text">最热评论</text>
			</view>
			<view class="comment_list">
				<view class="comment_item">
					<view class="comment_user">
						<view class="user_icon">
							<image :src="imgDetail.thumb"></image>
						</view>
						<view class="user_name">
							<view class="user_nickname">{{imgDetail.user.name}}</view>
							<view class="user_time">
								{{imgDetail.cnTime}}
							</view>
						</view>
					</view>
					<view class="comment_desc">
						<view class="comment_content">
							<text>{{imgDetail.tag[1]}}</text>
						</view>
						<view class="comment_like">
							<text class="iconfont icondianzan"></text>
							<text>666</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 下载图片 -->
		<view class="download">
			<view class="download_btn">
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
				imgDetail:{},//图片信息
				album:[],
				imgIndex:0,//图片索引
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
				console.log('all',this.imgDetail)
				this.imgDetail.newThumb=this.imgDetail.thumb+this.imgDetail.rule.replace('$<Height>',350)
				
				// xxx年前的数据
				// atime单位为秒,moment接收单位毫秒
				this.imgDetail.cnTime = moment(this.imgDetail.atime * 1000).fromNow()
				this.getComment(this.imgDetail.id)
			},
			getComment(id){
				console.log(id)
				this.request({
					url:"http://157.122.54.189:9088/image/v2/wallpaper/wallpaper/${id}/comment",
				}).then(result=>{
					console.log(result)
					this.album = result.res.album;
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
