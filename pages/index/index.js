//index.js
//获取应用实例
var app = getApp();
 
Page({
  data: { 
    userInfo: {}
  },
  onLoad: function () {
    console.log('onLoad')
    console.log(this)
    var that=this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      console.log(userInfo)
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })



  },
  startGame:function(){
    console.log("开始游戏")

    wx.navigateTo({
      url: '../playwodi/playwodi'
    })
  },
  startOnlineGame:function(){
    // wx.showToast({
    //   title: '敬请期待',
    //   duration: 3000
    // });

    wx.navigateTo({
      url: '../playwodi/shuoming',
    })
  }
})
