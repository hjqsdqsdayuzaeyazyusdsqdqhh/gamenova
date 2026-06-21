import { NextRequest, NextResponse } from "next/server";

const GD_BASE = "https://html5.gamedistribution.com/rvvASMiM";

const MOCK_SDK = `
<script>
(function(){
  var origCreate = document.createElement.bind(document);
  document.createElement = function(tag, opt) {
    var el = origCreate(tag, opt);
    if (tag && tag.toLowerCase() === 'script') {
      var origSet = Object.getOwnPropertyDescriptor(HTMLScriptElement.prototype, 'src').set;
      Object.defineProperty(el, 'src', {
        set: function(v) {
          if (v && v.indexOf('api.gamedistribution.com') !== -1) {
            console.log('[GD] blocked SDK:', v);
            return;
          }
          origSet.call(el, v);
        },
        get: function() { return ''; }
      });
    }
    return el;
  };
  window.GD_OPTIONS = { onEvent: function(e) { console.log('[GD] event:', e&&e.type); } };
  window.GD_SDK = {
    showAd: function(){},
    showRewardedAd: function(){},
    gameStart: function(){},
    gameEnd: function(){},
    sdkReady: true
  };
  var fire = function() {
    try { window.GD_OPTIONS.onEvent({type:'SDK_GAME_START'}); } catch(e){}
    try { window.dispatchEvent(new Event('SDK_GAME_START')); } catch(e){}
    try { window.dispatchEvent(new Event('sdk-ready')); } catch(e){}
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fire);
  } else {
    fire();
  }
})();
</script>
`;

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ uuid: string }> }
) {
  const { uuid } = await params;
  if (!uuid || typeof uuid !== "string") {
    return new NextResponse("Missing UUID", { status: 400 });
  }

  try {
    const res = await fetch(`${GD_BASE}/${uuid}/index.html`, {
      signal: AbortSignal.timeout(10000),
    });

    if (!res.ok) {
      return new NextResponse("Game not found", { status: 502 });
    }

    let html = await res.text();

    const baseUrl = `/api/gd/${uuid}`;
    html = html.replace("<head>", `<head>\n<base href="${baseUrl}/">\n${MOCK_SDK}`);

    return new NextResponse(html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Content-Security-Policy":
          "default-src 'self' 'unsafe-inline' 'unsafe-eval' https: data: blob:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; worker-src 'self' blob: https:; connect-src 'self' https: blob: data: ws: wss:; img-src 'self' https: data: blob:; style-src 'self' 'unsafe-inline' https:; media-src 'self' https: blob:; font-src 'self' https: data:; frame-src *;",
        "X-Frame-Options": "SAMEORIGIN",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err) {
    console.error("[game-proxy] fetch error:", err);
    return new NextResponse("Proxy error", { status: 502 });
  }
}
