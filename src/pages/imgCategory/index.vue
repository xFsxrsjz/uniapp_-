<template>
	<view>
		<view class="category_tab">
			<view class="category_tab_title">
				<view class="title_inner">
					<uni-segmented-control
						:current="current" 
						:values="items.map(v=>v.title)" 
						@clickItem="onClickItem" 
						style-type="text" 	
						active-color="$main"
					>
					</uni-segmented-control>
				</view>
			</view>
			<view class="category_tab_content">
				<view class="cate_item" v-for="item in vertical" :key="item.id" @click="handleGoVideo(item)">
					<image mode="widthFix" :src="item.thumb" ></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	//引入分段器
	import {uniSegmentedControl} from "@dcloudio/uni-ui"
	export default{
		components:{
			uniSegmentedControl
		},
		data(){
			return{
				items:[
					{title:"最新",order:"new"},
					{title:"热门",order:"hot"},
				],
				current:0,
				params:{
					limit:30,
					skip:0,
					order:"new"
				},
				id:'',
				//显示页面数据的数组
				vertical:[],
			}
		},
		onLoad(options) {
			this.id=options.id
			this.getList()
		},
		methods:{
			onClickItem(e){
				/* 根据被点击的标题 切换order 重新发送请求 */
				if(this.current !== e.currentIndex){
					this.current = e.currentIndex
				}
				this.params.order = this.items[e.currentIndex].order
				this.getList ()
			},
			getList(){
				this.request({
					url:`http://157.122.54.189:9088/image/v1/vertical/category/${this.id}/vertical`,
					data:this.params
				}).then(result=>{
					console.log(result)
					this.vertical=result.res.vertical
				})
			},
			// 图片点击事件
			handleGoVideo(item){
				// 1将item数据存到全局共享中
				getApp().globalData.video=item
				
				uni.navigateTo({
					url:"/pages/videoPlay/index"
				})
			}
		}
	} 
</script>

<style lang="scss">
	.category_tab{
		.category_tab_title{
			position:relative;
			.title_inner{
				width:60%;
				margin:0 auto;
			}
			.iconfont{
				position:absolute;
				top:25%;
				transform: translate(-50%);
				right:5%;
				color: none;
			}
		}
		.category_tab_content{
			display: flex;
			flex-wrap: wrap;
			.cate_item{
				width:33.33%;
				border:5rpx solid #fff;
				image{
					
				}
			}
		}
	}
</style>