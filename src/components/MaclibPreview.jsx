import React, { useState } from 'react';
import suite from '../../content/suite.json';
import { CopyButton } from './CopyButton';

export function MaclibPreview({ compact = false }) {
  const [tab, setTab] = useState(0);
  const [enabled, setEnabled] = useState(false);
  const [visuals, setVisuals] = useState(true);
  const [range, setRange] = useState(35);
  const [accent, setAccent] = useState('#8db5ff');
  const [minimized, setMinimized] = useState(false);
  const [closed, setClosed] = useState(false);
  const [message, setMessage] = useState('');
  const text = suite.preview;
  const toggle = (label, value, set) => <div className="control-row"><span>{label}</span><button type="button" role="switch" aria-label={label} aria-checked={value} className={`switch ${value ? 'on' : ''}`} onClick={() => set(!value)}><span /></button></div>;
  if (closed) return <div className="preview-closed"><span>Window closed</span><button className="button" onClick={() => setClosed(false)}>Reopen Maclib preview</button></div>;
  return <div className={`mac-window ${compact ? 'compact' : ''}`} style={{ '--window-accent': accent }}>
    <div className="mac-titlebar"><div className="traffic-lights"><button aria-label="Close preview" onClick={() => setClosed(true)} /><button aria-label={minimized ? 'Expand preview' : 'Minimize preview'} onClick={() => setMinimized(!minimized)} /><button aria-label="Reset preview" onClick={() => { setMinimized(false); setTab(0); setEnabled(false); setVisuals(true); setRange(35); setAccent('#8db5ff'); setMessage('Preview reset'); }} /></div><span>{text.windowTitle} <b>/ {text.subtitle}</b></span><span className="preview-chip">UI DEMO</span></div>
    {!minimized && <div className="mac-body"><aside className="mac-sidebar"><div className="workspace"><img src="/tomtamx-logo.png" alt="" /><div>TomTamX<small>Personal workspace</small></div></div><p>WORKSPACE</p><div role="tablist" aria-label="Maclib preview sections">{text.tabs.map((name, i) => <button key={name} role="tab" id={`preview-${compact ? 'small' : 'full'}-${i}`} aria-selected={tab === i} aria-controls={`panel-${compact ? 'small' : 'full'}`} onClick={() => { setTab(i); setMessage(''); }}><span>{['◫','⌁','◎','⚙'][i]}</span>{name}</button>)}</div><div className="sidebar-bottom"><span className="dot" /> Local preview<small>No game connection</small></div></aside><div className="mac-content" role="tabpanel" id={`panel-${compact ? 'small' : 'full'}`} aria-labelledby={`preview-${compact ? 'small' : 'full'}-${tab}`}>
      <div className="mac-content-heading"><div><small>YOUR WORKSPACE, YOUR WAY</small><h3>{text.tabs[tab]}</h3></div><span className="keycap">⌘</span></div>
      {tab === 0 && <><p className="preview-intro">Welcome back. Make yourself at home.</p><div className="preview-banner"><span>✳</span><div>Made for your next idea.<small>A little less friction. A lot more possibility.</small></div></div><div className="control-group"><h4>Quick controls</h4>{toggle('Enable module',enabled,setEnabled)}{toggle('Show indicators',visuals,setVisuals)}<label className="slider-label">Interface intensity <output>{range}%</output><input type="range" aria-label="Interface intensity" min="0" max="100" value={range} onChange={e=>setRange(Number(e.target.value))} /></label></div></>}
      {tab === 1 && <><p className="preview-intro">Tune the interface. These controls are a demo.</p><div className="control-group"><h4>Combat preferences</h4>{toggle('Auto parry preview',enabled,setEnabled)}<label className="slider-label">Detection range <output>{range} studs</output><input type="range" aria-label="Detection range" min="0" max="100" value={range} onChange={e=>setRange(Number(e.target.value))} /></label><label className="control-row">Combat style<select aria-label="Combat style" defaultValue="Balanced"><option>Balanced</option><option>Defensive</option><option>Aggressive</option></select></label></div></>}
      {tab === 2 && <><p className="preview-intro">Choose what stands out in your workspace.</p><div className="control-group"><h4>Display preferences</h4>{toggle('Show indicators',visuals,setVisuals)}{toggle('Highlight targets preview',enabled,setEnabled)}<label className="slider-label">Indicator opacity <output>{range}%</output><input type="range" aria-label="Indicator opacity" min="0" max="100" value={range} onChange={e=>setRange(Number(e.target.value))} /></label></div></>}
      {tab === 3 && <><p className="preview-intro">A small change. A whole different feel.</p><div className="control-group"><h4>Appearance</h4><div className="control-row"><span>Accent color</span><div className="swatches">{[['Blue','#8db5ff'],['Violet','#b29cff'],['Mint','#83d8b4'],['Rose','#f2a6bb']].map(([name,color])=><button key={name} aria-label={`${name} accent`} aria-pressed={accent===color} style={{background:color}} onClick={()=>setAccent(color)} />)}</div></div><button className="button small" onClick={()=>setMessage('Preview preferences applied to this window.')}>Apply preferences</button></div></>}
      <div className="mac-status" role="status">{message || `${enabled ? 'Module enabled' : 'Module disabled'} · Preview only`}</div>
    </div></div>}
  </div>;
}

export function DeveloperDocs() {
  const [tab,setTab]=useState(0); const text=suite.docs;
  return <section className="section docs-section" id="docs"><div className="section-copy"><p className="eyebrow">{text.eyebrow}</p><h2>{text.title}</h2><p>{text.description}</p><a className="text-link" href="/maclib-documentation.md" target="_blank" rel="noreferrer">Read the full documentation ↗</a><p className="attribution">{text.attribution} <a href={text.licenseUrl} target="_blank" rel="noreferrer">View license ↗</a></p></div><div className="code-panel"><div className="code-tabs" role="tablist" aria-label="Documentation examples">{text.tabs.map((name,i)=><button key={name} role="tab" aria-selected={tab===i} onClick={()=>setTab(i)}>{name}</button>)}<span>LUAU</span></div><pre><code>{text.code[tab]}</code></pre><div className="code-footer"><span>Maclib Modern Edition</span><CopyButton key={tab} value={text.code[tab]} label={text.copyLabel} className="button small" /></div></div></section>;
}
