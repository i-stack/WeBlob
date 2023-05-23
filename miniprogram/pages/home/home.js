const app = getApp();
const { it } = require("../../towxml/parse/parse2/entities/maps/entities")

Page({
    /**
     * 页面的初始数据
     */
    data: {
        swiperList: [
			{
				"path": "api/articles/项目代理/信用卡.json",
				"cover": `${app.globalData.domain}/images/信用卡/WechatIMG1573.jpeg`
			},
			{
				"path": "api/articles/项目代理/百度网盘超低价SVIP会员.json",
				"cover": `${app.globalData.domain}/images/百度网盘/040516194698_05681680682725.jpg`
			},
			{
				"path": "api/articles/项目代理/创业项目诚招代理.json",
				"cover": `${app.globalData.domain}/images/资源整合平台/WechatIMG495.jpeg`
			}
		],
		postFilterList: [],
        postList: [],
        pageNum: 1,
        pageSize: 10,
        isLoading: false,
        isLoadingComplete: false
	},

	getPostFilterList() {
		let that = this;
		wx.request({
			url: `${app.globalData.domain}/postFilterList.json`,
			header: {
			  'content-type': 'application/json'
			},
			success: res => {
				console.log(res.data)
				let filterList = res.data.list
				if (filterList && filterList.length) {
					that.setData({
						postFilterList: filterList
					})
				}
				that.getPostList()
			}, fail: err => {
				console.error('swiperList', err)
				that.getPostList()
			}
		})
	},
	
	getSwiperList() {
		let that = this;
		wx.request({
			url: `${app.globalData.domain}/swiperList.json`,
			header: {
			  'content-type': 'application/json'
			},
			success: res => {
				console.log(res.data)
				let swiperList = res.data.swiperList
				if (swiperList && swiperList.length) {
					that.setData({
						swiperList: swiperList
					})
				}
			}, fail: err => {
				console.error('swiperList', err)
			}
		})
	},

    getPostList() {
		let that = this;
		wx.request({
			url: `${app.globalData.domain}/api/posts.json`,
			header: {
			  'content-type': 'application/json'
			},
			success: res => {
				console.log(res.data)
				if (this.data.pageNum === 1) {
                    wx.stopPullDownRefresh()
                }
				let datas = res.data
				let newData = []
				for (let i = 0; i < datas.length; i++) {
					let item = datas[i];
					let showItem = true; 
					for (let j = 0; j < item.tags.length; j++) {
						let tagItem = item.tags[j]
						for (let k = 0; k < that.data.postFilterList.length; k++) {
							let filter = that.data.postFilterList[k];
							if (filter.tag == tagItem.name) {
								showItem = false;
								break;
							}
						}
						if (!showItem) break;
					}
					if (!item.cover) {
						item.cover = `${app.globalData.domain}/images/bg_img.jpg`
					} else if (!item.cover.includes("https://") && !item.cover.includes("http://")) {
						item.cover = `${app.globalData.domain}${item.cover}`
					}
					if (showItem) {
						newData.push(item)
					}
				}
                that.setData({
					isLoading: false,
					isLoadingComplete: true,
                    postList: that.data.postList.concat(newData)
                })
			}, fail: err => {
				console.error('获取postList失败', err)
                wx.showToast({
                    icon: 'error',
                    title: '获取文章失败'
                })
                that.setData({
                    isLoading: false
                })
			}
		})
    },

    navigateToPostDeatail(e) {
        wx.navigateTo({
            url: '../postDetail/postDetail?path=' + e.currentTarget.dataset.path
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
		this.getPostFilterList()
		this.getSwiperList()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {},

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {},

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {},

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        this.setData({
            pageNum: 1,
            postList: [],
            isLoading: true,
            isLoadingComplete: false
        })
        this.getPostList()
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        // if (!this.data.isLoadingComplete) {
        //     let currentPageNum = this.data.pageNum
        //     this.setData({
        //         isLoading: true,
        //         pageNum: currentPageNum + 1
        //     })
        //     this.getPostList()
        // }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {}
})