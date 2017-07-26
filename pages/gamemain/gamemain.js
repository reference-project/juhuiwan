// gamemain.js

var app = getApp()

var util = require('../../utils/util.js')
var _ = require('../../utils/underscore.js')
var personNameMap = {};
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scroll_y:true,
    showResultDialog:false,
    yichakan_kapai_list:[],
    weichakan_kapai_list:[]
 
  } ,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    // this.showGameResultDialog("pingmin");
    var that=this;
    wx.getSystemInfo({
      success: function (res) {

        that.setData({
          windowHeight: res.windowHeight
        });

        console.log(res);

      },
      complete: function () {

      }
    })
    // playerCount: 6,
    //   pingmin_word: "",
    //     wodi_word: "",
    //       wodi_count:2,
    //         wodi_array:[],
    //           enable_baiban: false,
    //             baiban_count:0,
    //               baiban_array:[],
    //                 current_player:1
    this.renderWoDiList(options["player_num"])

   
  },
  renderWoDiList: function (player_num){
    if (!player_num) {
      var benjuInfo = app.globalData.benjuInfo;

      var weichakan_kapai_list = [];
      for (var i = 0; i < benjuInfo.playerCount; i++) {

        weichakan_kapai_list.push({
          image_src: "../../images/zhuangtai1.png",
          player_name: personNameMap[(i + 1)+""]|| (i + 1) + "号玩家",
          player_num: i + 1,
          player_name_input_visable:false
        });

      }

      this.setData({
        weichakan_kapai_list: weichakan_kapai_list
      });

      app.globalData.benjuInfo.weichakan_kapai_list = weichakan_kapai_list;
      app.globalData.benjuInfo.yichakan_kapai_list = [];

    } else {

      var weichakan_kapai_list = app.globalData.benjuInfo.weichakan_kapai_list;
      var yichakan_kapai_list = app.globalData.benjuInfo.yichakan_kapai_list;
      var yichakan_player_num = parseInt(player_num);
      //计算已查看底牌的玩家

      var yichakan_player = _.find(weichakan_kapai_list, function (item) {
        return item.player_num == yichakan_player_num;
      });
      yichakan_kapai_list.push(yichakan_player);


      weichakan_kapai_list = _.without(weichakan_kapai_list, yichakan_player);

      this.setData({
        weichakan_kapai_list: weichakan_kapai_list,
        yichakan_kapai_list: yichakan_kapai_list
      });

      app.globalData.benjuInfo.yichakan_kapai_list = yichakan_kapai_list;
      app.globalData.benjuInfo.weichakan_kapai_list = weichakan_kapai_list;
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (options) {
  
    
    
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
  setPlayerName:function(e){
    console.log(e)
    if (e.detail.value){
   
      var player_num = e.currentTarget.dataset.player_num;
      var weichakan_kapai_list = this.data.weichakan_kapai_list;
      for (var i = 0; i < weichakan_kapai_list.length; i++) {
        if (weichakan_kapai_list[i]["player_num"] == player_num) {
          weichakan_kapai_list[i]["player_name"] = e.detail.value;
          weichakan_kapai_list[i]["player_name_input_visable"] = false;

          //保存名字
          personNameMap[player_num] = e.detail.value;
        }
      }

      this.setData({
        weichakan_kapai_list: weichakan_kapai_list
      });
      app.globalData.benjuInfo.weichakan_kapai_list = weichakan_kapai_list;
      console.log('input 发生 blur 事件，携带值为', e.detail.value)
    }
   
  },
  //揭开底牌
  jiekaidipai: function (player_num) {
    console.log("揭开底牌")
  
    console.log(app.globalData.benjuInfo);
    wx.redirectTo({
      url: '../dipai/dipai?player_num='+ player_num
    })
  },
  modify_playerName: function (player_num){
    var weichakan_kapai_list = this.data.weichakan_kapai_list;
    for (var i = 0; i < weichakan_kapai_list.length; i++) {
      if (weichakan_kapai_list[i]["player_num"] == player_num) {
        weichakan_kapai_list[i]["player_name_input_visable"] = true;
      }
    }

    this.setData({
      weichakan_kapai_list: weichakan_kapai_list
    });
    app.globalData.benjuInfo.weichakan_kapai_list = weichakan_kapai_list;
  },
  showGameResultDialog:function(whoSuccess){
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
         
        that.setData({
          scroll_y:false,
          showResultDialog: true,
          windowHeight:res.windowHeight,
          result_image_src: whoSuccess == "pingmin" ? "../../images/pingminshengli1.gif" : "../../images/wodishengli.gif"
        }); 

        console.log(res);
 
      },
      complete: function () {

      }
    })

   
  },
  hideGameResultDialog:function(){
    this.setData({
      scroll_y:true,
      showResultDialog: false,
      result_image_src: ""
    });
  },
  //判定游戏胜利
  panding:function(){

    var wodi_array = app.globalData.benjuInfo.wodi_array;
    var baiban_array = app.globalData.benjuInfo.baiban_array;
   
    

   //获取未出局的玩家
    var weichuju = _.filter(this.data.yichakan_kapai_list, function (item) {
     
      return !item["out_status"];
    });

    var wodi_orBaiban = _.filter(weichuju, function (item) {

     //卧底或者白板
     return wodi_array.indexOf(item["player_num"] - 1) != -1 || baiban_array.indexOf(item["player_num"] - 1) != -1;
   });

 /**
  * 判定胜利规则
  1.卧底全部出局 平民胜利
  2.卧底存活只剩两个人 卧底胜利
  */

   console.log("还剩" + weichuju.length + "个玩家,其中卧底" + wodi_orBaiban.length+"个");
   if (wodi_orBaiban.length > 0 && weichuju.length==2 ){
     this.game_over=true;
     this.showGameResultDialog("wodi");
   } else if (wodi_orBaiban.length== 0){
     this.game_over = true;
     //平民胜利 游戏结束
     this.showGameResultDialog("pingmin");
   }else{
     this.game_over = false;
     wx.showToast({
       title: '游戏继续',
       duration: 3000
     });
   }

  },
  taotai_player: function (player_num){

    //淘汰
    var yichakan_kapai_list= this.data.yichakan_kapai_list;
    for (var i = 0; i < yichakan_kapai_list.length;i++){
      if (yichakan_kapai_list[i]["player_num"] == player_num){
        yichakan_kapai_list[i]["out_status"]=true;
        yichakan_kapai_list[i]["image_src"] = "../../images/zhuangtai2.png";
        yichakan_kapai_list[i]["out_status_player_name"] ="out_status_player_name";
      }
    }

    this.setData({
      yichakan_kapai_list: yichakan_kapai_list
    });

    app.globalData.benjuInfo.yichakan_kapai_list = yichakan_kapai_list;

// 判定是否胜利
    this.panding();


  },
  //操作
  player_caozuo:function(e){
    var player_num = e.currentTarget.dataset.player_num;
    var player_type = e.currentTarget.dataset.player_type;
    var that=this;

   
 
    if (!this["game_over"]){
       
      if (player_type=="yichakan"){

            var thePlayer = _.filter(this.data.yichakan_kapai_list, function (item) {

              return item["player_num"] == player_num;
            });

            if (thePlayer[0]["out_status"]) {

            } else {
            wx.showActionSheet({
              itemList: ['本轮出局'],
              success: function (res) {
                if (!res.cancel) {
                  console.log(res.tapIndex);
                  if (res.tapIndex == 0) {
                    that.taotai_player(player_num);
                  } 
                
                }
              }
            });
            }
          }else{
            wx.showActionSheet({
              itemList: ['查看词语', '修改昵称'],
              success: function (res) {
                if (!res.cancel) {
                  console.log(res.tapIndex);
                  if (res.tapIndex == 0) {
                    that.jiekaidipai(player_num);
                  } else if (res.tapIndex == 1) {
                    that.modify_playerName(player_num);
                   
                }
                }
              }
            });
          }
          
      
    }else{
      wx.showToast({
        title: '本轮游戏结束',
        duration: 3000
      });
      console.log("游戏结束");
    }
   
    
  },
  restart:function(){
    
    
    this.hideGameResultDialog();

    //重开新局
    app.globalData.benjuInfo = app.getNewGameConfig(app.globalData.benjuInfo, true);
    this.setData({
      yichakan_kapai_list: [],
      weichakan_kapai_list: []
    });
    this.renderWoDiList();
    this.game_over = false;
  },
  jiekai:function(){

    this.hideGameResultDialog();

    var wodi_array = app.globalData.benjuInfo.wodi_array;
    var baiban_array = app.globalData.benjuInfo.baiban_array;
    var pingmin_word = app.globalData.benjuInfo.pingmin_word;
    var wodi_word = app.globalData.benjuInfo.wodi_word;
    //淘汰
    var yichakan_kapai_list = this.data.yichakan_kapai_list;
    for (var i = 0; i < yichakan_kapai_list.length; i++) {
      if (wodi_array.indexOf(yichakan_kapai_list[i]["player_num"] - 1) != -1){
        yichakan_kapai_list[i]["image_src"] = "../../images/wodi.png";
        yichakan_kapai_list[i]["player_name"] = yichakan_kapai_list[i]["player_name"]+"(卧底)";
        yichakan_kapai_list[i]["word"] = wodi_word;
        yichakan_kapai_list[i]["dipai"] = "dipai";
        
      } else if (baiban_array.indexOf(yichakan_kapai_list[i]["player_num"] - 1) != -1){
        yichakan_kapai_list[i]["image_src"] = "../../images/baiban.png";
        yichakan_kapai_list[i]["player_name"] = yichakan_kapai_list[i]["player_name"] + "(白板)";
        yichakan_kapai_list[i]["word"] = "";
        yichakan_kapai_list[i]["dipai"] = "dipai";
        
      }else{
        yichakan_kapai_list[i]["image_src"] = "../../images/pingmin.png";
        yichakan_kapai_list[i]["player_name"] = yichakan_kapai_list[i]["player_name"] + "(平民)";
        yichakan_kapai_list[i]["word"] = pingmin_word;
        yichakan_kapai_list[i]["dipai"] = "dipai";
      }
    }

    this.setData({
      yichakan_kapai_list: yichakan_kapai_list
    });

    app.globalData.benjuInfo.yichakan_kapai_list = yichakan_kapai_list;

  }
})