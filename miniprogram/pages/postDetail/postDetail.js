const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        isLoading: true,
        show: false,
        current: 0,
        title: '',
        post: '',
        date: '',
        updated: '',
        cover: '',
        covers: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.cloud.callFunction({
            name: 'http',
            data: {
                type: 'postDetail',
                url: options.path
            }
        }).then((res) => {
            let copyPost = res.result.content
            copyPost = copyPost.replace(/<figure /g, '<pre ')
            copyPost = copyPost.replace(/<\/figure>/g, '</pre>')

            copyPost = copyPost.replace(/<td class=\"gutter\"><pre>.*<\/pre><\/td><td /g, '<td ')
            copyPost = copyPost.replace(/<table><tr><td class=\"code\"><pre>/g, '<code>')
            copyPost = copyPost.replace(/<\/pre><\/td><\/tr><\/table>/g, '</code>')

            let result = app.towxml(copyPost, 'html', {
                events: {
                    tap: event => {
                        // 只处理图片的点击事件
                        if (event.currentTarget.dataset.data && event.currentTarget.dataset.data.attrs && event.currentTarget.dataset.data.attrs.class == "h2w__img") {
                            // 传入图片地址，调用WeUI图片预览组件
                            this.setData({
                                show: true,
                                current: this.data.covers.findIndex(item => item === event.currentTarget.dataset.data.attrs.src)
                            })
                        }
                    }
                }
            });
            this.setData({
                isLoading: false,
                post: result,
                title: res.result.title,
                date: res.result.date,
                updated: res.result.updated,
                cover: res.result.cover,
                covers: res.result.covers || []
            })
        }).catch((err) => {
            console.error('获取postDetail失败', err)
            wx.showToast({
                icon: 'error',
                title: '获取详情失败'
            })
            this.setData({
                isLoading: false,
                post: '',
                title: '',
                date: '',
                updated: '',
                cover: 'https://huangruoqiu.github.io/img/404.jpg',
                covers: []
            })
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})