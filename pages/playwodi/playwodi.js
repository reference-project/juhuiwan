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
    wodi_word:"",
    showModalStatus: false,
    items: [
      { name: 'rcyp', value: '日常用品', checked: 'true' },
      { name: 'sw', value: '食物', checked: 'true' },
      { name: 'rw', value: '人物', checked: 'true' },
      { name: 'dzw', value: '动植物', checked: 'true'},
      { name: 'cy', value: '成语', checked: 'true'},
      { name: 'ysj', value: '影视剧', checked: 'true'},
      { name: 'qt', value: '其他', checked: 'true'}
    ],
    selectClass:"rcyp,sw,rw,dzw,cy,ysj,qt"
  },/**
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
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    var selectItems=this.data.items;
    for(var i=0;i<selectItems.length;i++){
      if(e.detail.value.indexOf(selectItems[i]["name"])!=-1){
        selectItems[i]["checked"]=true;
      }else{
        selectItems[i]["checked"] = false;
      }
    }
    this.setData({
      items: selectItems,
      selectClass:e.detail.value.join(",")
    })
  },
  btn_selectClass:function(){
    this.util("close");
  },
  setClass:function(){
    this.util("close");
  },
  selectClass: function (e) {
    // var currentStatu = e.currentTarget.dataset.statu;
    this.util("open");
  },
  util: function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例 
    var animation = wx.createAnimation({
      duration: 200, //动画时长 
      timingFunction: "linear", //线性 
      delay: 0 //0则不延迟 
    });

    // 第2步：这个动画实例赋给当前的动画实例 
    this.animation = animation;

    // 第3步：执行第一组动画 
    animation.opacity(0).rotateX(-100).step();

    // 第4步：导出动画对象赋给数据对象储存 
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画 
    setTimeout(function () {
      // 执行第二组动画 
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象 
      this.setData({
        animationData: animation
      })

      //关闭 
      if (currentStatu == "close") {
        this.setData(
          {
            showModalStatus: false
          }
        );
      }
    }.bind(this), 200)

    // 显示 
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true
        }
      );
    }
  },
  btn_setPlayerCount:function(e){

//<6 1个
//>=6 <10 2个
//>=10 <14 3个
//>=14 <16 4个
//>16 5
// 1 8 2  12 3 16 4
    var playerNum = this.data.playerNumArray[parseInt(e.detail.value)];

    var wodi_count=1;
    if (playerNum < 6){
      wodi_count=1;
    } else if (playerNum >= 6 && playerNum<10){
      wodi_count=2;
    } else if (playerNum >= 10 && playerNum<14){
      wodi_count=3;
    } else if (playerNum >= 14 && playerNum < 16){
      wodi_count=4;
    }else{
      wodi_count = 5;
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
    
    this.data.benjuInfo["selectClass"] = this.data.selectClass;
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