import { useState, useEffect, useRef } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

// ── FIREBASE CONFIG ──────────────────────────────────────────────────────────
const firebaseConfig = {
  apiKey: "AIzaSyDW4tDCId51RaoROBuKEfKLaLm7PLACEHOLDER",
  authDomain: "soghlom-hayot.firebaseapp.com",
  projectId: "soghlom-hayot",
  storageBucket: "soghlom-hayot.firebasestorage.app",
  messagingSenderId: "321253021051",
  appId: "1:321253021051:web:7d0ae7663973c1d980d9de",
  measurementId: "G-DSLDGCZ75H"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const PR="#1B4332",AC="#52B788",AM="#E9A825",CR="#F8F4EF",CH="#1C1C1E",MU="#6B7280",SU="#FFFFFF",LI="#E8F5EE",DA="#DC2626";
const GOALS=["Ozish","Semirish","Vazn saqlash","Mushak yig'ish","Sog'lomlashtirish"];
const ACT_L=["Kam harakatli","O'rtacha faol","Faol","Juda faol"];
const DAYS=["Dushanba","Seshanba","Chorshanba","Payshanba","Juma","Shanba","Yakshanba"];

// ── RATSION MA'LUMOTLARI ──────────────────────────────────────────────────────
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
    {vaqt:"07:10",nom:"1-ovqat + Vitaminlar",tur:"ovqat",salat:["Bodring — 2 ta","Rukkola — 1 voq","Salat bargi — 1 voq","Avokado — 1 ta","Zaytun moyi — 2 osh qoshiq","Dengiz tuzi"],oqsil:"Yogli baliq — 180-200g\nYoki 6 ta tuxumning FAQAT OQI",qoshimchalar:["💊 D3+K2 — 1 ta (7 kun)","💊 Omega-3 — 1 ta","💊 CoQ10 — 1 ta","💊 Rux 22mg — 1 ta"],keyin:"Sekin yurish — 10-15 daqiqa"},
    {vaqt:"13:30",nom:"Tushki ichimlik",tur:"suv",bandlar:[{emoji:"💧",text:"Suv — 300 ml + rastoropsha + imbir"}]},
    {vaqt:"13:40",nom:"2-ovqat",tur:"ovqat",salat:["Pekin karami — yarim bosh","Bodring — 2 ta","Kinza — 1 voq","Avokado — 1 ta","Zaytun moyi — 2 osh qoshiq","Dengiz tuzi"],oqsil:"Indeyka — 300g yoki baliq — 300g",keyin:"Sekin yurish — 10-15 daqiqa"},
    {vaqt:"20:30",nom:"Kechki ritual",tur:"kechki",bandlar:[{emoji:"🚶",text:"Sayr — 30 daqiqa"},{emoji:"💧",text:"Suv — 200-300 ml"},{emoji:"💊",text:"Magniy glitsinat — 300-400 mg"},{emoji:"🌙",text:"Uyqu — 22:00"}]},
   ]},
  {hafta:3,nom:"3-hafta — To'liq rejim",rang:"#7C3AED",tavsif:"Berberin, xrom va barcha vitaminlar.",
   bloklar:[
    {vaqt:"06:30",nom:"Ertalabki start",tur:"suv",bandlar:[{emoji:"💧",text:"Iliq suv — 500 ml"},{emoji:"🌿",text:"Rastoropsha — 1 paket"},{emoji:"🟡",text:"Kurkuma — 1 choy qoshiq"}]},
    {vaqt:"07:00",nom:"Kichik ichimlik",tur:"suv",bandlar:[{emoji:"💧",text:"Iliq suv — 300 ml"},{emoji:"🍎",text:"Olma sirka — 1 choy qoshiq (oshqozon bo'lmasa)"},{emoji:"💊",text:"Xrom pikolinat 200mkg + Berberin 500mg"}]},
    {vaqt:"07:30",nom:"1-ovqat + Vitaminlar",tur:"ovqat",salat:["Bodring — 2 ta","Rukkola — 1 voq","Avokado — 1 ta","Zaytun moyi — 2 osh qoshiq","Dengiz tuzi"],oqsil:"Yogli baliq — 180-200g\nYoki 5 ta tuxumning FAQAT OQI",qoshimchalar:["💊 D3+K2 — 1 ta (7 kun)","💊 Omega-3 — 1 ta","💊 CoQ10 — 1 ta","💊 Rux 22mg — 1 ta"],keyin:"Sekin yurish — 10-15 daqiqa"},
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

// ── SPORT DASTURI ─────────────────────────────────────────────────────────────
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
        {(b.bandlar||[]).filter(x=>!(oshqozon&&x.text.includes("sirka"))).map((x,k,arr)=>(
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
                    <div style={{fontWeight:700,fontSize:11,color:tc,marginBottom:8,textTransform:"uppercase"}}>📋 QANDAY BAJARISH</div>
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
                    <div style={{marginTop:10,background:tc+"18",borderRadius:8,padding:"8px 11px",display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:16}}>🎯</span><span style={{fontSize:13,fontWeight:700,color:tc}}>{m.set}</span></div>
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
  const timerRef=useRef(null);
  const NAFAS=[{nom:"Nafas oling",davom:4,rang:"#0EA5E9",emoji:"🌬️"},{nom:"Ushlab turing",davom:4,rang:"#7C3AED",emoji:"🔒"},{nom:"Chiqaring",davom:6,rang:"#10B981",emoji:"💨"}];
  const boshlash=()=>{
    setHolat("ishlaydi");setBosqich(0);setHisoblagich(NAFAS[0].davom);setSikl(0);
    let ph=0,cn=NAFAS[0].davom,cl=0;
    timerRef.current=setInterval(()=>{
      cn--;
      if(cn<=0){ph=(ph+1)%3;if(ph===0)cl++;if(cl>=3){clearInterval(timerRef.current);setHolat("tugadi");return;}cn=NAFAS[ph].davom;}
      setBosqich(ph);setHisoblagich(cn);setSikl(cl);
    },1000);
  };
  const toxtatish=()=>{clearInterval(timerRef.current);setHolat("tayyor");};
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
      <div style={{background:SU,borderRadius:14,padding:16,marginBottom:14,boxShadow:"0 1px 4px rgba(0,0,0,0.06)"}}>
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
      <div style={{background:SU,borderRadius:14,padding:14,boxShadow:"0 1px 4px rgba(0,0,0,0.06)"}}>
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

const MASLAHATLAR=[
  {emoji:"🌅",matn:"Ertalab birinchi ish — telefon emas, 500ml iliq suv iching."},
  {emoji:"🚶",matn:"Ovqatdan keyin 10-15 daqiqa sekin yurish — eng oddiy, eng kuchli dori."},
  {emoji:"😴",matn:"22:00 da uxlash — o'sish gormoni shu vaqtda eng ko'p chiqadi."},
  {emoji:"🌿",matn:"Rastoropsha jigarni kundalik toksinlardan tozalaydi."},
  {emoji:"💊",matn:"Magniy 300 dan ortiq ferment reaktsiyasida ishtirok etadi."},
  {emoji:"🫁",matn:"4-4-6 nafas: stressni 1 daqiqada pasaytiradi."},
  {emoji:"💧",matn:"Miyangiz 75% suvdan iborat — har soatda suv iching."},
];

// ── PHONE OTP LOGIN ──────────────────────────────────────────────────────────
function PhoneLogin({ onSuccess }) {
  const [phone, setPhone] = useState("+998");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("phone"); // phone | otp
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const confirmRef = useRef(null);

  const sendOtp = async () => {
    setLoading(true); setErr("");
    try {
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
          size: "invisible",
          callback: () => {},
        });
      }
      const confirmation = await signInWithPhoneNumber(auth, phone, window.recaptchaVerifier);
      confirmRef.current = confirmation;
      setStep("otp");
    } catch (e) {
      setErr("Telefon raqam noto'g'ri yoki xatolik yuz berdi");
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    }
    setLoading(false);
  };

  const verifyOtp = async () => {
    setLoading(true); setErr("");
    try {
      const result = await confirmRef.current.confirm(otp);
      onSuccess(result.user);
    } catch (e) {
      setErr("Kod noto'g'ri, qayta urinib ko'ring");
    }
    setLoading(false);
  };

  const inp = {
    width: "100%", padding: "13px 14px", borderRadius: 10,
    border: "1.5px solid #E5E7EB", fontSize: 16, color: CH,
    background: CR, outline: "none", boxSizing: "border-box", marginBottom: 10
  };

  return (
    <div style={{ minHeight: "100vh", background: CR, fontFamily: "system-ui,-apple-system,sans-serif" }}>
      <div style={{ background: PR, padding: "40px 20px 30px", textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 10 }}>🌿</div>
        <div style={{ color: "#fff", fontWeight: 800, fontSize: 24 }}>Sog'lom Hayot</div>
        <div style={{ color: AC, fontSize: 13, marginTop: 6 }}>30 kunlik sog'lom hayot dasturi</div>
      </div>

      <div style={{ maxWidth: 400, margin: "0 auto", padding: "30px 20px" }}>
        <div style={{ background: SU, borderRadius: 18, padding: 24, boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>

          {step === "phone" && (
            <>
              <div style={{ fontWeight: 800, fontSize: 20, color: PR, marginBottom: 6, textAlign: "center" }}>Kirish</div>
              <div style={{ fontSize: 13, color: MU, textAlign: "center", marginBottom: 20 }}>
                Telefon raqamingizga SMS kod yuboramiz
              </div>
              {err && (
                <div style={{ background: "#FEF2F2", border: "1px solid #FCA5A5", borderRadius: 9, padding: "10px 13px", color: DA, fontSize: 13, marginBottom: 12 }}>
                  {err}
                </div>
              )}
              <div style={{ fontSize: 13, fontWeight: 600, color: CH, marginBottom: 6 }}>📱 Telefon raqam</div>
              <input
                style={inp}
                type="tel"
                placeholder="+998 90 123 45 67"
                value={phone}
                onChange={e => setPhone(e.target.value)}
              />
              <div id="recaptcha-container" />
              <button
                onClick={sendOtp}
                disabled={loading}
                style={{
                  width: "100%", padding: "14px", borderRadius: 12, border: "none",
                  background: "linear-gradient(135deg," + PR + "," + AC + ")",
                  color: "#fff", fontSize: 16, fontWeight: 700, cursor: "pointer",
                  boxShadow: "0 4px 14px rgba(27,67,50,0.3)"
                }}
              >
                {loading ? "Yuborilmoqda..." : "📨 SMS Kod Yuborish"}
              </button>
            </>
          )}

          {step === "otp" && (
            <>
              <div style={{ fontWeight: 800, fontSize: 20, color: PR, marginBottom: 6, textAlign: "center" }}>SMS Kodni Kiriting</div>
              <div style={{ fontSize: 13, color: MU, textAlign: "center", marginBottom: 20 }}>
                {phone} raqamiga 6 raqamli kod yuborildi
              </div>
              {err && (
                <div style={{ background: "#FEF2F2", border: "1px solid #FCA5A5", borderRadius: 9, padding: "10px 13px", color: DA, fontSize: 13, marginBottom: 12 }}>
                  {err}
                </div>
              )}
              <input
                style={{ ...inp, fontSize: 24, textAlign: "center", letterSpacing: 8, fontWeight: 700 }}
                type="number"
                placeholder="123456"
                value={otp}
                onChange={e => setOtp(e.target.value)}
                maxLength={6}
              />
              <button
                onClick={verifyOtp}
                disabled={loading || otp.length < 6}
                style={{
                  width: "100%", padding: "14px", borderRadius: 12, border: "none",
                  background: otp.length >= 6 ? "linear-gradient(135deg," + PR + "," + AC + ")" : "#E5E7EB",
                  color: otp.length >= 6 ? "#fff" : MU, fontSize: 16, fontWeight: 700,
                  cursor: otp.length >= 6 ? "pointer" : "default",
                  marginBottom: 10
                }}
              >
                {loading ? "Tekshirilmoqda..." : "✅ Tasdiqlash"}
              </button>
              <button
                onClick={() => { setStep("phone"); setErr(""); setOtp(""); }}
                style={{ width: "100%", padding: "10px", borderRadius: 10, border: "1px solid #E5E7EB", background: "transparent", color: MU, fontSize: 14, cursor: "pointer" }}
              >
                ← Orqaga
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ── ASOSIY ILOVA ──────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("login"); // login | profile | main
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [authErr, setAuthErr] = useState("");
  const [appLoading, setAppLoading] = useState(true);

  const [profForm, setProfForm] = useState({
    ism: "", jins: "Erkak", yosh: "", boy: "", vazn: "", bel: "",
    faollik: ACT_L[1], maqsad: "Ozish",
    oshqozon: false, diabet: false, uyqusizlik: false,
  });

  const [hafta, setHafta] = useState(0);
  const [tab, setTab] = useState("ratsion");
  const [maslahatIdx, setMaslahatIdx] = useState(0);
  const [oshqozon, setOshqozon] = useState(false);

  const inp = {
    width: "100%", padding: "12px 14px", borderRadius: 10,
    border: "1.5px solid #E5E7EB", fontSize: 15, color: CH,
    background: CR, outline: "none", boxSizing: "border-box", marginBottom: 10
  };

  // Auth state listener
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (u) {
        setUser(u);
        const snap = await getDoc(doc(db, "users", u.uid));
        if (snap.exists()) {
          setProfile(snap.data());
          setOshqozon(snap.data().oshqozon || false);
          setScreen("main");
        } else {
          setScreen("profile");
        }
      } else {
        setUser(null);
        setProfile(null);
        setScreen("login");
      }
      setAppLoading(false);
    });
    return () => unsub();
  }, []);

  const handlePhoneSuccess = async (firebaseUser) => {
    setUser(firebaseUser);
    const snap = await getDoc(doc(db, "users", firebaseUser.uid));
    if (snap.exists()) {
      setProfile(snap.data());
      setOshqozon(snap.data().oshqozon || false);
      setScreen("main");
    } else {
      setScreen("profile");
    }
  };

  const handleSaveProfile = async () => {
    if (!profForm.ism) { setAuthErr("Ismingizni kiriting"); return; }
    setAuthLoading(true);
    try {
      await setDoc(doc(db, "users", user.uid), {
        ...profForm, uid: user.uid,
        phone: user.phoneNumber,
        createdAt: new Date().toISOString()
      });
      setProfile(profForm);
      setOshqozon(profForm.oshqozon);
      setScreen("main");
    } catch (e) { setAuthErr("Saqlashda xatolik"); }
    setAuthLoading(false);
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null); setProfile(null); setScreen("login");
  };

  const HAFTA_RANGLARI = [PR, "#1D4ED8", "#7C3AED", "#B45309"];

  if (appLoading) return (
    <div style={{ minHeight: "100vh", background: CR, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16 }}>
      <div style={{ fontSize: 48 }}>🌿</div>
      <div style={{ fontSize: 16, color: PR, fontWeight: 700 }}>Yuklanmoqda...</div>
    </div>
  );

  if (screen === "login") return <PhoneLogin onSuccess={handlePhoneSuccess} />;

  // ── PROFIL TO'LDIRISH ──
  if (screen === "profile") return (
    <div style={{ minHeight: "100vh", background: CR, fontFamily: "system-ui,-apple-system,sans-serif" }}>
      <div style={{ background: PR, padding: "16px 18px" }}>
        <div style={{ color: "#fff", fontWeight: 700, fontSize: 17 }}>🌿 Ma'lumotlaringiz</div>
        <div style={{ color: AC, fontSize: 12, marginTop: 2 }}>Shaxsiy dastur tayyorlash uchun</div>
      </div>
      <div style={{ maxWidth: 500, margin: "0 auto", padding: "18px 14px" }}>
        <div style={{ background: SU, borderRadius: 16, padding: "17px 15px", boxShadow: "0 2px 10px rgba(0,0,0,0.07)" }}>
          {authErr && <div style={{ background: "#FEF2F2", border: "1px solid #FCA5A5", borderRadius: 9, padding: "9px 12px", color: DA, fontSize: 13, marginBottom: 12 }}>{authErr}</div>}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div><div style={{ fontSize: 13, fontWeight: 600, color: CH, marginBottom: 5 }}>Ism</div><input style={{ ...inp, marginBottom: 0 }} placeholder="Jasur" value={profForm.ism} onChange={e => setProfForm(p => ({ ...p, ism: e.target.value }))} /></div>
            <div><div style={{ fontSize: 13, fontWeight: 600, color: CH, marginBottom: 5 }}>Jins</div><select style={{ ...inp, marginBottom: 0 }} value={profForm.jins} onChange={e => setProfForm(p => ({ ...p, jins: e.target.value }))}><option>Erkak</option><option>Ayol</option></select></div>
          </div>
          <div style={{ height: 10 }} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
            <div><div style={{ fontSize: 13, fontWeight: 600, color: CH, marginBottom: 5 }}>Yosh</div><input style={{ ...inp, marginBottom: 0 }} type="number" placeholder="28" value={profForm.yosh} onChange={e => setProfForm(p => ({ ...p, yosh: e.target.value }))} /></div>
            <div><div style={{ fontSize: 13, fontWeight: 600, color: CH, marginBottom: 5 }}>Boy (sm)</div><input style={{ ...inp, marginBottom: 0 }} type="number" placeholder="175" value={profForm.boy} onChange={e => setProfForm(p => ({ ...p, boy: e.target.value }))} /></div>
            <div><div style={{ fontSize: 13, fontWeight: 600, color: CH, marginBottom: 5 }}>Vazn (kg)</div><input style={{ ...inp, marginBottom: 0 }} type="number" placeholder="75" value={profForm.vazn} onChange={e => setProfForm(p => ({ ...p, vazn: e.target.value }))} /></div>
          </div>
          <div style={{ height: 10 }} />
          <div><div style={{ fontSize: 13, fontWeight: 600, color: CH, marginBottom: 5 }}>Bel aylanasi (sm)</div><input style={inp} type="number" placeholder="88" value={profForm.bel} onChange={e => setProfForm(p => ({ ...p, bel: e.target.value }))} /></div>
          <div style={{ fontSize: 13, fontWeight: 600, color: CH, marginBottom: 8 }}>Maqsad</div>
          <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginBottom: 14 }}>
            {GOALS.map(g => <button key={g} onClick={() => setProfForm(p => ({ ...p, maqsad: g }))} style={{ padding: "8px 14px", borderRadius: 20, border: "2px solid " + (profForm.maqsad === g ? PR : "#E5E7EB"), background: profForm.maqsad === g ? PR : SU, color: profForm.maqsad === g ? "#fff" : CH, cursor: "pointer", fontSize: 13, fontWeight: profForm.maqsad === g ? 700 : 400 }}>{g}</button>)}
          </div>
          <div style={{ fontSize: 13, fontWeight: 600, color: CH, marginBottom: 8 }}>Faollik darajasi</div>
          {ACT_L.map(a => <button key={a} onClick={() => setProfForm(p => ({ ...p, faollik: a }))} style={{ display: "block", width: "100%", marginBottom: 6, padding: "9px 13px", borderRadius: 9, border: "2px solid " + (profForm.faollik === a ? PR : "#E5E7EB"), background: profForm.faollik === a ? PR : SU, color: profForm.faollik === a ? "#fff" : CH, cursor: "pointer", fontSize: 13, textAlign: "left", fontWeight: profForm.faollik === a ? 700 : 400 }}>{a}</button>)}
          <div style={{ fontSize: 13, fontWeight: 600, color: PR, marginBottom: 8, marginTop: 4 }}>Muammolar bormi?</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7, marginBottom: 16 }}>
            {[["oshqozon", "🫁 Oshqozon"], ["diabet", "🩸 Qandli diabet"], ["uyqusizlik", "😴 Uyqusizlik"]].map(([k, l]) => (
              <button key={k} onClick={() => setProfForm(p => ({ ...p, [k]: !p[k] }))} style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 10px", borderRadius: 9, border: "2px solid " + (profForm[k] ? AC : "#E5E7EB"), background: profForm[k] ? LI : SU, cursor: "pointer", fontSize: 12, fontWeight: profForm[k] ? 700 : 400, color: profForm[k] ? PR : CH }}>
                <span>{profForm[k] ? "✓" : "○"}</span>{l}
              </button>
            ))}
          </div>
          <button onClick={handleSaveProfile} disabled={authLoading} style={{ width: "100%", padding: "14px", borderRadius: 13, border: "none", background: "linear-gradient(135deg," + PR + "," + AC + ")", color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 14px rgba(27,67,50,0.35)" }}>
            {authLoading ? "Saqlanmoqda..." : "✅ Dasturni boshlash"}
          </button>
        </div>
      </div>
    </div>
  );

  // ── ASOSIY EKRAN ──
  const r = RATSIONLAR[hafta];
  return (
    <div style={{ minHeight: "100vh", background: CR, fontFamily: "system-ui,-apple-system,sans-serif" }}>
      <div style={{ background: r.rang, padding: "14px 18px", position: "sticky", top: 0, zIndex: 10, transition: "background 0.3s" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 22 }}>🌿</span>
            <div>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>Sog'lom Hayot</div>
              <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 11 }}>{profile?.ism ? "Salom, " + profile.ism + "!" : "30 kunlik dastur"}</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 20, padding: "4px 8px", display: "flex", alignItems: "center", gap: 5, cursor: "pointer" }} onClick={() => setOshqozon(o => !o)}>
              <div style={{ width: 24, height: 14, borderRadius: 7, background: oshqozon ? "#EF4444" : "rgba(255,255,255,0.4)", position: "relative" }}>
                <div style={{ position: "absolute", width: 10, height: 10, borderRadius: 5, background: "#fff", top: 2, left: oshqozon ? 12 : 2, transition: "left 0.2s" }} />
              </div>
              <span style={{ color: "rgba(255,255,255,0.9)", fontSize: 10 }}>Oshqozon</span>
            </div>
            <button onClick={handleLogout} style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 8, padding: "6px 10px", color: "#fff", fontSize: 11, cursor: "pointer" }}>Chiqish</button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "16px 14px" }}>
        <div style={{ background: "linear-gradient(135deg," + PR + ",#2D6A4F)", borderRadius: 14, padding: "14px 16px", marginBottom: 14, cursor: "pointer" }} onClick={() => setMaslahatIdx(i => (i + 1) % MASLAHATLAR.length)}>
          <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 10, fontWeight: 600, marginBottom: 6 }}>💡 KUNLIK MASLAHAT</div>
          <div style={{ fontSize: 22, marginBottom: 6 }}>{MASLAHATLAR[maslahatIdx].emoji}</div>
          <div style={{ color: "#fff", fontSize: 13, lineHeight: 1.6 }}>{MASLAHATLAR[maslahatIdx].matn}</div>
        </div>

        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 12, color: MU, marginBottom: 8, fontWeight: 600 }}>📅 Hafta tanlang:</div>
          <div style={{ display: "flex", gap: 6 }}>
            {RATSIONLAR.map((x, i) => (
              <button key={i} onClick={() => setHafta(i)} style={{ flex: 1, padding: "10px 4px", borderRadius: 11, border: "2px solid " + (hafta === i ? HAFTA_RANGLARI[i] : "#E5E7EB"), background: hafta === i ? HAFTA_RANGLARI[i] : SU, color: hafta === i ? "#fff" : CH, cursor: "pointer", textAlign: "center" }}>
                <div style={{ fontSize: 14, fontWeight: 800 }}>{i + 1}</div>
                <div style={{ fontSize: 9, marginTop: 2, color: hafta === i ? "rgba(255,255,255,0.8)" : MU }}>Hafta</div>
              </button>
            ))}
          </div>
        </div>

        <div style={{ background: "linear-gradient(135deg," + r.rang + "," + r.rang + "CC)", borderRadius: 14, padding: "14px 16px", marginBottom: 14 }}>
          <div style={{ color: "#fff", fontWeight: 800, fontSize: 15, marginBottom: 4 }}>{r.nom}</div>
          <div style={{ color: "rgba(255,255,255,0.85)", fontSize: 12 }}>{r.tavsif}</div>
        </div>

        <div style={{ display: "flex", gap: 4, marginBottom: 12, overflowX: "auto", paddingBottom: 2 }}>
          {[["ratsion", "🍽️"], ["sport", "🏋️"], ["suv", "💧"], ["nafas", "🫁"], ["progress", "📊"]].map(([x, l]) => (
            <button key={x} onClick={() => setTab(x)} style={{ minWidth: 46, padding: "9px 8px", borderRadius: 11, border: "none", background: tab === x ? r.rang : SU, color: tab === x ? "#fff" : MU, cursor: "pointer", fontSize: 16, fontWeight: tab === x ? 700 : 400, boxShadow: "0 1px 3px rgba(0,0,0,0.07)", flexShrink: 0 }}>
              {l}
            </button>
          ))}
        </div>

        {tab === "ratsion" && <div>{r.bloklar.map((b, i) => <RatsionBlok key={i} b={b} oshqozon={oshqozon} />)}</div>}
        {tab === "sport" && <SportTab />}
        {tab === "suv" && <SuvTab />}
        {tab === "nafas" && <NafasTab />}
        {tab === "progress" && <ProgressTab />}
      </div>
    </div>
  );
}
