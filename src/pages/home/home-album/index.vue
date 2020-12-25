<!-- 
 使用setNavigationBarTitle修改 鼎泰修改组件页面标题
 使用swiper轮播图组件
	 1.自动轮播 autoplay
	 2.指示器 indicator-dots
	 3.衔接轮播 (循环) circular
	 
	 4.swiper
	   默认高度 150px
	 5.image
	   默认高度 320px
	   默认宽度 240px
	 6.计算图片的宽高比例
	 7.将图片比例写到swiper中
	 8.swiper-item
	   默认宽高100%
 使用scroll-view组件实现分页
 点击跳转到专辑详情页
 -->
<template>
	<scroll-view class="album_scroll_view" scroll-y @scrolltolower="handleToLower">
		<!-- 轮播图 -->
		<view class="album_swiper">
			<swiper autoplay indicator-dots circular>
				<swiper-item
					v-for="item in banner"
					:key="item.id"
				>
					<image :src="item.thumb"></image>
				</swiper-item>
			</swiper>
		</view>
		<!-- 列表 -->
		<view class="albm_list">
			<navigator 
				class="album_item"
				v-for="item in album"
				:key="item.id"
				:url="`/pages/album/index?id=${item.id}`"
			>
				<view class="album_img">
					<image :src="item.cover" mode="aspectFill"></image>
				</view>
				<view class="album_info">
					<view class="album_name">{{item.name}}</view>
					<view class="album_desc">{{item.desc}}</view>
					<view class="album_but">
						<view class="album_attention">关注</view>
					</view>
				</view>
			</navigator>
		</view>
	</scroll-view>
</template>

<script>
	export default{
		data(){
			return{
				params:{
					limit:30,
					order:"new",
					skip:0,
				},
				//轮播图数组
				banner:[],
				//列表数组
				album:[],
				//是否还有分页数据
				hasMore:true,
			}
		},
		mounted(){
			//修改页面标题
			uni.setNavigationBarTitle({
				title:"专辑"
			}),
			this.getList()
		},
		methods:{
			getList(){
				this.request({
					url:"http://157.122.54.189:9088/image/v1/wallpaper/album",
					data:this.params
				}).then(result=>{
					if(this.banner.length===0){
						this.banner=result.res.banner
					}
					if(result.res.album.length===0){
						this.hasMore=false
						return
					}
					this.album=[...this.album,...result.res.album]
					// console.log(this.album) 
				})
			},
			//上拉加载-执行分页
			handleToLower(){
				console.log('圣 诞 快 乐')
				if(this.hasMore){
					this.params.skip += this.params.limit
					this.getList()
					return
				}
				uni.showToast({
					title:"没有更多数据",
					icon:"none"
				})
			}
		}
	}
</script>

<style lang="scss" scoper>
	.album_scroll_view{
		height:calc(100vh - 36px);
		.album_swiper{
			swiper{
				//默认750
				height:calc(750rpx / 2.3);
				image{
					height: 100%;
				}
			}
		}
		.albm_list{
			padding:10rpx;
			.album_item{
				padding:10rpx 0;
				display: flex;
				border-bottom: 1rpx solid #ccc;
				.album_img{
					flex:1;
					padding: 10rpx;
					image{
						width:200rpx;
						height:200rpx;
					}
				}
			}
			.album_info{
				flex:2;
				padding:0 10rpx;
				overflow:hidden;
				position: relative;
				.album_name{
					font-size:30rpx;
					color: #000;
					padding:10rpx 0;
				}
				.album_desc{
					padding:10rpx 0;
					font-size:24rpx;
					text-overflow:ellipsis;//展示省略号
					overflow:hidden;
					white-space: nowrap;//不要换行
				}
				.album_but{
					padding: 20rpx;
					display: flex;
					justify-content: flex-end;
					.album_attention{
						position: absolute;
						bottom: 5px;
						color: $main;
						border: 1rpx solid $main;
						padding: 10rpx;
					}
				}
			}
		}
	}
</style>
 