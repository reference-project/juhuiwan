// playwodi.js
//获取应用实例
var app = getApp()

var util = require('../../utils/util.js')
var underscore = require('../../utils/underscore.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    benjuInfo: app.globalData.benjuInfo
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    this.setData({
      benjuInfo: app.globalData.benjuInfo
    })
    console.log("this.data.benjuInfo")
    console.log(this.data.benjuInfo)
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
  btn_setPlayerCount:function(e){
    var options = underscore.extend(
      this.data.benjuInfo,
      { 
        playerCount: e.detail.value
      }
    )
    this.setData({
      benjuInfo: options
    });
    console.log('input 发生 blur 事件，携带值为', e.detail.value)
  },
  change_isBaiban: function (e) {
    var options = underscore.extend(
      this.data.benjuInfo,
      {
        enable_baiban: e.detail.value
      }
    )
    this.setData({
      benjuInfo: options
    });
  
    console.log('switch1 发生 change 事件，携带值为', e.detail.value)
  },
  startGame:function () {
   
    console.log("开始发词");
    
    console.log(this.data.benjuInfo)
    
    var playerCount = parseInt(this.data.benjuInfo.playerCount);

    //随机抽取卧底
    var wodiArray=[];
    for (var i = 0; i < parseInt(this.data.benjuInfo.wodi_count);i++){
      var wodiIndex = parseInt(Math.random() * playerCount);
      while (wodiArray.indexOf(wodiIndex)!=-1){
        wodiIndex = parseInt( Math.random() * playerCount);
      }
      console.log("选择卧底："+wodiIndex)
      wodiArray.push(wodiIndex);//选择一个卧底
    }
    this.data.benjuInfo["wodi_array"] = wodiArray;

    //启用白板
    if (this.data.benjuInfo.enable_baiban){
      //随机抽取白板
      var baibanArray = [];
      for (var i = 0; i < parseInt(this.data.benjuInfo.baiban_count); i++) {
        var baibanIndex = parseInt(Math.random() * playerCount);
        while (wodiArray.indexOf(baibanIndex) != -1 || baibanArray.indexOf(baibanIndex) != -1) {
          baibanIndex = parseInt(Math.random() * playerCount);
        }
        console.log("选择白板：" + baibanIndex)
        baibanArray.push(baibanIndex);//选择一个卧底
      }

      this.data.benjuInfo["baiban_array"] = baibanArray;
    }

    

    
    app.globalData.benjuInfo = this.data.benjuInfo;
    wx.navigateTo({
      url: '../wordinfo/wordinfo'
    })
  }
})