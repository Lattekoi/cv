const toast=(message)=>{const node=document.createElement('div');node.className='toast show';node.textContent=message;document.body.appendChild(node);setTimeout(()=>node.remove(),2400)};
document.getElementById('themeToggle').addEventListener('change',e=>{document.body.classList.toggle('dark',e.target.checked);toast(e.target.checked?'已切换到深色主题':'已切换到明亮主题')});
document.getElementById('printCV').addEventListener('click',()=>window.print());
document.getElementById('downloadVCard').addEventListener('click',()=>{const card=['BEGIN:VCARD','VERSION:3.0','FN:LIAITONG','EMAIL:1393936894@qq.com','NOTE:交互设计与前端开发','END:VCARD'].join('\n');const link=document.createElement('a');link.href=URL.createObjectURL(new Blob([card],{type:'text/vcard'}));link.download='LIAITONG.vcf';link.click();toast('联系方式已下载')});
document.getElementById('searchInput').addEventListener('input',e=>{const query=e.target.value.trim().toLowerCase();document.querySelectorAll('.card').forEach(card=>{card.style.display=!query||card.textContent.toLowerCase().includes(query)?'':'none'})});
document.querySelectorAll('.openProject').forEach(button=>button.addEventListener('click',()=>{document.getElementById('modalTitle').textContent=button.closest('.project-card').querySelector('h4').textContent;document.getElementById('modalBody').textContent=button.closest('.project-card').querySelector('p').textContent;const modal=document.getElementById('projectModal');modal.setAttribute('aria-hidden','false')}));
document.getElementById('modalClose').addEventListener('click',()=>document.getElementById('projectModal').setAttribute('aria-hidden','true'));
document.getElementById('contactForm').addEventListener('submit',e=>{e.preventDefault();e.target.reset();toast('消息已准备好，感谢你的联系！')});
document.getElementById('addExperience').addEventListener('click',()=>toast('你可以在 HTML 的实践经历区继续添加内容'));
document.querySelectorAll('.lab-tab').forEach(tab=>tab.addEventListener('click',()=>{document.querySelectorAll('.lab-tab').forEach(item=>item.classList.remove('active'));document.querySelectorAll('.lab-panel').forEach(panel=>panel.classList.remove('active'));tab.classList.add('active');document.querySelector(`[data-panel="${tab.dataset.lab}"]`).classList.add('active')}));
document.querySelectorAll('.project-filter').forEach(filter=>filter.addEventListener('click',()=>{const type=filter.dataset.filter;document.querySelectorAll('.project-filter').forEach(item=>item.classList.remove('active'));filter.classList.add('active');document.querySelectorAll('.project-card').forEach(project=>project.classList.toggle('is-hidden',type!=='all'&&project.dataset.type!==type))}));
const focusCopy={cmf:['从材料、形态与触感出发，设计可以被看见，也可以被触摸。','MATERIAL / FORM / FUNCTION'],art:['让技术拥有情绪，让媒介成为人与世界之间的连接。','MEDIA / INTERACTION / FUTURE'],biz:['让好的设计走得更远，在真实场景中创造持续价值。','INSIGHT / STRATEGY / VALUE']};
document.querySelectorAll('.star-node').forEach(node=>node.addEventListener('click',()=>{const focus=node.dataset.focus;const hero=document.querySelector('.hero-card');document.querySelectorAll('.star-node').forEach(item=>item.classList.remove('active'));node.classList.add('active');hero.classList.remove('focus-cmf','focus-art','focus-biz');hero.classList.add(`focus-${focus}`);document.getElementById('heroLine').textContent=focusCopy[focus][0];document.getElementById('heroSignal').textContent=focusCopy[focus][1]}));
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const hero=document.querySelector('.hero-card');
if(hero&&!reducedMotion){
	hero.addEventListener('pointermove',event=>{
		const bounds=hero.getBoundingClientRect();
		const x=(event.clientX-bounds.left)/bounds.width-.5;
		const y=(event.clientY-bounds.top)/bounds.height-.5;
		hero.style.setProperty('--pointer-x',`${x*18}px`);
		hero.style.setProperty('--pointer-y',`${y*18}px`);
		hero.style.setProperty('--glow-x',`${50+x*36}%`);
		hero.style.setProperty('--glow-y',`${35+y*30}%`);
		hero.querySelectorAll('.star-node').forEach(node=>{
			const depth=node.classList.contains('node-cmf')?1.2:node.classList.contains('node-art')?.7:1;
			node.style.setProperty('--node-x',`${x*16*depth}px`);
			node.style.setProperty('--node-y',`${y*16*depth}px`);
		});
	});
	hero.addEventListener('pointerleave',()=>{
		hero.style.setProperty('--pointer-x','0px');
		hero.style.setProperty('--pointer-y','0px');
		hero.style.setProperty('--glow-x','50%');
		hero.style.setProperty('--glow-y','35%');
		hero.querySelectorAll('.star-node').forEach(node=>{node.style.setProperty('--node-x','0px');node.style.setProperty('--node-y','0px')});
	});
}
const revealCards=document.querySelectorAll('.main > .card');
if('IntersectionObserver' in window&&!reducedMotion){
	revealCards.forEach((card,index)=>{card.classList.add('reveal-ready');card.style.transitionDelay=`${Math.min(index*45,240)}ms`});
	const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');revealObserver.unobserve(entry.target)}}),{rootMargin:'0px 0px -8% 0px',threshold:.08});
	revealCards.forEach(card=>revealObserver.observe(card));
}
const catPet=document.querySelector('.cat-pet');
const catPetToggle=document.getElementById('catPetToggle');
const catPetMessage=document.getElementById('catPetMessage');
const petMessages={pet:'喵！lat 的灵感电量 + 20%。',charge:'lat 正在充电，顺便整理一下思路。',scout:'lat 巡航中：发现一个值得被使用的好点子。'};
catPetToggle?.addEventListener('click',()=>{const isOpen=catPet.classList.toggle('is-open');catPetToggle.setAttribute('aria-expanded',String(isOpen));catPetToggle.setAttribute('aria-label',isOpen?'收起 lat 桌宠':'打开 lat 桌宠');catPet.querySelector('.cat-pet-panel').setAttribute('aria-hidden',String(!isOpen))});
document.querySelectorAll('[data-pet-action]').forEach(action=>action.addEventListener('click',()=>{catPetMessage.textContent=petMessages[action.dataset.petAction];catPet.classList.add('is-open');catPetToggle.setAttribute('aria-expanded','true')}));
if(catPet&&catPetToggle){
	const savedPetPosition=localStorage.getItem('lat-pet-position');
	const setPetPosition=(left,top)=>{const maxLeft=Math.max(8,window.innerWidth-catPet.offsetWidth-8);const maxTop=Math.max(8,window.innerHeight-catPet.offsetHeight-8);catPet.style.left=`${Math.min(Math.max(8,left),maxLeft)}px`;catPet.style.top=`${Math.min(Math.max(8,top),maxTop)}px`};
	if(savedPetPosition){try{const position=JSON.parse(savedPetPosition);setPetPosition(position.left,position.top)}catch{setPetPosition(window.innerWidth-130,window.innerHeight-150)}}else setPetPosition(window.innerWidth-130,window.innerHeight-150);
	let dragState=null;
	catPetToggle.addEventListener('pointerdown',event=>{catPetToggle.setPointerCapture(event.pointerId);dragState={pointerId:event.pointerId,startX:event.clientX,startY:event.clientY,left:catPet.offsetLeft,top:catPet.offsetTop,moved:false};catPet.classList.add('is-dragging')});
	catPetToggle.addEventListener('pointermove',event=>{if(!dragState)return;const deltaX=event.clientX-dragState.startX;const deltaY=event.clientY-dragState.startY;if(Math.abs(deltaX)+Math.abs(deltaY)>5)dragState.moved=true;if(dragState.moved)setPetPosition(dragState.left+deltaX,dragState.top+deltaY)});
	catPetToggle.addEventListener('pointerup',event=>{if(!dragState)return;const wasDragged=dragState.moved;catPet.classList.remove('is-dragging');if(wasDragged){localStorage.setItem('lat-pet-position',JSON.stringify({left:catPet.offsetLeft,top:catPet.offsetTop}));catPetToggle.dataset.suppressClick='true'}dragState=null;catPetToggle.releasePointerCapture(event.pointerId)});
	catPetToggle.addEventListener('click',event=>{if(catPetToggle.dataset.suppressClick==='true'){event.preventDefault();event.stopImmediatePropagation();delete catPetToggle.dataset.suppressClick}},true);
	window.addEventListener('resize',()=>setPetPosition(catPet.offsetLeft,catPet.offsetTop));
}
