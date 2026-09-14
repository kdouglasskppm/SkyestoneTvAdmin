/* Skyestone TV Admin - DEMO MODE
   This version stores data in this browser only. Once the interface is approved,
   connect it to a Google Sheet through the included Apps Script backend.
*/
const KEY='skyestone-tv-admin-items';
const labels={hoa:'HOA Business',social:'Social',fitness:'Fitness','fitness-reservations':'Fitness Room Reservations',conference:'Conference Room Reservations'};
const $=id=>document.getElementById(id);
let items=JSON.parse(localStorage.getItem(KEY)||'[]');
function save(){localStorage.setItem(KEY,JSON.stringify(items));}
function reset(){ $('itemForm').reset(); $('id').value=''; $('date').value=new Date().toISOString().slice(0,10); $('cancel').style.display='none'; }
function render(){const f=$('filter').value;const now=new Date();let a=items.filter(x=>!f||f==='all'||x.display===f).filter(x=>new Date(x.date+'T'+x.end)>=now).sort((a,b)=>(a.date+a.start).localeCompare(b.date+b.start));$('list').innerHTML=a.length?a.map(x=>`<div class="item"><div class="item-top"><span class="badge">${labels[x.display]}</span><span>${x.date} · ${x.start}–${x.end}</span></div><h3>${esc(x.title)}</h3><p>${esc(x.details||'')}</p>${x.reservedBy?`<p><strong>Reserved by:</strong> ${esc(x.reservedBy)}</p>`:''}<div class="actions"><button onclick="editItem('${x.id}')">Edit</button><button class="delete" onclick="deleteItem('${x.id}')">Delete</button></div></div>`).join(''):'<div class="empty">No current or upcoming information.</div>';}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
$('itemForm').addEventListener('submit',e=>{e.preventDefault();const id=$('id').value||crypto.randomUUID();const obj={id,display:$('display').value,date:$('date').value,start:$('start').value,end:$('end').value,title:$('title').value,details:$('details').value,reservedBy:$('reservedBy').value};const i=items.findIndex(x=>x.id===id);if(i>=0)items[i]=obj;else items.push(obj);save();reset();render();});
$('cancel').addEventListener('click',reset);$('filter').addEventListener('change',render);
window.editItem=id=>{const x=items.find(i=>i.id===id);if(!x)return;Object.keys(x).forEach(k=>$(k)&&($(k).value=x[k]));$('cancel').style.display='inline-block';scrollTo({top:0,behavior:'smooth'});};
window.deleteItem=id=>{if(confirm('Delete this information?')){items=items.filter(x=>x.id!==id);save();render();}};
reset();$('cancel').style.display='none';render();
