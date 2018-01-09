import '@/css/popUp.less'

$(function () {
  mini.parse();

  let form = new mini.Form("form1");

  function labelModel() {
    let fields = form.getFields();
    for (let i = 0, l = fields.length; i < l; i++) {
      let c = fields[i];
      if (c.setReadOnly) c.setReadOnly(true);     //只读
      if (c.setIsValid) c.setIsValid(true);      //去除错误提示
      if (c.addCls) c.addCls("asLabel");          //增加asLabel外观
    }
  }
  function inputModel() {
    let fields = form.getFields();
    for (let i = 0, l = fields.length; i < l; i++) {
      let c = fields[i];
      if (c.setReadOnly) c.setReadOnly(false);
      if (c.removeCls) c.removeCls("asLabel");
    }
    mini.repaint(document.body);
  }

  $("#onlyRead").click(function(){
    labelModel()
  });
  $("#inputRead").click(function () {
    inputModel()
  });
});




