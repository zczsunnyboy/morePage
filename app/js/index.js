import '@/css/common.less'
import '@/css/index.less'

$('body').on('click', 'li', function(ev) {
  let myself=$(this),
    url=myself.attr('data-url');
  window.location.href=url
})
