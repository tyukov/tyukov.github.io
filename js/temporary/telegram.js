var toTopWrapEl,
    toTopEl,
    pageContentWrapEl,
    curVisible,
    curShown = false;
function backToTopInit () {
  pageContentWrapEl = document.getElementById('dev_page_content_wrap');
  if (!pageContentWrapEl) {
    return false;
  }
  var t = document.createElement('div');

  t.innerHTML = '<div class="back_to_top"><i class="icon icon-to-top"></i>Наверх</div>';
  toTopEl = t.firstChild;
  t.innerHTML = '<a class="back_to_top_wrap" onclick="backToTopGo()"></a>';
  toTopWrapEl = t.firstChild;

  toTopWrapEl.appendChild(toTopEl);
  document.body.appendChild(toTopWrapEl);

  if (window.addEventListener) {
    window.addEventListener('resize', backToTopResize, false);
    window.addEventListener('scroll', backToTopScroll, false);
  }
  backToTopResize();
}

function backToTopGo () {
  window.scroll(0, 0);
  backToTopScroll();
}

function backToTopResize () {
  var left = getXY(pageContentWrapEl)[0],
      dwidth = Math.max(window.innerWidth, document.documentElement.clientWidth, 0),
      dheight = Math.max(window.innerHeight, document.documentElement.clientHeight);

  curVisible = pageContentWrapEl && left > 130 && dwidth > 640;
  toTopWrapEl.style.width = left + 'px';
  toTopEl.style.height = dheight + 'px';
  backToTopScroll();
}

function backToTopScroll () {
  var st = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop || document.documentElement.scrollTop;
  if ((st > 595 && curVisible) != curShown) {
    curShown = !curShown;
    toTopWrapEl.className = 'back_to_top_wrap' + (curShown ? ' back_to_top_shown' : '');
  }
}

function getXY (obj) {
  if (!obj) return [0, 0];

  var left = 0, top = 0;
  if (obj.offsetParent) {
    do {
      left += obj.offsetLeft;
      top += obj.offsetTop;
    } while (obj = obj.offsetParent);
  }
  return [left, top];
}