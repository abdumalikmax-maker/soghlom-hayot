import { useState, useEffect } from "react";

const PR="#1B4332",AC="#52B788",CR="#F8F4EF",CH="#1C1C1E",MU="#6B7280",SU="#FFFFFF",LI="#E8F5EE",DA="#DC2626";
const GOALS=["Ozish","Semirish","Vazn saqlash","Mushak yig'ish","Sog'lomlashtirish"];
const ACT_L=["Kam harakatli","O'rtacha faol","Faol","Juda faol"];

const BOT_TOKEN = "8740349246:AAEGvi4m6xhmmxazWI6z7VEzuEcy820kvz0";
const ADMIN_ID = "1364027533";
const NARX = 399000;

const RATSIONLAR=[
  {hafta:1,nom:"1-hafta — Boshlang'ich tozalash",rang:PR,tavsif:"Tana tozalanadi, yallig'lanish kamayadi.",
   bloklar:[
    {vaqt:"07:00",nom:"Ertalabki ichimlik",tur:"suv",bandlar:[{emoji:"💧",text:"Iliq suv — 300 ml"},{emoji:"🌿",text:"Rastoropsha — 1 paket"},{emoji:"🟡",text:"Kurkuma — 1 choy qoshiq"},{emoji:"🍎",text:"Olma sirka — 1 choy qoshiq (oshqozon bo'lmasa)"}]},
    {vaqt:"07:10",nom:"1-ovqat",tur:"ovqat",salat:["Bodring — 2 ta","Rukkola — yarim voq","Salat bargi — yarim voq","Petrishka — yarim voq","Avokado — yarim ta","Zaytun moyi — 2 osh qoshiq","Dengiz tuzi"],oqsil:"Yogli baliq (losos, skumbriya) — 180-200g\nYoki 5 ta tuxumning FAQAT OQI",keyin:"Sekin yurish — 10-15 daqiqa"},
    {vaqt:"13:30",nom:"Tushki ichimlik",tur:"suv",bandlar:[{emoji:"💧",text:"Suv — 300 ml"},{emoji:"🌿",text:"Rastoropsha + imbir — damlab iching"}]},
    {vaqt:"13:40",nom:"2-ovqat",tur:"ovqat",salat:["Pekin karami — yarim bosh","Bodring — 2 ta","Kinza — yarim voq","Avokado — yarim ta","Zaytun moyi — 2 osh qoshiq","Dengiz tuzi"],oqsil:"Indeyka — 300g yoki baliq — 300g",keyin:"Sekin yurish — 10-15 daqiqa"},
    {vaqt:"20:30",nom:"Kechki ritual",tur:"kechki",bandlar:[{emoji:"🚶",text:"Sayr — 30 daqiqa"},{emoji:"💧",text:"Suv — 200-300 ml"},{emoji:"🌙",text:"Uyqu — 22:00"}]},
   ]},
  {hafta:2,nom:"2-hafta — Vitamin yuklamasi",rang:"#1D4ED8",tavsif:"Vitaminlar qo'shiladi. Immunitet kuchayadi.",
   bloklar:[
    {vaqt:"07:00",nom:"Ertalabki ichimlik",tur:"suv",bandlar:[{emoji:"💧",text:"Iliq suv — 300 ml"},{emoji:"🌿",text:"Rastoropsha — 1 paket"},{emoji:"🟡",text:"Kurkuma — 1 choy qoshiq"},{emoji:"🍎",text:"Olma sirka — 1 choy qoshiq (oshqozon bo'lmasa)"}]},
    {vaqt:"07:10",nom:"1-ovqat + Vitaminlar",tur:"ovqat",salat:["Bodring — 2 ta","Rukkola — 1 voq","Salat bargi — 1 voq","Avokado — 1 ta","Zaytun moyi — 2 osh qoshiq","Dengiz tuzi"],oqsil:"Yogli baliq — 180-200g\nYoki 6 ta tuxumning FAQAT OQI",qoshimchalar:["💊 D3+K2 — 1 ta","💊 Omega-3 — 1 ta","💊 CoQ10 — 1 ta","💊 Rux 22mg — 1 ta"],keyin:"Sekin yurish — 10-15 daqiqa"},
    {vaqt:"13:30",nom:"Tushki ichimlik",tur:"suv",bandlar:[{emoji:"💧",text:"Suv — 300 ml + rastoropsha + imbir"}]},
    {vaqt:"13:40",nom:"2-ovqat",tur:"ovqat",salat:["Pekin karami — yarim bosh","Bodring — 2 ta","Kinza — 1 voq","Avokado — 1 ta","Zaytun moyi — 2 osh qoshiq","Dengiz tuzi"],oqsil:"Indeyka — 300g yoki baliq — 300g",keyin:"Sekin yurish — 10-15 daqiqa"},
    {vaqt:"20:30",nom:"Kechki ritual",tur:"kechki",bandlar:[{emoji:"🚶",text:"Sayr — 30 daqiqa"},{emoji:"💧",text:"Suv — 200-300 ml"},{emoji:"💊",text:"Magniy glitsinat — 300-400 mg"},{emoji:"🌙",text:"Uyqu — 22:00"}]},
   ]},
  {hafta:3,nom:"3-hafta — To'liq rejim",rang:"#7C3AED",tavsif:"Berberin, xrom va barcha vitaminlar.",
   bloklar:[
    {vaqt:"06:30",nom:"Ertalabki start",tur:"suv",bandlar:[{emoji:"💧",text:"Iliq suv — 500 ml"},{emoji:"🌿",text:"Rastoropsha — 1 paket"},{emoji:"🟡",text:"Kurkuma — 1 choy qoshiq"}]},
    {vaqt:"07:00",nom:"Kichik ichimlik",tur:"suv",bandlar:[{emoji:"💧",text:"Iliq suv — 300 ml"},{emoji:"🍎",text:"Olma sirka (oshqozon bo'lmasa)"},{emoji:"💊",text:"Xrom pikolinat 200mkg + Berberin 500mg"}]},
    {vaqt:"07:30",nom:"1-ovqat + Vitaminlar",tur:"ovqat",salat:["Bodring — 2 ta","Rukkola — 1 voq","Avokado — 1 ta","Zaytun moyi — 2 osh qoshiq","Dengiz tuzi"],oqsil:"Yogli baliq — 180-200g\nYoki 5 ta tuxumning FAQAT OQI",qoshimchalar:["💊 D3+K2 — 1 ta","💊 Omega-3 — 1 ta","💊 CoQ10 — 1 ta","💊 Rux 22mg — 1 ta"],keyin:"Sekin yurish — 10-15 daqiqa"},
    {vaqt:"16:00",nom:"2-ovqatdan oldin",tur:"suv",bandlar:[{emoji:"💧",text:"Suv — 300 ml + rastoropsha"},{emoji:"💊",text:"Berberin 500mg (15 daqiqa oldin)"}]},
    {vaqt:"16:30",nom:"2-ovqat",tur:"ovqat",salat:["Pekin karami — yarim bosh","Bodring — 2 ta","Kinza — 1 voq","Avokado — 1 ta","Zaytun moyi — 2 osh qoshiq"],oqsil:"Indeyka — 200g yoki baliq — 200g",qoshimchalar:["💊 Omega-3 — 1 ta","💊 Taurin — 1 ta"],keyin:"Sekin yurish — 10-15 daqiqa"},
    {vaqt:"20:30",nom:"Kechki ritual",tur:"kechki",bandlar:[{emoji:"🚶",text:"Sayr — 20-30 daqiqa"},{emoji:"💧",text:"Suv — 200-300 ml"},{emoji:"💊",text:"Magniy glitsinat — 300-400 mg"},{emoji:"🌙",text:"Uyqu — 22:00"}]},
   ]},
  {hafta:4,nom:"4-hafta — 16:8 Interval rejim",rang:"#B45309",tavsif:"07:30-15:00 ovqat oynasi. Keyin faqat suv.",
   bloklar:[
    {vaqt:"07:00",nom:"Ertalabki start",tur:"suv",bandlar:[{emoji:"💧",text:"Iliq suv — 500 ml + rastoropsha + kurkuma"},{emoji:"🍎",text:"Olma sirka (oshqozon bo'lmasa)"},{emoji:"💊",text:"Xrom pikolinat + Berberin 500mg"}]},
    {vaqt:"07:30",nom:"1-ovqat + Vitaminlar",tur:"ovqat",salat:["Bodring — 2 ta","Rukkola — 1 voq","Avokado — 1 ta","Zaytun moyi — 2 osh qoshiq","Dengiz tuzi"],oqsil:"Yogli baliq — 180-200g\nYoki 5 ta tuxumning FAQAT OQI",qoshimchalar:["💊 D3+K2 — 1 ta","💊 Omega-3 — 1 ta","💊 CoQ10 — 1 ta","💊 Rux 22mg — 1 ta"],keyin:"Sekin yurish — 10-15 daqiqa"},
    {vaqt:"14:00",nom:"2-ovqatdan oldin",tur:"suv",bandlar:[{emoji:"💊",text:"Berberin 500mg (15 daqiqa oldin)"},{emoji:"💧",text:"Suv — 300 ml"}]},
    {vaqt:"14:30",nom:"2-ovqat (Oxirgi)",tur:"ovqat",salat:["Pekin karami — yarim bosh","Bodring — 2 ta","Kinza — 1 voq","Avokado — 1 ta","Zaytun moyi — 2 osh qoshiq"],oqsil:"Indeyka — 300g yoki baliq — 300g",qoshimchalar:["💊 Omega-3 — 1 ta","💊 Taurin — 1 ta"],keyin:"Sekin yurish — 10-15 daqiqa"},
    {vaqt:"15:00+",nom:"Ovqat oynasi yopildi",tur:"suv",bandlar:[{emoji:"🚫",text:"15:00 dan keyin ovqat yo'q — faqat suv"}]},
    {vaqt:"20:30",nom:"Kechki ritual",tur:"kechki",bandlar:[{emoji:"🚶",text:"Sayr — 20-30 daqiqa"},{emoji:"💧",text:"Suv — 200 ml"},{emoji:"💊",text:"Magniy glitsinat — 300-400 mg"},{emoji:"🌙",text:"Uyqu — 22:00"}]},
   ]},
];

const SPORT=[
  {kun:"Dushanba",vaqt:"07:00-08:00",qism:"Ko'krak + Qorin",tur:"kuch",mashqlar:[
    {nom:"Keng Push-up",emoji:"💪",set:"4 × 15 ta",vizual:["🧍 Qo'llar yelkadan KENG","⬇️ Ko'kragingiz yerga tegay deb turing","⬆️ Kuch bilan itarib ko'taring","🔑 Qorin tarang, bel bukilmasin"],uy:"Polda",zal:"Bench press"},
    {nom:"Plank",emoji:"⬛",set:"3 × 45 sek",vizual:["⬛ Tirsak va oyoq uchida turing","📏 Boshdan tovonigacha to'g'ri chiziq","🔑 Dumba ko'tarilmasin"],uy:"Polda",zal:"Mat"},
    {nom:"Crunch",emoji:"🔄",set:"4 × 20 ta",vizual:["🛌 Yerga yoting, tizlar bukik","⬆️ Faqat elkalar ko'tarisin","🔑 Qorin bilan ko'taring"],uy:"Polda",zal:"Ab machine"},
  ]},
  {kun:"Seshanba",vaqt:"07:00-08:00",qism:"Orqa + Biceps",tur:"kuch",mashqlar:[
    {nom:"Tortishish",emoji:"🏗️",set:"4 × 8 ta",vizual:["🖐️ Qo'llar keng, kaftlar oldinga","⬆️ Ko'kragingiz tokchaga tegguncha","🔑 ORQA bilan torting"],uy:"Elastik tasma",zal:"Pull-up bar"},
    {nom:"Biceps Curl",emoji:"💪",set:"4 × 12 ta",vizual:["🧍 Gantel qo'lda","⬆️ Tirsak qimirlamasdan ko'taring","🔑 Sekin tushing"],uy:"Gantel",zal:"EZ bar"},
  ]},
  {kun:"Chorshanba",vaqt:"07:00-08:00",qism:"Oyoq + Dumba",tur:"kuch",mashqlar:[
    {nom:"Squat",emoji:"🏊",set:"4 × 20 ta",vizual:["🧍 Oyoqlar yelka kengligida","⬇️ Tiz 90° gacha","⬆️ Tovon bilan itarib","🔑 Ko'krak to'g'ri"],uy:"Bo'sh yoki gantel",zal:"Barbell squat"},
    {nom:"Glute Bridge",emoji:"🌉",set:"4 × 20 ta",vizual:["🛌 Yoting, tizlar bukik","⬆️ Dumba ko'taring","🤏 Tepada 2 sek","🔑 DUMBA bilan ko'taring"],uy:"Polda",zal:"Hip thrust"},
  ]},
  {kun:"Payshanba",vaqt:"07:00-08:00",qism:"Yelka + Triceps",tur:"kuch",mashqlar:[
    {nom:"Yelka Press",emoji:"🙌",set:"4 × 12 ta",vizual:["🧍 Gantel yelka hizasida","⬆️ Tepaga ko'taring","🔑 Bel bukilmasin"],uy:"Gantel",zal:"Overhead press"},
    {nom:"Triceps Dip",emoji:"🪑",set:"4 × 15 ta",vizual:["🪑 Stul chetiga qo'l","⬇️ Tirsak 90°","⬆️ Itarib ko'taring"],uy:"Stul",zal:"Parallel bars"},
  ]},
  {kun:"Juma",vaqt:"07:00-08:00",qism:"To'liq Tana",tur:"kuch",mashqlar:[
    {nom:"Burpee",emoji:"🔥",set:"4 × 10 ta",vizual:["⬇️ Cho'qqayib qo'l yerga","🏃 Oyoq orqaga","⬆️ Push-up","🚀 Sakrab ko'taring"],uy:"Polda",zal:"Xuddi shu"},
    {nom:"Mountain Climber",emoji:"🧗",set:"3 × 30 sek",vizual:["🏋️ Push-up pozitsiyasida","🦵 Tizlarni almashtirib torting","🔑 Tez bajaring"],uy:"Polda",zal:"Xuddi shu"},
  ]},
  {kun:"Shanba",vaqt:"08:00-09:00",qism:"Kardio + Cho'zilish",tur:"tiklanish",mashqlar:[
    {nom:"Yugurish/Yurish",emoji:"🏃",set:"30 daqiqa",vizual:["🚶 5 daqiqa isitish","🏃 20 daqiqa tez yurish","🚶 5 daqiqa sovutish"],uy:"Ko'cha, park",zal:"Treadmill"},
  ]},
  {kun:"Yakshanba",vaqt:"Erkin",qism:"Dam + Tiklanish",tur:"dam",mashqlar:[
    {nom:"Sayr",emoji:"🌿",set:"45-60 daqiqa",vizual:["🌄 Tog' yoki parkda","🚶 Sekin, zavqlanib","🌬️ Chuqur nafas"],uy:"Park, bog'",zal:"Tabiat afzal"},
  ]},
];

const MASLAHATLAR=[
  {emoji:"🌅",matn:"Ertalab birinchi ish — telefon emas, 500ml iliq suv iching."},
  {emoji:"🚶",matn:"Ovqatdan keyin 10-15 daqiqa sekin yurish — eng oddiy, eng kuchli dori."},
  {emoji:"😴",matn:"22:00 da uxlash — o'sish gormoni shu vaqtda eng ko'p chiqadi."},
  {emoji:"🌿",text:"Rastoropsha jigarni kundalik toksinlardan tozalaydi."},
  {emoji:"💊",matn:"Magniy 300 dan ortiq ferment reaktsiyasida ishtirok etadi."},
  {emoji:"🫁",matn:"4-4-6 nafas: stressni 1 daqiqada pasaytiradi."},
  {emoji:"💧",matn:"Miyangiz 75% suvdan iborat — har soatda suv iching."},
];

function RatsionBlok({b,oshqozon}){
  const bgM={suv:"#EFF6FF",ovqat:"#F0FDF4",kechki:"#FEF3C7"};
  const bdM={suv:"#BFDBFE",ovqat:"#BBF7D0",kechki:"#FDE68A"};
  const tcM={suv:"#1D4ED8",ovqat:PR,kechki:"#92400E"};
  const bg=bgM[b.tur]||"#F9FAFB",bd=bdM[b.tur]||"#E5E7EB",tc=tcM[b.tur]||PR;
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
        {b.tur==="ovqat"&&<div style={{background:"#EFF6FF",borderRadius:8,padding:"8px 11px",marginBottom:10}}><div style={{fontSize:12,fontWeight:700,color:"#1D4ED8",marginBottom:2}}>💧 Ovqatdan oldin suv iching</div><div style={{fontSize:11,color:"#1E40AF"}}>15-20 daqiqa oldin 1 stakan suv iching</div></div>}
        {(b.bandlar||[]).filter(x=>!(oshqozon&&x.text&&x.text.includes("sirka"))).map((x,k,arr)=>(
          <div key={k} style={{display:"flex",alignItems:"flex-start",gap:8,padding:"5px 0",borderBottom:k<arr.length-1?"1px solid rgba(0,0,0,0.05)":"none"}}>
            <span style={{fontSize:15,minWidth:20}}>{x.emoji}</span>
            <span style={{fontSize:13,color:CH,lineHeight:1.4}}>{x.text}</span>
          </div>
        ))}
        {b.salat&&<div>
          <div style={{fontWeight:700,fontSize:11,color:MU,marginBottom:6,textTransform:"uppercase"}}>🥗 SALAT</div>
          {b.salat.map((x,k)=><div key={k} style={{fontSize:13,color:CH,padding:"2px 0",display:"flex",gap:5}}><span style={{color:AC}}>▸</span>{x}</div>)}
          <div style={{marginTop:9,fontWeight:700,fontSize:11,color:MU,marginBottom:5,textTransform:"uppercase"}}>🥩 OQSIL</div>
          <div style={{fontSize:13,fontWeight:600,color:PR,background:SU,borderRadius:8,padding:"7px 11px",whiteSpace:"pre-line"}}>{b.oqsil}</div>
        </div>}
        {b.qoshimchalar&&<div style={{marginTop:10}}><div style={{fontWeight:700,fontSize:11,color:MU,marginBottom:5,textTransform:"uppercase"}}>💊 Vitaminlar</div><div style={{display:"flex",flexWrap:"wrap",gap:5}}>{b.qoshimchalar.map((x,k)=><div key={k} style={{background:SU,border:"1px solid #D1FAE5",borderRadius:7,padding:"4px 9px",fontSize:12,color:PR,fontWeight:500}}>{x}</div>)}</div></div>}
        {b.keyin&&<div style={{marginTop:9,background:"rgba(255,255,255,0.8)",borderRadius:7,padding:"6px 11px",fontSize:12,color:"#065F46",display:"flex",gap:6,alignItems:"center"}}><span>🚶</span>{b.keyin}</div>}
        {b.tur==="ovqat"&&<div style={{marginTop:8,background:"#FEF3C7",borderRadius:7,padding:"7px 11px",fontSize:12,color:"#92400E"}}><b>⚠️ Ovqatdan keyin 2 soat o'tkazib, keyin suv iching.</b></div>}
      </div>
    </div>
  );
}

function SportTab(){
  const [openDay,setOpenDay]=useState(0);
  const [openEx,setOpenEx]=useState(null);
  const turColor={kuch:LI,tiklanish:"#EFF6FF",dam:"#FEF9C3"};
  const turBorder={kuch:"#BBF7D0",tiklanish:"#BFDBFE",dam:"#FDE68A"};
  const turTC={kuch:PR,tiklanish:"#1D4ED8",dam:"#92400E"};
  return(
    <div>
      <div style={{fontWeight:700,fontSize:14,color:PR,marginBottom:12}}>🏋️ Haftalik Sport Dasturi</div>
      <div style={{display:"flex",gap:5,overflowX:"auto",paddingBottom:8,marginBottom:14}}>
        {SPORT.map((s,i)=>(
          <button key={i} onClick={()=>{setOpenDay(i);setOpenEx(null);}} style={{minWidth:58,padding:"7px 4px",borderRadius:10,border:"2px solid "+(openDay===i?turTC[s.tur]:turBorder[s.tur]),background:openDay===i?turTC[s.tur]:SU,color:openDay===i?"#fff":CH,cursor:"pointer",textAlign:"center",flexShrink:0}}>
            <div style={{fontSize:11,fontWeight:700}}>{s.kun.slice(0,3)}</div>
            <div style={{fontSize:9,marginTop:2,color:openDay===i?"rgba(255,255,255,0.8)":MU}}>{s.tur==="dam"?"Dam":s.tur==="tiklanish"?"Kardio":"Kuch"}</div>
          </button>
        ))}
      </div>
      {SPORT[openDay]&&(()=>{
        const s=SPORT[openDay];
        const tc=turTC[s.tur]||PR,bd=turBorder[s.tur]||"#BBF7D0",bg=turColor[s.tur]||LI;
        return(
          <div>
            <div style={{background:tc,borderRadius:12,padding:"12px 15px",marginBottom:12,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div><div style={{color:"#fff",fontWeight:800,fontSize:16}}>{s.kun}</div><div style={{color:"rgba(255,255,255,0.85)",fontSize:12,marginTop:2}}>{s.qism}</div></div>
              <div style={{color:"rgba(255,255,255,0.9)",fontSize:12,fontWeight:600}}>{s.vaqt}</div>
            </div>
            {s.mashqlar.map((m,k)=>(
              <div key={k} style={{borderRadius:12,border:"1.5px solid "+bd,marginBottom:9,overflow:"hidden",background:openEx===k?"#fff":bg}}>
                <div onClick={()=>setOpenEx(openEx===k?null:k)} style={{padding:"11px 13px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <div style={{display:"flex",alignItems:"center",gap:10}}>
                    <div style={{fontSize:24,minWidth:32,textAlign:"center"}}>{m.emoji}</div>
                    <div><div style={{fontWeight:700,fontSize:13,color:tc}}>{m.nom}</div><div style={{fontSize:12,color:MU,marginTop:1}}>{m.set}</div></div>
                  </div>
                  <div style={{fontSize:16,color:MU}}>{openEx===k?"▲":"▼"}</div>
                </div>
                {openEx===k&&(
                  <div style={{borderTop:"1px solid "+bd,padding:"12px 13px",background:"#fff"}}>
                    {m.vizual.map((v,vi)=>(
                      <div key={vi} style={{display:"flex",alignItems:"flex-start",gap:8,padding:"5px 0",borderBottom:vi<m.vizual.length-1?"1px solid #F3F4F6":"none"}}>
                        <span style={{fontSize:14,minWidth:22}}>{v.slice(0,2)}</span>
                        <span style={{fontSize:13,color:CH,lineHeight:1.5}}>{v.slice(2)}</span>
                      </div>
                    ))}
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:12}}>
                      <div style={{background:"#F0FDF4",borderRadius:9,padding:"9px 10px"}}><div style={{fontSize:11,fontWeight:700,color:PR,marginBottom:4}}>🏠 UY</div><div style={{fontSize:12,color:CH}}>{m.uy}</div></div>
                      <div style={{background:"#EFF6FF",borderRadius:9,padding:"9px 10px"}}><div style={{fontSize:11,fontWeight:700,color:"#1D4ED8",marginBottom:4}}>🏋️ ZAL</div><div style={{fontSize:12,color:CH}}>{m.zal}</div></div>
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

function NafasTab(){
  const [holat,setHolat]=useState("tayyor");
  const [bosqich,setBosqich]=useState(0);
  const [hisoblagich,setHisoblagich]=useState(0);
  const [sikl,setSikl]=useState(0);
  const [timerId,setTimerId]=useState(null);
  const NAFAS=[{nom:"Nafas oling",davom:4,rang:"#0EA5E9",emoji:"🌬️"},{nom:"Ushlab turing",davom:4,rang:"#7C3AED",emoji:"🔒"},{nom:"Chiqaring",davom:6,rang:"#10B981",emoji:"💨"}];
  const boshlash=()=>{
    setHolat("ishlaydi");setBosqich(0);setHisoblagich(NAFAS[0].davom);setSikl(0);
    let ph=0,cn=NAFAS[0].davom,cl=0;
    const id=setInterval(()=>{
      cn--;
      if(cn<=0){ph=(ph+1)%3;if(ph===0)cl++;if(cl>=3){clearInterval(id);setHolat("tugadi");return;}cn=NAFAS[ph].davom;}
      setBosqich(ph);setHisoblagich(cn);setSikl(cl);
    },1000);
    setTimerId(id);
  };
  const toxtatish=()=>{clearInterval(timerId);setHolat("tayyor");};
  const cur=NAFAS[bosqich];
  return(
    <div>
      <div style={{fontWeight:700,fontSize:14,color:PR,marginBottom:12}}>🫁 Nafas Mashqi (4-4-6)</div>
      <div style={{background:SU,borderRadius:16,padding:20,textAlign:"center",boxShadow:"0 1px 4px rgba(0,0,0,0.07)"}}>
        {holat==="tayyor"&&<div><div style={{fontSize:56,marginBottom:12}}>🫁</div><div style={{fontSize:14,color:MU,marginBottom:20,lineHeight:1.6}}><b>4</b> sek oling → <b>4</b> sek ushlab → <b>6</b> sek chiqaring</div><button onClick={boshlash} style={{padding:"13px 40px",borderRadius:25,border:"none",background:"linear-gradient(135deg,"+PR+","+AC+")",color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer"}}>▶ Boshlash</button></div>}
        {holat==="ishlaydi"&&<div><div style={{fontSize:12,color:MU,marginBottom:16}}>Sikl: {sikl+1}/3</div><div style={{width:120,height:120,borderRadius:"50%",background:cur.rang+"20",border:"4px solid "+cur.rang,margin:"0 auto 16px",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}><div style={{fontSize:42,fontWeight:900,color:cur.rang}}>{hisoblagich}</div><div style={{fontSize:11,color:cur.rang}}>sek</div></div><div style={{fontSize:18,fontWeight:700,color:cur.rang,marginBottom:20}}>{cur.emoji} {cur.nom}</div><button onClick={toxtatish} style={{padding:"10px 28px",borderRadius:20,border:"1px solid #E5E7EB",background:"transparent",color:MU,cursor:"pointer"}}>■ To'xtatish</button></div>}
        {holat==="tugadi"&&<div><div style={{fontSize:56,marginBottom:12}}>✅</div><div style={{fontSize:16,fontWeight:700,color:PR,marginBottom:20}}>Ajoyib! Bajardingiz!</div><button onClick={()=>setHolat("tayyor")} style={{padding:"12px 35px",borderRadius:20,border:"none",background:PR,color:"#fff",fontSize:14,fontWeight:700,cursor:"pointer"}}>🔄 Qayta</button></div>}
      </div>
    </div>
  );
}

function SuvTab(){
  const [stakan,setStakan]=useState(0);
  const maqsad=8;
  const foiz=Math.min(stakan/maqsad,1);
  return(
    <div>
      <div style={{fontWeight:700,fontSize:14,color:PR,marginBottom:12}}>💧 Kunlik Suv Hisoblagich</div>
      <div style={{background:SU,borderRadius:14,padding:16,marginBottom:14}}>
        <div style={{textAlign:"center",marginBottom:14}}>
          <div style={{width:100,height:100,borderRadius:"50%",background:"#0EA5E9",margin:"0 auto 12px",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
            <div style={{fontSize:36,fontWeight:900,color:"#fff"}}>{stakan}</div>
            <div style={{fontSize:11,color:"rgba(255,255,255,0.8)"}}>/ {maqsad}</div>
          </div>
          <div style={{background:"#E0F2FE",borderRadius:20,height:16,overflow:"hidden",marginBottom:8}}>
            <div style={{height:"100%",background:"#0EA5E9",borderRadius:20,width:(foiz*100)+"%",transition:"width 0.4s"}}/>
          </div>
          <div style={{fontSize:12,color:MU}}>{stakan*250}ml / {maqsad*250}ml</div>
        </div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap",justifyContent:"center",marginBottom:12}}>
          {Array.from({length:maqsad}).map((_,i)=>(
            <div key={i} onClick={()=>setStakan(i+1)} style={{width:38,height:46,borderRadius:9,border:"2px solid "+(i<stakan?"#0EA5E9":"#BAE6FD"),background:i<stakan?"#0EA5E9":"#F0F9FF",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
              <span style={{fontSize:18}}>{i<stakan?"💧":"○"}</span>
              <span style={{fontSize:9,color:i<stakan?"#fff":"#94A3B8"}}>{(i+1)*250}ml</span>
            </div>
          ))}
        </div>
        {stakan>=maqsad?<div style={{background:"#F0FDF4",border:"1px solid #BBF7D0",borderRadius:9,padding:"9px 12px",textAlign:"center",fontSize:12,color:"#065F46",fontWeight:600}}>✅ Bugungi suv maqsadingizga yetdingiz!</div>:<div style={{background:"#F0F9FF",border:"1px solid #BAE6FD",borderRadius:9,padding:"9px 12px",textAlign:"center",fontSize:12,color:"#0369A1"}}>Yana {maqsad-stakan} stakan qoldi</div>}
        <button onClick={()=>setStakan(0)} style={{marginTop:10,width:"100%",padding:"8px",borderRadius:8,border:"1px solid #E5E7EB",background:"transparent",color:MU,cursor:"pointer",fontSize:12}}>🔄 Yangi kun</button>
      </div>
    </div>
  );
}

function ProgressTab(){
  const [sel,setSel]=useState(0);
  const [weeks,setWeeks]=useState([
    {vazn:"",bel:"",energiya:3,uyqu:3,kayfiyat:3,izoh:""},
    {vazn:"",bel:"",energiya:3,uyqu:3,kayfiyat:3,izoh:""},
    {vazn:"",bel:"",energiya:3,uyqu:3,kayfiyat:3,izoh:""},
    {vazn:"",bel:"",energiya:3,uyqu:3,kayfiyat:3,izoh:""},
  ]);
  const upd=(k,v)=>setWeeks(w=>w.map((x,i)=>i===sel?{...x,[k]:v}:x));
  const w=weeks[sel];
  const inp2={width:"100%",padding:"9px 10px",borderRadius:8,border:"1.5px solid #E5E7EB",fontSize:14,color:CH,background:CR,outline:"none",boxSizing:"border-box"};
  return(
    <div>
      <div style={{fontWeight:700,fontSize:14,color:PR,marginBottom:12}}>📊 Haftalik Progress</div>
      <div style={{display:"flex",gap:6,marginBottom:14}}>
        {weeks.map((_,i)=>(
          <button key={i} onClick={()=>setSel(i)} style={{flex:1,padding:"9px 4px",borderRadius:10,border:"2px solid "+(sel===i?"#B45309":"#E5E7EB"),background:sel===i?"#B45309":SU,color:sel===i?"#fff":CH,cursor:"pointer",fontSize:11,fontWeight:sel===i?700:400}}>{i+1}-hafta</button>
        ))}
      </div>
      <div style={{background:SU,borderRadius:14,padding:14}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
          <div><div style={{fontSize:11,fontWeight:600,color:MU,marginBottom:4}}>⚖️ Vazn (kg)</div><input type="number" placeholder="82.5" value={w.vazn} onChange={e=>upd("vazn",e.target.value)} style={inp2}/></div>
          <div><div style={{fontSize:11,fontWeight:600,color:MU,marginBottom:4}}>📏 Bel (sm)</div><input type="number" placeholder="88" value={w.bel} onChange={e=>upd("bel",e.target.value)} style={inp2}/></div>
        </div>
        {[["energiya","⚡ Energiya"],["uyqu","😴 Uyqu sifati"],["kayfiyat","😊 Kayfiyat"]].map(([k,l])=>(
          <div key={k} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:"1px solid #F3F4F6"}}>
            <span style={{fontSize:13,color:CH}}>{l}</span>
            <div style={{display:"flex",gap:4}}>{[1,2,3,4,5].map(s=><span key={s} onClick={()=>upd(k,s)} style={{fontSize:20,cursor:"pointer",opacity:s<=w[k]?1:0.2}}>⭐</span>)}</div>
          </div>
        ))}
        <div style={{marginTop:10}}><div style={{fontSize:11,fontWeight:600,color:MU,marginBottom:4}}>📝 Izoh</div><textarea placeholder="Bu hafta qanday his qildingiz?..." value={w.izoh} onChange={e=>upd("izoh",e.target.value)} style={{...inp2,minHeight:65,resize:"vertical"}}/></div>
        {sel>0&&weeks[sel-1].vazn&&w.vazn&&<div style={{marginTop:10,background:parseFloat(w.vazn)<parseFloat(weeks[sel-1].vazn)?"#F0FDF4":"#FEF9C3",borderRadius:8,padding:"9px 12px",textAlign:"center",fontSize:13,fontWeight:700,color:parseFloat(w.vazn)<parseFloat(weeks[sel-1].vazn)?"#065F46":"#92400E"}}>{parseFloat(w.vazn)<parseFloat(weeks[sel-1].vazn)?"✅ "+(parseFloat(weeks[sel-1].vazn)-parseFloat(w.vazn)).toFixed(1)+" kg kamaydi!":"📌 "+(parseFloat(w.vazn)-parseFloat(weeks[sel-1].vazn)).toFixed(1)+" kg ortdi"}</div>}
      </div>
    </div>
  );
}

// To'lov modal
function TovModal({hafta, profil, onClose}){
  const [copied, setCopied] = useState(false);

  const sendToTelegram = async () => {
    const msg = `🆕 YANGI TO'LOV SO'ROVI\n\n👤 Ism: ${profil.ism}\n📱 Hafta: ${hafta+1}-hafta\n💰 Narx: ${NARX.toLocaleString()} so'm\n\n✅ To'lovni tasdiqlash uchun foydalanuvchiga javob bering.`;
    try {
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({chat_id: ADMIN_ID, text: msg})
      });
    } catch(e) {}
  };

  const handleTolov = () => {
    sendToTelegram();
    window.open(`https://t.me/soghlom_hayot_bot?start=tolov_hafta${hafta+1}_${profil.ism}`, "_blank");
    onClose();
  };

  return(
    <div style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.6)",zIndex:100,display:"flex",alignItems:"flex-end",justifyContent:"center"}}>
      <div style={{background:SU,borderRadius:"20px 20px 0 0",padding:24,width:"100%",maxWidth:480}}>
        <div style={{textAlign:"center",marginBottom:16}}>
          <div style={{fontSize:40,marginBottom:8}}>🔒</div>
          <div style={{fontWeight:800,fontSize:20,color:PR}}>{hafta+1}-hafta</div>
          <div style={{fontSize:13,color:MU,marginTop:4}}>Bu hafta uchun to'lov kerak</div>
        </div>

        <div style={{background:LI,borderRadius:12,padding:16,marginBottom:16}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
            <span style={{fontSize:14,color:CH}}>💰 Narx:</span>
            <span style={{fontSize:18,fontWeight:800,color:PR}}>{NARX.toLocaleString()} so'm</span>
          </div>
          <div style={{fontSize:12,color:MU}}>✅ To'liq hafta dasturi ochiladi</div>
          <div style={{fontSize:12,color:MU}}>✅ Ratsion, sport, suv, nafas</div>
        </div>

        <div style={{background:"#FFF3CD",borderRadius:12,padding:14,marginBottom:16,fontSize:13,color:"#856404"}}>
          <b>📋 To'lov tartibi:</b><br/>
          1. Telegram botga o'ting<br/>
          2. Payme/Click orqali to'lang<br/>
          3. Admin tasdiqlaydi → hafta ochiladi
        </div>

        <button onClick={handleTolov} style={{width:"100%",padding:"16px",borderRadius:14,border:"none",background:"linear-gradient(135deg,#0088cc,#0055aa)",color:"#fff",fontSize:16,fontWeight:700,cursor:"pointer",marginBottom:10,display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
          <span style={{fontSize:20}}>✈️</span> Telegram orqali to'lash
        </button>
        <button onClick={onClose} style={{width:"100%",padding:"12px",borderRadius:12,border:"1px solid #E5E7EB",background:"transparent",color:MU,fontSize:14,cursor:"pointer"}}>
          Bekor qilish
        </button>
      </div>
    </div>
  );
}

// Profil sahifasi
function ProfilSahifasi({onSave}){
  const [form,setForm]=useState({ism:"",jins:"Erkak",yosh:"",boy:"",vazn:"",bel:"",faollik:ACT_L[1],maqsad:"Ozish",oshqozon:false,diabet:false,uyqusizlik:false});
  const [err,setErr]=useState("");
  const inp={width:"100%",padding:"12px 14px",borderRadius:10,border:"1.5px solid #E5E7EB",fontSize:15,color:CH,background:CR,outline:"none",boxSizing:"border-box",marginBottom:10};
  const save=()=>{
    if(!form.ism){setErr("Ismingizni kiriting");return;}
    localStorage.setItem("soghlom_profil",JSON.stringify(form));
    onSave(form);
  };
  return(
    <div style={{minHeight:"100vh",background:CR,fontFamily:"system-ui,-apple-system,sans-serif"}}>
      <div style={{background:PR,padding:"30px 20px 20px",textAlign:"center"}}>
        <div style={{fontSize:40,marginBottom:8}}>🌿</div>
        <div style={{color:"#fff",fontWeight:800,fontSize:22}}>Sog'lom Hayot</div>
        <div style={{color:AC,fontSize:13,marginTop:4}}>Ma'lumotlaringizni kiriting</div>
      </div>
      <div style={{maxWidth:500,margin:"0 auto",padding:"18px 14px"}}>
        <div style={{background:SU,borderRadius:16,padding:"17px 15px",boxShadow:"0 2px 10px rgba(0,0,0,0.07)"}}>
          {err&&<div style={{background:"#FEF2F2",border:"1px solid #FCA5A5",borderRadius:9,padding:"9px 12px",color:DA,fontSize:13,marginBottom:12}}>{err}</div>}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            <div><div style={{fontSize:13,fontWeight:600,color:CH,marginBottom:5}}>Ism</div><input style={{...inp,marginBottom:0}} placeholder="Jasur" value={form.ism} onChange={e=>setForm(p=>({...p,ism:e.target.value}))}/></div>
            <div><div style={{fontSize:13,fontWeight:600,color:CH,marginBottom:5}}>Jins</div><select style={{...inp,marginBottom:0}} value={form.jins} onChange={e=>setForm(p=>({...p,jins:e.target.value}))}><option>Erkak</option><option>Ayol</option></select></div>
          </div>
          <div style={{height:10}}/>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
            <div><div style={{fontSize:13,fontWeight:600,color:CH,marginBottom:5}}>Yosh</div><input style={{...inp,marginBottom:0}} type="number" placeholder="28" value={form.yosh} onChange={e=>setForm(p=>({...p,yosh:e.target.value}))}/></div>
            <div><div style={{fontSize:13,fontWeight:600,color:CH,marginBottom:5}}>Boy (sm)</div><input style={{...inp,marginBottom:0}} type="number" placeholder="175" value={form.boy} onChange={e=>setForm(p=>({...p,boy:e.target.value}))}/></div>
            <div><div style={{fontSize:13,fontWeight:600,color:CH,marginBottom:5}}>Vazn (kg)</div><input style={{...inp,marginBottom:0}} type="number" placeholder="75" value={form.vazn} onChange={e=>setForm(p=>({...p,vazn:e.target.value}))}/></div>
          </div>
          <div style={{height:10}}/>
          <div><div style={{fontSize:13,fontWeight:600,color:CH,marginBottom:5}}>Bel aylanasi (sm)</div><input style={inp} type="number" placeholder="88" value={form.bel} onChange={e=>setForm(p=>({...p,bel:e.target.value}))}/></div>
          <div style={{fontSize:13,fontWeight:600,color:CH,marginBottom:8}}>Maqsad</div>
          <div style={{display:"flex",gap:7,flexWrap:"wrap",marginBottom:14}}>
            {GOALS.map(g=><button key={g} onClick={()=>setForm(p=>({...p,maqsad:g}))} style={{padding:"8px 14px",borderRadius:20,border:"2px solid "+(form.maqsad===g?PR:"#E5E7EB"),background:form.maqsad===g?PR:SU,color:form.maqsad===g?"#fff":CH,cursor:"pointer",fontSize:13}}>{g}</button>)}
          </div>
          <div style={{fontSize:13,fontWeight:600,color:CH,marginBottom:8}}>Faollik darajasi</div>
          {ACT_L.map(a=><button key={a} onClick={()=>setForm(p=>({...p,faollik:a}))} style={{display:"block",width:"100%",marginBottom:6,padding:"9px 13px",borderRadius:9,border:"2px solid "+(form.faollik===a?PR:"#E5E7EB"),background:form.faollik===a?PR:SU,color:form.faollik===a?"#fff":CH,cursor:"pointer",fontSize:13,textAlign:"left"}}>{a}</button>)}
          <div style={{fontSize:13,fontWeight:600,color:PR,marginBottom:8,marginTop:4}}>Muammolar bormi?</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7,marginBottom:16}}>
            {[["oshqozon","🫁 Oshqozon"],["diabet","🩸 Diabet"],["uyqusizlik","😴 Uyqusizlik"]].map(([k,l])=>(
              <button key={k} onClick={()=>setForm(p=>({...p,[k]:!p[k]}))} style={{display:"flex",alignItems:"center",gap:6,padding:"9px 10px",borderRadius:9,border:"2px solid "+(form[k]?AC:"#E5E7EB"),background:form[k]?LI:SU,cursor:"pointer",fontSize:12,color:form[k]?PR:CH}}>
                <span>{form[k]?"✓":"○"}</span>{l}
              </button>
            ))}
          </div>
          <button onClick={save} style={{width:"100%",padding:"14px",borderRadius:13,border:"none",background:"linear-gradient(135deg,"+PR+","+AC+")",color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer"}}>
            ✅ Davom etish
          </button>
        </div>
      </div>
    </div>
  );
}

export default function App(){
  const [profile,setProfile]=useState(null);
  const [loading,setLoading]=useState(true);
  const [hafta,setHafta]=useState(0);
  const [tab,setTab]=useState("ratsion");
  const [maslahatIdx,setMaslahatIdx]=useState(0);
  const [oshqozon,setOshqozon]=useState(false);
  const [ochikHaftalar,setOchikHaftalar]=useState([]);
  const [tovModal,setTovModal]=useState(null);

  useEffect(()=>{
    const saved=localStorage.getItem("soghlom_profil");
    if(saved){
      const p=JSON.parse(saved);
      setProfile(p);
      setOshqozon(p.oshqozon||false);
    }
    const ochik=localStorage.getItem("ochik_haftalar");
    if(ochik) setOchikHaftalar(JSON.parse(ochik));
    setLoading(false);
  },[]);

  const haftaOch=(i)=>{
    const yangi=[...ochikHaftalar,i];
    setOchikHaftalar(yangi);
    localStorage.setItem("ochik_haftalar",JSON.stringify(yangi));
  };

  const handleSave=(p)=>{
    setProfile(p);
    setOshqozon(p.oshqozon||false);
  };

  const handleReset=()=>{
    localStorage.removeItem("soghlom_profil");
    localStorage.removeItem("ochik_haftalar");
    setProfile(null);
    setOchikHaftalar([]);
  };

  if(loading) return(
    <div style={{minHeight:"100vh",background:CR,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:16}}>
      <div style={{fontSize:48}}>🌿</div>
      <div style={{fontSize:16,color:PR,fontWeight:700}}>Yuklanmoqda...</div>
    </div>
  );

  if(!profile) return <ProfilSahifasi onSave={handleSave}/>;

  const HAFTA_RANGLARI=[PR,"#1D4ED8","#7C3AED","#B45309"];
  const r=RATSIONLAR[hafta];
  const isOchiq=ochikHaftalar.includes(hafta);

  return(
    <div style={{minHeight:"100vh",background:CR,fontFamily:"system-ui,-apple-system,sans-serif"}}>
      {tovModal!==null&&<TovModal hafta={tovModal} profil={profile} onClose={()=>setTovModal(null)}/>}

      <div style={{background:r.rang,padding:"14px 18px",position:"sticky",top:0,zIndex:10}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontSize:22}}>🌿</span>
            <div>
              <div style={{color:"#fff",fontWeight:700,fontSize:16}}>Sog'lom Hayot</div>
              <div style={{color:"rgba(255,255,255,0.75)",fontSize:11}}>Salom, {profile.ism}!</div>
            </div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <div style={{background:"rgba(255,255,255,0.15)",borderRadius:20,padding:"4px 8px",display:"flex",alignItems:"center",gap:5,cursor:"pointer"}} onClick={()=>setOshqozon(o=>!o)}>
              <div style={{width:24,height:14,borderRadius:7,background:oshqozon?"#EF4444":"rgba(255,255,255,0.4)",position:"relative"}}>
                <div style={{position:"absolute",width:10,height:10,borderRadius:5,background:"#fff",top:2,left:oshqozon?12:2,transition:"left 0.2s"}}/>
              </div>
              <span style={{color:"rgba(255,255,255,0.9)",fontSize:10}}>Oshqozon</span>
            </div>
            <button onClick={handleReset} style={{background:"rgba(255,255,255,0.15)",border:"none",borderRadius:8,padding:"6px 10px",color:"#fff",fontSize:11,cursor:"pointer"}}>Chiqish</button>
          </div>
        </div>
      </div>

      <div style={{maxWidth:680,margin:"0 auto",padding:"16px 14px"}}>
        <div style={{background:"linear-gradient(135deg,"+PR+",#2D6A4F)",borderRadius:14,padding:"14px 16px",marginBottom:14,cursor:"pointer"}} onClick={()=>setMaslahatIdx(i=>(i+1)%MASLAHATLAR.length)}>
          <div style={{color:"rgba(255,255,255,0.6)",fontSize:10,fontWeight:600,marginBottom:6}}>💡 KUNLIK MASLAHAT</div>
          <div style={{fontSize:22,marginBottom:6}}>{MASLAHATLAR[maslahatIdx].emoji}</div>
          <div style={{color:"#fff",fontSize:13,lineHeight:1.6}}>{MASLAHATLAR[maslahatIdx].matn}</div>
        </div>

        {/* Hafta tanlash - qulf bilan */}
        <div style={{marginBottom:14}}>
          <div style={{fontSize:12,color:MU,marginBottom:8,fontWeight:600}}>📅 Hafta tanlang:</div>
          <div style={{display:"flex",gap:6}}>
            {RATSIONLAR.map((x,i)=>{
              const ochiq=ochikHaftalar.includes(i);
              return(
                <button key={i} onClick={()=>{
                  if(ochiq){setHafta(i);}
                  else{setTovModal(i);}
                }} style={{flex:1,padding:"10px 4px",borderRadius:11,border:"2px solid "+(hafta===i?HAFTA_RANGLARI[i]:"#E5E7EB"),background:hafta===i?HAFTA_RANGLARI[i]:SU,color:hafta===i?"#fff":CH,cursor:"pointer",textAlign:"center",position:"relative"}}>
                  {!ochiq&&<div style={{position:"absolute",top:-6,right:-4,background:"#EF4444",borderRadius:"50%",width:18,height:18,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10}}>🔒</div>}
                  <div style={{fontSize:14,fontWeight:800}}>{i+1}</div>
                  <div style={{fontSize:9,marginTop:2,color:hafta===i?"rgba(255,255,255,0.8)":MU}}>{ochiq?"Ochiq":"Hafta"}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Hafta banner yoki qulf ekrani */}
        {!isOchiq ? (
          <div style={{background:"linear-gradient(135deg,#1a1a2e,#16213e)",borderRadius:16,padding:24,textAlign:"center",marginBottom:14}}>
            <div style={{fontSize:48,marginBottom:12}}>🔒</div>
            <div style={{color:"#fff",fontWeight:800,fontSize:18,marginBottom:8}}>{hafta+1}-hafta yopiq</div>
            <div style={{color:"rgba(255,255,255,0.7)",fontSize:13,marginBottom:20}}>Bu haftani ochish uchun to'lov qiling</div>
            <div style={{color:"#FFD700",fontWeight:800,fontSize:24,marginBottom:20}}>{NARX.toLocaleString()} so'm</div>
            <button onClick={()=>setTovModal(hafta)} style={{padding:"14px 32px",borderRadius:14,border:"none",background:"linear-gradient(135deg,#0088cc,#0055aa)",color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer",display:"inline-flex",alignItems:"center",gap:8}}>
              ✈️ Telegram orqali to'lash
            </button>
          </div>
        ) : (
          <>
            <div style={{background:"linear-gradient(135deg,"+r.rang+","+r.rang+"CC)",borderRadius:14,padding:"14px 16px",marginBottom:14}}>
              <div style={{color:"#fff",fontWeight:800,fontSize:15,marginBottom:4}}>{r.nom}</div>
              <div style={{color:"rgba(255,255,255,0.85)",fontSize:12}}>{r.tavsif}</div>
            </div>

            <div style={{display:"flex",gap:4,marginBottom:12,overflowX:"auto",paddingBottom:2}}>
              {[["ratsion","🍽️"],["sport","🏋️"],["suv","💧"],["nafas","🫁"],["progress","📊"]].map(([x,l])=>(
                <button key={x} onClick={()=>setTab(x)} style={{minWidth:46,padding:"9px 8px",borderRadius:11,border:"none",background:tab===x?r.rang:SU,color:tab===x?"#fff":MU,cursor:"pointer",fontSize:16,boxShadow:"0 1px 3px rgba(0,0,0,0.07)",flexShrink:0}}>{l}</button>
              ))}
            </div>

            {tab==="ratsion"&&<div>{r.bloklar.map((b,i)=><RatsionBlok key={i} b={b} oshqozon={oshqozon}/>)}</div>}
            {tab==="sport"&&<SportTab/>}
            {tab==="suv"&&<SuvTab/>}
            {tab==="nafas"&&<NafasTab/>}
            {tab==="progress"&&<ProgressTab/>}
          </>
        )}
      </div>
    </div>
  );
}
