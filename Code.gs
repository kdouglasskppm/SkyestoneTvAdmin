/* Optional Google Apps Script backend for shared Skyestone TV data.
   Create a Google Sheet with columns:
   ID | Display | Date | Start | End | Title | Details | Reserved By
   Deploy this script as a Web App after setting SHEET_ID below.
*/
const SHEET_ID='PASTE_GOOGLE_SHEET_ID_HERE';
const SHEET_NAME='TV Data';
function doGet(){return ContentService.createTextOutput(JSON.stringify(readAll())).setMimeType(ContentService.MimeType.JSON);}
function doPost(e){const p=JSON.parse(e.postData.contents);if(p.action==='save')return json(saveItem(p.item));if(p.action==='delete')return json(deleteItem(p.id));return json({ok:false,error:'Unknown action'});}
function json(o){return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);}
function sheet(){return SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);}
function readAll(){const s=sheet(),v=s.getDataRange().getValues();if(v.length<2)return [];return v.slice(1).filter(r=>r[0]).map(r=>({id:String(r[0]),display:r[1],date:Utilities.formatDate(new Date(r[2]),Session.getScriptTimeZone(),'yyyy-MM-dd'),start:r[3],end:r[4],title:r[5],details:r[6],reservedBy:r[7]}));}
function saveItem(x){const s=sheet(),v=s.getDataRange().getValues();for(let i=1;i<v.length;i++){if(String(v[i][0])===String(x.id)){s.getRange(i+1,1,1,8).setValues([[x.id,x.display,x.date,x.start,x.end,x.title,x.details||'',x.reservedBy||'']]);return {ok:true};}}s.appendRow([x.id,x.display,x.date,x.start,x.end,x.title,x.details||'',x.reservedBy||'']);return {ok:true};}
function deleteItem(id){const s=sheet(),v=s.getDataRange().getValues();for(let i=1;i<v.length;i++){if(String(v[i][0])===String(id)){s.deleteRow(i+1);return {ok:true};}}return {ok:false,error:'Not found'};}
