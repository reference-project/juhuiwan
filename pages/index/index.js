//index.js
//获取应用实例
var app = getApp()


var PageItems =
  [
    {
      text: '谁是卧底',
      icon: '../../images/a.png',
      route: '../c1/c1',
    },
    {
      text: '格子2',
      icon: '../../images/a.png',
      route: '杀人游戏',
    },
    {
      text: '格子3',
      icon: '../../images/a.png',
      route: '../c3/c3',
    }
  ];
 
Page({
  data: { 
    userInfo: {},
    pageItems: [] ,
    showTopTips: false,

    radioItems: [
      { name: 'cell standard', value: '0' },
      { name: 'cell standard', value: '1', checked: true }
    ],
    checkboxItems: [
      { name: 'standard is dealt for u.', value: '0', checked: true },
      { name: 'standard is dealicient for u.', value: '1' }
    ],

    date: "2016-09-01",
    time: "12:01",

    countryCodes: ["+86", "+80", "+84", "+87"],
    countryCodeIndex: 0,

    countries: ["中国", "美国", "英国"],
    countryIndex: 0,

    accounts: ["微信号", "QQ", "Email"],
    accountIndex: 0,

    isAgree: false
  },
  //事件处理函数
  bindViewTap: function() {
    console.log("bindViewTap")
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    console.log(this)

    var pageItems = [];
    var row = [];
    var len = PageItems.length;//重组PageItems 
    len = Math.floor((len + 2) / 3) * 3;
    for (var i = 0; i < len; i++) {
      if ((i + 1) % 3 == 0) {
        row.push(PageItems[i]);
        pageItems.push(row);
        row = [];
        continue;
      }
      else {
        row.push(PageItems[i]);
      }
    } 
    console.log(this)
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      console.log(userInfo)
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })

    wx.getSystemInfo({
      success: function (res) {
        var windowWidth = res.windowWidth;
        that.setData({
          cellHeight: (windowWidth / 3) + 'px'
        })
      },
      complete: function () {
        that.setData({
          pageItems: pageItems
        })
      }
    })

  },
  startGame:function(){
    console.log("开始游戏")
    console.log(app) 
    var ciku = app.globalData.ciku;
    var wordIndex = parseInt(Math.random() * ciku.length);
    var wordPair = ciku[wordIndex];
    console.log("选择词Index="+wordIndex+":"+wordPair)
    var pingpinci = wordPair.split("——")[0].trim();
    var wordci = wordPair.split("——")[1].trim();
  
    app.globalData.benjuInfo["pingmin_word"] = pingpinci;
    app.globalData.benjuInfo["wodi_word"] = wordci;
    

    wx.navigateTo({
      url: '../playwodi/playwodi'
    })
  }
})
