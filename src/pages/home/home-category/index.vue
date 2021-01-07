<template>
	<view class="hme_category">
		<navigator class="cata_item" v-for="item in category" :key="item.id"
		:url="`/pages/imgCategory/index?id=${item.id}`">
			<!-- 当要对高自定义时，用aspectFill -->
			<image :src="item.cover" mode="widthFix"></image>
			<view class="cate_name">{{item.name}}</view>
		</navigator>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				category:[]
			}
		},
		mounted(){
			uni.setNavigationBarTitle({
				title:"分类"
			})
			this.getList()
		},
		methods:{
			getList(){
				this.request({
					url:"http://157.122.54.189:9088/image/v1/vertical/category"
				}).then(result=>{
					this.category=result.res.category
				})
			}
		}
	}
</script>

<style lang="scss">
	.hme_category{
		display: flex;
		flex-wrap: wrap; //换行属性
		
		.cata_item{
			width: 33.33%;
			position:relative;
			border: 5rpx solid #fff;
			
			image{
				
			}
			.cate_name{
				position:absolute;
				width:100%;
				height:40rpx;
				left:0;
				bottom: 20rpx;
				color: #fff;
				background-image: linear-gradient(to right top,rgba(0,0,0,.2),rgba(0,0,0,0));
				font-size: 40rpx;
				display: flex;
				align-items: center;
				padding: 20rpx;
			}
		}
	}
</style>
