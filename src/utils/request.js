/* 基于es6 封装异步请求 */
export default (params)=>{
	/* 请求时加载效果 */
	uni.showLoading({
		title:"加载中...",
	})
	return new Promise((resolve,reject)=>{
		wx.request({
			...params,
			success(res){
				resolve(res.data);
			},
			fail(err){
				reject(err.msg);
			},
			/* 无论成功失败都会在执行 */
			complete() {
				uni.hideLoading()
			}
		})
	})
}