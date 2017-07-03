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

  globalData: {
    userInfo: null,
    ciku: ["镜子—玻璃", "玉米—小米", "反射—折射", "穿衣—试衣", "梦境—幻想", "屌丝—宅男", "推销—销售", "淘宝—拍拍", "妩媚—百媚", "盒饭—外卖", "推销—销售", "淘宝—拍拍", "叉烧包—灌汤包", "散热器—电风扇", "伐木工—木匠工", "点烟器—打火机", "热的快—热水器", "榨菜丝—萝卜头", "老朋友—老男孩", "干洗机—甩干机", "王菲——那英", "元芳——展昭", "麻雀——乌鸦", "胖子——肥肉", "眉毛——胡须", "何炅——维嘉", "状元——冠军", "饺子——包子", "端午节——中秋节", "摩托车——电动车", "高跟鞋——增高鞋", "汉堡包——肉夹馍", "小矮人——葫芦娃", "蜘蛛侠——蜘蛛精", "节节高升——票房大卖", "反弹琵琶——乱弹棉花", "玫瑰——月季", "董永——许仙", "若曦——晴川", "谢娜——李湘", "孟非——乐嘉", "牛奶——豆浆", "保安——保镖", "白菜——生菜", "辣椒——芥末", "金庸——古龙", "赵敏——黄蓉", "海豚——海狮", "水盆——水桶", "唇膏——口红", "森马——以纯", "烤肉——涮肉", "气泡——水泡", "纸巾——手帕", "杭州——苏州", "香港——台湾", "首尔——东京", "橙子——橘子", "葡萄——提子", "太监——人妖", "蝴蝶——蜜蜂", "小品——话剧", "裸婚——闪婚", "新年——跨年", "吉他——琵琶", "公交——地铁", "剩女——御姐", "童话——神话", "作家——编剧", "警察——捕快", "结婚——订婚", "奖牌——金牌", "孟飞——乐嘉", "那英——韩红", "面包——蛋糕", "作文——论文", "油条——麻花", "壁纸——贴画", "枕头——抱枕", "手机——座机", "同学——同桌", "婚纱——喜服", "老佛爷——老天爷", "魔术师——魔法师", "鸭舌帽——遮阳帽", "双胞胎——龙凤胎", "情人节——光棍节", "丑小鸭——灰姑娘", "富二代——高富帅", "生活费——零花钱", "麦克风——扩音器", "郭德纲——周立波", "图书馆——图书店", "男朋友——前男友", "洗衣粉——皂角粉", "牛肉干——猪肉脯", "泡泡糖——棒棒糖", "小沈阳——宋小宝", "土豆粉——酸辣粉", "蜘蛛侠——蝙蝠侠", "口香糖——木糖醇", "酸菜鱼——水煮鱼", "小笼包——灌汤包", "薰衣草——满天星", "张韶涵——王心凌", "刘诗诗——刘亦菲", "甄嬛传——红楼梦", "甄子丹——李连杰", "包青天——狄仁杰", "大白兔——金丝猴", "果粒橙——鲜橙多", "沐浴露——沐浴盐", "洗发露——护发素", "自行车——电动车", "班主任——辅导员", "过山车——碰碰车", "铁观音——碧螺春", "十面埋伏——四面楚歌", "成吉思汗——努尔哈赤", "谢娜张杰——邓超孙俪", "福尔摩斯——工藤新一", "贵妃醉酒——黛玉葬花", "流星花园——花样男子", "神雕侠侣——天龙八部", "天天向上——非诚勿扰", "勇往直前——全力以赴", "鱼香肉丝——四喜丸子", "麻婆豆腐——皮蛋豆腐", "语无伦次——词不达意", "鼠目寸光——井底之蛙", "近视眼镜——隐形眼镜", "美人心计——倾世皇妃", "夏家三千金——爱情睡醒了", "降龙十八掌——九阴白骨爪", "红烧牛肉面——香辣牛肉面", "江南style——最炫民族风", "梁山伯与祝英台——罗密欧与朱丽叶", "谁是卧底游戏的第二批词语：", "气泡——水泡", "老佛爷——老天爷", "十面埋伏——四面楚歌", "纸巾——手帕", "魔术师——魔法师", "成吉思汗——努尔哈赤", "杭州——苏州", "鸭舌帽——遮阳帽", "谢娜张杰——邓超孙俪", "香港——台湾", "双胞胎——龙凤胎", "福尔摩斯——工藤新一", "首尔——东京", "情人节——光棍节", "贵妃醉酒——黛玉葬花", "橙子——橘子", "丑小鸭——灰姑娘", "流星花园——花样男子", "葡萄——提子", "富二代——高富帅", "神雕侠侣——天龙八部", "太监——人妖", "生活费——零花钱", "天天向上——非诚勿扰", "蝴蝶——蜜蜂", "麦克风——扩音器", "勇往直前——全力以赴", "小品——话剧", "郭德纲——周立波", "鱼香肉丝——四喜丸子", "裸婚——闪婚", "图书馆——图书店", "麻婆豆腐——皮蛋豆腐", "新年——跨年", "男朋友——前男友", "语无伦次——词不达意", "吉他——琵琶", "洗衣粉——皂角粉", "鼠目寸光——井底之蛙", "公交——地铁", "牛肉干——猪肉脯", "近视眼镜——隐形眼镜", "剩女——御姐", "泡泡糖——棒棒糖", "美人心计——倾世皇妃", "童话——神话", "小沈阳——宋小宝", "大白兔——金丝猴", "作家——编剧", "土豆粉——酸辣粉", "果粒橙——鲜橙多", "警察——捕快", "蜘蛛侠——蝙蝠侠", "沐浴露——沐浴盐", "结婚——订婚", "口香糖——木糖醇", "洗发露——护发素", "奖牌——金牌", "酸菜鱼——水煮鱼", "自行车——电动车", "孟飞——乐嘉", "小笼包——灌汤包", "班主任——辅导员", "那英——韩红", "薰衣草——满天星", "过山车——碰碰车", "面包——蛋糕", "张韶涵——王心凌", "铁观音——碧螺春", "作文——论文", "刘诗诗——刘亦菲", "壁纸——贴画", "油条——麻花", "甄嬛传——红楼梦", "枕头——抱枕", "甄子丹——李连杰", "同学——同桌", "手机——座机", "包青天——狄仁杰", "婚纱——喜服"],
    benjuInfo: {
      playerCount: 6,
      pingmin_word: "",
      wodi_word: "",
      wodi_count:2,
      wodi_array:[],
      enable_baiban: false,
      baiban_count:1,
      baiban_array:[],
      current_player:1
    }
  }
})
