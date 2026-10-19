const hero=document.querySelector('.hero'),portrait=document.querySelector('#portrait'),toggle=document.querySelector('#transform-toggle'),status=document.querySelector('#portrait-status'),reduced=matchMedia('(prefers-reduced-motion: reduce)');
let ready=false,full=false,active=false,frame=0,targetX=0,targetY=0,x=0,y=0,angleX=0,angleY=0;
const halo=document.querySelector('#halo');
let tiltX=0,tiltY=0;
const clamp=(n,min,max)=>Math.min(max,Math.max(min,n));
let nextScanChange=0;
function resetScan(){
  for(const property of ['--scan-half-width','--scan-half-height','--scan-edge-alpha','--scan-echo'])portrait.style.removeProperty(property);
  nextScanChange=0;
}
function varyScan(now=performance.now()){
  if(reduced.matches||full||now<nextScanChange)return;
  const mobile=window.innerWidth<=600;
  const width=mobile?140+Math.random()*120:220+Math.random()*200;
  const height=mobile?18+Math.random()*62:24+Math.random()*106;
  // Discrete size jumps feel like a signal fault; pointer tracking remains smooth.
  portrait.style.setProperty('--scan-half-width',`${Math.round(width/2)}px`);
  portrait.style.setProperty('--scan-half-height',`${Math.round(height/2)}px`);
  portrait.style.setProperty('--scan-edge-alpha',(.4+Math.random()*.4).toFixed(2));
  portrait.style.setProperty('--scan-echo',`${Math.round(Math.random()*6-3)}px`);
  nextScanChange=now+220+Math.random()*220;
}

Promise.all([...portrait.querySelectorAll('img')].map(img=>img.decode())).then(()=>{ready=true;toggle.disabled=false;toggle.textContent='Reveal alternate identity';status.textContent='Portrait ready. Move over the hero or use the reveal button.';}).catch(()=>{toggle.textContent='Alternate portrait unavailable';status.textContent='The alternate portrait could not load. The base portrait remains visible.';});
function render(){
  frame=0;
  const ease=reduced.matches?1:.12;
  x+=(targetX-x)*ease;y+=(targetY-y)*ease;
  const desiredX=active&&!reduced.matches?angleX:0,desiredY=active&&!reduced.matches?angleY:0;
  tiltX+=(desiredX-tiltX)*ease;tiltY+=(desiredY-tiltY)*ease;
  portrait.style.setProperty('--mx',`${x}px`);portrait.style.setProperty('--my',`${y}px`);
  portrait.style.transform=`perspective(1200px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
  // A separate depth plane rotates more visibly, while remaining behind the body.
  halo.style.transform=`perspective(1000px) rotateX(${tiltX*4}deg) rotateY(${tiltY*4}deg) rotateZ(${tiltY*2.5}deg)`;
  const moving=Math.abs(desiredX-tiltX)>.01||Math.abs(desiredY-tiltY)>.01;
  if(!reduced.matches&&(moving||(active&&(Math.abs(targetX-x)>.1||Math.abs(targetY-y)>.1))))frame=requestAnimationFrame(render);
}
function schedule(){if(!frame)frame=requestAnimationFrame(render);}
function track(event){if(!ready||event.target.closest('a,button,input,label'))return;const bounds=portrait.parentElement.getBoundingClientRect();targetX=event.clientX-bounds.left;targetY=event.clientY-bounds.top;if(!active){x=targetX;y=targetY;}angleY=clamp((targetX/bounds.width-.5)*6,-3,3);angleX=clamp((.5-targetY/bounds.height)*6,-3,3);active=true;portrait.classList.add('is-revealing');varyScan();schedule();}
hero.addEventListener('pointermove',e=>{if(e.pointerType!=='touch'||e.buttons)track(e);});hero.addEventListener('pointerdown',track,{passive:true});
function leave(){active=false;portrait.classList.remove('is-revealing');schedule();}
hero.addEventListener('pointerleave',leave);hero.addEventListener('pointercancel',leave);hero.addEventListener('pointerup',e=>{if(e.pointerType==='touch')leave();});
// No pointer capture or preventDefault: vertical scrolling stays native.
toggle.addEventListener('click',()=>{if(!ready)return;full=!full;resetScan();portrait.classList.toggle('is-full',full);toggle.setAttribute('aria-pressed',String(full));toggle.textContent=full?'Return to original':'Reveal alternate identity';status.textContent=full?'Full alternate portrait shown.':'Original portrait shown. Pointer reveal enabled.';});reduced.addEventListener('change',()=>{if(reduced.matches){tiltX=0;tiltY=0;resetScan();}schedule();});
window.addEventListener('resize',resetScan,{passive:true});
// A missing decorative asset must never block portrait controls.
halo.decode().catch(()=>{halo.hidden=true;});
const audio=document.querySelector('#soundtrack'),file=document.querySelector('#sound-file'),sound=document.querySelector('#sound-toggle'),audioStatus=document.querySelector('#audio-status');let audioURL;
file.addEventListener('change',()=>{const selected=file.files[0];if(!selected)return;audio.pause();if(audioURL)URL.revokeObjectURL(audioURL);audioURL=URL.createObjectURL(selected);audio.src=audioURL;sound.disabled=false;sound.textContent='PLAY SOUND';sound.setAttribute('aria-pressed','false');audioStatus.textContent=`Ready: ${selected.name}. Audio stays on your device.`;});
sound.addEventListener('click',async()=>{if(audio.paused){try{await audio.play();sound.textContent='SOUND ON';sound.setAttribute('aria-pressed','true');}catch{audioStatus.textContent='Unable to play this file. Try another audio format.';}}else{audio.pause();sound.textContent='SOUND OFF';sound.setAttribute('aria-pressed','false');}});audio.addEventListener('error',()=>{sound.disabled=true;audioStatus.textContent='This audio file could not load. Choose another file.';});

// Two document-space rails: fill follows the viewport; nodes follow real sections.
const route=document.querySelector('.scroll-route');
const routeSections=['about','work','contact'].map(id=>document.getElementById(id));
const routeNodes=[...route.querySelectorAll('[data-section]')];
let routeStart=0,routeHeight=1,routeFrame=0;
const sectionPositions=new Map();
function drawRoute(){
  routeFrame=0;
  const scanLine=window.scrollY+window.innerHeight*.55;
  const progress=clamp((scanLine-routeStart)/routeHeight,0,1);
  route.style.setProperty('--route-progress',`${progress*100}%`);
  for(const node of routeNodes)node.classList.toggle('is-passed',scanLine>=sectionPositions.get(node.dataset.section));
}
function queueRoute(){if(!routeFrame)routeFrame=requestAnimationFrame(drawRoute);}
function measureRoute(){
  const mainTop=document.querySelector('main').getBoundingClientRect().top+window.scrollY;
  routeStart=hero.getBoundingClientRect().bottom+window.scrollY-80;
  const end=routeSections[2].getBoundingClientRect().bottom+window.scrollY-45;
  routeHeight=Math.max(1,end-routeStart);
  route.style.setProperty('--route-top',`${routeStart-mainTop}px`);
  route.style.setProperty('--route-height',`${routeHeight}px`);
  for(const section of routeSections){
    const heading=section.querySelector('h2,h3')||section;
    const y=heading.getBoundingClientRect().top+window.scrollY+12;
    sectionPositions.set(section.id,y);
  }
  for(const node of routeNodes)node.style.setProperty('--node-top',`${sectionPositions.get(node.dataset.section)-routeStart}px`);
  route.classList.add('is-ready');queueRoute();
}
window.addEventListener('scroll',queueRoute,{passive:true});
window.addEventListener('resize',measureRoute,{passive:true});
window.addEventListener('pageshow',measureRoute);
if(document.fonts)document.fonts.ready.then(measureRoute);
measureRoute();
