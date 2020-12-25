<template>
	<view>
		<!-- 专辑背景图片 -->
		<view class="album_bg" >
			<image mode="widthFix" :src="album.cover"></image>
			<view class="album_info">
				<view class="album_name">{{album.name}}</view>
				<view class="album_btn" v-if="Object.keys(this.album).length!==0">关注专辑</view>
			</view>
		</view>
		<!-- 专辑作者 -->
		<view class="album_author">
			<view class="album_author_info">
				<image mode="widthFix" :src="album.user.avatar"></image>
				<view class="author_name">{{album.user.name}}</view>
			</view>
			<view class="album_author_desc">
				<text>{{album.desc}}</text>
			</view>
		</view>
		<!-- 列表 -->
		<view class="album_list">
			<view class="album_item"
				v-for="(item,index) in wallpaper"
				:key="item.id"
			>
			<go-detail :list="wallpaper" :index="index">
				<image mode="aspectFill" :src="item.thumb+item.rule.replace('$<Height>',360)"></image>
				<!-- <image mode="widthFix" src="http://img5.adesk.com/5e5cf6cee7bce739af76540d?imageView2/3/h/360"></image> -->
			</go-detail>
			</view>
		</view>
	</view>
</template>

<script>
	import goDetail from "@/components/goDetail.vue"
	export default{
		components:{
			goDetail
		},
		data(){
			return{
				params:{
					limit:30,
					order:"new",
					skip:0,
					first:1
				},
				id:-1,
				album:{},//详情
				wallpaper:[],//列表
				hasMore:true,
			}
		},
		onLoad(options) {
			console.log(options)
			// this.id=options.id
			// this.id="5dea515de7bce73981faf1a9"
			this.id="5d5f8e45e7bce75ae7fb8278"
			this.getList()
		},
		//整个页面滚动， 使用onReachBottom触底事件 上拉加载下一页事件
		onReachBottom() {
			console.log('圣 诞 快 乐')
			if(this.hasMore){
				this.params.first=0
				this.params.skip+=this.params.limit
				this.getList()
				return
			}
			uni.showToast({
				title:"圣 诞 快 乐",
				icon:"none"
			})
		},
		methods: {
			getList(){
				this.request({
					url:`http://157.122.54.189:9088/image/v1/wallpaper/album/${this.id}/wallpaper`,
					data:this.params
				}).then(result=>{
					console.log(result)
					// console.log(JSON.stringify(result.res.album.desc))//json格式打印
					if(Object.keys(this.album).length===0){//this.album是一个对象，所以先转换数组
						this.album=result.res.album
					}
					if(result.res.wallpaper.length===0){
						this.hasMore=false
						uni.showToast({
							title:"圣 诞 快 乐",
							icon:"none"
						})
						return
					}
					this.wallpaper=[...this.wallpaper,...result.res.wallpaper]
					console.log(this.wallpaper)
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.album_bg{
		position:relative;
		image{
			
		}
		.album_info{
			position:absolute;
			width:100%;
			left:0;
			bottom:0;
			display: flex;
			justify-content: space-between;
			height:80rpx;
			color: #fff;
			padding:0 15rpx;
			.album_name{
				font-size: 40rpx;
			}
			.album_btn{
				background-color: $main;
				width:152rpx;
				height:60rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 10rpx;
			}
		}
	}
	.album_author{
		padding:40rpx 10rpx;
		.album_author_info{
			display: flex;
			padding:10rpx;
			image{
				width:40rpx;
			}
			.author_name{
				font-size: 30rpx;
				color: #000;
				margin-left: 15rpx;
			}
		}
		.album_author_desc{
			padding :5rpx;
		}
	}
	.album_list{
		display: flex;
		flex-wrap:wrap;//换行
		.album_item{
			width: 33.33%;
			border: 3rpx solid #fff;
			image{
				height:160rpx;
			}
		}
	}
</style>
