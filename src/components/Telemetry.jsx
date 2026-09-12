import React, { useEffect, useState } from 'react';
import suite from '../../content/suite.json';
const projects=[];

import { validateTelemetry } from '../data/telemetry';
export function Telemetry() {
  const text=suite.telemetry;const [state,setState]=useState(text.endpoint?'loading':'disconnected');const [data,setData]=useState(null);const [refresh,setRefresh]=useState(0);
  useEffect(()=>{
    if(!text.endpoint)return;
    let active=true,timer,controller;
    const load=async()=>{controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),10000);try{const r=await fetch(text.endpoint,{signal:controller.signal,credentials:'same-origin'});if(!r.ok)throw new Error('Request failed');const next=validateTelemetry(await r.json());if(active){setData(next);setState(Date.now()-Date.parse(next.updatedAt)>5*60*1000?'stale':'live');}}catch{if(active){setState('error');setData(null);}}finally{clearTimeout(timeout);if(active)timer=setTimeout(load,text.refreshSeconds*1000);}};
    load();return()=>{active=false;clearTimeout(timer);controller?.abort();};
  },[refresh]);
  const number=n=>n==null?'—':new Intl.NumberFormat('en',{notation:'compact',maximumFractionDigits:1}).format(n);
  const fresh=state==='live';const statusText=state==='stale'?'Last reported data · stale':text[state];
  const history=data?.history||[];const max=Math.max(1,...history.map(p=>p.avgSessionMinutes));
  return <section className="section telemetry-section" id="telemetry"><div className="section-heading"><div><p className="eyebrow">{text.eyebrow}</p><h2>{text.title}</h2><p>{text.description}</p></div><div className="telemetry-state" role="status"><span className={`dot ${fresh?'':'neutral'}`} />{statusText}{text.endpoint&&<button className="refresh" onClick={()=>{setState('loading');setRefresh(n=>n+1)}}>{text.retryLabel} ↻</button>}</div></div>
  <div className="metrics">{[[text.liveNowLabel,data?.liveNow,'people'],[text.totalRunsLabel,data?.totalRuns,'executions'],[text.totalPlayersLabel,data?.totalPlayers,'players'],[text.sessionLabel,data?.avgSessionMinutes,'minutes']].map(([label,value,unit])=><div className="metric" key={label}><span>{label}</span><strong>{number(value)}<small>{value==null?'':unit}</small></strong><p>{data?`Updated ${new Date(data.updatedAt).toLocaleTimeString()}`:'Waiting for live data'}</p></div>)}</div>
  <div className="analytics-grid"><div className="analytics-panel"><div className="panel-heading"><h3>{text.historyLabel}</h3><span>MIN / SESSION</span></div>{history.length?<div className="history-bars" role="img" aria-label={history.map(p=>`${p.label}: ${p.avgSessionMinutes} minutes`).join(', ')}>{history.map((p,i)=><div key={i}><span title={`${p.avgSessionMinutes} min`} style={{height:`${Math.max(2,p.avgSessionMinutes/max*100)}%`}}/><small>{p.label}</small></div>)}</div>:<div className="chart-empty"><div className="chart-grid"/><span>⌁</span><p>{text.emptyChart}</p></div>}</div><div className="analytics-panel"><div className="panel-heading"><h3>{text.executorsLabel}</h3><span>USAGE</span></div>{data?.executors.length?<div className="executor-list">{data.executors.map((item,i)=><div key={i}><span>{item.name}</span><b>{number(item.count)}</b><progress max={Math.max(1,...data.executors.map(e=>e.count))} value={item.count}/></div>)}</div>:<div className="executor-empty"><span>◫</span><p>{text.emptyExecutors}</p></div>}</div></div>
  <div className="script-health"><span>{text.statusLabel}</span>{projects.map(p=>{const report=data?.scripts.find(s=>s.id===p.id);return <div key={p.id}><span>{p.name}</span><small><i className={`dot ${fresh&&report?.status==='operational'?'':'neutral'}`}/>{fresh&&report?report.status:text.unknownStatus}</small></div>})}</div></section>;
}
