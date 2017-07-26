//app.js
App({
  onLaunch: function() {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },

  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function(res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },
  //获取卧底词语
  getWords: function (cls) {
    var cikuLib = this.globalData.ciku;
    var ciku=[];
    if (cls){
      for (var i = 0; i < cikuLib.length; i++) {
        if (cls.split(',').indexOf(cikuLib[i].split('@')[0]) != -1) {
          ciku.push(cikuLib[i]);
        }
      }
    }else{
      ciku=cikuLib;
    }
 

    var wordIndex = parseInt(Math.random() * ciku.length);
    var wordPair = ciku[wordIndex];

    var wordPair_array = wordPair.split('@')[1].split("-");
    while (!wordPair_array.length == 2) {

      wordIndex = parseInt(Math.random() * ciku.length);
      wordPair = ciku[wordIndex];
      wordPair_array = wordPair.split('@')[1].split("-");
    }
    console.log("选择词Index=" + wordIndex + ":" + wordPair);

    return wordPair_array;
  },
  getNewGameConfig: function (benjuInfo, chooseWords){

    
    //抽取卧底
    var playerCount = parseInt(benjuInfo.playerCount);

    //随机抽取卧底
    var wodiArray = [];
    for (var i = 0; i < parseInt(benjuInfo.wodi_count); i++) {
      var wodiIndex = parseInt(Math.random() * playerCount);
      while (wodiArray.indexOf(wodiIndex) != -1) {
        wodiIndex = parseInt(Math.random() * playerCount);
      }
      console.log("选择卧底：" + wodiIndex)
      wodiArray.push(wodiIndex);//选择一个卧底
    }
    benjuInfo["wodi_array"] = wodiArray;
 

    //启用白板
    if (benjuInfo.enable_baiban) {
      //随机抽取白板
      var baibanArray = [];
      for (var i = 0; i < parseInt(benjuInfo.baiban_count); i++) {
        var baibanIndex = parseInt(Math.random() * playerCount);
        while (wodiArray.indexOf(baibanIndex) != -1 || baibanArray.indexOf(baibanIndex) != -1) {
          baibanIndex = parseInt(Math.random() * playerCount);
        }
        console.log("选择白板：" + baibanIndex)
        baibanArray.push(baibanIndex);//选择一个卧底
      }

      benjuInfo["baiban_array"] = baibanArray;
    }else{
      benjuInfo["baiban_array"]=[];
    }

    if (chooseWords){
      var wodiPair = this.getWords(benjuInfo["selectClass"]);
      var pingpinci = wodiPair[0].trim();
      var wordci = wodiPair[1].trim();
      benjuInfo["pingmin_word"] = pingpinci;
      benjuInfo["wodi_word"] = wordci;

    }

    return benjuInfo;
  },
  globalData: {
    userInfo: null,
    ciku: ["rcyp@盆-碗", "rcyp@天猫-淘宝", "rcyp@气泡-水泡", "rcyp@穿衣-试衣", "rcyp@公交-地铁", "rcyp@森马-以纯", "rcyp@镜子-玻璃", "rcyp@壁纸-贴画", "rcyp@盒饭-外卖", "rcyp@淘宝-拍拍", "rcyp@纸巾-手帕", "rcyp@唇膏-口红", "rcyp@水盆-水桶", "rcyp@纸巾-手帕", "rcyp@枕头-抱枕", "rcyp@手机-座机", "rcyp@面膜-面具", "rcyp@苹果-安卓", "rcyp@风衣-毛衣", "rcyp@晨光-真彩", "rcyp@脸盆-水桶", "rcyp@笤帚-拖把", "rcyp@衣服-裤子", "rcyp@浴缸-鱼缸", "rcyp@筷子-竹签", "rcyp@台灯-手电", "rcyp@直尺-三角板", "rcyp@放大镜-眼镜", "rcyp@尿不湿-卫生巾", "rcyp@铅笔盒-铅笔袋", "rcyp@热水袋-暖宝宝 ", "rcyp@点烟器-打火机", "rcyp@热的快-热水器", "rcyp@干洗机-甩干机", "rcyp@摩托车-电动车", "rcyp@散热器-电风扇", "rcyp@高跟鞋-增高鞋", "rcyp@鸭舌帽-遮阳帽", "rcyp@生活费-零花钱", "rcyp@麦克风-扩音器", "rcyp@洗衣粉-皂角粉", "rcyp@沐浴露-沐浴盐", "rcyp@洗发露-护发素", "rcyp@自行车-电动车", "rcyp@好好学习-天天向上", "rcyp@近视眼镜-隐形眼镜", "sw@米饭-大米 ", "sw@玉米-小米", "sw@白菜-生菜", "sw@饺子-包子", "sw@牛奶-豆浆", "sw@辣椒-芥末", "sw@烤肉-涮肉", "sw@橙子-橘子", "sw@葡萄-提子", "sw@面包-蛋糕", "sw@油条-麻花", "sw@鸡肉-肌肉  ", "sw@锅巴-薯片", "sw@皮蛋-卤蛋", "sw@鸭蛋-鸡蛋 ", "sw@鸭脖-鸡爪", "sw@粉丝-米线", "sw@牛肉-猪肉", "sw@蒙牛-伊利", "sw@夜宵-烧烤", "sw@泡菜-泡萝卜", "sw@回锅肉-肥肉", "sw@优乐美-香飘飘", "sw@可口可乐-百事", "sw@加多宝-王老吉", "sw@叉烧包-灌汤包", "sw@榨菜丝-萝卜头", "sw@汉堡包-肉夹馍", "sw@牛肉干-猪肉脯", "sw@泡泡糖-棒棒糖", "sw@土豆粉-酸辣粉", "sw@口香糖-木糖醇", "sw@酸菜鱼-水煮鱼", "sw@小笼包-灌汤包", "sw@大白兔-金丝猴", "sw@果粒橙-鲜橙多", "sw@铁观音-碧螺春", "sw@麻婆豆腐-皮蛋豆腐", "sw@鱼香肉丝-四喜丸子", "sw@红烧牛肉面-香辣牛肉面", "rw@同学-同桌", "rw@萝莉-御姐", "rw@剩女-御姐", "rw@胖子-肥肉", "rw@屌丝-宅男", "rw@王菲-那英", "rw@元芳-展昭", "rw@何炅-维嘉", "rw@状元-冠军", "rw@董永-许仙", "rw@若曦-晴川", "rw@谢娜-李湘", "rw@孟非-乐嘉", "rw@保安-保镖", "rw@金庸-古龙", "rw@赵敏-黄蓉", "rw@太监-人妖", "rw@作家-编剧", "rw@警察-捕快", "rw@孟飞-乐嘉", "rw@那英-韩红", "rw@特警-女警", "rw@吴昕-谢娜", "rw@爷爷-姥爷", "rw@萝莉控-大叔", "rw@王昭君-貂蝉", "rw@吴奇隆-四爷", "rw@唐伯虎-韦小宝", "rw@胡海泉-陈羽凡", "rw@陈奕迅-张学友", "rw@老朋友-老男孩", "rw@伐木工-木匠工", "rw@小矮人-葫芦娃", "rw@蜘蛛侠-蜘蛛精", "rw@吸血鬼-蝙蝠侠", "rw@老佛爷-老天爷", "rw@魔术师-魔法师", "rw@双胞胎-龙凤胎", "rw@丑小鸭-灰姑娘", "rw@富二代-高富帅", "rw@郭德纲-周立波", "rw@男朋友-前男友", "rw@小沈阳-宋小宝", "rw@班主任-辅导员", "rw@薰衣草-满天星", "rw@张韶涵-王心凌", "rw@刘诗诗-刘亦菲", "rw@甄子丹-李连杰", "rw@包青天-狄仁杰", "rw@梁山伯-祝英台", "rw@罗密欧-朱丽叶", "rw@奥特曼-咸蛋超人", "rw@天山老妖-东方不败", "rw@谢娜张杰-邓超孙俪", "rw@福尔摩斯-工藤新一", "rw@成吉思汗-努尔哈赤", "dzw@蚯蚓-蛇 ", "dzw@麻雀-乌鸦", "dzw@羊驼-绵羊", "dzw@海豚-海狮", "dzw@蝴蝶-蜜蜂", "dzw@玫瑰-月季", "dzw@仓鼠-老鼠", "dzw@猩猩-猴子", "dzw@黄瓜-丝瓜", "dzw@树枝-树干 ", "dzw@西红柿-圣女", "dzw@唐老鸭-小黄鸭", "cy@勇往直前-全力以赴", "cy@贵妃醉酒-黛玉葬花", "cy@十面埋伏-四面楚歌", "cy@语无伦次-词不达意", "cy@鼠目寸光-井底之蛙", "cy@反弹琵琶-乱弹棉花", "cy@儿孙满堂-早生贵子", "ysj@电影-电视剧", "ysj@甄嬛传-红楼梦", "ysj@江南stely-忐忑", "ysj@盗墓笔记-鬼吹灯", "ysj@节节高升-票房大卖", "ysj@美人心计-倾世皇妃", "ysj@流星花园-花样男子", "ysj@神雕侠侣-天龙八部", "ysj@天天向上-非诚勿扰", "ysj@夏家三千金-爱情睡醒了", "ysj@降龙十八掌-九阴白骨爪", "ysj@江南style-最炫民族风", "qt@呆-萌", "qt@书-本", "qt@推销-销售", "qt@梦境-幻想", "qt@反射-折射", "qt@作文-论文", "qt@裸婚-闪婚", "qt@吉他-琵琶", "qt@妩媚-百媚", "qt@结婚-订婚", "qt@眉毛-胡须", "qt@杭州-苏州", "qt@香港-台湾", "qt@首尔-东京", "qt@小品-话剧", "qt@新年-跨年", "qt@童话-神话", "qt@奖牌-金牌", "qt@婚纱-喜服", "qt@情歌-情书", "qt@按摩-挠痒 ", "qt@月亮-太阳", "qt@古筝-吉他", "qt@门诊-急诊", "qt@散文-小说", "qt@火车-轮船", "qt@脚趾-手指 ", "qt@眉毛-睫毛", "qt@沙子-沙滩", "qt@百度-谷歌", "qt@人民币-美元", "qt@私房钱-年终奖  ", "qt@美人痣-青春痘", "qt@图书馆-图书店", "qt@端午节-中秋节", "qt@情人节-光棍节", "qt@过山车-碰碰车"],
    benjuInfo: {
      playerCount: 6,
      pingmin_word: "",
      wodi_word: "",
      wodi_count:2,
      wodi_array:[],
      enable_baiban: false,
      baiban_count:0,
      baiban_array:[],
      current_player:1,
      selectClass: "rcyp,sw,rw,dzw,cy,ysj,qt"
    }
  }
})
