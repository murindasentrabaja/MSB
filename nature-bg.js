/* Latar belakang alam dinamis (hutan, bawah laut, gunung, dst) - drop-in untuk ERP Engineering MSB.
   Pasang tepat sebelum </body>:  <script src="nature-bg.js"></script> */
(function(){
  if(document.getElementById('nbg-a'))return;
  var P=["1506744038136-46273834b3fb", "1470071459604-3b5ec3a7fe05", "1441974231531-c6227db76b6e", "1500534623283-312aade485b7", "1439853949127-fa647821eba0", "1506905925346-21bda4d32df4", "1518495973542-4542c06a5843", "1519681393784-d120267933ba", "1472214103451-9374bd1c798e", "1426604966848-d7adac402bff", "1441260038675-7329ab4cc264", "1476231682828-37e571bc172f", "1490750967868-88aa4486c946", "1447752875215-b2761acb3c5d", "1465146344425-f00d5f5c8f07", "1476514525535-07fb3b4ae5f1", "1519046904884-53103b34b206", "1441716844725-09cedc13a4e7", "1502082553048-f009c37129b9", "1465101162946-4377e57745c3", "1504280390367-361c6d9f38f4", "1470252649378-9c29740c9fa8", "1448375240586-882707db888b", "1425913397330-cf8af2ff40a1", "1511497584788-876760111969", "1473448912268-2022ce9509d8", "1542273917363-3b1817f69a2d", "1518531933037-91b2f5f229cc", "1440342359743-84fcb8c21f21", "1509316975850-ff9c5deb0cd9", "1502786129293-79981df4e689", "1455156218388-5e61b526818b", "1544551763-46a013bb70d5", "1559827260-dc66d52bef19", "1546026423-cc4642628d2b", "1437622368342-7a3d73a34c8f", "1583212292454-1fe6229603b7", "1582967788606-a171c1080cb0", "1518837695005-2083093ee35b", "1505142468610-359e7d316be0", "1544552866-d3ed42536cfd", "1570481662006-a3a1374699e8"].map(function(i){return 'https://images.unsplash.com/photo-'+i;});
  var Q='?auto=format&fit=crop&w=1920&q=80';
  var css='html,body{background:transparent!important}'
  +'.nbg-layer{position:fixed;inset:0;z-index:-3;overflow:hidden;background:#05070d}'
  +'.nbg-img{position:absolute;inset:-3%;width:106%;height:106%;background-size:cover;background-position:center;opacity:0;transform:scale(1.045);filter:saturate(1.12) brightness(.88);transition:opacity 1.6s ease,transform 9s ease}'
  +'.nbg-img.on{opacity:1;transform:scale(1)}'
  +'.nbg-scrim{position:fixed;inset:0;z-index:-2;pointer-events:none;background:linear-gradient(180deg,rgba(5,10,28,.6),rgba(6,12,28,.34) 30%,rgba(6,12,28,.42) 68%,rgba(3,6,16,.7))}'
  +'.nbg-btn{position:fixed;left:14px;bottom:calc(14px + env(safe-area-inset-bottom,0px));z-index:9000;width:44px;height:44px;border-radius:50%;border:1px solid rgba(255,255,255,.3);background:rgba(10,20,45,.55);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);color:#fff;font-size:20px;cursor:pointer;box-shadow:0 8px 22px rgba(0,0,0,.35)}'
  +'.nbg-btn.busy{opacity:.55}'
  +'.nbg-credit{position:fixed;left:66px;bottom:calc(24px + env(safe-area-inset-bottom,0px));z-index:9000;font:600 11px sans-serif;color:rgba(255,255,255,.8);background:rgba(0,0,0,.35);padding:5px 11px;border-radius:20px;opacity:0;transition:opacity .4s;pointer-events:none}'
  +'.nbg-credit.on{opacity:1}'
  +'@media (prefers-reduced-motion:reduce){.nbg-img{transition:opacity .6s}}';
  var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
  var box=document.createElement('div');
  box.innerHTML='<div class="nbg-layer" aria-hidden="true"><div class="nbg-img" id="nbg-a"></div><div class="nbg-img" id="nbg-b"></div></div><div class="nbg-scrim" aria-hidden="true"></div><button class="nbg-btn" id="nbg-btn" type="button" title="Ganti pemandangan" aria-label="Ganti pemandangan">\U0001F3DE\uFE0F</button><div class="nbg-credit" id="nbg-credit">Foto: Unsplash</div>';
  while(box.firstChild)document.body.insertBefore(box.firstChild,document.body.firstChild);
  var act=document.getElementById('nbg-a'),idle=document.getElementById('nbg-b'),btn=document.getElementById('nbg-btn'),cr=document.getElementById('nbg-credit');
  var deck=[],dead={},busy=false,t;
  function shuffle(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),x=a[i];a[i]=a[j];a[j]=x;}return a;}
  function draw(){if(!deck.length){var pool=P.filter(function(u){return !dead[u];});deck=shuffle(pool.length?pool:P);}return deck.pop();}
  function show(u,n){
    if(busy)return;busy=true;btn.classList.add('busy');
    var im=new Image();
    im.onload=function(){idle.style.backgroundImage='url("'+u+Q+'")';void idle.offsetWidth;act.classList.remove('on');idle.classList.add('on');var s=act;act=idle;idle=s;busy=false;btn.classList.remove('busy');cr.classList.add('on');clearTimeout(t);t=setTimeout(function(){cr.classList.remove('on');},3000);};
    im.onerror=function(){dead[u]=1;busy=false;btn.classList.remove('busy');if((n||0)<P.length-1)show(draw(),(n||0)+1);};
    im.src=u+Q;
  }
  window._nextNatureBg=function(){show(draw(),0);};
  btn.addEventListener('click',window._nextNatureBg);
  show(draw(),0);
})();
