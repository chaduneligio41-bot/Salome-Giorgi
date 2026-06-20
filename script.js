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
