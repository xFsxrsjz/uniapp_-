<script>
	/* 
	生命周期：
	 全局APP中使用onLaunch表示应用启动
	 页面中使用onLoad或者onShow表示页面加载完毕时和页面完成时
	 组件中使用mounted组件挂载完毕时
	 */
	
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "./styles/iconfont.wxss";
	@import "./styles/base.wxss";
	
</style>
