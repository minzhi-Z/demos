let songs = [{
   songer: '伍思凯',
   name: '特别的爱给特别的你',
   url: 'mp3/music1.mp3',
   duration: 299
}, {
   songer: '迪克牛仔',
   name: '勇气',
   url: 'mp3/music2.mp3',
   duration: 259
}, {
   songer: '齐秦',
   name: '往事随风',
   url: 'mp3/music3.mp3',
   duration: 278
}, {
   songer: '回音哥',
   name: '后来',
   url: 'mp3/music4.mp3',
   duration: 326
}]

$(function(){
   //---  作rem的屏幕大小自适应
   let fontSize=$(document).width()/(1920/20);
   $('html').css('fontSize',fontSize);

   songs.forEach((item,index)=>{
      let $item=$(`
         <p class="item" src="${item.url}" time="${item.duration}">
            <img src="" alt="">
            <span class="nub">${index+1}</span>
            <span class="img"></span>
            <span class="name">${item.name}</span>
            <span class="singer">${item.songer}</span>
         </p>`);

      $('#list').append($item)
   })

   let i=0,interval=null,sudu=null,width=null,start='00:00',end=null,max=null;
   
   //----  歌曲对应的进度条速度
   function speed(L, T){
      return L/T;
   }
   //----  进度条对应的歌曲当前时间
   function timed(L,S){
      return L/S
   }
   //----  将秒转为标准时间格式
   function T2date(T){
      let date;
      let M=Math.floor(T/60);
      M<10?M=`0${M}`:M;
      let S=T%60;
      S<10?S=`0${S}`:S;
      return date=M+':'+S;
   }
   //-----  根据当前播放时间计算开始和结束时间
   function SandE(i,T){
      start=T2date(i);
      end=T2date((T-i));
      $('.duration>.start').text(start);
      $('.duration>.end').text(end);
   }
   //----  计时器函数
   let timer=function(){
      i++;
      SandE(i,max);
      width+=sudu;
      $('#play .progress>div').css({background:'#fa773c', width: width+'px'})
      if(i==max){
         clearInterval(interval);
         i=0,width=0,start='00:00';
         $('.btns>.play>img').attr('src','img/play1.png')
         $('#list>.played').next().click();
      }
   }

   let audio=document.getElementById('audio');
   let L=$('#play .progress').css('width').replace('px','');   

   //----   给每首歌添加点击播放
   $('#list>.item').click(function(e){
      e.preventDefault();
      $(this).addClass('played').siblings().removeClass('played'); 
      i=0,width=0,start='00:00';
      clearInterval(interval);  //- 每次点击清除之前的计时器
      $('#play>.name').text($(this).find('.name').text());
      $('#play>.singer').text($(this).find('.singer').text());
      $('#list>.item>img').attr('src',''); 
      $(this).children('img').attr('src','img/play.png');
      audio.src=$(this).attr('src');
      
      //---  设置进度条的初始状态的时间节点
      max=$(this).attr('time');
      end=T2date(max);
      $('.duration>.start').text(start);
      $('.duration>.end').text(end);

      //---  每次点击恢复进度条的初始状态
      $('#play .progress>div').css({background:'#ffffff', width: '0px'})
      $('.btns>.play>img').attr('src','img/pause1.png')
      sudu=speed(L,max);
     
      interval=setInterval(timer,1000)
   })

   //---  点击暂停和播放
   $('.btns>.play>img').click(function(){
      if(audio.paused){
         audio.play()
         interval=setInterval(timer,1000)
         $(this).attr('src','img/pause1.png')
      }else{
         audio.pause()
         clearInterval(interval)
         $(this).attr('src','img/play1.png')
      }
   })

   //---  点击上一曲和下一曲
   $('.btns>.prev>img').click(function(){
      $('#list>.played').prev().click();
   })
   $('.btns>.next>img').click(function(){
      $('#list>.played').next().click();
   })
   
   //--  点击进度条，歌曲跳转到对应位置
   $('#play .progress').on('click',function(e){
      e.preventDefault();
      i=Math.round(timed(e.offsetX, sudu));
      width=sudu*i;
      audio.currentTime=i;
      SandE(i,max)
      $('#play .progress>div').css({background:'#fa773c', width: width+'px'})
   })
   
   



   






})