// dipai.js

var app = getApp() 

Page({

  /**
   * 页面的初始数据
   */
  data: {
     word:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var current_player = app.globalData.benjuInfo.current_player;
    var wodi_array = app.globalData.benjuInfo.wodi_array;
    var baiban_array = app.globalData.benjuInfo.baiban_array;
    var pingmin_word = app.globalData.benjuInfo.pingmin_word;
    var wodi_word = app.globalData.benjuInfo.wodi_word;
    //判断是平民还是 卧底还是白板
    if (wodi_array.indexOf(current_player-1)!=-1){
      this.setData({
        word: wodi_word
      }) ;
    } else if (baiban_array.indexOf(current_player - 1) != -1) {
      this.setData({
        word: ""
      });
    }else{
      this.setData({
        word: pingmin_word
      });
    }
   
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
  
  },
  yes_i_get:function(){
    console.log("好的我知道了");
    if (app.globalData.benjuInfo.current_player == app.globalData.benjuInfo.playerCount){

      app.globalData.benjuInfo.current_player++;
      wx.navigateTo({
        url: '../waitpage/waitpage'
      })
    }else{
      app.globalData.benjuInfo.current_player++;
      wx.navigateBack();
    }
   
  }
})