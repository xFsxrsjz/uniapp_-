<template>
	<scroll-view @scrolltolower="handleTolower" class="recommend_view" scroll-y v-if="recommendList.length>0">
		<!-- 推荐开始 -->
		<view class="recommend_wrap">
			<view class="recommend_item" v-for="item in recommendList" :key="item.id">
				<image mode="widthFix" :src="item.thumb"></image>
				<!-- mode="widthFix" 表示让高度自适应，宽度固定 -->
			</view>
		</view>
		<!-- 月份开始 -->
		<view class="monents_wrap">
			<view class="monents_title">
				<view class="monents_title_info">
					<view class="monents_info">
						<text>{{months.DD}}/</text>
						{{months.MM}}月{{months.MM}}月
					</view>
					<view class="monents_text">
						{{months.title}}
					</view>
				</view>
				<view class="monents_title_more">更多></view>
			</view>
			<view class="monents_content">
				<view class="monents_item" v-for="item in months.items" :key="item.id">
					<image :src="item.thumb+item.rule.replace('$<Height>',360)" mode="aspectFill"></image>
				</view>
			</view>
		</view>
		<!-- 月份结束 -->

		<!-- 热门开始 -->
		<view class="hots_wrap">
			<view class="hots_title">
				<text>热门</text>
			</view>
			<view class="hots_content">
				<view class="hot_item" v-for="item in hots" :key="item.id">
					<image :src="item.thumb" mode="widthFix">
				</view>
			</view>
		</view> 	
		<!-- 热门结束 -->
	</scroll-view>
</template>

<script>
	import moment from 'moment'
	export default {
		data() {
			return {
				recommendList:[],
				months:{},
				hots:[],
				params:{
					limit:30,
					order:'hot',
					skip:0//跳过多少条，实现分页
				},
				//是否还有下一页
				hasMore:true
			}
		},
		methods: {
			//滚动条触底事件
				handleTolower(){
					// 1.修改参数 skip+=limit 2.重新发送请求 3.hots数据的叠加
					if(this.hasMore){
						this.params.skip+=this.params.limit;
						this.getList();
					}else{
						//弹框提示
						uni.showToast({
							title:'没有数据了',
							icon:'none'
						})
					}
				},
				//获取页面数据
				getList(){
					this.request({
						url:"http://157.122.54.189:9088/image/v3/homepage/vertical",
						data:this.params
					}).then(res=>{
						//判断还有没有数据
						if(res.res.vertical.length===0){
							this.hasMore=false;
							return
						}
						if(this.recommendList.length===0){
							//第一次发送请求
							//console.log(res)
							//推荐模块
							this.recommendList=res.res.homepage[1].items
							//月份模块
							this.months=res.res.homepage[2];
							//将时间戳改成 18号/月 moment.js
							this.months.MM=moment(this.months.stime).format('MM')
							this.months.DD=moment(this.months.stime).format('DD')
						}
						//热门模块
						//数组拼接
						this.hots=[...this.hots,...res.res.vertical];
			})
				}
		},
		mounted() {
			this.getList()
		}
	}
</script>

<style lang="scss" scoped>
.recommend_view {
  // height：屏幕的高度 -  头部标题的高度
  height: calc(100vh - 36px);
}
.recommend_wrap {
  // flex布局
  display: flex;
  flex-wrap: wrap;
  .recommend_item {
    width: 50%;
    border: 5rpx solid #fff;
  }
}
.monents_wrap {
  .monents_title {
    display: flex;
    justify-content: space-between;
    padding: 20rpx;
    .monents_title_info {
      color: $main;
      font-size: 30rpx;
      font-weight: 600;
      display: flex;
      .monents_info {
        text {
          font-size: 36rpx;
        }
      }

      .monents_text {
        font-size: 34rpx;
        color: #666;
        margin-left: 30rpx;
      }
    }

    .monents_title_more {
      font-size: 24rpx;
      color: $main;
    }
  }

  .monents_content {
    display: flex;
    flex-wrap: wrap;
    .monents_item {
      width: 33.33%;
      border: 5rpx solid #fff;
    }
  }
}
.hots_wrap {
  .hots_title {
    padding: 20rpx;
    text {
      border-left: 20rpx solid &main;
      padding-left: 20rpx;
      font-size: 34rpx;
      font-weight: 600;
    }
  }

  .hots_content {
    display: flex;
    flex-wrap: wrap;
    .hot_item {
      width: 33.33%;
      border: 5rpx solid #fff;
      image {
      }
    }
  }
}
</style>
