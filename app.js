(function () {
  'use strict';

  const STORAGE_KEY = 'mayday-concert-diary-v1';
  const WEEK = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

  /* ---------- 内置演出资料库 ----------
     收录部分代表场次：日期、城市、场馆、歌单。
     歌单来自歌迷公开整理的记录（PTT MayDay 版、mayday.ddiu.io 等），
     非官方发布，仅供参考，以现场实际演出为准。 */
  const KNOWNSHOWS = [
    {
      keywords: ['5525', '鸟巢', '8.3', '8月3', '20250803', '北京', '回到那一天'],
      tour: '5525+1 回到那一天 · 北京鸟巢 8.3场',
      date: '2025-08-03',
      city: '北京',
      venue: '国家体育场（鸟巢）',
      setlist: [
        '1. OAOA',
        '2. 孙悟空',
        '3. 盛夏光年',
        '4. 干杯',
        '5. 终结孤单',
        '6. 有些事+约翰蓝侬',
        '7. 成名在望+如果我们不曾相遇',
        '8. 第二人生+星空',
        '9. 我心中尚未崩坏的地方',
        '10. 最重要的小事',
        '11. 超人',
        '12. 九号球+恒星的恒心+时光机',
        '13. 相信+人生海海',
        '14. 爱情万岁',
        '15. 疯狂世界',
        '16. 轧车',
        '17. 派对动物',
        '18. 离开地球表面',
        '19. 恋爱ing',
        '20. 米老鼠（点歌）',
        '21. 你是唯一（点歌）',
        '22. 纯真（点歌）',
        '23. 2012（点歌）',
        '24. 仓颉（点歌）',
        '25. 任性',
        '26. 突然好想你',
        '27. 转眼',
        '28. 任意门',
        '【一安】',
        '29. 你不是真正的快乐',
        '30. 我不愿让你一个人',
        '31. 笑忘歌',
        '32. 倔强',
        '【二安】',
        '33. 伤心的人别听慢歌',
        '34. 第一天',
        '35. 夜访吸血鬼',
        '36. 如烟',
        '【三安】',
        '37. 爱情的模样',
        '38. 一颗苹果'
      ].join('\n')
    },
    {
      keywords: ['5525', '鸟巢', '5.31', '5月31', '20240531', '北京', '回到那一天'],
      tour: '5525 回到那一天 · 北京鸟巢 5.31场',
      date: '2024-05-31',
      city: '北京',
      venue: '国家体育场（鸟巢）',
      setlist: [
        '1. OAOA（现在就是永远）',
        '2. 孙悟空',
        '3. 入阵曲',
        '4. 伤心的人别听慢歌',
        '5. 干杯',
        '6. 透露',
        '7. 疯狂世界',
        '8. 有些事现在不做 一辈子都不会做了+约翰蓝侬',
        '9. 恋爱ing',
        '10. 志明与春娇',
        '11. 终结孤单+憨人',
        '12. 人生海海+相信',
        '13. 九号球+恒星的恒心+时光机',
        '14. 让我照顾你',
        '15. 天使+一千个世纪',
        '16. 我心中尚未崩坏的地方',
        '17. 我不愿让你一个人+诺亚方舟',
        '18. 成名在望',
        '19. DNA',
        '20. 派对动物+离开地球表面',
        '21. 好好（想把你写成一首歌）',
        '22. 拥抱（点歌）',
        '23. 回来吧（点歌）',
        '24. 生存以上 生活以下（点歌）',
        '25. 小太阳（点歌）',
        '26. 突然好想你',
        '27. 为你写下这首情歌',
        '28. 转眼',
        '29. 任意门',
        '【一安】',
        '30. 知足',
        '31. 温柔',
        '32. 笑忘歌',
        '33. 倔强',
        '【二安】',
        '34. 星空',
        '35. 听不到'
      ].join('\n')
    },
    {
      keywords: ['5525', '鸟巢', '6.1', '6月1', '20240601', '北京', '回到那一天'],
      tour: '5525 回到那一天 · 北京鸟巢 6.1场（尾场）',
      date: '2024-06-01',
      city: '北京',
      venue: '国家体育场（鸟巢）',
      setlist: [
        '1. OAOA（现在就是永远）',
        '2. 孙悟空',
        '3. 入阵曲',
        '4. 伤心的人别听慢歌',
        '5. 干杯',
        '6. 透露',
        '7. 疯狂世界',
        '8. 有些事现在不做 一辈子都不会做了+约翰蓝侬',
        '9. 恋爱ing',
        '10. 志明与春娇',
        '11. 终结孤单+憨人',
        '12. 人生海海+相信',
        '13. 九号球+恒星的恒心+时光机',
        '14. 让我照顾你',
        '15. 天使+一千个世纪',
        '16. 我心中尚未崩坏的地方',
        '17. 我不愿让你一个人+诺亚方舟',
        '18. 成名在望',
        '19. DNA',
        '20. 派对动物+离开地球表面',
        '21. 我又初恋了',
        '22. 雨眠（点歌）',
        '23. 反而（点歌）',
        '24. 我（点歌）',
        '25. 如果我们不曾相遇（点歌）',
        '26. 突然好想你',
        '27. 为你写下这首情歌',
        '28. 转眼',
        '29. 任意门',
        '【一安】',
        '30. 知足',
        '31. 温柔',
        '32. 笑忘歌',
        '33. 倔强',
        '【二安】',
        '34. 少年他的奇幻漂流'
      ].join('\n')
    },
    {
      keywords: ['好好好想见到你', '上海', '11.12', '11月12', '20231112'],
      tour: '好好好想见到你 · 上海站 11.12场',
      date: '2023-11-12',
      city: '上海',
      venue: '上海体育场',
      setlist: [
        '1. 盛夏光年',
        '2. 爱情万岁',
        '3. 派对动物',
        '4. 离开地球表面',
        '5. 因为你 所以我',
        '6. 知足',
        '7. 疯狂世界',
        '8. 香水',
        '9. 拥抱',
        '10. 小太阳',
        '11. 干杯',
        '12. 最重要的小事',
        '13. 你不是真正的快乐',
        '14. 我心中尚未崩坏的地方',
        '15. 人生海海',
        '16. 恋爱ing',
        '17. 孙悟空',
        '18. 轧车',
        '19. 突然好想你',
        '20. 生命有一种绝对',
        '21. 勇敢',
        '22. 一颗苹果（点歌）',
        '23. 好不好（点歌）',
        '24. 恒星的恒心（点歌）',
        '25. 任意门',
        '26. 为你写下这首情歌',
        '27. 诺亚方舟',
        '【一安】',
        '28. 你的神曲',
        '29. 温柔',
        '30. 倔强',
        '【二安】',
        '31. 伤心的人别听慢歌',
        '32. 憨人',
        '33. 终结孤单'
      ].join('\n')
    },
    {
      keywords: ['好好好想见到你', '武汉', '6.25', '6月25', '20230625'],
      tour: '好好好想见到你 · 武汉站 6.25场',
      date: '2023-06-25',
      city: '武汉',
      venue: '武汉体育中心体育馆',
      setlist: [
        '1. 盛夏光年',
        '2. 爱情万岁',
        '3. 派对动物',
        '4. 离开地球表面',
        '5. 因为你 所以我',
        '6. 知足',
        '7. 疯狂世界',
        '8. 香水',
        '9. 拥抱',
        '10. 天使',
        '11. 干杯',
        '12. 最重要的小事',
        '13. 你不是真正的快乐',
        '14. 我心中尚未崩坏的地方',
        '15. 人生海海',
        '16. OAOA（现在就是永远）',
        '17. 我还是爱着你',
        '18. 外人',
        '19. 孙悟空',
        '20. 轧车',
        '21. 突然好想你',
        '22. 生命有一种绝对',
        '23. 步步',
        '24. 仓颉（点歌）',
        '25. 垃圾车（点歌）',
        '26. 约翰蓝侬（点歌）',
        '27. 任意门',
        '28. 为你写下这首情歌',
        '29. 诺亚方舟',
        '【一安】',
        '30. 你的神曲',
        '31. 玫瑰少年',
        '32. 温柔',
        '33. 倔强',
        '【二安】',
        '34. 伤心的人别听慢歌',
        '35. 憨人',
        '36. 勇敢',
        '37. 出头天',
        '38. 笑忘歌'
      ].join('\n')
    },
    {
      keywords: ['好好好想见到你', '鸟巢', '5.26', '5月26', '20230526', '北京'],
      tour: '好好好想见到你 · 北京鸟巢 5.26场',
      date: '2023-05-26',
      city: '北京',
      venue: '国家体育场（鸟巢）',
      setlist: [
        '1. 盛夏光年',
        '2. 爱情万岁',
        '3. 派对动物',
        '4. 离开地球表面',
        '5. 因为你 所以我',
        '6. 知足',
        '7. 疯狂世界',
        '8. 夜访吸血鬼',
        '9. 拥抱',
        '10. 如果我们不曾相遇',
        '11. 最重要的小事',
        '12. 永远的永远',
        '13. 勇敢',
        '14. 出头天',
        '15. 人生海海',
        '16. OAOA（现在就是永远）',
        '17. 孙悟空',
        '18. 轧车',
        '19. 突然好想你',
        '20. 生命有一种绝对',
        '21. 天使',
        '22. 笑忘歌（点歌）',
        '23. 步步（点歌）',
        '24. 一颗苹果（点歌）',
        '25. 为你写下这首情歌',
        '26. 干杯',
        '27. 诺亚方舟',
        '【一安】',
        '28. 你的神曲',
        '29. 玫瑰少年',
        '30. 温柔',
        '31. 倔强',
        '【二安】',
        '32. 伤心的人别听慢歌',
        '33. 憨人',
        '34. 恋爱ing'
      ].join('\n')
    },
    {
      keywords: ['5525', '鸟巢', '5.26', '5月26', '20240526', '2024', '北京', '回到那一天'],
      tour: '5525 回到那一天 · 北京鸟巢 5.26场',
      date: '2024-05-26',
      city: '北京',
      venue: '国家体育场（鸟巢）',
      setlist: [
        '1. OAOA（现在就是永远）',
        '2. 孙悟空',
        '3. 入阵曲',
        '4. 伤心的人别听慢歌',
        '5. 干杯',
        '6. 透露',
        '7. 疯狂世界',
        '8. 有些事现在不做 一辈子都不会做了+约翰蓝侬',
        '9. 恋爱ing',
        '10. 志明与春娇',
        '11. 终结孤单+憨人',
        '12. 人生海海+相信',
        '13. 九号球+恒星的恒心+时光机',
        '14. 让我照顾你',
        '15. 天使+一千个世纪',
        '16. 我心中尚未崩坏的地方',
        '17. 我不愿让你一个人+诺亚方舟',
        '18. 成名在望',
        '19. DNA',
        '20. 派对动物+离开地球表面',
        '21. 别惹我',
        '22. 而我知道（点歌）',
        '23. 嘿！我要走了（点歌）',
        '24. 永远的永远（点歌）',
        '25. 花（点歌）',
        '26. 洗衣机（点歌）',
        '27. 突然好想你',
        '28. 为你写下这首情歌',
        '29. 转眼',
        '30. 任意门',
        '【一安】',
        '31. 知足',
        '32. 温柔',
        '33. 笑忘歌',
        '34. 倔强',
        '【二安】',
        '35. 为爱而生',
        '36. 你不是真正的快乐'
      ].join('\n')
    },
    {
      keywords: ['人生无限公司', '上海', '虹口', '12.2', '12月2', '20171202', '2017'],
      tour: '人生无限公司 · 上海虹口 12.2场',
      date: '2017-12-02',
      city: '上海',
      venue: '上海虹口足球场',
      setlist: [
        '1. 派对动物',
        '2. 最好的一天',
        '3. OAOA（快板）',
        '4. 入阵曲（改编）',
        '5. 后来的我们',
        '6. 超人',
        '7. 你不是真正的快乐',
        '8. 爱情的模样（当日限定曲）',
        '9. 如果我们不曾相遇',
        '10. 好好（想把你写成一首歌）',
        '11. 干杯',
        '12. 兄弟',
        '13. 人生有限公司',
        '14. 成名在望（玛莎弹琴）',
        '15. 我心中尚未崩坏的地方（改编）',
        '16. 孙悟空（改编）',
        '17. 知足（改编）',
        '18. 少年他的奇幻漂流',
        '19. 黑暗骑士（五月天版）',
        '20. 顽固',
        '21. Do You Ever Shine（中文版）',
        '22. 凡人歌',
        '23. 离开地球表面',
        '24. 恋爱ing',
        '25. 任意门（轮唱版）',
        '26. 转眼',
        '27. 人生海海（改编）',
        '【一安】',
        '28. 伤心的人别听慢歌',
        '29. 洋葱',
        '【二安】',
        '30. 突然好想你',
        '31. 倔强'
      ].join('\n')
    },
    {
      keywords: ['人生无限公司', '上海', '金山', '7.29', '7月29', '20180729', '2018', '夏日特别版'],
      tour: '人生无限公司 · 上海金山 夏日特别版 7.29场（最终场）',
      date: '2018-07-29',
      city: '上海',
      venue: '上海金山体育中心体育场',
      setlist: [
        '1. 派对动物',
        '2. 伤心的人别听慢歌',
        '3. OAOA',
        '4. 入阵曲',
        '5. 星空',
        '6. 你不是真正的快乐',
        '7. 恋爱ing（阿信弹吉他）',
        '8. 疯狂世界（阿信木吉他 团员轮唱版）',
        '9. 突然好想你（feat. 陈绮贞）',
        '10. 私奔到月球（feat. 陈绮贞）',
        '11. 吉他手（feat. 陈绮贞）',
        '12. 干杯',
        '13. 兄弟',
        '14. 人生有限公司',
        '15. 成名在望',
        '16. 我心中尚未崩坏的地方',
        '17. 知足',
        '18. 盛夏光年',
        '19. 顽固',
        '20. I Will Carry You',
        '21. 凡人歌',
        '22. 离开地球表面（吉他组 solo）',
        '23. 永远的永远（点歌）',
        '24. 人生海海',
        '【一安】',
        '25. 终于结束的起点',
        '26. 我不愿让你一个人',
        '27. 转眼',
        '【二安】',
        '28. 后来的我们',
        '29. 倔强',
        '【三安】',
        '30. 听不到（阿信弹唱）'
      ].join('\n')
    },
    {
      keywords: ['5525', '上海', '体育场', '八万人', '9.4', '9月4', '20250904', '2025', '夏末珍重纪念版', '回到那一天'],
      tour: '5525 回到那一天 · 上海站 夏末珍重纪念版 9.4场',
      date: '2025-09-04',
      city: '上海',
      venue: '上海体育场',
      setlist: [
        '1. OAOA',
        '2. 孙悟空',
        '3. 入阵曲',
        '4. 干杯',
        '5. 疯狂世界',
        '6. 有些事+约翰蓝侬',
        '7. 志明与春娇',
        '8. 终结孤单+憨人',
        '9. 人生海海+相信',
        '10. 九号球+恒星的恒心+时光机',
        '11. 让我照顾你+回来吧',
        '12. 天使+一千个世纪',
        '13. 我心中尚未崩坏的地方',
        '14. 我不愿让你一个人+诺亚方舟',
        '15. 成名在望',
        '16. 最好的一天',
        '17. 恋爱ing',
        '18. 派对动物',
        '19. 离开地球表面',
        '20. 叫我第一名（点歌）',
        '21. 拥抱（点歌）',
        '22. 洗衣机（点歌）',
        '23. 雨眠（点歌）',
        '24. 私奔到月球（feat. 陈粒）',
        '25. 小半（feat. 陈粒）',
        '26. 任性',
        '27. 突然好想你',
        '28. 转眼',
        '29. 任意门',
        '【一安】',
        '30. 笑忘歌',
        '31. 倔强',
        '32. 伤心的人别听慢歌',
        '33. 第一天',
        '【二安】',
        '34. 爱情万岁',
        '35. 透露',
        '36. 你是唯一',
        '【三安】',
        '37. 顽固',
        '38. 后青春期的诗'
      ].join('\n')
    },
    {
      keywords: ['5525', '广州', '南沙', '大湾区', '大湾区体育场', '12.5', '12月5', '20251205', '2025', '回到那一天'],
      tour: '5525+1 回到那一天 · 广州站 12.5场',
      date: '2025-12-05',
      city: '广州',
      venue: '南沙大湾区文化体育中心',
      setlist: [
        '1. OAOA',
        '2. 孙悟空',
        '3. 盛夏光年',
        '4. 干杯',
        '5. 终结孤单',
        '6. 有些事+约翰蓝侬',
        '7. 如果我们不曾相遇+成名在望',
        '8. 第二人生+星空',
        '9. 我心中尚未崩坏的地方',
        '10. 最重要的小事',
        '11. 超人',
        '12. 九号球+恒星的恒心+时光机',
        '13. 相信+人生海海',
        '14. 爱情万岁',
        '15. 疯狂世界',
        '16. 轧车+喊麦',
        '17. 派对动物',
        '18. 离开地球表面',
        '19. 恋爱ing',
        '20. 米老鼠（点歌）',
        '21. 我又初恋了（点歌）',
        '22. 虚弱（点歌）',
        '23. 什么歌（点歌）',
        '24. 任性',
        '25. 突然好想你',
        '26. 转眼',
        '27. 任意门',
        '【一安】',
        '28. 你不是真正的快乐',
        '29. 我不愿让你一个人',
        '30. 笑忘歌',
        '31. 倔强',
        '【二安】',
        '32. 伤心的人别听慢歌',
        '33. 第一天',
        '【三安】',
        '34. 香水',
        '35. 顽固',
        '【四安】',
        '36. 听不到+Happy Birth Day'
      ].join('\n')
    },
    {
      keywords: ['5525', '杭州', '大莲花', '奥体', '5.27', '5月27', '0527', '20250527', '2025', '回到那一天'],
      tour: '5525 回到那一天 · 杭州大莲花 5.27场',
      date: '2025-05-27',
      city: '杭州',
      venue: '杭州奥体中心体育场（大莲花）',
      setlist: [
        '1. OAOA',
        '2. 孙悟空',
        '3. 入阵曲',
        '4. 干杯',
        '5. 透露',
        '6. 疯狂世界',
        '7. 有些事+约翰蓝侬',
        '8. 志明与春娇',
        '9. 终结孤单+憨人',
        '10. 人生海海+相信',
        '11. 九号球+恒星的恒心+时光机',
        '12. 让我照顾你',
        '13. 天使+一千个世纪',
        '14. 我心中尚未崩坏的地方',
        '15. 我不愿让你一个人+诺亚方舟',
        '16. 成名在望',
        '17. DNA+喊麦',
        '18. 派对动物',
        '19. 离开地球表面',
        '20. 恋爱ing',
        '21. 第二人生（观众点歌）',
        '22. 候鸟（观众点歌）',
        '23. 晚安地球人（观众点歌）',
        '24. 兄弟（观众点歌）',
        '25. 三个傻瓜（阿信点歌）',
        '26. 任性',
        '27. 突然好想你',
        '28. 转眼',
        '29. 任意门',
        '【一安】',
        '30. 知足',
        '31. 温柔',
        '32. 笑忘歌',
        '33. 倔强',
        '【二安】',
        '34. 伤心的人别听慢歌',
        '35. 第一天',
        '【三安】',
        '36. 玫瑰少年',
        '37. 一颗苹果',
        '38. 你不是真正的快乐'
      ].join('\n')
    }
  ];

  const SAMPLES = [
    {
      tour: KNOWNSHOWS[0].tour,
      date: KNOWNSHOWS[0].date,
      city: KNOWNSHOWS[0].city,
      venue: KNOWNSHOWS[0].venue,
      setlist: KNOWNSHOWS[0].setlist,
      seat: '内场摇滚区 8 排',
      mood: '全场大合唱《倔强》的时候，眼泪直接掉下来了。五月天的歌真的陪我们走过了整个青春。',
      rating: 5
    },
    {
      tour: KNOWNSHOWS[4].tour,
      date: KNOWNSHOWS[4].date,
      city: KNOWNSHOWS[4].city,
      venue: KNOWNSHOWS[4].venue,
      setlist: KNOWNSHOWS[4].setlist,
      seat: '看台 A3 区 12 排',
      mood: '加班到崩溃的那段时间，听到《你不是真正的快乐》直接破防。谢谢五月天，把那些说不出口的话都唱了出来。',
      rating: 5
    }
  ];

  let concerts = load();
  let editingId = null;
  let searchTerm = '';
  let ratingValue = 5;
  let toastTimer = null;

  const $ = (sel) => document.querySelector(sel);
  const listEl = $('#list');
  const emptyEl = $('#emptyState');
  const emptyAllEl = $('#emptyAll');
  const emptySearchEl = $('#emptySearch');
  const statsEl = $('#stats');
  const modal = $('#modal');
  const modalTitle = $('#modalTitle');
  const form = $('#concertForm');
  const starPicker = $('#starPicker');
  const searchInput = $('#searchInput');
  const toastEl = $('#toast');

  // 打开网址时带 #demo 会直接填入示例数据（方便预览和测试）
  if (location.hash.indexOf('demo') !== -1 && concerts.length === 0) {
    concerts = SAMPLES.map(makeSample);
    save();
  }

  init();

  /* ---------- 基础工具 ---------- */

  function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  }

  function makeSample(s) {
    return { id: uid(), createdAt: Date.now() + Math.random(), ...s };
  }

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const arr = JSON.parse(raw);
      return Array.isArray(arr) ? arr : [];
    } catch (e) {
      return [];
    }
  }

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(concerts));
    } catch (e) {
      toast('保存失败：浏览器存储空间可能已满');
    }
  }

  function el(tag, cls, text) {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function toast(msg) {
    clearTimeout(toastTimer);
    toastEl.textContent = msg;
    toastEl.classList.remove('hidden');
    toastTimer = setTimeout(() => toastEl.classList.add('hidden'), 2200);
  }

  /* ---------- 演出名称联想匹配 ---------- */

  let suggestMatches = [];
  let suggestActive = -1;

  function normalizeKey(s) {
    return (s || '')
      .normalize('NFKC')
      .toLowerCase()
      .replace(/[\s·_\-－—:：,，.。、/／\\|（）()【】\[\]'"“”‘’!！?？+＋]/g, '')
      .replace(/场|站|年|月|日/g, '');
  }

  function findKnownMatches(input) {
    const q = normalizeKey(input);
    if (q.length < 2) return [];
    const scored = [];
    KNOWNSHOWS.forEach(function (show, idx) {
      let score = 0;
      show.keywords.forEach(function (kw) {
        if (q.indexOf(normalizeKey(kw)) !== -1) score += 1;
      });
      if (score > 0) scored.push({ show: show, score: score, idx: idx });
    });
    scored.sort(function (a, b) {
      if (b.score !== a.score) return b.score - a.score;
      return a.idx - b.idx;
    });
    return scored;
  }

  function hideSuggestions() {
    const box = $('#tourSuggest');
    if (box) box.classList.add('hidden');
    suggestMatches = [];
    suggestActive = -1;
  }

  function renderSuggestions(input) {
    const box = $('#tourSuggest');
    if (!box) return;
    suggestMatches = input.trim() ? findKnownMatches(input) : [];
    box.innerHTML = '';
    if (!suggestMatches.length) {
      box.classList.add('hidden');
      suggestActive = -1;
      return;
    }
    suggestMatches.slice(0, 4).forEach(function (m, i) {
      const s = m.show;
      const item = document.createElement('button');
      item.type = 'button';
      item.className = 'suggest-item' + (i === suggestActive ? ' active' : '');
      item.setAttribute('role', 'option');
      const left = el('span', 'suggest-title', s.tour);
      const right = el('span', 'suggest-meta', s.date + ' · ' + s.city + (m.score >= 2 ? ' ✓' : ''));
      item.appendChild(left);
      item.appendChild(right);
      item.addEventListener('mousedown', function (e) { e.preventDefault(); });
      item.addEventListener('click', function () { applyKnownShow(s); });
      box.appendChild(item);
    });
    box.classList.remove('hidden');
  }

  function applyKnownShow(show) {
    form.elements.tour.value = show.tour;
    form.elements.date.value = show.date;
    form.elements.city.value = show.city;
    form.elements.venue.value = show.venue;
    form.elements.setlist.value = show.setlist;
    hideSuggestions();
    toast('已自动填入「' + show.tour + '」的信息，歌单来自歌迷整理，仅供参考');
  }

  function handleTourInput() {
    const value = form.elements.tour.value;
    const matches = findKnownMatches(value);
    const best = matches[0];
    const clearWinner = best &&
      best.score >= 2 &&
      (matches.length === 1 || best.score > matches[1].score);
    if (clearWinner) applyKnownShow(best.show);
    renderSuggestions(value);
  }

  function displayTitle(c) {
    if (c.tour && c.tour.trim()) return c.tour.trim();
    if (c.city && c.city.trim()) return c.city.trim() + ' 演唱会';
    return '五月天演唱会';
  }

  function splitDate(iso) {
    if (!iso || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return { day: '??', ym: '日期待补' };
    const parts = iso.split('-');
    return { day: parts[2], ym: parts[0] + '.' + parts[1] };
  }

  function formatDate(iso) {
    if (!iso) return '日期待补';
    const parts = iso.split('-');
    if (parts.length !== 3) return iso;
    const dt = new Date(+parts[0], +parts[1] - 1, +parts[2]);
    const wd = WEEK[dt.getDay()] || '';
    return parts[0] + '年' + Number(parts[1]) + '月' + Number(parts[2]) + '日' + (wd ? ' · ' + wd : '');
  }

  function dateOrder(a, b) {
    if (!a && !b) return 0;
    if (!a) return 1;
    if (!b) return -1;
    return a < b ? -1 : a > b ? 1 : 0;
  }

  /* ---------- 渲染 ---------- */

  function render() {
    renderStats();
    renderList();
  }

  function renderStats() {
    statsEl.innerHTML = '';
    const total = concerts.length;
    const cities = new Set(concerts.map(function (c) { return (c.city || '').trim(); }).filter(Boolean));
    const rated = concerts.filter(function (c) { return c.rating > 0; });
    const avg = rated.length
      ? (rated.reduce(function (sum, c) { return sum + c.rating; }, 0) / rated.length)
      : 0;

    statsEl.appendChild(statChip(String(total), '场演唱会'));
    statsEl.appendChild(statChip(String(cities.size), '个城市'));
    statsEl.appendChild(statChip(avg ? avg.toFixed(1) : '—', '平均心动指数'));
  }

  function statChip(num, label) {
    const chip = el('div', 'stat-chip');
    chip.appendChild(el('span', 'stat-num', num));
    chip.appendChild(el('span', null, label));
    return chip;
  }

  function renderList() {
    const q = searchTerm.trim().toLowerCase();

    const sorted = concerts
      .map(function (c, i) { return { c: c, i: i }; })
      .sort(function (a, b) {
        return dateOrder(b.c.date, a.c.date) ||
          (b.c.createdAt || 0) - (a.c.createdAt || 0) ||
          b.i - a.i;
      })
      .map(function (x) { return x.c; });

    const filtered = q
      ? sorted.filter(function (c) {
          return [c.tour, c.city, c.venue, c.seat, c.mood, c.setlist]
            .join(' ')
            .toLowerCase()
            .indexOf(q) !== -1;
        })
      : sorted;

    listEl.innerHTML = '';
    filtered.forEach(function (c) { listEl.appendChild(ticketCard(c)); });

    const showAll = concerts.length === 0;
    emptyEl.classList.toggle('hidden', filtered.length > 0);
    listEl.classList.toggle('hidden', filtered.length === 0);
    emptyAllEl.classList.toggle('hidden', !showAll);
    emptySearchEl.classList.toggle('hidden', showAll || filtered.length > 0);
  }

  function ticketCard(c) {
    const card = el('article', 'ticket');

    const stub = el('div', 'stub');
    const d = splitDate(c.date);
    stub.appendChild(el('div', 'stub-day', d.day));
    stub.appendChild(el('div', 'stub-ym', d.ym));
    stub.appendChild(el('div', 'stub-star', '★'));
    card.appendChild(stub);

    const body = el('div', 'ticket-body');
    body.appendChild(el('h3', 'ticket-title', displayTitle(c)));

    const metaBits = [];
    if (c.city) metaBits.push('📍 ' + c.city);
    if (c.venue) metaBits.push('🎪 ' + c.venue);
    if (c.seat) metaBits.push('💺 ' + c.seat);
    if (metaBits.length) body.appendChild(el('div', 'ticket-meta', metaBits.join('　')));

    body.appendChild(el('div', 'ticket-date-line', formatDate(c.date)));

    if (c.rating > 0) {
      body.appendChild(el('div', 'stars stars-readonly', '★'.repeat(c.rating) + '☆'.repeat(5 - c.rating)));
    }

    const mood = el('p', 'ticket-mood', c.mood || '（当时的心情还没写，点「编辑」补充吧）');
    body.appendChild(mood);

    if (c.setlist && c.setlist.trim()) {
      const details = document.createElement('details');
      details.className = 'setlist';
      const summary = document.createElement('summary');
      const count = c.setlist.split('\n').filter(function (s) {
        return /^\s*\d+[.、．]/.test(s.trim());
      }).length;
      summary.textContent = '歌单 · ' + count + ' 首';
      const pre = document.createElement('pre');
      pre.textContent = c.setlist.trim();
      details.appendChild(summary);
      details.appendChild(pre);
      body.appendChild(details);
    }

    const actions = el('div', 'ticket-actions');
    const editBtn = el('button', 'btn small ghost', '编辑');
    editBtn.type = 'button';
    editBtn.addEventListener('click', function () { openEdit(c.id); });
    const delBtn = el('button', 'btn small danger', '删除');
    delBtn.type = 'button';
    delBtn.addEventListener('click', function () { removeRecord(c.id); });
    actions.appendChild(editBtn);
    actions.appendChild(delBtn);
    body.appendChild(actions);

    card.appendChild(body);
    return card;
  }

  /* ---------- 弹窗 ---------- */

  function openAdd() {
    editingId = null;
    modalTitle.textContent = '添加一场演唱会';
    form.reset();
    hideSuggestions();
    ratingValue = 5;
    syncStars();
    modal.classList.remove('hidden');
    setTimeout(function () { form.elements.tour.focus(); }, 60);
  }

  function openEdit(id) {
    const c = concerts.find(function (x) { return x.id === id; });
    if (!c) return;
    editingId = id;
    modalTitle.textContent = '编辑这场演唱会';
    form.elements.tour.value = c.tour || '';
    form.elements.date.value = c.date || '';
    form.elements.city.value = c.city || '';
    form.elements.venue.value = c.venue || '';
    form.elements.seat.value = c.seat || '';
    form.elements.setlist.value = c.setlist || '';
    form.elements.mood.value = c.mood || '';
    ratingValue = c.rating || 5;
    syncStars();
    hideSuggestions();
    modal.classList.remove('hidden');
    setTimeout(function () { form.elements.tour.focus(); }, 60);
  }

  function closeModal() {
    modal.classList.add('hidden');
  }

  function buildStarPicker() {
    starPicker.innerHTML = '';
    for (let i = 1; i <= 5; i++) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'star-btn';
      b.textContent = '★';
      b.setAttribute('role', 'radio');
      b.setAttribute('aria-label', i + ' 星');
      b.addEventListener('click', function () {
        ratingValue = i;
        syncStars();
      });
      starPicker.appendChild(b);
    }
  }

  function syncStars() {
    Array.prototype.forEach.call(starPicker.children, function (b, idx) {
      b.classList.toggle('on', idx < ratingValue);
    });
  }

  /* ---------- 增删改 ---------- */

  function removeRecord(id) {
    const c = concerts.find(function (x) { return x.id === id; });
    if (!c) return;
    if (!window.confirm('确定要删除「' + displayTitle(c) + '」这场记录吗？删除后无法恢复。')) return;
    concerts = concerts.filter(function (x) { return x.id !== id; });
    save();
    render();
    toast('已删除');
  }

  function addSamples() {
    const count = concerts.length;
    if (count > 0 && !window.confirm('当前已有 ' + count + ' 条记录，会在末尾追加 2 条示例（可随时删除），确定吗？')) return;
    concerts = concerts.concat(SAMPLES.map(makeSample));
    save();
    render();
    toast('已填入示例，可以随时删除');
  }

  /* ---------- 备份 ---------- */

  function exportData() {
    if (!concerts.length) {
      toast('还没有记录，不用导出');
      return;
    }
    const blob = new Blob([JSON.stringify(concerts, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    const now = new Date();
    const ymd = now.getFullYear() +
      String(now.getMonth() + 1).padStart(2, '0') +
      String(now.getDate()).padStart(2, '0');
    a.download = '五月天演唱会手账备份-' + ymd + '.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
    toast('备份文件已下载');
  }

  function importData(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function () {
      let arr;
      try {
        arr = JSON.parse(reader.result);
        if (!Array.isArray(arr)) throw new Error('not array');
      } catch (e) {
        toast('文件格式不对，请选择本工具导出的备份文件');
        return;
      }
      const ok = window.confirm(
        '备份中共 ' + arr.length + ' 条记录。导入会用这些记录覆盖当前的 ' + concerts.length + ' 条记录，确定吗？'
      );
      if (!ok) return;
      concerts = arr.map(function (c) {
        return {
          id: typeof c.id === 'string' ? c.id : uid(),
          createdAt: typeof c.createdAt === 'number' ? c.createdAt : Date.now(),
          tour: c.tour || '',
          date: c.date || '',
          city: c.city || '',
          venue: c.venue || '',
          seat: c.seat || '',
          setlist: c.setlist || '',
          mood: c.mood || '',
          rating: Number(c.rating) || 0
        };
      });
      save();
      render();
      toast('导入成功 ✓');
    };
    reader.readAsText(file);
  }

  /* ---------- 事件 ---------- */

  function init() {
    buildStarPicker();
    syncStars();
    render();

    $('#addBtn').addEventListener('click', openAdd);
    $('#emptyAddBtn').addEventListener('click', openAdd);
    $('#sampleBtn').addEventListener('click', addSamples);
    $('#exportBtn').addEventListener('click', exportData);
    $('#importBtn').addEventListener('click', function () { $('#importFile').click(); });
    $('#importFile').addEventListener('change', function (e) {
      importData(e.target.files[0]);
      e.target.value = '';
    });
    $('#cancelBtn').addEventListener('click', closeModal);
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
    });

    searchInput.addEventListener('input', function () {
      searchTerm = searchInput.value;
      renderList();
    });

    const tourInput = form.elements.tour;
    tourInput.addEventListener('input', handleTourInput);
    tourInput.addEventListener('blur', function () {
      setTimeout(hideSuggestions, 120);
    });
    tourInput.addEventListener('keydown', function (e) {
      const box = $('#tourSuggest');
      const items = box ? box.querySelectorAll('.suggest-item') : [];
      if (!items.length) return;
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        suggestActive = e.key === 'ArrowDown'
          ? (suggestActive + 1) % items.length
          : (suggestActive - 1 + items.length) % items.length;
        items.forEach(function (it, i) {
          it.classList.toggle('active', i === suggestActive);
        });
      } else if (e.key === 'Enter' && suggestActive >= 0) {
        e.preventDefault();
        applyKnownShow(suggestMatches[suggestActive].show);
      } else if (e.key === 'Escape') {
        hideSuggestions();
      }
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const d = new FormData(form);
      const record = {
        tour: (d.get('tour') || '').trim(),
        date: (d.get('date') || '').trim(),
        city: (d.get('city') || '').trim(),
        venue: (d.get('venue') || '').trim(),
        seat: (d.get('seat') || '').trim(),
        setlist: (d.get('setlist') || '').trim(),
        mood: (d.get('mood') || '').trim(),
        rating: ratingValue
      };

      if (!record.date) {
        toast('请填写日期哦');
        return;
      }

      if (editingId) {
        const idx = concerts.findIndex(function (x) { return x.id === editingId; });
        if (idx >= 0) concerts[idx] = Object.assign({}, concerts[idx], record);
      } else {
        concerts.push(Object.assign({ id: uid(), createdAt: Date.now() }, record));
      }

      save();
      render();
      closeModal();
      toast('已保存 ✓');
    });
  }
})();
