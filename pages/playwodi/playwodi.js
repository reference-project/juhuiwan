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
    benjuInfo: app.globalData.benjuInfo,
    index:2,
    playerNumArray:[4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
    pingmin_word:"",
    wodi_word:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    this.setData({
      benjuInfo: app.globalData.benjuInfo
    })
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

// 1 8 2  12 3 16 4
    var playerNum = this.data.playerNumArray[parseInt(e.detail.value)];

    var wodi_count=1;
    if (playerNum < 8){
      wodi_count=1;
    } else if (playerNum >= 8 && playerNum<12){
      wodi_count=2;
    } else if (playerNum >= 12 && playerNum<16){
      wodi_count=3;
    }else{
      wodi_count=4;
    }
    var options = underscore.extend(
      this.data.benjuInfo,
      { 
        playerCount: playerNum,
        wodi_count: this.data.benjuInfo.enable_baiban ? wodi_count - 1 : wodi_count,
        baiban_count: this.data.benjuInfo.enable_baiban?1:0
      }
    )
    this.setData({
      index: parseInt(e.detail.value),
      benjuInfo: options
    });
    console.log('input 发生 blur 事件，携带值为', e.detail.value)
  },
  change_isBaiban: function (e) {
    var options = underscore.extend(
      this.data.benjuInfo,
      {
        enable_baiban: e.detail.value,
        baiban_count: e.detail.value?1:0,
        wodi_count: e.detail.value ? this.data.benjuInfo.wodi_count - 1 : this.data.benjuInfo.wodi_count+ 1
      }
    )
    console.log(options);
    this.setData({
      benjuInfo: options
    });
  
    console.log('switch1 发生 change 事件，携带值为', e.detail.value)
  },
  setPingMinWord:function(e){
    
    this.setData({
      pingmin_word: e.detail.value
    });

    console.log('input 发生 blur 事件，携带值为', e.detail.value)
  },
  setWoDiWord:function(e){
 
    this.setData({
      wodi_word: e.detail.value
    });
  
    console.log('input 发生 blur 事件，携带值为', e.detail.value)
  },
  startGame:function () {
   
    console.log("开始发词");
    
    
    if (this.data.pingmin_word&&this.data.wodi_word){
      this.data.benjuInfo = app.getNewGameConfig(this.data.benjuInfo || app.globalData.benjuInfo||{}, false);
      this.data.benjuInfo["pingmin_word"] = this.data.pingmin_word;
      this.data.benjuInfo["wodi_word"] = this.data.wodi_word;
      console.log("已填写身份词 不随机选择");
    }else{
      this.data.benjuInfo = app.getNewGameConfig(this.data.benjuInfo || app.globalData.benjuInfo||{}, true);
      console.log("随机选择");
    }
    console.log(this.data.benjuInfo);

    
    app.globalData.benjuInfo = this.data.benjuInfo;
    wx.navigateTo({
      url: '../gamemain/gamemain'
    })
  }
})