/* ============================================================
   IWasReady.com — Shared Analytics + Attribution Layer
   analytics.js v1.0
   Load on every page, before GTM fires events.
   ============================================================ */

'use strict';

// ── Data Layer ────────────────────────────────────────────────────────────────
window.dataLayer = window.dataLayer || [];

/**
 * Push a named event to GTM's dataLayer with full attribution context.
 * @param {string} name   GA4 event name
 * @param {Object} params Extra parameters merged onto the event
 */
function trackEvent(name, params) {
  var ctx = _getAttributionContext();
  window.dataLayer.push(Object.assign({ event: name }, ctx, params || {}));
}

// ── UTM / Click-ID capture ────────────────────────────────────────────────────
var _UTM_KEYS = [
  'utm_source', 'utm_medium', 'utm_campaign',
  'utm_content', 'utm_term', 'utm_id',
  'fbclid', 'ttclid', 'gclid'
];
var _ATTR_ORIG = 'iwr_attr_orig'; // first-touch, written once
var _ATTR_LAST = 'iwr_attr_last'; // last-touch, overwritten on each ad visit

function _captureUTMs() {
  var params = new URLSearchParams(window.location.search);
  var hit = {};
  var hasAny = false;

  _UTM_KEYS.forEach(function (k) {
    var v = params.get(k);
    if (v) { hit[k] = v; hasAny = true; }
  });

  if (!hasAny) return;

  // Last-touch always updates
  try { localStorage.setItem(_ATTR_LAST, JSON.stringify(hit)); } catch (e) {}

  // First-touch writes once
  try {
    if (!localStorage.getItem(_ATTR_ORIG)) {
      localStorage.setItem(_ATTR_ORIG, JSON.stringify(hit));
    }
  } catch (e) {}
}

function _readAttr(key) {
  try {
    var raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : {};
  } catch (e) { return {}; }
}

function _getAttributionContext() {
  var orig = _readAttr(_ATTR_ORIG);
  var last = _readAttr(_ATTR_LAST);
  return {
    traffic_source:   orig.utm_source   || '',
    traffic_medium:   orig.utm_medium   || '',
    traffic_campaign: orig.utm_campaign || '',
    traffic_content:  orig.utm_content  || '',
    traffic_id:       orig.utm_id       || '',
    hook_angle:       orig.utm_content  || '', // content param often encodes hook
    creative_id:      orig.utm_id       || '',
    session_entry_page: _getEntryPage(),
    original_landing_page: _getEntryPage()
  };
}

// ── Session entry page ────────────────────────────────────────────────────────
var _SESSION_ENTRY = 'iwr_session_entry';

function _getEntryPage() {
  try {
    var v = sessionStorage.getItem(_SESSION_ENTRY);
    if (v) return v;
    var entry = window.location.pathname;
    sessionStorage.setItem(_SESSION_ENTRY, entry);
    return entry;
  } catch (e) { return window.location.pathname; }
}

// ── Paid-traffic mode detection ───────────────────────────────────────────────
/**
 * Returns true when the current session looks like paid social traffic.
 * Triggered by utm_medium=paid_social on any page, or ?lp=paid on the quiz.
 */
function isPaidTrafficMode() {
  try {
    var params = new URLSearchParams(window.location.search);
    if (params.get('lp') === 'paid') return true;
    var medium = params.get('utm_medium') || _readAttr(_ATTR_LAST).utm_medium || '';
    return medium === 'paid_social' || medium === 'cpc';
  } catch (e) { return false; }
}

// ── CTA click tracking ────────────────────────────────────────────────────────
function _initCtaTracking() {
  document.addEventListener('click', function (e) {
    var el = e.target.closest ? e.target.closest('[data-cta]') : null;
    if (!el) return;
    trackEvent('cta_click', {
      cta_name:        el.getAttribute('data-cta')  || '',
      cta_destination: el.getAttribute('href') || el.getAttribute('data-dest') || '',
      cta_position:    el.getAttribute('data-pos')  || '',
      page_type:       (document.body && document.body.dataset.page) || ''
    });
  }, true);
}

// ── Outbound click tracking ───────────────────────────────────────────────────
var _OUTBOUND_MAP = [
  { match: 'helloaudio.fm',            event: 'audiobook_click'          },
  { match: 'rickbroider.substack.com', event: 'substack_click'           },
  { match: 'stopthecollapse.com',      event: 'builders_path_click'      },
  { match: 'book-preview.html',        event: 'free_preview_click'       },
  { match: 'quiz.html',                event: 'signal_activation_click'  }
];

function _initOutboundTracking() {
  document.addEventListener('click', function (e) {
    var el = e.target.closest ? e.target.closest('a[href]') : null;
    if (!el) return;
    var href = el.getAttribute('href') || '';

    _OUTBOUND_MAP.forEach(function (rule) {
      if (href.indexOf(rule.match) !== -1) {
        trackEvent(rule.event, {
          cta_destination: href,
          cta_name:        el.getAttribute('data-cta') || rule.event,
          page_type:       (document.body && document.body.dataset.page) || ''
        });
      }
    });

    // Generic outbound for any link leaving the domain
    var isExternal = href.indexOf('http') === 0 &&
                     href.indexOf('iwasready.com') === -1 &&
                     href.indexOf(window.location.hostname) === -1;
    if (isExternal) {
      trackEvent('outbound_click', {
        cta_destination: href,
        cta_name:        el.getAttribute('data-cta') || '',
        page_type:       (document.body && document.body.dataset.page) || ''
      });
    }
  }, true);
}

// ── Trailer / video tracking ──────────────────────────────────────────────────
function _initVideoTracking() {
  var video = document.querySelector('video.trailer-video');
  if (!video) return;
  var fired = { play: false, 25: false, 50: false, 75: false, complete: false };

  video.addEventListener('play', function () {
    if (!fired.play) { fired.play = true; trackEvent('trailer_play', { page_type: 'home' }); }
  });

  video.addEventListener('timeupdate', function () {
    if (!video.duration) return;
    var pct = (video.currentTime / video.duration) * 100;
    [25, 50, 75].forEach(function (m) {
      if (!fired[m] && pct >= m) {
        fired[m] = true;
        trackEvent('trailer_milestone', { milestone: m + '%', page_type: 'home' });
      }
    });
  });

  video.addEventListener('ended', function () {
    if (!fired.complete) {
      fired.complete = true;
      trackEvent('trailer_complete', { page_type: 'home' });
    }
  });
}

// ── Attribution payload for form submissions ──────────────────────────────────
/**
 * Returns a flat attribution object suitable for:
 *   - hidden form fields
 *   - API POST payloads (e.g., ConvertKit custom fields)
 * Pass extra fields as an object to merge.
 */
function getFormAttribution(extra) {
  var orig = _readAttr(_ATTR_ORIG);
  var last = _readAttr(_ATTR_LAST);
  return Object.assign({
    orig_source:   orig.utm_source   || '',
    orig_medium:   orig.utm_medium   || '',
    orig_campaign: orig.utm_campaign || '',
    orig_content:  orig.utm_content  || '',
    last_source:   last.utm_source   || '',
    last_medium:   last.utm_medium   || '',
    last_campaign: last.utm_campaign || '',
    last_content:  last.utm_content  || '',
    page_url:      window.location.href,
    timestamp:     new Date().toISOString(),
    session_entry: _getEntryPage()
  }, extra || {});
}

// ── Expose globals for inline page scripts ────────────────────────────────────
window.trackEvent         = trackEvent;
window.isPaidTrafficMode  = isPaidTrafficMode;
window.getFormAttribution = getFormAttribution;

// ── Boot ──────────────────────────────────────────────────────────────────────
(function boot() {
  _captureUTMs();

  document.addEventListener('DOMContentLoaded', function () {
    _initCtaTracking();
    _initOutboundTracking();
    _initVideoTracking();

    // Page-view event (supplement to GTM auto page_view)
    var params = new URLSearchParams(window.location.search);
    trackEvent('page_view', {
      page_type:       (document.body && document.body.dataset.page) || '',
      page_url:        window.location.href,
      landing_variant: params.get('lp') || '',
      paid_mode:       isPaidTrafficMode() ? '1' : '0'
    });
  });
})();
