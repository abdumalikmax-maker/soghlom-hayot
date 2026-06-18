import { useState } from "react";

const PR="#1B4332",AC="#52B788",AM="#E9A825",CR="#F8F4EF",CH="#1C1C1E",MU="#6B7280",SU="#FFFFFF",LI="#E8F5EE",DA="#DC2626";


// ── KUNLIK MASLAHATLAR ───────────────────────────────────────────────────────
const MASLAHATLAR = [
  {emoji:"🌅",matn:"Ertalab uyg'onib birinchi ish — telefon emas, suv iching. 500ml iliq suv butun kun energiyangizni oshiradi."},
  {emoji:"🧠",matn:"Miyangiz 75% suvdan iborat. Tashnalik boshlashidan oldin suv iching — tashnalik allaqachon kichik susayganlik belgisi."},
  {emoji:"🌿",matn:"Rastoropsha jigaringizni kundalik toksinlardan tozalaydi. Har ertalab bir paket — 30 kunda sezilarli farq ko'rasiz."},
  {emoji:"🚶",matn:"Ovqatdan keyin 10-15 daqiqa sekin yurish qon qandini 30% tushiradi. Bu eng oddiy, eng kuchli dori."},
  {emoji:"😴",matn:"22:00 da uxlash tasodifiy emas — 22:00-02:00 orasida o'sish gormoni eng ko'p chiqadi. Bu vaqtda uxlab, tiklanib oling."},
  {emoji:"🥗",matn:"Avokado va zaytun moyi foydali yog'lar — ular tanada yallig'lanishni kamaytiradi, miyani oziqlantiradi va to'yish his-sini uzaytiradi."},
  {emoji:"💊",matn:"Magniy — 300 dan ortiq ferment reaktsiyasida ishtirok etadi. Uyqusizlik, mushak tortishishi, stress ko'pchilikda magniy etishmasligi."},
  {emoji:"🫁",matn:"Chuqur nafas 4-4-6: 4 sek oling, 4 sek ushlab turing, 6 sek chiqaring. Bir daqiqada kortizol (stress gormoni) pasayadi."},
  {emoji:"🌡️",matn:"Kontrastli dush (issiq→sovuq) qon aylanishini 40% yaxshilaydi, immuniteti kuchaytiradi va ertalabki uyquchanlikni yo'qotadi."},
  {emoji:"🏋️",matn:"Mushak — eng yaxshi metabolizm kuchaytiruvchisi. 1 kg mushak tinch holatda 50 kcal sarflaydi. Sport — uzoq muddatli yechim."},
  {emoji:"🍋",matn:"Kurkuma yolg'iz kam so'riladi. Qorachiq murch (piperine) bilan birga 20 barobarga yaxshiroq so'riladi. Shuning uchun birga qo'shing."},
  {emoji:"🫀",matn:"CoQ10 yurak va mitoxondriya uchun asosiy. 40 yoshdan keyin tanada miqdori kamayadi. Sport qiluvchilar uchun ayniqsa muhim."},
  {emoji:"🌊",matn:"Omega-3 qon quyulishini, yallig'lanishni kamaytiradi. Baliq yog'i — miyani, ko'zni, yurakni bir vaqtda himoya qiladi."},
  {emoji:"⚡",matn:"Berberin qon qandiga metformin kabi ta'sir ko'rsatadi — lekin tabiiy. Har ovqatdan oldin 500mg — insulin sezgirligi oshadi."},
  {emoji:"🧬",matn:"D3 vitamin aslida gormon. Immunitet, kayfiyat, testosteron, suyak — barchasi D3 ga bog'liq. Quyoshda qoling yoki qo'shimcha iching."},
];

// ── SUV HISOBLAGICH ──────────────────────────────────────────────────────────
function SuvTracker(){
  const [stakan,setStakan]=useState(0);
  const maqsad=8;
  const foiz=Math.min(stakan/maqsad,1);
  return(
    <div style={{background:SU,borderRadius:14,padding:16,boxShadow:"0 1px 4px rgba(0,0,0,0.07)"}}>
      <div style={{fontWeight:700,fontSize:14,color:PR,marginBottom:4}}>💧 Kunlik Suv Hisoblagich</div>
      <div style={{fontSize:12,color:MU,marginBottom:14}}>Maqsad: {maqsad} stakan (2-2.5 litr)</div>

      {/* Progress bar */}
      <div style={{background:"#E0F2FE",borderRadius:20,height:20,marginBottom:12,overflow:"hidden"}}>
        <div style={{height:"100%",background:"linear-gradient(90deg,#38BDF8,#0EA5E9)",borderRadius:20,width:(foiz*100)+"%",transition:"width 0.4s",display:"flex",alignItems:"center",justifyContent:"center"}}>
          {stakan>0&&<span style={{fontSize:11,fontWeight:700,color:"#fff"}}>{stakan}/{maqsad}</span>}
        </div>
      </div>

      {/* Stakanlar */}
      <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:14}}>
        {Array.from({length:maqsad}).map((_,i)=>(
          <div key={i} onClick={()=>setStakan(i+1)}
            style={{width:36,height:44,borderRadius:8,border:"2px solid "+(i<stakan?"#0EA5E9":"#E0F2FE"),background:i<stakan?"#0EA5E9":"#F0F9FF",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",transition:"all 0.15s"}}>
            <span style={{fontSize:18}}>{i<stakan?"💧":"○"}</span>
            <span style={{fontSize:9,color:i<stakan?"#fff":"#94A3B8",marginTop:1}}>{(i+1)*250}ml</span>
          </div>
        ))}
      </div>

      {stakan>=maqsad
        ?<div style={{background:"#F0FDF4",border:"1px solid #BBF7D0",borderRadius:9,padding:"9px 12px",fontSize:12,color:"#065F46",fontWeight:600}}>✅ Ajoyib! Bugungi suv maqsadingizga yetdingiz!</div>
        :<div style={{background:"#F0F9FF",border:"1px solid #BAE6FD",borderRadius:9,padding:"9px 12px",fontSize:12,color:"#0369A1"}}>
          Yana {maqsad-stakan} stakan ({(maqsad-stakan)*250}ml) qoldi
        </div>
      }
      <button onClick={()=>setStakan(0)} style={{marginTop:10,width:"100%",padding:"8px",borderRadius:8,border:"1px solid #E5E7EB",background:"transparent",color:MU,cursor:"pointer",fontSize:12}}>🔄 Yangi kun</button>
    </div>
  );
}

// ── HAFTALIK PROGRESS ────────────────────────────────────────────────────────
function ProgressTab(){
  const [weeks,setWeeks]=useState([
    {hafta:1,vazn:"",bel:"",energiya:3,uyqu:3,kayfiyat:3,izoh:""},
    {hafta:2,vazn:"",bel:"",energiya:3,uyqu:3,kayfiyat:3,izoh:""},
    {hafta:3,vazn:"",bel:"",energiya:3,uyqu:3,kayfiyat:3,izoh:""},
    {hafta:4,vazn:"",bel:"",energiya:3,uyqu:3,kayfiyat:3,izoh:""},
  ]);
  const [sel,setSel]=useState(0);
  const upd=(k,v)=>setWeeks(w=>w.map((x,i)=>i===sel?{...x,[k]:v}:x));
  const w=weeks[sel];

  const StarRow=({label,key2,val})=>(
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #F3F4F6"}}>
      <span style={{fontSize:13,color:CH}}>{label}</span>
      <div style={{display:"flex",gap:4}}>
        {[1,2,3,4,5].map(s=>(
          <span key={s} onClick={()=>upd(key2,s)} style={{fontSize:22,cursor:"pointer",opacity:s<=val?1:0.25}}>⭐</span>
        ))}
      </div>
    </div>
  );

  return(
    <div>
      <div style={{fontWeight:700,fontSize:14,color:PR,marginBottom:4}}>📊 Haftalik Progress</div>
      <div style={{fontSize:12,color:MU,marginBottom:12}}>Har haftada o'zgarishlaringizni yozib boring</div>

      <div style={{display:"flex",gap:6,marginBottom:14}}>
        {weeks.map((x,i)=>(
          <button key={i} onClick={()=>setSel(i)}
            style={{flex:1,padding:"9px 4px",borderRadius:10,border:"2px solid "+(sel===i?PR:"#E5E7EB"),background:sel===i?PR:SU,color:sel===i?"#fff":CH,cursor:"pointer",fontSize:12,fontWeight:sel===i?700:400}}>
            {i+1}-hafta
          </button>
        ))}
      </div>

      <div style={{background:SU,borderRadius:14,padding:14,boxShadow:"0 1px 4px rgba(0,0,0,0.07)"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
          <div>
            <div style={{fontSize:11,fontWeight:600,color:MU,marginBottom:4}}>⚖️ Vazn (kg)</div>
            <input type="number" placeholder="masalan: 82.5" value={w.vazn} onChange={e=>upd("vazn",e.target.value)}
              style={{width:"100%",padding:"9px 10px",borderRadius:8,border:"1.5px solid #E5E7EB",fontSize:14,color:CH,boxSizing:"border-box",background:CR,outline:"none"}}/>
          </div>
          <div>
            <div style={{fontSize:11,fontWeight:600,color:MU,marginBottom:4}}>📏 Bel (sm)</div>
            <input type="number" placeholder="masalan: 88" value={w.bel} onChange={e=>upd("bel",e.target.value)}
              style={{width:"100%",padding:"9px 10px",borderRadius:8,border:"1.5px solid #E5E7EB",fontSize:14,color:CH,boxSizing:"border-box",background:CR,outline:"none"}}/>
          </div>
        </div>

        <StarRow label="⚡ Energiya darajasi" key2="energiya" val={w.energiya}/>
        <StarRow label="😴 Uyqu sifati" key2="uyqu" val={w.uyqu}/>
        <StarRow label="😊 Kayfiyat" key2="kayfiyat" val={w.kayfiyat}/>

        <div style={{marginTop:10}}>
          <div style={{fontSize:11,fontWeight:600,color:MU,marginBottom:4}}>📝 Izoh / O'zgarishlar</div>
          <textarea placeholder="Bu hafta qanday his qildingiz? Nima o'zgardi?..." value={w.izoh} onChange={e=>upd("izoh",e.target.value)}
            style={{width:"100%",padding:"9px 10px",borderRadius:8,border:"1.5px solid #E5E7EB",fontSize:13,color:CH,boxSizing:"border-box",background:CR,outline:"none",minHeight:65,resize:"vertical"}}/>
        </div>

        {/* Dinamik o'zgarish */}
        {sel>0&&weeks[sel-1].vazn&&w.vazn&&(
          <div style={{marginTop:10,background:parseFloat(w.vazn)<parseFloat(weeks[sel-1].vazn)?"#F0FDF4":"#FEF9C3",borderRadius:8,padding:"9px 12px"}}>
            <div style={{fontSize:12,fontWeight:700,color:parseFloat(w.vazn)<parseFloat(weeks[sel-1].vazn)?PR:"#92400E"}}>
              {parseFloat(w.vazn)<parseFloat(weeks[sel-1].vazn)
                ?"✅ Oldinggi haftadan "+(parseFloat(weeks[sel-1].vazn)-parseFloat(w.vazn)).toFixed(1)+" kg kamaydingiz!"
                :"📌 Oldinggi haftadan "+(parseFloat(w.vazn)-parseFloat(weeks[sel-1].vazn)).toFixed(1)+" kg ortdi"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── NAFAS MASHQI ─────────────────────────────────────────────────────────────
function NafasTab(){
  const [phase,setPhase]=useState("tayyor");
  const [count,setCount]=useState(0);
  const [cycle,setCycle]=useState(0);
  const [timer,setTimer]=useState(null);

  const nafaslar=[
    {nom:"Nafas oling",davom:4,rang:"#0EA5E9",emoji:"🌬️",izoh:"Burun bilan — sekin, chuqur"},
    {nom:"Ushlab turing",davom:4,rang:"#7C3AED",emoji:"🔒",izoh:"To'xtatib, tinch ushlab turing"},
    {nom:"Nafas chiqaring",davom:6,rang:"#10B981",emoji:"💨",izoh:"Og'iz bilan — sekin, to'liq chiqaring"},
  ];
  const jami=3;

  const start=()=>{
    setPhase(0);setCount(nafaslar[0].davom);setCycle(0);
    let ph=0,cn=nafaslar[0].davom,cl=0;
    const t=setInterval(()=>{
      cn--;
      if(cn<=0){
        ph=(ph+1)%3;
        if(ph===0)cl++;
        if(cl>=jami){clearInterval(t);setPhase("tugadi");setTimer(null);return;}
        cn=nafaslar[ph].davom;
      }
      setPhase(ph);setCount(cn);setCycle(cl);
    },1000);
    setTimer(t);
  };

  const stop=()=>{if(timer){clearInterval(timer);setTimer(null);}setPhase("tayyor");setCount(0);setCycle(0);};

  const cur=typeof phase==="number"?nafaslar[phase]:null;

  return(
    <div>
      <div style={{fontWeight:700,fontSize:14,color:PR,marginBottom:4}}>🫁 Nafas Mashqi (4-4-6)</div>
      <div style={{fontSize:12,color:MU,marginBottom:14}}>Stress pasaytiradi, miyani tiniqlashtiradi, uyquni yaxshilaydi. Kuniga 1-3 marta.</div>

      <div style={{background:SU,borderRadius:16,padding:20,boxShadow:"0 1px 4px rgba(0,0,0,0.07)",textAlign:"center"}}>
        {phase==="tayyor"&&(
          <div>
            <div style={{fontSize:64,marginBottom:12}}>🫁</div>
            <div style={{fontSize:14,color:MU,marginBottom:20,lineHeight:1.6}}>
              <b>4</b> sek nafas oling → <b>4</b> sek ushlab → <b>6</b> sek chiqaring<br/>
              <span style={{fontSize:12}}>3 sikl = ~1 daqiqa</span>
            </div>
            <button onClick={start} style={{padding:"13px 40px",borderRadius:25,border:"none",background:"linear-gradient(135deg,"+PR+","+AC+")",color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer",boxShadow:"0 4px 14px rgba(27,67,50,0.35)"}}>
              ▶ Boshlash
            </button>
          </div>
        )}

        {typeof phase==="number"&&cur&&(
          <div>
            <div style={{fontSize:12,color:MU,marginBottom:8}}>Sikl: {cycle+1}/{jami}</div>
            <div style={{width:120,height:120,borderRadius:"50%",background:cur.rang+"20",border:"4px solid "+cur.rang,margin:"0 auto 16px",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",boxShadow:"0 0 30px "+cur.rang+"40"}}>
              <div style={{fontSize:36,fontWeight:900,color:cur.rang}}>{count}</div>
              <div style={{fontSize:11,color:cur.rang,fontWeight:600}}>sek</div>
            </div>
            <div style={{fontSize:18,fontWeight:700,color:cur.rang,marginBottom:4}}>{cur.emoji} {cur.nom}</div>
            <div style={{fontSize:13,color:MU,marginBottom:20}}>{cur.izoh}</div>
            <button onClick={stop} style={{padding:"10px 30px",borderRadius:20,border:"1.5px solid #E5E7EB",background:"transparent",color:MU,fontSize:13,cursor:"pointer"}}>■ To'xtatish</button>
          </div>
        )}

        {phase==="tugadi"&&(
          <div>
            <div style={{fontSize:64,marginBottom:12}}>✅</div>
            <div style={{fontSize:16,fontWeight:700,color:PR,marginBottom:6}}>Ajoyib! Bajardingiz!</div>
            <div style={{fontSize:13,color:MU,marginBottom:20}}>Nafas mashqi tugadi. O'zingizni yaxshi his qilasiz.</div>
            <button onClick={()=>setPhase("tayyor")} style={{padding:"12px 35px",borderRadius:20,border:"none",background:PR,color:"#fff",fontSize:14,fontWeight:700,cursor:"pointer"}}>🔄 Qayta</button>
          </div>
        )}
      </div>

      {/* Foydalari */}
      <div style={{marginTop:14,background:SU,borderRadius:12,padding:14,boxShadow:"0 1px 3px rgba(0,0,0,0.06)"}}>
        <div style={{fontWeight:700,fontSize:12,color:PR,marginBottom:8}}>Bu mashqning foydasi:</div>
        {["😌 Kortizol (stress gormoni) 1 daqiqada pasayadi","🧠 Miyaga qon va kislorod oqimi kuchayadi","💤 Uxlashdan oldin bajarsa — uyqu tezlashadi","❤️ Yurak ritmi barqarorlashadi","🎯 Diqqat va konsentratsiya oshadi"].map((x,i)=>(
          <div key={i} style={{fontSize:12,color:CH,padding:"4px 0",borderBottom:i<4?"1px solid #F3F4F6":"none"}}>{x}</div>
        ))}
      </div>
    </div>
  );
}

// ── KUN JADVALI ──────────────────────────────────────────────────────────────
function JadvalTab(){
  const jadval=[
    {vaqt:"06:30",faoliyat:"Uyg'onish",izoh:"Telefonni olmang — 5 daqiqa jim yoting",rang:"#FEF9C3",emoji:"🌅"},
    {vaqt:"06:35",faoliyat:"Suv (500ml) + Rastoropsha + Kurkuma",izoh:"Iliq suv — muzdek emas",rang:"#EFF6FF",emoji:"💧"},
    {vaqt:"06:50",faoliyat:"Kontrastli dush",izoh:"Issiq 2 daqiqa → Sovuq 30 sek → Issiq 1 daqiqa",rang:"#EFF6FF",emoji:"🚿"},
    {vaqt:"07:00",faoliyat:"Olma sirka (oshqozon bo'lmasa)",izoh:"300ml suvga 1 choy qoshiq",rang:"#EFF6FF",emoji:"🍎"},
    {vaqt:"07:10",faoliyat:"Vitaminlar (ovqatdan oldin)",izoh:"Berberin, Xrom pikolinat",rang:"#F0FDF4",emoji:"💊"},
    {vaqt:"07:15",faoliyat:"1-OVQAT",izoh:"Salat + Baliq/Tuxum oqi",rang:"#F0FDF4",emoji:"🍽️"},
    {vaqt:"07:30",faoliyat:"Sekin yurish",izoh:"Uydan chiqmay ham bo'ladi — 10-15 daqiqa",rang:"#F0FDF4",emoji:"🚶"},
    {vaqt:"08:00",faoliyat:"Sport (agar belgilangan kun bo'lsa)",izoh:"1 soat kuch yoki kardio",rang:"#FEF3C7",emoji:"🏋️"},
    {vaqt:"09:00",faoliyat:"Ish / Kunlik faoliyat",izoh:"Har soatda 5 daqiqa turing, cho'zing",rang:"#F9FAFB",emoji:"💼"},
    {vaqt:"13:00",faoliyat:"Suv + Rastoropsha + Imbir",izoh:"300-400ml suvga damlab iching",rang:"#EFF6FF",emoji:"🌿"},
    {vaqt:"13:30",faoliyat:"2-OVQAT (1-2-hafta)",izoh:"Salat + Go'sht/Baliq",rang:"#F0FDF4",emoji:"🍽️"},
    {vaqt:"16:00",faoliyat:"Suv + Berberin (3-4-hafta)",izoh:"Ovqatdan 15 daqiqa oldin",rang:"#EFF6FF",emoji:"💊"},
    {vaqt:"16:30",faoliyat:"2-OVQAT (3-hafta)",izoh:"Salat + Go'sht/Baliq",rang:"#F0FDF4",emoji:"🍽️"},
    {vaqt:"20:00",faoliyat:"Telefon va ekran - kamaytiramiz",izoh:"Ko'k nur uyquni buzadi",rang:"#FEF9C3",emoji:"📵"},
    {vaqt:"20:30",faoliyat:"Sayr — toza havo",izoh:"Bog' yoki uy atrofida 20-30 daqiqa",rang:"#F0FDF4",emoji:"🌿"},
    {vaqt:"21:00",faoliyat:"Suv + Magniy",izoh:"200-300ml suv + Magniy glitsinat",rang:"#EFF6FF",emoji:"💧"},
    {vaqt:"21:15",faoliyat:"Nafas mashqi 4-4-6",izoh:"3 sikl — uyquga tayyorlanish",rang:"#F0FDF4",emoji:"🫁"},
    {vaqt:"21:30",faoliyat:"Uyqudan oldin cho'zilish",izoh:"10 daqiqa yumshoq cho'zilish",rang:"#F0FDF4",emoji:"🧘"},
    {vaqt:"22:00",faoliyat:"UYQU",izoh:"Xona salqin va qorong'i bo'lsin",rang:"#1E1B4B18",emoji:"🌙"},
  ];
  return(
    <div>
      <div style={{fontWeight:700,fontSize:14,color:PR,marginBottom:4}}>⏰ Ideal Kun Jadvali</div>
      <div style={{fontSize:12,color:MU,marginBottom:12}}>Barcha faoliyatlar bir ko'rinishda — o'zingizga mos moslashtiring</div>
      {jadval.map((j,i)=>(
        <div key={i} style={{display:"flex",gap:10,marginBottom:8,alignItems:"flex-start"}}>
          <div style={{minWidth:46,textAlign:"center"}}>
            <div style={{background:PR,borderRadius:7,padding:"3px 4px",fontSize:10,fontWeight:700,color:"#fff"}}>{j.vaqt}</div>
          </div>
          <div style={{flex:1,background:j.rang,borderRadius:9,padding:"8px 11px",border:"1px solid rgba(0,0,0,0.05)"}}>
            <div style={{display:"flex",alignItems:"center",gap:6}}>
              <span style={{fontSize:15}}>{j.emoji}</span>
              <span style={{fontSize:13,fontWeight:600,color:CH}}>{j.faoliyat}</span>
            </div>
            <div style={{fontSize:11,color:MU,marginTop:3}}>{j.izoh}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── MASLAHAT KOMPONENTI ───────────────────────────────────────────────────────
function MaslahatKarta(){
  const [idx,setIdx]=useState(()=>Math.floor(Math.random()*MASLAHATLAR.length));
  const m=MASLAHATLAR[idx];
  return(
    <div style={{background:"linear-gradient(135deg,#1B4332,#2D6A4F)",borderRadius:14,padding:"14px 16px",marginBottom:14,cursor:"pointer"}} onClick={()=>setIdx(i=>(i+1)%MASLAHATLAR.length)}>
      <div style={{color:"rgba(255,255,255,0.6)",fontSize:10,fontWeight:600,marginBottom:6}}>💡 KUNLIK MASLAHAT — Yangi uchun bosing</div>
      <div style={{fontSize:22,marginBottom:6}}>{m.emoji}</div>
      <div style={{color:"#fff",fontSize:13,lineHeight:1.6}}>{m.matn}</div>
    </div>
  );
}

// ── 4 HAFTALIK RATSION ───────────────────────────────────────────────────────
const RATSIONLAR = [
  {
    hafta: 1,
    nom: "1-hafta — Boshlang'ich tozalash",
    rang: "#1B4332",
    tavsif: "Tana tozalanadi, yallig'lanish kamayadi. Oddiy, barqaror ratsion.",
    eslatma: "Olma sirka, rastoropsha va kurkumin — asosiy yordamchilar. Ekstra Virgin zaytun moyi albatta oling!",
    bloklar: [
      {
        vaqt: "07:00", nom: "Ertalabki ichimlik", tur: "suv",
        bandlar: [
          {emoji:"💧", text:"Iliq suv — 300 ml"},
          {emoji:"🌿", text:"Rastoropsha — 1 paket (suvga qo'shib iching)"},
          {emoji:"🟡", text:"Kurkuma — 1 choy qoshiq"},
          {emoji:"🍎", text:"Olma sirka — 1 choy qoshiq (oshqozon muammosi bo'lmasa)"},
        ]
      },
      {
        vaqt: "07:10", nom: "1-ovqat", tur: "ovqat",
        salat: ["Bodring — 2 ta","Rukkola — yarim voq","Salat bargi — yarim voq","Petrishka — yarim voq","Ukrop — yarim voq","Selderei — yarim voq","Avokado — yarim ta","Zaytun moyi (Ekstra Virgin) — 2 osh qoshiq","Dengiz tuzi — ozgina"],
        oqsil: "Yogli baliq (losos, skumbriya) — 180-200g\nBaliq bo'lmasa: 5 ta qaynatilgan tuxumning FAQAT OQI",
        keyin: "Sekin yurish — 10-15 daqiqa"
      },
      {
        vaqt: "13:30", nom: "Tushki ichimlik", tur: "suv",
        bandlar: [
          {emoji:"💧", text:"Suv — 300 ml"},
          {emoji:"🌿", text:"Rastoropsha — 1 paket"},
          {emoji:"🫚", text:"Imbir — bir parchani suv bilan damlab iching"},
        ]
      },
      {
        vaqt: "13:40", nom: "2-ovqat", tur: "ovqat",
        salat: ["Pekin karami yoki karam — yarim bosh","Bodring — 2 ta","Petrishka — yarim voq","Ukrop — yarim voq","Kinza — yarim voq","Avokado — yarim ta","Zaytun moyi (Ekstra Virgin) — 2 osh qoshiq","Dengiz tuzi"],
        oqsil: "Indeyka go'shti (yog'li) — 300g\nYoki baliq — 300g",
        keyin: "Sekin yurish — 10-15 daqiqa"
      },
      {
        vaqt: "20:30", nom: "Kechki sayr va dam", tur: "kechki",
        bandlar: [
          {emoji:"🚶", text:"Bog'da sayr yoki uyda yurish — 30 daqiqa (20:30-21:00)"},
          {emoji:"💧", text:"Suv — 200-300 ml"},
          {emoji:"🌙", text:"Uyqu — 22:00"},
        ]
      },
    ]
  },
  {
    hafta: 2,
    nom: "2-hafta — Vitamin yuklamasi",
    rang: "#1D4ED8",
    tavsif: "Birinchi haftaga vitaminlar qo'shiladi. Tana quvvat oladi, immuniteti kuchayadi.",
    eslatma: "Vitaminlarni ovqat chaynab yutishdan OLDIN bir-bittadan yutasiz.",
    bloklar: [
      {
        vaqt: "07:00", nom: "Ertalabki ichimlik", tur: "suv",
        bandlar: [
          {emoji:"💧", text:"Iliq suv — 300 ml"},
          {emoji:"🌿", text:"Rastoropsha — 1 paket"},
          {emoji:"🟡", text:"Kurkuma — 1 choy qoshiq"},
          {emoji:"🍎", text:"Olma sirka — 1 choy qoshiq (oshqozon muammosi bo'lmasa)"},
        ]
      },
      {
        vaqt: "07:10", nom: "1-ovqat + Vitaminlar", tur: "ovqat",
        salat: ["Bodring — 2 ta","Rukkola — 1 kichik voq","Salat bargi — 1 voq","Petrishka — yarim voq","Ukrop — yarim voq","Selderei — yarim voq","Avokado — 1 ta","Zaytun moyi (Ekstra Virgin) — 2 osh qoshiq","Dengiz tuzi — ozgina"],
        oqsil: "Yogli baliq (losos, skumbriya) — 180-200g\nYoki 6 ta qaynatilgan tuxumning FAQAT OQI",
        qoshimchalar: ["💊 Vitamin D3 + K2 — 1 ta (7 kun davomida)","💊 Omega-3 — 1 ta","💊 Koenzim Q10 — 1 ta","💊 Rux (Zinc) 22mg — 1 ta"],
        qoshimcha_izoh: "Ovqatni chaynab yutishdan OLDIN bir-bittadan yutasiz",
        keyin: "Sekin yurish — 10-15 daqiqa"
      },
      {
        vaqt: "13:30", nom: "Tushki ichimlik", tur: "suv",
        bandlar: [
          {emoji:"💧", text:"Suv — 300 ml"},
          {emoji:"🌿", text:"Rastoropsha — 1 paket"},
          {emoji:"🫚", text:"Imbir — damlab iching"},
        ]
      },
      {
        vaqt: "13:40", nom: "2-ovqat", tur: "ovqat",
        salat: ["Pekin karami yoki karam — yarim bosh","Bodring — 2 ta","Petrishka — yarim voq","Ukrop — yarim voq","Kinza — 1 voq","Avokado — 1 ta","Zaytun moyi (Ekstra Virgin) — 2 osh qoshiq","Dengiz tuzi"],
        oqsil: "Indeyka go'shti (yog'li) — 300g\nYoki baliq — 300g\nBo'lmasa: mangalda pishirilgan yog'li go'sht (yog' bo'lsin — hazm tezlashadi)",
        keyin: "Sekin yurish — 10-15 daqiqa"
      },
      {
        vaqt: "20:30", nom: "Kechki ritual", tur: "kechki",
        bandlar: [
          {emoji:"🚶", text:"Sayr — 30 daqiqa (20:30-21:00)"},
          {emoji:"💧", text:"Suv — 200-300 ml"},
          {emoji:"💊", text:"Magniy glitsinat yoki sitrat — 300-400 mg"},
          {emoji:"🌙", text:"Uyqu — 22:00"},
        ]
      },
    ]
  },
  {
    hafta: 3,
    nom: "3-hafta — To'liq rejim",
    rang: "#7C3AED",
    tavsif: "Eng kuchli hafta. Berberin, xrom va barcha vitaminlar. Metabolizm tezlashadi.",
    eslatma: "Ikkita ovqat orasida 13:30 va 16:30 bo'ladi. Ovqatlar orasida faqat suv iching.",
    bloklar: [
      {
        vaqt: "06:30", nom: "Ertalabki start", tur: "suv",
        bandlar: [
          {emoji:"💧", text:"Iliq suv — 500 ml"},
          {emoji:"🌿", text:"Rastoropsha — 1 paket"},
          {emoji:"🟡", text:"Kurkuma — 1 choy qoshiq"},
        ]
      },
      {
        vaqt: "07:00", nom: "Kichik ichimlik", tur: "suv",
        bandlar: [
          {emoji:"💧", text:"Iliq suv — 300 ml"},
          {emoji:"🍎", text:"Olma sirka — 1 choy qoshiq (oshqozon muammosi bo'lmasa)"},
        ]
      },
      {
        vaqt: "07:15", nom: "Ovqatdan oldin", tur: "suv",
        bandlar: [
          {emoji:"💊", text:"Xrom pikolinat — 200 mkg"},
          {emoji:"💊", text:"Berberin — 500 mg"},
        ]
      },
      {
        vaqt: "07:30", nom: "1-ovqat + Vitaminlar", tur: "ovqat",
        salat: ["Bodring — 2 ta","Rukkola — 1 kichik voq","Salat bargi — 1 voq","Petrishka — yarim voq","Ukrop — yarim voq","Selderei — yarim voq","Avokado — 1 ta","Zaytun moyi (Ekstra Virgin) — 2 osh qoshiq","Dengiz tuzi — ozgina"],
        oqsil: "Yogli baliq (losos, skumbriya) — 180-200g\nYoki qaynatilgan 5 ta tuxumning FAQAT OQI",
        qoshimchalar: ["💊 Vitamin D3 + K2 — 1 ta (7 kun)","💊 Omega-3 — 1 ta","💊 Koenzim Q10 — 1 ta","💊 Rux (Zinc) 22mg — 1 ta"],
        keyin: "Sekin yurish — 10-15 daqiqa"
      },
      {
        vaqt: "13:30", nom: "Tushki ichimlik", tur: "suv",
        bandlar: [
          {emoji:"💧", text:"Suv — 400 ml + rastoropsha + imbir (damlab iching)"},
        ]
      },
      {
        vaqt: "16:00", nom: "2-ovqatdan oldin", tur: "suv",
        bandlar: [
          {emoji:"💧", text:"Suv — 300 ml + rastoropsha"},
          {emoji:"💊", text:"Berberin — 500 mg (ovqatdan 10-15 daqiqa oldin)"},
        ]
      },
      {
        vaqt: "16:30", nom: "2-ovqat + Vitaminlar", tur: "ovqat",
        salat: ["Pekin karami yoki karam — yarim bosh","Bodring — 2 ta","Petrishka — yarim voq","Ukrop — yarim voq","Kinza — 1 voq","Avokado — 1 ta","Zaytun moyi (Ekstra Virgin) — 2 osh qoshiq","Dengiz tuzi"],
        oqsil: "Indeyka go'shti (yog'li) — 200g\nYoki baliq — 200g",
        qoshimchalar: ["💊 Omega-3 — 1 ta","💊 Taurin — 1 ta"],
        keyin: "Sekin yurish — 10-15 daqiqa"
      },
      {
        vaqt: "20:30", nom: "Kechki ritual", tur: "kechki",
        bandlar: [
          {emoji:"🚶", text:"Sayr — 20-30 daqiqa (20:30-21:00)"},
          {emoji:"💧", text:"Suv — 200-300 ml"},
          {emoji:"💊", text:"Magniy glitsinat yoki sitrat — 300-400 mg"},
          {emoji:"🚶", text:"Piyoda yurish — 20-30 daqiqa (21:00-21:30)"},
          {emoji:"🌙", text:"Uyqu — 22:00"},
        ]
      },
    ]
  },
  {
    hafta: 4,
    nom: "4-hafta — 16:8 Interval rejim",
    rang: "#B45309",
    tavsif: "Tana allaqachon rejimga o'rganib bo'ldi. Endi 16 soat ovqat yo'q, 8 soat ichida 2 ovqat.",
    eslatma: "07:00-15:00 — ovqat oynasi. Qolgan 16 soat FAQAT suv, choy (shakarsiz), rastoropsha.",
    bloklar: [
      {
        vaqt: "07:00", nom: "Ertalabki start + Ovqatdan oldin", tur: "suv",
        bandlar: [
          {emoji:"💧", text:"Iliq suv — 500 ml + rastoropsha + kurkuma"},
          {emoji:"🍎", text:"Olma sirka — 1 choy qoshiq (oshqozon muammosi bo'lmasa)"},
          {emoji:"💊", text:"Xrom pikolinat — 200 mkg"},
          {emoji:"💊", text:"Berberin — 500 mg"},
        ]
      },
      {
        vaqt: "07:30", nom: "1-ovqat + Vitaminlar", tur: "ovqat",
        salat: ["Bodring — 2 ta","Rukkola — 1 kichik voq","Salat bargi — 1 voq","Petrishka — yarim voq","Ukrop — yarim voq","Selderei — yarim voq","Avokado — 1 ta","Zaytun moyi (Ekstra Virgin) — 2 osh qoshiq","Dengiz tuzi — ozgina"],
        oqsil: "Yogli baliq (losos, skumbriya) — 180-200g\nYoki 5 ta qaynatilgan tuxumning FAQAT OQI",
        qoshimchalar: ["💊 Vitamin D3 + K2 — 1 ta (7 kun)","💊 Omega-3 — 1 ta","💊 Koenzim Q10 — 1 ta","💊 Rux (Zinc) 22mg — 1 ta"],
        keyin: "Sekin yurish — 10-15 daqiqa"
      },
      {
        vaqt: "14:00", nom: "Ovqatdan oldin", tur: "suv",
        bandlar: [
          {emoji:"💊", text:"Berberin — 500 mg (ovqatdan 15 daqiqa oldin)"},
          {emoji:"💧", text:"Suv — 300 ml + rastoropsha"},
        ]
      },
      {
        vaqt: "14:30", nom: "2-ovqat (Oxirgi ovqat)", tur: "ovqat",
        salat: ["Pekin karami yoki karam — yarim bosh","Bodring — 2 ta","Petrishka — yarim voq","Ukrop — yarim voq","Kinza — 1 voq","Avokado — 1 ta","Zaytun moyi (Ekstra Virgin) — 2 osh qoshiq","Dengiz tuzi"],
        oqsil: "Indeyka go'shti (yog'li) — 300g\nYoki baliq — 300g",
        qoshimchalar: ["💊 Omega-3 — 1 ta","💊 Taurin — 1 ta"],
        keyin: "Sekin yurish — 10-15 daqiqa"
      },
      {
        vaqt: "15:00+", nom: "Ovqat oynasi yopildi", tur: "suv",
        bandlar: [
          {emoji:"🚫", text:"15:00 dan keyin ovqat yo'q — faqat suv, o'tsimon choy (shakarsiz)"},
          {emoji:"💧", text:"Suv — zarur bo'lsa 1-2 stakan"},
        ]
      },
      {
        vaqt: "20:30", nom: "Kechki ritual", tur: "kechki",
        bandlar: [
          {emoji:"🚶", text:"Sayr — 20-30 daqiqa"},
          {emoji:"💧", text:"Suv — 200 ml"},
          {emoji:"💊", text:"Magniy glitsinat — 300-400 mg"},
          {emoji:"🚶", text:"Piyoda yurish — 20-30 daqiqa (21:00-21:30)"},
          {emoji:"🌙", text:"Uyqu — 22:00"},
        ]
      },
    ]
  },
];

// ── SPORT ────────────────────────────────────────────────────────────────────
const SPORT_DASTUR=[
  {kun:"Dushanba",vaqt:"07:00-08:00 (Yoki qulay vaqt)",qism:"Ko'krak + Qorin",tur:"kuch",
   mashqlar:[
    {nom:"Keng Push-up",emoji:"💪",set:"4 × 15 ta",
     vizual:["🧍 Qo'llar yelkadan KENG joylashtiring","⬇️ Ko'kragingiz yerga tegay deb turing (to'liq pastga)","⬆️ Kuch bilan itarib ko'taring","🔑 Qorin tarang, bel bukilmasin, bosh to'g'ri"],
     uy:"Polda — hech narsa kerak emas",zal:"Bench press yoki pec deck mashinasi"},
    {nom:"Tor Push-up (Triceps)",emoji:"🤜",set:"3 × 12 ta",
     vizual:["🧍 Qo'llar yelkadan TOR (ko'krak yonida)","⬇️ Tirsak orqaga yo'nalib pastga turing","⬆️ Itarib ko'taring","🔑 Tirsak tanaga yopishib tursin"],
     uy:"Polda",zal:"Narrow grip bench press"},
    {nom:"Plank",emoji:"⬛",set:"3 × 45 sekund",
     vizual:["⬛ Tirsak va oyoq uchida turing","📏 Boshdan tovonigacha TO'G'RI CHIZIQ","🫁 Nafas oling — qorin ichga tortilgan","🔑 Dumba ko'tarilmasin, tushmasin — soat bilan o'lchang"],
     uy:"Polda",zal:"Mat yoki polda"},
    {nom:"Qorin (Crunch)",emoji:"🔄",set:"4 × 20 ta",
     vizual:["🛌 Yerga yoting, tizlar bukik","🙆 Qo'l bosh ORQASIDA (boshni tortmang!)","⬆️ Faqat yelka ko'tarisin — bel yerda qolsin","⬇️ Sekin tushing","🔑 Qorin bilan ko'taring, bo'yin bilan emas"],
     uy:"Polda",zal:"Ab machine yoki cable crunch"},
    {nom:"Leg Raise",emoji:"🦵",set:"3 × 15 ta",
     vizual:["🛌 Yerga yoting, qo'l yon tomonda","⬆️ Oyoqlarni TO'G'RI holda 90° gacha ko'taring","⬇️ Sekin tushing — YERGA TEGMASIN","🔑 Past qorin bilan ko'taring, nafasni to'xtatmang"],
     uy:"Polda",zal:"Bars yoki bench ustida"},
   ]},
  {kun:"Seshanba",vaqt:"07:00-08:00 (Yoki qulay vaqt)",qism:"Orqa + Biceps",tur:"kuch",
   mashqlar:[
    {nom:"Tortishish (Pull-up)",emoji:"🏗️",set:"4 × 8 ta",
     vizual:["🖐️ Qo'llar yelkadan KENG, kaftlar oldinga","⬆️ Ko'kragingiz tokchaga tegguncha torting","⬇️ Sekin tushing — to'liq cho'zing","🔑 ORQA bilan torting, qo'l bilan emas — orqangizni his qiling"],
     uy:"Eshik tokchasi yoki elastik tasma bilan (assisted)",zal:"Pull-up bar yoki lat pulldown mashinasi"},
    {nom:"Gantel Qator",emoji:"🏋️",set:"4 × 12 ta",
     vizual:["🧍 Oldinga egilasiz 45°, tiz ozgina bukik","⬆️ Gantelni QO'LTIQ TOMON torting","⬇️ Sekin tushing — to'liq cho'zing","🔑 Orqa TO'G'RI, belni bukmang"],
     uy:"Gantel yoki 1.5L to'liq suv shishasi",zal:"Barbell row yoki mashinali row"},
    {nom:"Superman",emoji:"🦸",set:"3 × 15 ta",
     vizual:["🛌 QORIN BILAN yoting, qo'l oldinda (uchuvchi kabi)","⬆️ Qo'l VA oyoqni bir vaqtda ko'taring","⬇️ Sekin tushing","🔑 Past belni his qiling — shoshilmang"],
     uy:"Polda",zal:"Hyperextension mashinasi"},
    {nom:"Biceps Curl",emoji:"💪",set:"4 × 12 ta",
     vizual:["🧍 Tik turing, gantel qo'lda (kaft oldinga)","⬆️ TIRSAK QIMIRLAMASDAN gantelni ko'taring","⬇️ Sekin tushing — to'liq cho'zing","🔑 Belni orqaga tashlamasdan, faqat qo'l harakat qilsin"],
     uy:"Gantel yoki og'ir kitob",zal:"EZ bar yoki mashinali curl"},
   ]},
  {kun:"Chorshanba",vaqt:"07:00-08:00 (Yoki qulay vaqt)",qism:"Oyoq + Dumba",tur:"kuch",
   mashqlar:[
    {nom:"Squat (Cho'qqayish)",emoji:"🏊",set:"4 × 20 ta",
     vizual:["🧍 Oyoqlar yelka kengligida","⬇️ TIZ 90° gacha tushiring — tiz uchi BARMOQDAN CHIQMASIN","⬆️ TOVON bilan itarib ko'taring","🔑 Ko'krak to'g'ri, oldinga egmang, tez pastga — sekin yuqoriga"],
     uy:"Bo'sh yoki qo'lda gantel ushlab",zal:"Barbell squat yoki leg press"},
    {nom:"Lunges (Qadam squat)",emoji:"🚶",set:"3 × 12 ta (HAR oyoq)",
     vizual:["🧍 Tik turing","⬇️ Oldinga KATTA qadam — old tiz 90°","⬆️ Orqaga qaytib ko'taring","🔄 Oyoqlarni almashtiring","🔑 Old tiz BARMOQDAN CHIQMASIN — keyin tushsin"],
     uy:"Bo'sh yoki gantel ushlab",zal:"Barbell lunges"},
    {nom:"Glute Bridge",emoji:"🌉",set:"4 × 20 ta",
     vizual:["🛌 Yoting, tizlar BUKIK, oyoq polda","⬆️ Dumba ko'taring — yelka-tiz-dumba TO'G'RI CHIZIQ","🤏 TEPADA 2 sekund ushlab turing","⬇️ Sekin tushing","🔑 DUMBA bilan ko'taring, bel bilan emas — his qiling"],
     uy:"Polda",zal:"Hip thrust (yelka bench ustida) + barbell"},
    {nom:"Calf Raise (Boldir)",emoji:"🦶",set:"4 × 25 ta",
     vizual:["🧍 Tik turing yoki zinaning pastki pog'onasida","⬆️ Oyoq UCHIDA imkon qadar BALAND ko'taring","⬇️ TO'LIQ tushing — cho'zilib his qiling","🔑 Sekin bajaring — tez emas, his qiling"],
     uy:"Zinaning pastki pog'onasida yoki polda",zal:"Calf raise mashinasi"},
   ]},
  {kun:"Payshanba",vaqt:"07:00-08:00 (Yoki qulay vaqt)",qism:"Yelka + Triceps",tur:"kuch",
   mashqlar:[
    {nom:"Yelka Press",emoji:"🙌",set:"4 × 12 ta",
     vizual:["🧍 Tik turing, gantel YELKA hizasida","⬆️ To'g'ri TEPA ko'taring — to'liq to'g'rilaning","⬇️ Yelka hizasiga tushing","🔑 Bel bukilmasin — qorin tarang ushlab turing"],
     uy:"Gantel yoki og'ir kitoblar",zal:"Barbell overhead press yoki Smith machine"},
    {nom:"Lateral Raise (Yon yelka)",emoji:"✈️",set:"3 × 15 ta",
     vizual:["🧍 Gantel yon tomonda (pastda)","↔️ Qo'lni YONDAN yelka hizasigacha ko'taring","⬇️ Sekin tushing","🔑 Tirsak ozgina BUKIK — silkitmasdan, nazorat bilan"],
     uy:"Gantel yoki 0.5L suv shishasi",zal:"Kabelli lateral raise"},
    {nom:"Triceps Dip (Stulda)",emoji:"🪑",set:"4 × 15 ta",
     vizual:["🪑 Stul CHETIGA qo'l qo'ying, orqaga yuring","⬇️ Tirsak 90° gacha BUKLING — ko'krak to'g'ri","⬆️ Qo'l bilan itarib ko'taring","🔑 Tana stulga YAQIN bo'lsin — tirsak ORQAGA ketsin"],
     uy:"Stul yoki divan chetida",zal:"Parallel bars dip yoki kabelli pushdown"},
    {nom:"Triceps Kickback",emoji:"🦾",set:"3 × 12 ta",
     vizual:["🧍 Oldinga eging 45°, gantel qo'lda","🔒 TIRSAK yuqorida mahkam ushlab turing","⬆️ Faqat qo'lning pastki qismini ORQAGA to'g'rilang","⬇️ Bukling","🔑 TIRSAK qimirlamasin — faqat pastki qo'l"],
     uy:"Gantel yoki rezinka tasma",zal:"Kabelli triceps pushdown"},
   ]},
  {kun:"Juma",vaqt:"07:00-08:00 (Yoki qulay vaqt)",qism:"To'liq Tana (Full Body)",tur:"kuch",
   mashqlar:[
    {nom:"Burpee",emoji:"🔥",set:"4 × 10 ta",
     vizual:["🧍 Tik turing","⬇️ Cho'qqayib qo'l YERGA qo'ying","🏃 Oyoqni ORQAGA tashlang (push-up holati)","⬆️ Bir push-up, keyin oyoqni qaytaring","🚀 SAKRAB ko'taring — qo'l tepada","🔑 To'xtovsiz bajaring — nafasni to'xtatmang"],
     uy:"Hech narsa kerak emas",zal:"Xuddi shu"},
    {nom:"Mountain Climber",emoji:"🧗",set:"3 × 30 sekund",
     vizual:["🏋️ Push-up pozitsiyasida turing","🦵 O'ng tizni KO'KRAK TOMON torting","🦵 Chap tizni — o'ng orqaga — YUGURISH harakati","🔑 Tana TO'G'RI — qorin tarang — TEZDA bajaring"],
     uy:"Polda",zal:"Xuddi shu"},
    {nom:"Squat Jump",emoji:"🦘",set:"3 × 15 ta",
     vizual:["🧍 Oyoqlar yelka kengligida","⬇️ Squat qiling","🚀 MAKSIMAL kuch bilan SAKRANG","🛬 YUMSHOQ qo'ning — darhol squat","🔑 Tiz BUKILIB tushsin — to'g'ridan tushish tizga ziyon"],
     uy:"Hech narsa kerak emas",zal:"Yoki box jump"},
    {nom:"Bicycle Crunch",emoji:"🚴",set:"3 × 20 ta",
     vizual:["🛌 Yotib, qo'l bosh ortida","🦵 O'ng tizni ko'krak tomon torting","🔄 CHAP tirsakni O'NG tizga tegizing","🔄 Almashtirib davom eting","🔑 SEKIN — nazorat bilan, shoshilmang"],
     uy:"Polda",zal:"Xuddi shu"},
   ]},
  {kun:"Shanba",vaqt:"08:00-09:00",qism:"Kardio + Cho'zilish",tur:"tiklanish",
   mashqlar:[
    {nom:"Tez yurish / Yugurish",emoji:"🏃",set:"30 daqiqa",
     vizual:["🚶 5 daqiqa sekin yurish (isitish)","🏃 20 daqiqa tez yurish yoki engil yugurish","🚶 5 daqiqa sekin yurish (sovutish)","🔑 Nafas ritmik: 2 qadam naf oling, 2 qadam chiqaring"],
     uy:"Ko'cha, park, bog'",zal:"Treadmill"},
    {nom:"Oyoq cho'zilish",emoji:"🦵",set:"3 × 30 sek (har oyoq)",
     vizual:["🛌 Yering, bir oyoqni KO'TARING","🤲 Qo'l bilan oyoq orqasidan TORTING","😌 Cho'zilishni his qiling — og'riq emas, tortishtirish","🔑 Tiz TO'G'RI, sekin ushlab turing"],
     uy:"Polda",zal:"Stretching zonasi"},
    {nom:"Cat-Cow (Orqa cho'zilish)",emoji:"🐱",set:"3 × 30 sek",
     vizual:["🐈 To'rt oyoqda turing (qo'l + tiz)","⬆️ Belni YUQORIGA bukib, boshni TUSHIRING (cat)","⬇️ Belni PASTGA tushirib, boshni KO'TARING (cow)","🔑 Sekin, nafas bilan sinxron bajaring"],
     uy:"Polda yoki mat",zal:"Xuddi shu"},
    {nom:"Sauna / Kontrastli dush",emoji:"🧖",set:"10-15 daqiqa",
     vizual:["🌡️ Sauna: 80-90°C — avval 5 daqiqa","💧 Ko'p suv iching — oldin va keyin","🚿 Sauna yo'q bo'lsa: issiq 1 daqiqa → sovuq 30 sekund — 3 marta","🔑 Yurak muammosi bo'lsa shifokor bilan maslahatlashing"],
     uy:"Kontrastli dush",zal:"Fitnes sauna"},
   ]},
  {kun:"Yakshanba",vaqt:"Erkin",qism:"Dam + Faol tiklanish",tur:"dam",
   mashqlar:[
    {nom:"Sayr (Bog' yoki Tog')",emoji:"🌿",set:"45-60 daqiqa",
     vizual:["🌄 Imkon bo'lsa tog' yoki tepalikda — ko'proq foyda","🚶 Sekin, zavqlanib yuring","🌬️ Chuqur nafas oling — toza havo","🔑 Telefon qo'ying — bu hordiq vaqti"],
     uy:"Yaqin bog' yoki ko'cha",zal:"Tabiat AFZAL"},
    {nom:"To'liq cho'zilish",emoji:"🧘",set:"15 daqiqa",
     vizual:["🦵 Oyoq orqasi — 30 sek","🦵 Son oldi — 30 sek","🏋️ Ko'krak va yelka — 30 sek","🔙 Past bel — 30 sek","😮 Har cho'zilishda nafas CHIQARING"],
     uy:"Polda yoki mat",zal:"Stretching zonasi"},
    {nom:"Nafas / Meditatsiya",emoji:"🫁",set:"10 daqiqa",
     vizual:["🧘 Qulay o'tiring yoki yoting","4 sek — BURUN bilan nafas oling","4 sek — ushlab turing","6 sek — OG'IZ bilan chiqaring","🔑 Ko'zingizni yuming — fikrlar o'tsin, to'xtatmang"],
     uy:"Istalgan tinch joy",zal:"Yoki uxlashdan oldin"},
   ]},
];

// ── SPORT TAB KOMPONENTI ─────────────────────────────────────────────────────
function SportTab(){
  const [openDay,setOpenDay]=useState(0);
  const [openEx,setOpenEx]=useState(null);
  const turColor={kuch:LI,tiklanish:"#EFF6FF",dam:"#FEF9C3"};
  const turBorder={kuch:"#BBF7D0",tiklanish:"#BFDBFE",dam:"#FDE68A"};
  const turTC={kuch:PR,tiklanish:"#1D4ED8",dam:"#92400E"};
  const turLabel={kuch:"💪 Kuch",tiklanish:"🏃 Kardio",dam:"🌿 Dam"};
  return(
    <div>
      <div style={{fontWeight:700,fontSize:14,color:PR,marginBottom:4}}>🏋️ Haftalik Sport Dasturi</div>
      <div style={{fontSize:12,color:MU,marginBottom:12}}>Har mashqni bosing — batafsil ko'rsatma va uy/zal varianti chiqadi</div>
      <div style={{display:"flex",gap:5,overflowX:"auto",paddingBottom:8,marginBottom:14}}>
        {SPORT_DASTUR.map((s,i)=>{
          const tc=turTC[s.tur]||PR;
          const bd=turBorder[s.tur]||"#BBF7D0";
          return(
            <button key={i} onClick={()=>{setOpenDay(i);setOpenEx(null);}}
              style={{minWidth:58,padding:"7px 4px",borderRadius:10,border:"2px solid "+(openDay===i?tc:bd),background:openDay===i?tc:SU,color:openDay===i?"#fff":CH,cursor:"pointer",textAlign:"center",flexShrink:0}}>
              <div style={{fontSize:11,fontWeight:700}}>{s.kun.slice(0,3)}</div>
              <div style={{fontSize:9,marginTop:2,color:openDay===i?"rgba(255,255,255,0.8)":MU}}>{s.tur==="dam"?"Dam":s.tur==="tiklanish"?"Kardio":"Kuch"}</div>
            </button>
          );
        })}
      </div>
      {SPORT_DASTUR[openDay]&&(()=>{
        const s=SPORT_DASTUR[openDay];
        const tc=turTC[s.tur]||PR;
        const bd=turBorder[s.tur]||"#BBF7D0";
        const bg=turColor[s.tur]||LI;
        return(
          <div>
            <div style={{background:tc,borderRadius:12,padding:"12px 15px",marginBottom:12,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div><div style={{color:"#fff",fontWeight:800,fontSize:16}}>{s.kun}</div><div style={{color:"rgba(255,255,255,0.85)",fontSize:12,marginTop:2}}>{s.qism}</div></div>
              <div style={{textAlign:"right"}}><div style={{color:"rgba(255,255,255,0.9)",fontSize:12,fontWeight:600}}>{s.vaqt}</div><div style={{color:"rgba(255,255,255,0.75)",fontSize:11,marginTop:1}}>{turLabel[s.tur]}</div></div>
            </div>
            {s.mashqlar.map((m,k)=>(
              <div key={k} style={{borderRadius:12,border:"1.5px solid "+bd,marginBottom:9,overflow:"hidden",background:openEx===k?"#fff":bg}}>
                <div onClick={()=>setOpenEx(openEx===k?null:k)} style={{padding:"11px 13px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <div style={{display:"flex",alignItems:"center",gap:10}}>
                    <div style={{fontSize:24,minWidth:32,textAlign:"center"}}>{m.emoji}</div>
                    <div><div style={{fontWeight:700,fontSize:13,color:tc}}>{m.nom}</div><div style={{fontSize:12,color:MU,marginTop:1}}>{m.set}</div></div>
                  </div>
                  <div style={{fontSize:18,color:MU}}>{openEx===k?"▲":"▼"}</div>
                </div>
                {openEx===k&&(
                  <div style={{borderTop:"1px solid "+bd,padding:"12px 13px",background:"#fff"}}>
                    <div style={{fontWeight:700,fontSize:11,color:tc,marginBottom:8,textTransform:"uppercase",letterSpacing:"0.5px"}}>📋 QANDAY BAJARISH</div>
                    {m.vizual.map((v,vi)=>(
                      <div key={vi} style={{display:"flex",alignItems:"flex-start",gap:8,padding:"5px 0",borderBottom:vi<m.vizual.length-1?"1px solid #F3F4F6":"none"}}>
                        <span style={{fontSize:14,minWidth:22}}>{v.slice(0,2)}</span>
                        <span style={{fontSize:13,color:CH,lineHeight:1.5}}>{v.slice(2)}</span>
                      </div>
                    ))}
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:12}}>
                      <div style={{background:"#F0FDF4",borderRadius:9,padding:"9px 10px"}}>
                        <div style={{fontSize:11,fontWeight:700,color:PR,marginBottom:4}}>🏠 UY / KO'CHA</div>
                        <div style={{fontSize:12,color:CH}}>{m.uy}</div>
                      </div>
                      <div style={{background:"#EFF6FF",borderRadius:9,padding:"9px 10px"}}>
                        <div style={{fontSize:11,fontWeight:700,color:"#1D4ED8",marginBottom:4}}>🏋️ SPORT ZALDA</div>
                        <div style={{fontSize:12,color:CH}}>{m.zal}</div>
                      </div>
                    </div>
                    <div style={{marginTop:10,background:tc+"18",borderRadius:8,padding:"8px 11px",display:"flex",alignItems:"center",gap:8}}>
                      <span style={{fontSize:16}}>🎯</span>
                      <span style={{fontSize:13,fontWeight:700,color:tc}}>{m.set}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        );
      })()}
    </div>
  );
}

// ── RATSION BLOK RENDER ──────────────────────────────────────────────────────
function RatsionBlok({b, oshqozon}){
  const bgM={suv:"#EFF6FF",ovqat:"#F0FDF4",kechki:"#FEF3C7"};
  const bdM={suv:"#BFDBFE",ovqat:"#BBF7D0",kechki:"#FDE68A"};
  const tcM={suv:"#1D4ED8",ovqat:PR,kechki:"#92400E"};
  const bg=bgM[b.tur]||"#F9FAFB", bd=bdM[b.tur]||"#E5E7EB", tc=tcM[b.tur]||PR;
  return(
    <div style={{borderRadius:12,border:"1.5px solid "+bd,marginBottom:11,overflow:"hidden",background:bg}}>
      <div style={{padding:"9px 13px",borderBottom:"1px solid "+bd,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{display:"flex",alignItems:"center",gap:7}}>
          <div style={{background:tc,borderRadius:7,padding:"3px 9px"}}><span style={{fontSize:11,fontWeight:700,color:"#fff"}}>{b.vaqt}</span></div>
          <span style={{fontWeight:700,fontSize:13,color:tc}}>{b.nom}</span>
        </div>
        {b.tur==="ovqat"&&<span style={{fontSize:10,background:tc+"18",color:tc,borderRadius:6,padding:"2px 7px",fontWeight:600}}>🍽️ Ovqat</span>}
      </div>
      <div style={{padding:"11px 13px"}}>
        {(b.bandlar||[]).filter(x=>!(oshqozon&&x.text.includes("sirka"))).map((x,k,arr)=>(
          <div key={k} style={{display:"flex",alignItems:"flex-start",gap:8,padding:"5px 0",borderBottom:k<arr.length-1?"1px solid rgba(0,0,0,0.05)":"none"}}>
            <span style={{fontSize:15,minWidth:20}}>{x.emoji}</span>
            <span style={{fontSize:13,color:CH,lineHeight:1.4}}>{x.text}</span>
          </div>
        ))}
        {b.tur==="ovqat"&&(
          <div style={{background:"#EFF6FF",borderRadius:8,padding:"8px 11px",marginBottom:10,display:"flex",gap:8,alignItems:"flex-start"}}>
            <span style={{fontSize:16}}>💧</span>
            <div>
              <div style={{fontSize:12,fontWeight:700,color:"#1D4ED8",marginBottom:2}}>Ovqatdan oldin suv iching</div>
              <div style={{fontSize:11,color:"#1E40AF"}}>Ovqatdan 15-20 daqiqa oldin 1 stakan (250-300 ml) suv iching. Ishtaha kamayadi, hazm yaxshilanadi.</div>
            </div>
          </div>
        )}
        {b.salat&&(
          <div>
            <div style={{fontWeight:700,fontSize:11,color:MU,marginBottom:6,textTransform:"uppercase",letterSpacing:"0.5px"}}>🥗 SALAT</div>
            {b.salat.map((x,k)=><div key={k} style={{fontSize:13,color:CH,padding:"2px 0",display:"flex",gap:5}}><span style={{color:AC}}>▸</span>{x}</div>)}
            <div style={{marginTop:10,fontWeight:700,fontSize:11,color:MU,marginBottom:6,textTransform:"uppercase",letterSpacing:"0.5px"}}>🥩 OQSIL</div>
            <div style={{fontSize:13,fontWeight:600,color:PR,background:SU,borderRadius:8,padding:"8px 11px",lineHeight:1.6,whiteSpace:"pre-line"}}>{b.oqsil}</div>
          </div>
        )}
        {b.qoshimchalar&&(
          <div style={{marginTop:10}}>
            <div style={{fontWeight:700,fontSize:11,color:MU,marginBottom:5,textTransform:"uppercase",letterSpacing:"0.5px"}}>💊 VITAMINLAR</div>
            {b.qoshimcha_izoh&&<div style={{fontSize:11,color:"#92400E",background:"#FEF3C7",borderRadius:7,padding:"5px 9px",marginBottom:7}}>{b.qoshimcha_izoh}</div>}
            <div style={{display:"flex",flexDirection:"column",gap:5}}>
              {b.qoshimchalar.map((x,k)=><div key={k} style={{background:SU,border:"1px solid #D1FAE5",borderRadius:7,padding:"5px 10px",fontSize:12,color:PR,fontWeight:500}}>{x}</div>)}
            </div>
          </div>
        )}
        {b.keyin&&<div style={{marginTop:9,background:"rgba(255,255,255,0.8)",borderRadius:7,padding:"6px 11px",fontSize:12,color:"#065F46",display:"flex",gap:6,alignItems:"center"}}><span>🚶</span>{b.keyin}</div>}
        {b.tur==="ovqat"&&(
          <div style={{marginTop:8,background:"#FEF3C7",borderRadius:7,padding:"7px 11px",fontSize:12,color:"#92400E",display:"flex",gap:7,alignItems:"flex-start"}}>
            <span style={{fontSize:14,flexShrink:0}}>⚠️</span>
            <span><b>Ovqatdan keyin 2 soat o'tkazib, keyin suv iching.</b> Oshqozon shirasini suyultirmaslik uchun.</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ── ASOSIY ILOVA ─────────────────────────────────────────────────────────────
export default function App(){
  const [hafta,setHafta]=useState(0);
  const [tab,setTab]=useState("ratsion");
  const [oshqozon,setOshqozon]=useState(false);

  const r=RATSIONLAR[hafta];
  const haftaColors=["#1B4332","#1D4ED8","#7C3AED","#B45309"];

  return(
    <div style={{minHeight:"100vh",background:CR,fontFamily:"system-ui,-apple-system,sans-serif"}}>
      {/* Header */}
      <div style={{background:r.rang,padding:"15px 18px",position:"sticky",top:0,zIndex:10,transition:"background 0.3s"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontSize:22}}>🌿</span>
            <div>
              <div style={{color:CR,fontWeight:700,fontSize:16}}>Sog'lom Hayot</div>
              <div style={{color:"rgba(255,255,255,0.75)",fontSize:11}}>30 kunlik shablon ratsion</div>
            </div>
          </div>
          {/* Oshqozon toggle */}
          <div onClick={()=>setOshqozon(o=>!o)} style={{background:"rgba(255,255,255,0.15)",borderRadius:20,padding:"5px 10px",cursor:"pointer",display:"flex",alignItems:"center",gap:5}}>
            <div style={{width:28,height:16,borderRadius:8,background:oshqozon?"#EF4444":"rgba(255,255,255,0.4)",position:"relative",transition:"background 0.2s"}}>
              <div style={{position:"absolute",width:12,height:12,borderRadius:6,background:"#fff",top:2,left:oshqozon?14:2,transition:"left 0.2s"}}/>
            </div>
            <span style={{color:"rgba(255,255,255,0.9)",fontSize:10,fontWeight:600}}>Oshqozon</span>
          </div>
        </div>
      </div>

      <div style={{maxWidth:680,margin:"0 auto",padding:"16px 14px"}}>

        {/* Hafta tanlash */}
        <div style={{marginBottom:16}}>
          <div style={{fontSize:12,color:MU,marginBottom:8,fontWeight:600}}>📅 Hafta tanlang:</div>
          <div style={{display:"flex",gap:6}}>
            {RATSIONLAR.map((x,i)=>(
              <button key={i} onClick={()=>setHafta(i)}
                style={{flex:1,padding:"10px 4px",borderRadius:11,border:"2px solid "+(hafta===i?haftaColors[i]:"#E5E7EB"),background:hafta===i?haftaColors[i]:SU,color:hafta===i?"#fff":CH,cursor:"pointer",textAlign:"center",transition:"all 0.15s"}}>
                <div style={{fontSize:14,fontWeight:800}}>{i+1}</div>
                <div style={{fontSize:9,marginTop:2,color:hafta===i?"rgba(255,255,255,0.8)":MU}}>Hafta</div>
              </button>
            ))}
          </div>
        </div>

        {/* Maslahat */}
        <MaslahatKarta/>

        {/* Hafta banner */}
        <div style={{background:"linear-gradient(135deg,"+r.rang+","+r.rang+"CC)",borderRadius:14,padding:"14px 16px",marginBottom:14,boxShadow:"0 4px 16px "+r.rang+"40"}}>
          <div style={{color:"#fff",fontWeight:800,fontSize:15,marginBottom:4}}>{r.nom}</div>
          <div style={{color:"rgba(255,255,255,0.85)",fontSize:12,lineHeight:1.5,marginBottom:6}}>{r.tavsif}</div>
          {r.eslatma&&<div style={{background:"rgba(255,255,255,0.15)",borderRadius:8,padding:"7px 10px",fontSize:11,color:"rgba(255,255,255,0.9)"}}>💡 {r.eslatma}</div>}
        </div>

        {/* Oshqozon xabar */}
        {oshqozon&&<div style={{background:"#FEF3C7",border:"1px solid #FDE68A",borderRadius:10,padding:"9px 12px",marginBottom:12,fontSize:12,color:"#92400E"}}>
          🫁 Oshqozon rejimi: Olma sirka OLIB TASHLANDI
        </div>}

        {/* Tablar */}
        <div style={{display:"flex",gap:4,marginBottom:12,overflowX:"auto",paddingBottom:2}}>
          {[["ratsion","🍽️"],["sport","🏋️"],["suv","💧"],["jadval","⏰"],["nafas","🫁"],["progress","📊"]].map(([x,l])=>(
            <button key={x} onClick={()=>setTab(x)} style={{minWidth:46,padding:"9px 8px",borderRadius:11,border:"none",background:tab===x?r.rang:SU,color:tab===x?"#fff":MU,cursor:"pointer",fontSize:16,fontWeight:tab===x?700:400,boxShadow:"0 1px 3px rgba(0,0,0,0.07)",flexShrink:0}}>
              {l}
            </button>
          ))}
        </div>

        {/* RATSION */}
        {tab==="ratsion"&&(
          <div>
            {r.bloklar.map((b,i)=><RatsionBlok key={i} b={b} oshqozon={oshqozon}/>)}
          </div>
        )}

        {/* SPORT */}
        {tab==="sport"&&<SportTab/>}

        {/* SUV */}
        {tab==="suv"&&<SuvTracker/>}

        {/* JADVAL */}
        {tab==="jadval"&&<JadvalTab/>}

        {/* NAFAS */}
        {tab==="nafas"&&<NafasTab/>}

        {/* PROGRESS */}
        {tab==="progress"&&<ProgressTab/>}

      </div>
    </div>
  );
}
