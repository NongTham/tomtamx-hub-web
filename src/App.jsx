import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { site } from './config';
import suite from '../content/suite.json';
import { fetchTomTamXScripts, getStoredCatalog } from './api/rscripts';
import { CopyButton } from './components/CopyButton';
import { SearchIcon, GamepadIcon, SunIcon, MoonIcon } from './components/Icons';

function useTomTamXScripts() {
  const [state, setState] = useState(() => ({
    status: 'ready',
    games: getStoredCatalog(),
    isSyncing: true,
    error: '',
    lastSynced: null
  }));

  const refresh = useCallback(() => {
    const controller = new AbortController();
    setState((prev) => ({ ...prev, isSyncing: true }));

    fetchTomTamXScripts(controller.signal)
      .then((games) => {
        setState({
          status: 'ready',
          games,
          isSyncing: false,
          error: '',
          lastSynced: new Date()
        });
      })
      .catch((error) => {
        if (error.name !== 'AbortError') {
          setState((prev) => ({
            ...prev,
            isSyncing: false,
            error: error.message
          }));
        }
      });

    return controller;
  }, []);

  useEffect(() => {
    const controller = refresh();

    const handleFocus = () => {
      if (document.visibilityState === 'visible') {
        refresh();
      }
    };
    window.addEventListener('visibilitychange', handleFocus);
    window.addEventListener('focus', handleFocus);

    const interval = window.setInterval(refresh, 180_000);

    return () => {
      controller.abort();
      window.removeEventListener('visibilitychange', handleFocus);
      window.removeEventListener('focus', handleFocus);
      window.clearInterval(interval);
    };
  }, [refresh]);

  return { ...state, refresh };
}

function Brand() {
  return (
    <a className="brand" href="#home" aria-label="TomTamX home">
      <img src={site.brand.logo} alt="" />
      <span>{site.brand.name}</span>
    </a>
  );
}

function GameImage({ game, ...props }) {
  const src = game.image || site.brand.logo;
  return (
    <img
      src={src}
      alt={game.name}
      onError={(event) => {
        if (event.currentTarget.dataset.fallback) return;
        event.currentTarget.dataset.fallback = 'true';
        event.currentTarget.src = site.brand.logo;
        event.currentTarget.classList.add('image-fallback');
      }}
      {...props}
    />
  );
}

function DescriptionBox({ description }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = description && description.length > 260;

  return (
    <div>
      <h4>About this script</h4>
      <div className={`script-desc-wrapper ${isLong && !expanded ? 'collapsed' : ''}`}>
        <p className="script-description">
          {description || 'No public description is available for this script.'}
        </p>
        {isLong && !expanded && <div className="script-desc-fade" />}
      </div>
      {isLong && (
        <button
          type="button"
          className="show-more-btn"
          onClick={() => setExpanded((prev) => !prev)}
        >
          {expanded ? 'Show less ∧' : 'Show more ∨'}
        </button>
      )}
    </div>
  );
}

function Details({ game, onClose }) {
  const dialog = useRef(null);
  const [index, setIndex] = useState(0);
  const scripts = game.scripts.filter((s) => s.code);
  const script = scripts[index] || game.scripts[0];

  useEffect(() => {
    const previous = document.activeElement;
    dialog.current?.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, []);

  const linesCount = (script.code || '').split('\n').length;
  const byteSize = new TextEncoder().encode(script.code || '').length;

  return (
    <dialog
      ref={dialog}
      className="game-dialog"
      aria-labelledby="dialog-title"
      onCancel={onClose}
    >
      <button
        className="icon-button dialog-close"
        aria-label="Close game details"
        onClick={onClose}
      >
        ×
      </button>

      <p className="eyebrow">TOMTAMX / SCRIPT LIBRARY</p>
      <h2 id="dialog-title">{game.name}</h2>

      {scripts.length > 1 && (
        <label className="script-select">
          Choose a script
          <select
            value={index}
            onChange={(event) => setIndex(Number(event.target.value))}
          >
            {scripts.map((item, optionIndex) => (
              <option key={item.id} value={optionIndex}>
                {item.title}
              </option>
            ))}
          </select>
        </label>
      )}

      <h3>{script.title}</h3>

      {script.testedExecutors && script.testedExecutors.length > 0 && (
        <div className="executor-list">
          <h4>Tested Executors</h4>
          <div className="executor-chips">
            {script.testedExecutors.map((executor) => (
              <span className="executor-chip" key={executor}>
                {executor}
              </span>
            ))}
          </div>
        </div>
      )}

      <DescriptionBox description={script.description} />

      <div className="script-code-box">
        <div className="script-code-header">
          <div className="script-code-meta">
            <span className="script-code-title">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
              Script code
            </span>
            <span className="script-code-sub">{linesCount} lines · {byteSize} B</span>
          </div>
          <div className="script-code-actions">
            <CopyButton key={script.id} value={script.code} label="Copy" className="btn-mini" />
            {script.rawScriptUrl && (
              <a className="btn-mini" href={script.rawScriptUrl} target="_blank" rel="noreferrer">
                Raw ↗
              </a>
            )}
          </div>
        </div>
        <pre className="script-code-body">
          <code>{script.code}</code>
        </pre>
      </div>

      <div className="dialog-actions">
        <a
          className="btn btn-secondary"
          href={script.sourceUrl}
          target="_blank"
          rel="noreferrer"
        >
          View script source ↗
        </a>
        {game.robloxUrl && (
          <a
            className="btn btn-secondary"
            href={game.robloxUrl}
            target="_blank"
            rel="noreferrer"
          >
            Open on Roblox ↗
          </a>
        )}
      </div>
    </dialog>
  );
}

export function App() {
  const [theme, setTheme] = useState(
    () => document.documentElement.dataset.theme || 'dark'
  );
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('name');
  const [limit, setLimit] = useState(site.catalog.pageSize);
  const [selected, setSelected] = useState(null);

  const { games, isSyncing, error, refresh } = useTomTamXScripts();

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem('theme', theme);
    } catch {}
  }, [theme]);

  const list = useMemo(() => {
    return games
      .filter((game) =>
        `${game.name} ${game.scripts.map((s) => s.title).join(' ')}`
          .toLowerCase()
          .includes(query.trim().toLowerCase())
      )
      .sort((a, b) =>
        sort === 'name'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      );
  }, [games, query, sort]);

  const scriptCount = games.reduce(
    (total, game) => total + game.scripts.length,
    0
  );
  const featured = games[0];

  return (
    <div
      id="home"
      style={{
        '--accent': site.appearance.accentColor,
        '--ink': site.appearance.accentTextColor
      }}
    >
      <header className="header">
        <div className="container header-inner">
          <Brand />
          <nav aria-label="Main navigation">
            <a className="nav-current" href="#catalog">
              {site.header.libraryLabel}
            </a>
            <a href="#loader">Get the loader</a>
            {suite.community.discord && <a href="#community">Community</a>}
          </nav>
          <div className="header-actions">
            <button
              className="icon-button"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>
            {suite.community.discord && (
              <a href={suite.community.discord} target="_blank" rel="noreferrer">
                Join Discord ↗
              </a>
            )}
          </div>
        </div>
      </header>

      <main>
        <section className={`hero container ${featured ? '' : 'no-featured'}`}>
          <div>
            <p className="eyebrow">
              <span className="status-dot" />
              {site.hero.eyebrow}
            </p>
            <h1>
              {site.hero.titleLine1}
              <br />
              {site.hero.titleLine2} <span>{site.hero.titleAccent}</span>
              <span className="title-star" aria-hidden="true">
                ✳
              </span>
            </h1>
            <p className="hero-description">{site.hero.description}</p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#catalog">
                <GamepadIcon />
                {site.hero.buttonLabel}
                <span>↗</span>
              </a>
              <a className="text-link" href="#loader">
                Get the loader <span>↓</span>
              </a>
            </div>
            <div className="hero-proof">
              <span>
                <i />
                Scripts by TomTamX
              </span>
              <span>
                <span className={`sync-pulse ${isSyncing ? 'syncing' : ''}`} />
                {isSyncing ? 'Syncing with Rscripts…' : 'Live synced with Rscripts'}
              </span>
            </div>
          </div>

          {featured && (
            <div className="featured-stage">
              <div className="stage-heading">
                <span>{site.featured.heading}</span>
                <span>01 / FEATURED</span>
              </div>
              <button
                className="feature-main"
                onClick={() => setSelected(featured)}
              >
                <GameImage game={featured} fetchPriority="high" />
                <span className="image-shade" />
                <span className="feature-label">{site.featured.badge}</span>
                <span className="feature-info">
                  <span>
                    <small>{site.featured.subtitle}</small>
                    <strong>{featured.name}</strong>
                  </span>
                  <span className="round-arrow">↗</span>
                </span>
              </button>
              <div className="featured-bottom">
                <span>
                  <span className="status-dot" /> Published by TomTamX
                </span>
                <button
                  className="text-link"
                  onClick={() => setSelected(featured)}
                >
                  View script ↗
                </button>
              </div>
              <span className="stage-caption">{site.featured.caption}</span>
            </div>
          )}
        </section>

        <div className="library-strip">
          <div className="container">
            <span>
              <strong>{games.length}</strong> supported game
              {games.length !== 1 ? 's' : ''}
            </span>
            <span>
              <strong>{scriptCount}</strong> published script
              {scriptCount !== 1 ? 's' : ''}
            </span>
            <span>
              Created by <b>TomTamX</b>
            </span>
          </div>
        </div>

        <section className="container catalog" id="catalog">
          <div className="section-heading">
            <div>
              <p className="eyebrow">{site.catalog.eyebrow}</p>
              <h2>
                {site.catalog.title}
                <span className="count-label">{games.length}</span>
              </h2>
              <p className="muted">{site.catalog.description}</p>
            </div>
          </div>

          <div className="catalog-toolbar">
            <label className="search-box">
              <SearchIcon />
              <input
                aria-label="Search scripts"
                placeholder={site.catalog.searchPlaceholder}
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setLimit(site.catalog.pageSize);
                }}
              />
              {query && (
                <button aria-label="Clear search" onClick={() => setQuery('')}>
                  ×
                </button>
              )}
            </label>
            <label className="sort-control">
              Sort by
              <select
                aria-label="Sort scripts"
                value={sort}
                onChange={(event) => setSort(event.target.value)}
              >
                <option value="name">A–Z</option>
                <option value="reverse">Z–A</option>
              </select>
            </label>
          </div>

          <div className="filter-row">
            <button
              className="filter-active"
              onClick={() => {
                setQuery('');
                setLimit(site.catalog.pageSize);
              }}
            >
              All scripts <span>{games.length}</span>
            </button>
            <span role="status">
              {isSyncing
                ? 'Syncing live scripts…'
                : `${list.length} result${list.length !== 1 ? 's' : ''}`}
            </span>
          </div>

          <div className="game-grid">
            {list.slice(0, limit).map((game) => (
              <article className="game-card" key={game.id}>
                <button
                  className="game-card-open"
                  onClick={() => setSelected(game)}
                  aria-label={`View ${game.name} scripts`}
                >
                  <div className="game-art">
                    <GameImage game={game} loading="lazy" />
                    <span className="game-badge">TOMTAMX</span>
                    <span className="game-open">↗</span>
                  </div>
                  <div className="game-info">
                    <h3>{game.name}</h3>
                    <p>{game.scripts[0]?.title}</p>
                  </div>
                </button>
                <div className="game-card-footer">
                  <span>
                    {game.scripts.length} script
                    {game.scripts.length !== 1 ? 's' : ''}
                  </span>
                  <CopyButton
                    value={game.scripts[0]?.code}
                    label="Copy script"
                    className="btn btn-primary btn-small"
                  />
                </div>
              </article>
            ))}
          </div>

          {!list.length && (
            <div className="empty-state">
              <SearchIcon />
              <h3>{site.catalog.emptyTitle}</h3>
              <p>{site.catalog.emptyDescription}</p>
              {query && (
                <button className="btn btn-secondary" onClick={() => setQuery('')}>
                  Clear search
                </button>
              )}
            </div>
          )}

          {limit < list.length && (
            <div className="catalog-end">
              <button
                className="btn btn-secondary"
                onClick={() => setLimit((val) => val + site.catalog.pageSize)}
              >
                Load more scripts ↓
              </button>
            </div>
          )}
        </section>

        <section className="loader-section" id="loader">
          <div className="container loader-grid">
            <div>
              <p className="eyebrow">ONE LOADER. YOUR NEXT SESSION.</p>
              <h2>
                Copy. Paste.
                <br />
                <span>You're in.</span>
              </h2>
              <p className="muted">
                Use the TomTamX master loader,
                <br />
                or pick a standalone script from the library.
              </p>
            </div>
            <div className="loader-panel">
              <div className="loader-top">
                <span>{suite.masterLoader.label}</span>
                <span>LUA</span>
              </div>
              <code>{suite.masterLoader.code}</code>
              <div className="loader-actions">
                <span>TomTamX</span>
                <CopyButton
                  value={suite.masterLoader.code}
                  label="Copy loader"
                />
              </div>
            </div>
          </div>
        </section>

        {suite.community.discord && (
          <section className="container community" id="community">
            <div>
              <p className="eyebrow">BETTER WITH THE COMMUNITY</p>
              <h2>Find your people.</h2>
              <p className="muted">
                Get updates and share your favorite scripts.
              </p>
            </div>
            <a
              className="btn btn-primary"
              href={suite.community.discord}
              target="_blank"
              rel="noreferrer"
            >
              Join Discord ↗
            </a>
          </section>
        )}
      </main>

      <footer className="container footer">
        <Brand />
        <span>
          Built by {site.brand.creator} · {new Date().getFullYear()}
        </span>
        <a href="#home">Back to top ↑</a>
      </footer>

      {selected && <Details game={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
