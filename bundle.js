(()=>{"use strict";const t=new Map,i=t;window.addEventListener("resize",(()=>{[...t.values()].map((t=>{s(t)})),(()=>{const t=document.querySelector('meta[name="viewport"]'),i=Math.round(visualViewport.scale*visualViewport.width),e=Math.round(visualViewport.scale*visualViewport.height);i<=460||e<=460?t.setAttribute("content","width=device-width, initial-scale=0.5, user-scalable=0"):i<=768||e<=768?t.setAttribute("content","width=device-width, initial-scale=0.725, user-scalable=0"):t.setAttribute("content","width=device-width, initial-scale=1.0, user-scalable=0")})()}));const e=i=>{if(t.has(i))return t.get(i);const e=Object.assign(document.createElement("canvas"),{id:i});return t.set(i,e),document.body.appendChild(e),s(e),e.addEventListener("click",(t=>{window.postMessage({type:"click-canvas",payload:{id:i,x:t.clientX,y:t.clientY}},window.origin)})),e},s=t=>{t.width=window.innerWidth,t.height=window.innerHeight},n=t=>{const i=t.getContext("2d");return e=>{i.save(),i.beginPath(),e(i,t),i.closePath(),i.restore()}},h=t=>Math.PI/180*t,o=({time:t,start:i,duration:e})=>{const s=(t-i)/e<0?0:(t-i)/e;return{isProgressing:s<1&&s>0,progress:s,isReserved:(t-i)/e<0,isEnded:(t-i)/e>1}},a=t=>Math.floor(Math.random()*t),r=(t=32,i="Arial Black, Arial, sans-serif")=>`bold ${t}pt ${i}`,l=(t,i)=>Math.random()*(i-t)+t,c=()=>`#${Math.floor(16777215*Math.random()).toString(16).padEnd(6,"0")}`,d=t=>t[a(t.length)];var f,m,p=function(t,i,e,s){if("a"===e&&!s)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof i?t!==i||!s:!i.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===e?s:"a"===e?s.call(t):s?s.value:i.get(t)};class w{constructor(){this.init=({stage:t,timeout:i})=>{this.stage=t,this.timeout=i},this.remove=()=>{},this.update=t=>{this.startTime||(this.startTime=t),p(this,f,"f").call(this),p(this,m,"f").call(this,t)},f.set(this,(()=>{const t=i.get("layer3");n(t)((t=>{t.setTransform(1,0,0,1,0,0),t.font=r(24),t.fillText(`Stage ${this.stage}`,40,56)}))})),m.set(this,(t=>{const e=i.get("layer3");n(e)(((i,e)=>{const s=(Math.max(this.timeout-(t-this.startTime),0)/1e3).toFixed(2);i.setTransform(1,0,0,1,e.width,0),i.font=r(24),i.fillText(s+"",-120,56)}))}))}}f=new WeakMap,m=new WeakMap;var u,v=function(t,i,e,s){if("a"===e&&!s)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof i?t!==i||!s:!i.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===e?s:"a"===e?s.call(t):s?s.value:i.get(t)};class y{constructor(){this.init=({position:t,range:i})=>{this.position=t,this.range=i,window.addEventListener("mousemove",v(this,u,"f"))},this.update=t=>{const i=n(this.layer1),e=n(this.layer2),s=n(this.layer3);i(((t,i)=>{t.setTransform(1,0,0,1,this.position.x,this.position.y),t.strokeStyle="#000",t.beginPath(),t.globalCompositeOperation="destination-in",t.arc(0,0,this.range,0,2*Math.PI,!0),t.fill()})),e(((t,i)=>{t.setTransform(1,0,0,1,this.position.x,this.position.y),t.strokeStyle="#000",t.beginPath(),t.globalCompositeOperation="destination-out",t.arc(0,0,this.range,0,2*Math.PI,!0),t.fill()})),s(((t,i)=>{t.setTransform(1,0,0,1,this.position.x,this.position.y),t.lineWidth=2,t.strokeStyle="#000",t.beginPath(),t.arc(0,0,this.range,0,2*Math.PI,!0),t.stroke()}))},this.remove=()=>{window.removeEventListener("mousemove",v(this,u,"f"))},u.set(this,(t=>{this.position={x:t.clientX,y:t.clientY}})),this.layer1=i.get("layer1"),this.layer2=i.get("layer2"),this.layer3=i.get("layer3")}}u=new WeakMap;var g,M,x,k,T,S,b,W,P,I,E,A,R,C,O,L,j,B,H,$,z,N,X,Y=function(t,i,e,s){if("a"===e&&!s)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof i?t!==i||!s:!i.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===e?s:"a"===e?s.call(t):s?s.value:i.get(t)};const V=["#634e34","#2e536f","#1c7847"],q=["#8d5524","#c68642","#e0ac69","#f1c27d","#ffdbac"];class F{constructor(t=.4){g.add(this),this.isHit=!1,this.init=t=>{const{id:i,position:e,colors:s}=t;this.id=i,this.position=e,this.move={direction:{x:Math.round(Math.random())?1:-1,y:Math.round(Math.random())?1:-1,z:1}},this.colors=s;const n=[...Array.from({length:12},(()=>Y(this,M,"f"))),...Array.from({length:4},(()=>Y(this,x,"f"))),...Array.from({length:24},(()=>Y(this,T,"f"))),...Array.from({length:8},(()=>Y(this,b,"f"))),...Array.from({length:2},(()=>Y(this,P,"f"))),Y(this,S,"f"),Y(this,k,"f"),Y(this,W,"f"),Y(this,I,"f")],h=()=>Math.floor(l(0,n.length-1)),o=()=>{this.moves=[n[h()],n[h()]]},a=()=>{this.intervals=[l(4e3,7e3)]},r=()=>{this.randomX=l(-1,.3),this.randomY=l(-1,.3)},c=()=>{l(-1,1)>0&&Y(this,g,"m",X).call(this),l(-1,1)>0&&Y(this,g,"m",N).call(this)};o(),a(),r(),setInterval((()=>{r(),a(),o()}),l(8e3,16e3)),setInterval((()=>{c()}),l(8e3,16e3))},this.update=t=>{if(this.draw(t),t%1e4<this.intervals[0]){const i=0+1e4*Math.floor(t/1e4),e=this.intervals[0];return void this.moves[0](o({time:t,start:i,duration:e}).progress)}const i=this.intervals[0]+1e4*Math.floor(t/1e4),e=1e4-this.intervals[0];this.moves[1](o({time:t,start:i,duration:e}).progress)},M.set(this,(()=>{this.isMoving=!1})),x.set(this,(()=>{this.isMoving=!0,Y(this,g,"m",$).call(this,this.defaultSpeed*(1+this.randomX)),Y(this,g,"m",z).call(this)})),k.set(this,(()=>{this.isMoving=!0,Y(this,g,"m",$).call(this,this.defaultSpeed*(1+this.randomX)),Y(this,g,"m",H).call(this,this.defaultSpeed*(1+this.randomY)*.6),Y(this,g,"m",z).call(this)})),T.set(this,(()=>{this.isMoving=!0,Y(this,g,"m",$).call(this,this.defaultSpeed),Y(this,g,"m",H).call(this,.2*this.defaultSpeed),Y(this,g,"m",z).call(this)})),S.set(this,(()=>{this.isMoving=!0,Y(this,g,"m",$).call(this,this.defaultSpeed),Y(this,g,"m",H).call(this,1.2*this.defaultSpeed),Y(this,g,"m",z).call(this)})),b.set(this,(t=>{if(this.isMoving=!0,1===t)return this.isMoving=!1;Y(this,g,"m",$).call(this,this.defaultSpeed*(1-t)),Y(this,g,"m",H).call(this,.2*this.defaultSpeed*(1-t)),Y(this,g,"m",z).call(this)})),W.set(this,(t=>{if(this.isMoving=!0,1===t)return this.isMoving=!1;const i=Math.max(.8,t);Y(this,g,"m",$).call(this,this.defaultSpeed*(1-i)),Y(this,g,"m",H).call(this,this.defaultSpeed*(1-i)),Y(this,g,"m",z).call(this)})),P.set(this,(t=>{this.isMoving=!0,Y(this,g,"m",$).call(this,this.defaultSpeed*(1+t)),Y(this,g,"m",H).call(this,this.defaultSpeed*(1+t)*.2),Y(this,g,"m",z).call(this)})),I.set(this,(t=>{this.isMoving=!0;const i=Math.max(Math.min(.2,t),1);Y(this,g,"m",$).call(this,this.defaultSpeed*(1+i)),Y(this,g,"m",H).call(this,this.defaultSpeed*(1+i)*.6),Y(this,g,"m",z).call(this)})),this.remove=()=>{},this.setIsHit=t=>{const{left:i,right:e,top:s,bottom:n}=this.hitBoxPosition,{x:h,y:o}=t;this.isHit=i<=h&&h<=e&&s<=o&&o<=n},this.draw=t=>{const e=i.get("layer1"),s=n(e),h=i.get("layer2"),o=n(h);s(((i,e)=>{Y(this,L,"f").call(this),this.isHit&&Y(this,j,"f").call(this,i),this.isMoving?this.drawMovement(i,e,t,this.position,.6+this.position.z/e.height*.4):this.drawIdle(i,e,t,this.position,.6+this.position.z/e.height*.4)})),o(((i,e)=>{this.isMoving?this.drawMovement(i,e,t,this.position,.3+this.position.z/e.height*.2):this.drawIdle(i,e,t,this.position,.3+this.position.z/e.height*.2)}))},E.set(this,(t=>{t.fillStyle=this.colors.skin,t.fillRect(-12,-54,24,24),t.fillStyle=this.colors.eye,t.fillRect(-8,-46,4,4),t.fillRect(0,-46,4,4),t.fillStyle=this.colors.hair,t.fillRect(-16,-62,28,12),t.fillRect(8,-58,6,20)})),A.set(this,(t=>{t.fillStyle=this.colors.top,t.fillRect(-12,0,8,38),t.fillStyle=this.colors.skin,t.fillRect(-12,38,8,8)})),R.set(this,(t=>{t.fillStyle=this.colors.top,t.fillRect(-12,-54,24,40)})),C.set(this,(t=>{t.fillStyle=this.colors.bottom,t.fillRect(-12,-54,24,12)})),O.set(this,(t=>{t.fillStyle=this.colors.bottom,t.fillRect(-12,0,10,24),t.fillStyle=this.colors.shoe,t.fillRect(-14,23,12,8)})),L.set(this,(()=>{this.hitBoxPosition={left:this.position.x-13.5,width:27,right:this.position.x+13.5,top:this.position.y-35-3,height:70,bottom:this.position.y+35}})),j.set(this,(t=>{t.strokeStyle="#b6d9e9",t.beginPath(),t.ellipse(this.position.x,this.position.y-50+1,12,5,Math.PI,0,2*Math.PI),t.lineWidth=3,t.stroke(),t.strokeStyle="#fff",t.beginPath(),t.ellipse(this.position.x,this.position.y-50,10,5,Math.PI,0,2*Math.PI),t.lineWidth=3,t.stroke()})),B.set(this,((t,{isRect:i})=>{if(t.fillStyle="#fff",i)return t.fillRect(this.hitBoxPosition.left,this.hitBoxPosition.top,this.hitBoxPosition.width,this.hitBoxPosition.height),void t.fill();t.ellipse(this.position.x,this.position.y-5,35,55,Math.PI,0,2*Math.PI),t.fill()})),this.defaultSpeed=t}drawIdle(t,i,e,s,n){t.setTransform(-n*this.move.direction.x,0,0,n,s.x+(4*Number(1===this.move.direction.x)-2)*n,s.y+(-28+Math.sin(e/128))*n),Y(this,A,"f").call(this,t),t.setTransform(-n*this.move.direction.x,0,0,n,s.x,s.y+(24+Math.sin(e/128))*n),Y(this,R,"f").call(this,t),t.setTransform(-n*this.move.direction.x,0,0,n,s.x,s.y+(63+Math.sin(e/128))*n),Y(this,C,"f").call(this,t),t.setTransform(-n*this.move.direction.x,0,0,n,s.x,s.y+16*n),Y(this,O,"f").call(this,t),t.setTransform(-n*this.move.direction.x,0,0,n,s.x+(14+-28*Number(1===this.move.direction.x))*n,s.y+16*n),Y(this,O,"f").call(this,t),t.setTransform(-n*this.move.direction.x,0,0,n,s.x,s.y+Math.sin(e/128)*n),Y(this,E,"f").call(this,t),t.setTransform(-n*this.move.direction.x,0,0,n,s.x+(18+-36*Number(1===this.move.direction.x))*n,s.y+(-28+Math.sin(e/128))*n),Y(this,A,"f").call(this,t)}drawMovement(t,i,e,s,n){t.setTransform(-n*this.move.direction.x,0,0,n,s.x+(4*Number(1===this.move.direction.x)-2)*n,s.y+(2*Math.sin(e/64)-28)*n),t.rotate(h(-8*Math.sin(e/128))),Y(this,A,"f").call(this,t),t.setTransform(-n*this.move.direction.x,0,0,n,s.x,s.y+(24+2*Math.sin(e/128))*n),Y(this,R,"f").call(this,t),t.setTransform(-n*this.move.direction.x,0,0,n,s.x,s.y+(63+2*Math.sin(e/128))*n),Y(this,C,"f").call(this,t),t.setTransform(-n*this.move.direction.x,0,0,n,s.x,s.y+16*n),t.rotate(h(14*Math.sin(e/128)-2)),Y(this,O,"f").call(this,t),t.setTransform(-n*this.move.direction.x,0,0,n,s.x+(14+-28*Number(1===this.move.direction.x))*n,s.y+16*n),t.rotate(h(5+-14*Math.sin(e/128))),Y(this,O,"f").call(this,t),t.setTransform(-n*this.move.direction.x,0,0,n,s.x,s.y+2*Math.sin(e/128)*n),Y(this,E,"f").call(this,t),t.setTransform(-n*this.move.direction.x,0,0,n,s.x+(18+-36*Number(1===this.move.direction.x))*n,s.y+(2*Math.sin(e/64)-28)*n),t.rotate(h(8*Math.sin(e/128))),Y(this,A,"f").call(this,t)}}M=new WeakMap,x=new WeakMap,k=new WeakMap,T=new WeakMap,S=new WeakMap,b=new WeakMap,W=new WeakMap,P=new WeakMap,I=new WeakMap,E=new WeakMap,A=new WeakMap,R=new WeakMap,C=new WeakMap,O=new WeakMap,L=new WeakMap,j=new WeakMap,B=new WeakMap,g=new WeakSet,H=function(t){this.position.y=this.position.y+t*this.move.direction.y},$=function(t){this.position.x=this.position.x+t*this.move.direction.x},z=function(){(this.position.x<-20||this.position.x>=document.body.clientWidth)&&Y(this,g,"m",X).call(this),(this.position.y<-10||this.position.y>=document.body.clientHeight)&&Y(this,g,"m",N).call(this)},N=function(){this.move.direction.y=-1*this.move.direction.y},X=function(){this.move.direction.x=-1*this.move.direction.x};const D=new Proxy({isSoundOn:!1},{set:(t,i,e)=>(Object.assign(t,{[i]:e}),Object.assign(U,{...U,...D}),!0)}),K=D,U=new Proxy({...K},{set:(t,i,e)=>(Object.assign(t,{[i]:e}),!0)}),G=44100,J=new(window.AudioContext||webkitAudioContext),Q=(...t)=>{let i=J.createBuffer(t.length,t[0].length,G),e=J.createBufferSource();return t.map(((t,e)=>i.getChannelData(e).set(t))),e.buffer=i,e.connect(J.destination),e.start(),e},Z=(t=1,i=.05,e=220,s=0,n=0,h=.1,o=0,a=1,r=0,l=0,c=0,d=0,f=0,m=0,p=0,w=0,u=0,v=1,y=0,g=0)=>{let M,x,k=2*Math.PI,T=r*=500*k/G/G,S=e*=(1+2*i*Math.random()-i)*k/G,b=[],W=0,P=0,I=0,E=1,A=0,R=0,C=0;for(l*=500*k/G**3,p*=k/G,c*=k/G,d*=G,f=f*G|0,x=(s=s*G+9)+(y*=G)+(n*=G)+(h*=G)+(u*=G)|0;I<x;b[I++]=C)++R%(100*w|0)||(C=o?o>1?o>2?o>3?Math.sin((W%k)**3):Math.max(Math.min(Math.tan(W),1),-1):1-(2*W/k%2+2)%2:1-4*Math.abs(Math.round(W/k)-W/k):Math.sin(W),C=(f?1-g+g*Math.sin(k*I/f):1)*(C>0?1:-1)*Math.abs(C)**a*t*.2*(I<s?I/s:I<s+y?1-(I-s)/y*(1-v):I<s+y+n?v:I<x-u?(x-I-u)/h*v:0),C=u?C/2+(u>I?0:(I<x-u?1:(x-I)/u)*b[I-u|0]/2):C),M=(e+=r+=l)*Math.cos(p*P++),W+=M-M*m*(1-1e9*(Math.sin(I)+1)%2),E&&++E>d&&(e+=c,S+=c,E=0),!f||++A%f||(e=S,r=T,E=E||1);return b},_=t=>{if(U.isSoundOn)switch(t){case"pick":((...t)=>{Q(Z(...t))})(...[.3,,1384,.02,.01,0,,1.36,8.5,,,,,,15,,,,.01])}};var tt,it,et,st,nt,ht,ot,at=function(t,i,e,s){if("a"===e&&!s)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof i?t!==i||!s:!i.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===e?s:"a"===e?s.call(t):s?s.value:i.get(t)};class rt{constructor(){this.init=t=>{const{persons:i}=t;this.persons=i,this.selectedIndex=0,window.addEventListener("keydown",at(this,nt,"f"))},this.update=t=>{this.draw(t)},this.remove=()=>{window.removeEventListener("keydown",at(this,nt,"f"))},this.draw=t=>{const e=i.get("layer3");n(e)(((i,e)=>{if(i.setTransform(1,0,0,1,e.width-120,e.height-170),at(this,tt,"f").call(this,i),!this.persons.length)return;const s=this.persons[this.selectedIndex];s.isMoving?s.drawMovement(i,e,t,{x:e.width-70,y:e.height-85},1):s.drawIdle(i,e,t,{x:e.width-70,y:e.height-85},1),i.setTransform(1,0,0,1,e.width-26,e.height-110),at(this,it,"f").call(this,i),i.setTransform(1,0,0,1,e.width-113,e.height-110),at(this,et,"f").call(this,i),i.setTransform(1,0,0,1,e.width-74,e.height-180),at(this,st,"f").call(this,i)}))},tt.set(this,(t=>{t.strokeStyle="#000",t.lineWidth=2,t.fillStyle="rgba(255, 255, 255, 0.8)",t.strokeRect(0,0,100,150),t.fillRect(0,0,100,150)})),it.set(this,(t=>{t.fillStyle="#000",t.beginPath(),t.moveTo(0,0),t.lineTo(15,15),t.lineTo(0,30),t.lineTo(0,0),t.fill(),t.font=r(8),t.fillStyle="#fff",t.fillText("S",1,18)})),et.set(this,(t=>{t.fillStyle="rgb(0, 0, 0)",t.beginPath(),t.moveTo(0,0),t.lineTo(-15,15),t.lineTo(0,30),t.lineTo(0,0),t.fill(),t.font=r(8),t.fillStyle="#fff",t.fillText("A",-10,18)})),st.set(this,(t=>{t.font=r(16),t.textAlign="center",t.fillStyle="#000",t.fillText(`${this.selectedIndex+1} / ${this.persons.length}`,0,0,100)})),nt.set(this,(t=>{"KeyA"===t.code&&(_("pick"),at(this,ht,"f").call(this)),"KeyS"===t.code&&(_("pick"),at(this,ot,"f").call(this))})),ht.set(this,(()=>{0===this.selectedIndex?this.selectedIndex=this.persons.length-1:this.selectedIndex-=1})),ot.set(this,(()=>{this.selectedIndex===this.persons.length-1?this.selectedIndex=0:this.selectedIndex+=1})),this.removePerson=t=>{this.persons=this.persons.filter((i=>i.id!==t)),this.selectedIndex=0}}}tt=new WeakMap,it=new WeakMap,et=new WeakMap,st=new WeakMap,nt=new WeakMap,ht=new WeakMap,ot=new WeakMap;const lt=class{constructor(t){this.play=(t=!1)=>{U.isSoundOn&&(this.player=Q(...this.buffer),this.player.loop=t)},this.stop=()=>{this.player.stop()},this.buffer=((t,i,e,s=125)=>{let n,h,o,a,r,l,c,d,f,m,p,w,u,v,y,g=0,M=[],x=[],k=[],T=0,S=0,b=1,W={},P=G/s*60>>2;for(;b;T++)M=[b=d=p=u=0],e.map(((s,p)=>{for(c=i[s][T]||[0,0,0],b|=!!i[s][T],y=u+(i[s][0].length-2-!d)*P,v=p==e.length-1,h=2,a=u;h<c.length+v;d=++h){for(r=c[h],f=h==c.length+v-1&&v||m!=(c[0]||0)|r|0,o=0;o<P&&d;o++>P-99&&f?w+=(w<1)/99:0)l=(1-w)*M[g++]/2||0,x[a]=(x[a]||0)-l*S+l,k[a]=(k[a++]||0)+l*S+l;r&&(w=r%1,S=c[1]||0,(r|=0)&&(M=W[[m=c[g=0]||0,r]]=W[[m,r]]||(n=[...t[m]],n[2]*=2**((r-12)/12),r>0?Z(...n):[])))}u=y}));return[x,k]})(...t)}},ct=[[[.4,0,232,.01,.09,.15,,,,,,,154.87,,,,.26],[.1,0,900,.02,,.07,4,0,,,,,,4],[.2,0,84,,,,,.7,,,,.5,,6.7,1,.05],[.3,0,42,,.08,.18,1]],[[[,-.5,12,,,,24,,,22,,,,,18,,22,,12,,,,24,,,22,,,,,25,,27,,12,,,,24,,,22,,,16,,15,,20,,12,,,,24,,,22,,20,,18,,16,,20],[1,-.3,,,29,32,,,29,32,,,29,32,,,29,32,,,29,32,,,29,32,,,29,32,29,32,29,32,,,29,32,,,29,32,,,29,32,,,29,32,,,29,32,,,29,32,,,29,32,29,32,29,32],[2,.3,13,,,,13,,,,13,,,,13,,,,13,,,,13,,,,13,,,,13,,13,,13,,,,13,,,,13,,,,13,,,,13,,,,13,,,,13,,,,13,,13,,],[3,.5,12,24,12,24,18,30,18,30,24,36,24,36,18,30,18,30,12,24,12,24,18,30,18,30,24,36,24,36,18,30,18,30,12,24,12,24,18,30,18,30,24,36,24,36,18,30,18,30,12,24,12,24,18,30,18,30,24,36,24,36,18,30,18,30]]],[0],62];class dt{constructor(){this.stage=0,this.timeout=1e4,this.music=new lt(ct),this.start=()=>{this.music.play(!0),this.info.init({stage:this.stage,timeout:this.timeout}),this.persons=[...new Array(100)].map((()=>new F)),this.persons.forEach(((t,i)=>{t.init({id:i,position:{x:a(this.layer1.width),y:a(this.layer1.height),z:0},colors:{hair:c(),eye:d(V),skin:d(q),top:c(),bottom:c(),shoe:c()}})})),this.magnifier.init({position:{x:0,y:0},range:100});const t=this.persons.filter((t=>t.id<3));this.wantedPoster.init({persons:[...t]}),window.addEventListener("click",(i=>{t.forEach((t=>{t.isHit||(t.setIsHit({x:i.clientX,y:i.clientY}),t.isHit&&(alert(`You hit PersonId:${t.id}!`),this.wantedPoster.removePerson(t.id)))}))}))},this.update=t=>{this.info.update(t),this.persons.forEach((i=>{i.update(t)})),this.magnifier.update(t),this.wantedPoster.update(t)},this.end=()=>{this.music.stop(),this.info.remove(),this.persons.forEach((t=>t.remove()))},this.info=new w,this.persons=[],this.layer1=i.get("layer1"),this.magnifier=new y,this.wantedPoster=new rt}}const ft=[[[.2,0,4e3,,,.03,2,1.25,,,,,.02,6.8,-.3,,.4],[.2,0,640,.01,.12,.24,1,.8,-.1,,-10,.2,,.8,,,.08,.8],[.2,0,84,,,,,.7,,,,.5,,6.7,1,.05],[.3,0,219,,,,,1.1,,-.1,-50,-.05,-.01,1],[.2,0,22,,.08,.08,3,12,,,,,.02,,,,.01]],[[[1,-.3,10,,,,13,,10,,,,10,,13,,10,,,,10,,13,,10,,15,,10,,13,,10,,,,10,,13,,10,,,,10,,15,,10,,,,10,,13,,15,,17,,15,,13,,10,,],[2,-.5,5,,,,5,,,,5,,,,5,,,,5,,,,5,,,,5,,,,5,,,,5,,,,5,,,,5,,,,5,,,,5,,,,5,,,,5,,,,5,,,,],[,.5,1,,1,,1,,1,,1,,1,,1,,1,,1,,1,,1,,1,,1,,1,,1,,1,,1,,1,,1,,1,,1,,1,,1,,1,,1,,1,,1,,1,,1,,1,,1,,1,,],[3,,,,,,20,,,,,,,,20,,,,,,,,20,,,,,,,,20,,,,,,,,20,,,,,,,,20,,,,,,,,20,,,,,,,,20,,20,20],[4,.4,22,,,,22,,20,22,,,,,22,,20,22,,,,,22,,25,22,,,,,22,,20,22,,,,,22,,20,22,,,,,22,,20,22,,,,,22,,25,29,,,,,32,,25,27]]],[0],100];var mt,pt,wt,ut,vt,yt,gt,Mt,xt=function(t,i,e,s){if("a"===e&&!s)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof i?t!==i||!s:!i.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===e?s:"a"===e?s.call(t):s?s.value:i.get(t)};class kt{constructor(){this.activeMenuIndex=0,this.menus=[{key:"start",action:()=>xt(this,vt,"f").call(this,"play")},{key:"sound",action:()=>{const{isSoundOn:t}=U;(t=>{Object.assign(K,{isSoundOn:t})})(!t),U.isSoundOn?this.music.play(!0):this.music.stop()}}],this.music=new lt(ft),this.start=()=>{this.activeMenuIndex=0,xt(this,mt,"f").call(this),this.music.play(!0)},this.update=t=>{xt(this,yt,"f").call(this),xt(this,gt,"f").call(this),xt(this,Mt,"f").call(this,t)},this.end=()=>{xt(this,pt,"f").call(this),this.music.stop()},mt.set(this,(()=>{window.addEventListener("keydown",xt(this,wt,"f")),window.addEventListener("keydown",xt(this,ut,"f"))})),pt.set(this,(()=>{window.removeEventListener("keydown",xt(this,wt,"f")),window.removeEventListener("keydown",xt(this,ut,"f"))})),wt.set(this,(t=>{_("pick"),"ArrowDown"===t.code&&(this.activeMenuIndex=Math.min(this.activeMenuIndex+1,this.menus.length-1)),"ArrowUp"===t.code&&(this.activeMenuIndex=Math.max(this.activeMenuIndex-1,0))})),ut.set(this,(t=>{"Space"===t.code&&this.menus[this.activeMenuIndex].action()})),vt.set(this,(t=>{window.postMessage({type:"change-scene",payload:t},window.origin)})),yt.set(this,(()=>{const t=i.get("layer1");n(t)(((t,i)=>{t.setTransform(1,0,0,1,i.width/2-172,i.height/2-200),t.font=r(40),t.lineWidth=2,t.strokeText("The Reaper",0,0)}))})),gt.set(this,(()=>{const t=i.get("layer1");n(t)(((t,i)=>{t.setTransform(1,0,0,1,i.width/2-20,i.height/2-100),t.font=r(12),t.fillText("Start",0,0),t.transform(1,0,0,1,-20,40),t.font=r(12);const e=U.isSoundOn?"on":"off";1===this.activeMenuIndex?t.fillText(`Sound [ ${e} ]`,0,0):t.fillText(`Sound ${e}`,0,0),t.setTransform(1,0,0,1,i.width/2-100,i.height/2-116+40*this.activeMenuIndex),t.beginPath(),t.moveTo(0,0),t.lineTo(16,10),t.lineTo(0,20),t.lineWidth=1,t.closePath(),t.stroke()}))})),Mt.set(this,(t=>{const e=i.get("layer1");n(e)(((i,e)=>{i.setTransform(1,0,0,1,e.width/2-100,e.height/2+40+2*Math.sin(t/60)),i.font=r(12),i.fillText("Press spacebar to act",0,0)}))}))}}mt=new WeakMap,pt=new WeakMap,wt=new WeakMap,ut=new WeakMap,vt=new WeakMap,yt=new WeakMap,gt=new WeakMap,Mt=new WeakMap;var Tt,St,bt,Wt,Pt=function(t,i,e,s){if("a"===e&&!s)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof i?t!==i||!s:!i.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===e?s:"a"===e?s.call(t):s?s.value:i.get(t)};Tt=new WeakMap,St=new WeakMap,bt=new WeakMap,Wt=new WeakMap,e("layer1"),e("layer2"),e("layer3"),(new class{constructor(){this.start=()=>{this.scenes[this.activeScene].start(),requestAnimationFrame(Pt(this,bt,"f")),Pt(this,Wt,"f").call(this)},Tt.set(this,(t=>{this.scenes[this.activeScene].end(),this.activeScene=t,this.scenes[this.activeScene].start()})),St.set(this,(t=>{console.log("canvas click"),console.log(t)})),bt.set(this,(i=>{[...t.values()].map((t=>(t=>{const i=t.getContext("2d");return()=>{i.setTransform(1,0,0,1,0,0),i.clearRect(0,0,t.width,t.height)}})(t)())),this.scenes[this.activeScene].update(i),requestAnimationFrame(Pt(this,bt,"f"))})),Wt.set(this,(()=>{window.addEventListener("message",(t=>{if(!t.data)return;const{type:i,payload:e}=t.data;switch(i){case"change-scene":Pt(this,Tt,"f").call(this,e);break;case"click-canvas":Pt(this,St,"f").call(this,e)}}))})),this.activeScene="title",this.scenes={play:new dt,title:new kt}}}).start()})();