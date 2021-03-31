// import "./styles.scss";
// import './styles.styl';
(window => {
  let mousePosition = null;
  let amwayLive = null;
  let liveBarSpace = null;
  let offset = null;
  let isDown = false;
  window.onload = () => {
    checkQuery('t');
    checkQuery('hl');
    checkQuery('room');
    if (!isCreateIframe()) return false;
    createHTMLIframe();
    setIframe();
    clickEvent();
    liveBarSpace.addEventListener(
      'touchstart',
      e => {
        e.preventDefault();
        isDown = true;
        if (offset === null) {
          offset = [event.touches[0].pageX, event.touches[0].pageY];
        }
      },
      true,
    );
    liveBarSpace.addEventListener(
      'touchend',
      () => {
        isDown = false;
      },
      true,
    );
    liveBarSpace.addEventListener(
      'touchmove',
      event => {
        if (isDown) {
          mousePosition = {
            x: event.touches[0].pageX,
            y: event.touches[0].pageY,
          };
          amwayLive.style.transform = `translate(${mousePosition.x - offset[0]}px,${mousePosition.y - offset[1]}px)`;
        }
      },
      true,
    );
    liveBarSpace.addEventListener(
      'mousedown',
      event => {
        isDown = true;
        if (offset === null) {
          offset = [event.clientX, event.clientY];
        }
      },
      true,
    );
    liveBarSpace.addEventListener(
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

          amwayLive.style.transform = `translate(${mousePosition.x - offset[0]}px,${mousePosition.y - offset[1]}px)`;
        }
      },
      true,
    );
  };
  window.addEventListener(
    'resize',
    function () {
      offset = null;
      amwayLive.style.transform = '';
    },
    { passive: true },
  );
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
  function isCreateIframe() {
    const t = window.sessionStorage.getItem('t');
    // const hl = window.sessionStorage.getItem('hl');
    return isValid(t);
  }
  function createHTMLIframe() {
    amwayLive = document.createElement('div');
    amwayLive.id = 'amwayLive';
    amwayLive.className = 'amwayLive';
    amwayLive.setAttribute('data-is-open', true);
    const isRoomDisplay = isValid(window.sessionStorage.getItem('room'))

    const str = `<div class="amwayLive__bar"><div id="amwayLive__bar__back" class="amwayLive__bar__back back" data-is-display=${isRoomDisplay}></div><div id="amwayLive__bar__space" class="amwayLive__bar__space"></div><div id="amwayLive__bar__cross" class="amwayLive__bar__cross cross"></div></div><div class="amwayLive__html"><iframe id="amwayLive__iframe" class="amwayLive__iframe"></iframe><div class=""amwayLive__html__back></div></div>`;
    amwayLive.innerHTML = str;
    document.body.appendChild(amwayLive);
    liveBarSpace = document.getElementById('amwayLive__bar__space');
  }
  function setIframe() {
    let liveIframe = document.getElementById('amwayLive__iframe');
    const t = window.sessionStorage.getItem('t');
    const hl = window.sessionStorage.getItem('hl');
    liveIframe.src = `https://player.live.kkstream.io?t=${t}&hl=${hl}`;
  }
  function clickEvent() {
    let cross = document.getElementById('amwayLive__bar__cross');
    let back = document.getElementById('amwayLive__bar__back');
    cross.onclick = event => {
      event.preventDefault();
      amwayLive.setAttribute('data-is-open', false);
    };
    back.onclick = event => {
      event.preventDefault();
      const roomId = window.sessionStorage.getItem('room');
      if (isValid(roomId)) {
        window.location.href = `https://live.amwaynet.com.tw/liveRoom?roomId=${roomId}`;
      }
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
