<!-- 
 scroll-viw:可滚动视图区域
 @scrolltolower="handleToLower"滚动触底触发事件
 -->
<template>
	<scroll-view scroll-y @scrolltolower="handleToLower" class="recommend_view" v-if="recommends.length>0">
		<!-- 推荐 -->
		<view class="recommend_wrap">
			<navigator class="recommend_item"
				v-for="item in recommends"
				:key="item.id"
				:url="`/pages/album/index?id=${item.target}`">
				<image :src="item.thumb" mode="widthFix"></image>
			</navigator>
		</view>
		<!-- 月份 -->
		<view class="monthes_wrap">
			<view class="monthes_title">
				<view class="monthes_title_info">
					<view class="monthes_info">
						<text>{{monthes.DD}}</text>
						/{{monthes.MM}} 月
					</view>
					<view class="monthes_text">{{monthes.title}}</view>
				</view>
				<view class="monthes_title_more">更多></view>
			</view>
			<view class="monthes_content">
				<view class="monthes_item" v-for="(item,index) in monthes.items" :key="item.id">
					<go-detail :list="monthes.items" :index="index" >
					    <image mode="aspectFill" :src="item.thumb+item.rule.replace('$<Height>',360)"></image>
					</go-detail>
				</view>
			</view>
		</view>
		<!-- 热门 -->
		<view class="hot_wrap">
			<view class="hot_title">
				<view class="hot_style">热门</view>
			</view>
			<view class="hot_content">
				<view class="hot_item" v-for="(item,index) in hots" :key="item.id">
					<go-detail :list="hots" :index="index">
						<image mode="widthFix" :src="item.thumb"></image>
					</go-detail>
				</view>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	import moment from "moment"
	import goDetail from "@/components/goDetail";
	import recommendItem from "../../Modul/recommendItem.vue"
	export default {
		components:{
			goDetail,
			recommendItem
		},
		data(){
			return{
				//推荐列表
				recommends:[],
				//月份
				monthes:[],
				//热门
				hots:[],
				//请求参数
				params:{
					limit:30,
					order:"hot",
					skip:0,//当请求第一页是跳过0条，请求第二页跳过30条
				},
				//是否还有下一页
				hasMore:true,
			}
		},
		/* 组件挂载完毕 */
		mounted() {
			uni.setNavigationBarTitle({
				title:"推荐"
			}),
			this.getList()
		},
		methods:{
			//获取接口数据
			getList(){
				this.request({
					url:"http://157.122.54.189:9088/image/v3/homepage/vertical",
					data:this.params
				}).then(result=>{
					// console.log(result)
					//判断还有没有下一页数据
					if(result.res.vertical.length===0){
						this.hasMore=false
						uni.showToast({
							title:"圣 诞 快 乐",
							icon:"none"
						})
						return
					}
					if(this.recommends.length===0){
						this.recommends=result.res.homepage[1].items
						this.monthes=result.res.homepage[2]
						this.monthes.MM=moment(this.monthes.stime).format("MM")
						this.monthes.DD=moment(this.monthes.stime).format("DD")
					}
					//数组拼接的方式
					this.hots=[...this.hots,...result.res.vertical]
					console.log( this.hots)
				})
			},
			//滚动条触底事件
			handleToLower(){
				console.log('圣 诞 快 乐')
				/* 
				 1.修改参数 skip+=limit
				 2.重新发送请求
				 3.hots数据的叠加
				 */
				if(this.hasMore){
					this.params.skip+=this.params.limit
					this.getList()
					return
				}
				//弹窗提示
				uni.showToast({
					title:"没有更多数据了",
					icon:"none"
				})
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.recommend_view{
		height:calc(98vh);//计算属性
	}
	.recommend_wrap{
		display: flex;
		flex-wrap: wrap;
		.recommend_item{
			width:50%;
			border:5rpx solid $red;
		}
	}
	.monthes_wrap{
		.monthes_title{
			display: flex;
			justify-content: space-between;
			padding: 20rpx;
			.monthes_title_info{
				display: flex;
				font-size: 30rpx;
				font-weight: 600;
				.monthes_info{
					text{
						font-size: 36rpx;
					}
				}
				.monthes_text{
					font-size:34rpx;
					color: #55557f;
					margin-left: 30rpx;
				}
			}
			.monthes_title_more{
				font-size: 24rpx;
			}
		}
		.monthes_content{
			display: flex;
			flex-wrap: wrap;
			.monthes_item{
				width:33.33%;
				border:5rpx solid $red;
			}
		}
	}
	.hot_wrap{
		.hot_title{
			padding: 20rpx;
			font-size: 30rpx;
			font-weight: 600;
			.hot_style{
				border-left: 15rpx #55557f solid;
				padding-left: 15rpx;
			}
		}
		.hot_content{
			display: flex;
			flex-wrap: wrap;
			.hot_item{
				width:33.33%;
				border:5rpx solid $red;
			}
		}
	}
</style>
