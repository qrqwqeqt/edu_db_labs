/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "ea86f38c9ae64691c251e732841df007"
  },
  {
    "url": "assets/css/0.styles.baa501a4.css",
    "revision": "cefff3f8c27847bd006c320ad3563c8b"
  },
  {
    "url": "assets/img/3table.98bb1ea3.jpg",
    "revision": "98bb1ea3eb55d48dc6391a174bfb4d3d"
  },
  {
    "url": "assets/img/del_err.f62261cf.jpg",
    "revision": "f62261cf1b844d4235129c6f1cbabacc"
  },
  {
    "url": "assets/img/delete.fb562e24.jpg",
    "revision": "fb562e24e0e3c809f71c12e1216e1ce8"
  },
  {
    "url": "assets/img/get.6d4be9b4.jpg",
    "revision": "6d4be9b4660b87fbc4c9c7a4ab07968c"
  },
  {
    "url": "assets/img/post.495c1c1e.jpg",
    "revision": "495c1c1eb45ee400c791c252f7c6ca41"
  },
  {
    "url": "assets/img/put.b3221589.jpg",
    "revision": "b32215894069fc823d2470777f4a7fa7"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.ede44feb.js",
    "revision": "a5fdc61680aa686098ead5585865520b"
  },
  {
    "url": "assets/js/11.cf759c35.js",
    "revision": "4a4cbe9dba2fe96205db2667a78b4de9"
  },
  {
    "url": "assets/js/12.dcaae35a.js",
    "revision": "43fa593a39277d240494bb4077ec736e"
  },
  {
    "url": "assets/js/13.d41f0125.js",
    "revision": "890d9ee67d873f38c1068de9d8f87d5b"
  },
  {
    "url": "assets/js/14.f1f9576e.js",
    "revision": "d2cc03f4dd624415723c52769c7b6fe0"
  },
  {
    "url": "assets/js/15.a1150af9.js",
    "revision": "eac604ff9653af21fe4e4794c561f7d1"
  },
  {
    "url": "assets/js/16.b4438fab.js",
    "revision": "80d237b15950bacae244c6626b2eef82"
  },
  {
    "url": "assets/js/17.79719cab.js",
    "revision": "8ab5417cbfde56b8bcd21db0670577a7"
  },
  {
    "url": "assets/js/18.0ca0c9cd.js",
    "revision": "b89abdb0b57f541dfae8fdbe36500199"
  },
  {
    "url": "assets/js/19.370f309f.js",
    "revision": "b415c5e067ac55867e36df7016ca3319"
  },
  {
    "url": "assets/js/2.7c92a52e.js",
    "revision": "96cf7e616365ba1d7ef3f6fa6c3cfaae"
  },
  {
    "url": "assets/js/20.e9c57bd0.js",
    "revision": "95f733656560225f79d29bdcab26677f"
  },
  {
    "url": "assets/js/21.84b29c3c.js",
    "revision": "37906e48bafbbb2a79ef329ca7eb886e"
  },
  {
    "url": "assets/js/22.cc33eaee.js",
    "revision": "443514b59348eac187aca688a8c297f5"
  },
  {
    "url": "assets/js/23.b9d18111.js",
    "revision": "d70289b163f1b360d1b9c56da99ea6d9"
  },
  {
    "url": "assets/js/24.b7f7d47f.js",
    "revision": "0f75607f111196bf87120b21d4594d28"
  },
  {
    "url": "assets/js/26.8925e476.js",
    "revision": "60c5ae44e9de26fbdaa7a983ce917288"
  },
  {
    "url": "assets/js/3.1988a510.js",
    "revision": "fe96fb31153dc665b460d75389e28951"
  },
  {
    "url": "assets/js/4.51fccbb2.js",
    "revision": "c205d15ac6bb4abcdcb1dfaabaa5a264"
  },
  {
    "url": "assets/js/5.2f633d58.js",
    "revision": "1ca04c2f67208cdc138ff2bdb723dd11"
  },
  {
    "url": "assets/js/6.a5eceeec.js",
    "revision": "ccffa3b74a48481f4deecbdf9fdfb1ab"
  },
  {
    "url": "assets/js/7.987f5f89.js",
    "revision": "5dd096a048e9bd2b58f2104d1ff0aaae"
  },
  {
    "url": "assets/js/8.cd2e3176.js",
    "revision": "b6c4db4fa28fc934f623035634c9d82b"
  },
  {
    "url": "assets/js/9.8b667cab.js",
    "revision": "7f44f36e25e9cc48e262a648b04ed443"
  },
  {
    "url": "assets/js/app.9fc5fc60.js",
    "revision": "98bc2c7cd2ba79e08f9cc7bb519d383a"
  },
  {
    "url": "conclusion/index.html",
    "revision": "0fbda2991d69700e53fe5bb8a312289a"
  },
  {
    "url": "design/index.html",
    "revision": "afd1e8a5158acaef92bd584cb4913528"
  },
  {
    "url": "index.html",
    "revision": "d19aed39dcbc05ef506a1be525564f0e"
  },
  {
    "url": "intro/index.html",
    "revision": "b8dd95a56d0cc5fd24aa8202cdded1cb"
  },
  {
    "url": "license.html",
    "revision": "70a2edbdcd1a16b29dc6ec11e14ab937"
  },
  {
    "url": "myAvatar.png",
    "revision": "b76db1e62eb8e7fca02a487eb3eac10c"
  },
  {
    "url": "requirements/index.html",
    "revision": "98384ff2dc14eff4d428d586734f042c"
  },
  {
    "url": "requirements/stakeholders-needs.html",
    "revision": "f1a87c1b4417de3e4e5aebd50d8ce27c"
  },
  {
    "url": "requirements/state-of-the-art.html",
    "revision": "d500b0851c4f7b20dff6a68cc1f827c6"
  },
  {
    "url": "software/index.html",
    "revision": "1d94a8801bee3a190a69544c09b55a5c"
  },
  {
    "url": "test/index.html",
    "revision": "9c6eb3fe4af3a421b553b7e653d628ad"
  },
  {
    "url": "use cases/index.html",
    "revision": "db89529de79c753d67c669c60c249157"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
