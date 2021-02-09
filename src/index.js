// import "./styles.scss";
import './styles.styl';
(window => {
  let mousePosition = null;
  let amwayLive = null;
  let liveBarSpace = null;
  let offset = [0, 0];
  let isDown = false;
  window.onload = () => {
    checkQuery('t');
    checkQuery('hl');
    createHTMLIframe();
    setIframe();
    clickEvent();
    liveBarSpace.addEventListener(
      'touchstart',
      e => {
        e.preventDefault();
        isDown = true;
        offset = [amwayLive.offsetLeft - e.touches[0].pageX, amwayLive.offsetTop - e.touches[0].pageY];
      },
      true,
    );
    document.addEventListener(
      'touchend',
      () => {
        isDown = false;
      },
      true,
    );
    document.addEventListener(
      'touchmove',
      event => {
        if (isDown) {
          mousePosition = {
            x: event.touches[0].pageX,
            y: event.touches[0].pageY,
          };
          amwayLive.style.left = mousePosition.x + offset[0] + 'px';
          amwayLive.style.top = mousePosition.y + offset[1] + 'px';
        }
      },
      true,
    );
    liveBarSpace.addEventListener(
      'mousedown',
      e => {
        isDown = true;
        offset = [amwayLive.offsetLeft - e.clientX, amwayLive.offsetTop - e.clientY];
      },
      true,
    );
    document.addEventListener(
      'mouseup',
      () => {
        isDown = false;
      },
      true,
    );
    document.addEventListener(
      'mousemove',
      event => {
        event.preventDefault();
        if (isDown) {
          mousePosition = {
            x: event.clientX,
            y: event.clientY,
          };
          amwayLive.style.left = mousePosition.x + offset[0] + 'px';
          amwayLive.style.top = mousePosition.y + offset[1] + 'px';
        }
      },
      true,
    );
  };
  function checkQuery(name) {
    const value = getParameterByName(name);
    if (isValid(value)) {
      window.sessionStorage.setItem(name, value);
    }
  }
  function isValid(sInvalid) {
    if (!sInvalid) {
      return false;
    } else {
      return true;
    }
  }
  function createHTMLIframe() {
    amwayLive = document.createElement('div');
    amwayLive.id = 'amwayLive';
    amwayLive.className = 'live';
    amwayLive.setAttribute('data-is-open', true);
    const str = `<div class="live__bar"><div id="live__bar__back" class="live__bar__back back"></div><div id="live__bar__space" class="live__bar__space"></div><div id="live__bar__cross" class="live__bar__cross cross"></div></div><div class="live__html"><iframe id="live__iframe" class="live__iframe"></iframe><div class=""live__html__back></div></div>`;
    amwayLive.innerHTML = str;
    document.body.appendChild(amwayLive);
    liveBarSpace = document.getElementById('live__bar__space');
  }
  function setIframe() {
    let liveIframe = document.getElementById('live__iframe');
    const t = window.sessionStorage.getItem('t');
    const hl = window.sessionStorage.getItem('hl');
    liveIframe.src = `https://player.live.kkstream.io?t=${t}&hl=${hl}`;
  }
  function clickEvent() {
    let cross = document.getElementById('live__bar__cross');
    let back = document.getElementById('live__bar__back');
    cross.onclick = event => {
      event.preventDefault();
      amwayLive.setAttribute('data-is-open', false);
    };
    back.onclick = event => {
      event.preventDefault();
      window.location.href = 'https://live.amwaynet.com.tw/liveRoom?roomId=11';
    };
  }
  function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }
})(window);
