/* ─── Countdown ──────────────────────────────────────────── */
(function () {
  var wedding = new Date('2026-09-05T18:00:00');

  function pad(n) { 
    return String(n).padStart(2, '0'); 
  }

  function tick() {
    var diff = wedding - Date.now();
    if (diff <= 0) {
      var el = document.getElementById('countdown');
      if (el) el.innerHTML = '<p class="countdown-done">დღეს ის დღეა!</p>';
      return;
    }
    var days  = Math.floor(diff / 864e5);
    var hours = Math.floor((diff % 864e5) / 36e5);
    var mins  = Math.floor((diff % 36e5)  / 6e4);
    var secs  = Math.floor((diff % 6e4)   / 1e3);
    
    var daysEl = document.getElementById('cd-days');
    var hoursEl = document.getElementById('cd-hours');
    var minsEl = document.getElementById('cd-mins');
    var secsEl = document.getElementById('cd-secs');

    if (daysEl) daysEl.textContent  = pad(days);
    if (hoursEl) hoursEl.textContent = pad(hours);
    if (minsEl) minsEl.textContent  = pad(mins);
    if (secsEl) secsEl.textContent  = pad(secs);
  }

  tick();
  setInterval(tick, 1000);
})();

/* ─── Scroll-reveal ──────────────────────────────────────── */
(function () {
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.section').forEach(function (s) {
    observer.observe(s);
  });
})();

/* ─── Background music (YouTube) ──────────────────────────── */
(function () {
  var VIDEO_ID = '-Ai3nowbLU8';
  var btn = document.getElementById('music-toggle');
  if (!btn) return;

  var player = null;
  var ready = false;
  var playing = false;
  var wantPlay = false;

  function setUI(on) {
    playing = on;
    btn.classList.toggle('is-playing', on);
    btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    btn.setAttribute('aria-label', on ? 'მუსიკის გამორთვა' : 'მუსიკის ჩართვა');
  }

  // Load the YouTube IFrame API.
  var tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  document.head.appendChild(tag);

  window.onYouTubeIframeAPIReady = function () {
    player = new YT.Player('yt-player', {
      videoId: VIDEO_ID,
      playerVars: {
        autoplay: 0,
        controls: 0,
        loop: 1,
        playlist: VIDEO_ID, // required so a single video loops
        playsinline: 1,
        modestbranding: 1,
        rel: 0
      },
      events: {
        onReady: function () {
          ready = true;
          player.setVolume(60);
          if (wantPlay) player.playVideo(); // start if the guest already asked
        },
        onStateChange: function (e) {
          if (e.data === YT.PlayerState.PLAYING) setUI(true);
          else if (e.data === YT.PlayerState.PAUSED || e.data === YT.PlayerState.ENDED) setUI(false);
        }
      }
    });
  };

  function play() {
    wantPlay = true;
    if (ready && player) player.playVideo();
  }
  function pause() {
    wantPlay = false;
    if (ready && player) player.pauseVideo();
  }

  // Button always works — even if YouTube hasn't finished loading yet,
  // the request is remembered and fired the moment it's ready.
  btn.addEventListener('click', function () {
    if (playing) pause(); else play();
  });

  // Also start on the visitor's first interaction anywhere on the page.
  function tryAutoStart() { play(); }
  ['pointerdown', 'keydown', 'touchstart'].forEach(function (ev) {
    document.addEventListener(ev, tryAutoStart, { once: true });
  });
})();
