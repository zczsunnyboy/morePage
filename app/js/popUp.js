import '@/css/popUp.less'
import '@/css/form.less'

let PopPageConfig = function () {
  let PopPage = $("#popuppage"),
    FormPage = $("#formpage"),
    showPage=function () {
      let  FormPageoffsetX = FormPage.offset().left,
        FormPageWidth = FormPage.width();
      PopPage.css("left", FormPageoffsetX + FormPageWidth + 1);
    };

  showPage();

  $(window).resize(function () {
    showPage()
  });

  $("#popuptext").off().click(function (e) {
    let issuse = PopPage.attr("data-issuse");
    if (issuse === "yes") {
      showPop()
    } else {
      hidePop()
    }
  });

  let showPop = function () {
    PopPage.show().attr("data-issuse", "no");
  };
  let hidePop = function () {
    PopPage.hide().attr("data-issuse", "yes");
  };

  let pop = {
    showPop,
    hidePop
  };

  return pop
};

let time=PopPageConfig();



