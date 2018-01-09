import '@/css/form.less'

let NavIconObj=function () {
  let Navoldheight=$(".mini-toolbar").height();

  let moreNav = function (num, obj) {
    let outwidth = $(".mini-toolbar").width(),
      _obj = $(".nav-button"),
      sigle = _obj.width(),
      objwidth = obj.width(),
      inwidth = 0;

    for (let i = 0; i < num; i++) {
      inwidth += sigle + 10
    }

    return {
      Num: Math.ceil((inwidth + objwidth) / outwidth),
      CanNext: inwidth + objwidth >= outwidth,
      Overnum:parseInt((inwidth + objwidth-outwidth)/(sigle+10))
    }
  };

  let IssuesNav=function (num, obj,issues) {
    let _this = $(".mini-toolbar"),
      _thisChild=$(".nav-button"),
      _overnum=moreNav(num, obj).Overnum,
      row = moreNav(num, obj).Num,
      _index=_thisChild.length-1-_overnum;

    if(issues){
      _this.animate({
        height:Navoldheight*row
      },1000);
      $(".nav-button:gt("+_index+")").show();
    }else {
      _this.animate({
        height:Navoldheight
      },1000);
      $(".nav-button:gt("+_index+")").hide()
    }
  };

  let showPoint = function (num, obj) {
    let issues = moreNav(num, obj).CanNext,
      _obj = $("#point");
    _obj.off().click(function (e) {
      ClickPoint(num,obj,e)
    }).mouseover(function (e) {
      MousePoint(e,false)
    }).mouseout(function (e) {
      MousePoint(e,true)
    });
    if (issues) {
      _obj.show().attr('data-staus','no').animate({
        right:'-15px'
      },1000);
      IssuesNav(num,obj,true);
    } else {
      _obj.hide().attr('data-staus','yes');
      IssuesNav(num,obj,false)
    }
  };

  let ClickPoint=function (num,obj,e) {
    let _this=$(e.target),
      staus=_this.attr("data-staus");
    if(staus==="yes"){
      IssuesNav(num,obj,true)
      _this.attr('data-staus','no');
    }else {
      IssuesNav(num,obj,false)
      _this.attr('data-staus','yes');
    }
  };

  let MousePoint=function (e,issues) {
    if(issues){
      $(e.target).animate({
        right:'-15px'
      },1000);
    }else {
      $(e.target).animate({
        right:'5px'
      },1000);
    }
  };

  return showPoint
};

let navicon=NavIconObj();
navicon(15, $("#point"));

export default {
  NavIconObj
}
