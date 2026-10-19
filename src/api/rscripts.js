import { fallbackCatalog } from '../data/fallbackCatalog.js';

const CACHE_KEY = 'tomtamx_scripts_cache_v3';
const OWNER = { id: '69b584a0c95c6b9df7edec49', username: 'TomTamX' };

const getEnv = (key, fallback = '') => {
  try {
    return (import.meta?.env && import.meta.env[key]) || fallback;
  } catch {
    return fallback;
  }
};

const decode = (value) =>
  String(value || '')
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>');

export function formatDescription(raw) {
  if (!raw) return '';
  let text = decode(raw);
  // Separate sections like [ Combat & Weapons ]
  text = text.replace(/(\[[^\]]+\])/g, '\n\n$1\n');
  // Separate bullets
  text = text.replace(/[•·]\s*/g, '\n• ');
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter((line, i, arr) => line !== '' || (i > 0 && arr[i - 1] !== ''))
    .join('\n')
    .trim();
}

export function getStoredCatalog() {
  if (typeof window === 'undefined') return fallbackCatalog;
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (err) {
    console.warn('Failed to read catalog from cache:', err);
  }
  return fallbackCatalog;
}

export function saveCatalogToCache(catalog) {
  if (typeof window === 'undefined' || !Array.isArray(catalog) || catalog.length === 0) return;
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(catalog));
  } catch (err) {
    console.warn('Failed to save catalog to cache:', err);
  }
}

async function fetchWithTimeout(url, signal, timeoutMs = 8000, headers = {}) {
  const timeoutCtrl = new AbortController();
  const timer = setTimeout(() => timeoutCtrl.abort(new Error('Network timeout')), timeoutMs);

  const onAbort = () => timeoutCtrl.abort(signal?.reason);
  if (signal) {
    if (signal.aborted) throw signal.reason;
    signal.addEventListener('abort', onAbort, { once: true });
  }

  try {
    const response = await fetch(url, {
      signal: timeoutCtrl.signal,
      headers: { Accept: 'application/json', ...headers }
    });
    return response;
  } finally {
    clearTimeout(timer);
    if (signal) signal.removeEventListener('abort', onAbort);
  }
}

async function fetchRawScriptCode(url, signal) {
  if (!url || !url.startsWith('http')) return '';
  try {
    const timeoutCtrl = new AbortController();
    const timer = setTimeout(() => timeoutCtrl.abort(), 6000);
    const res = await fetch(url, { signal: timeoutCtrl.signal });
    clearTimeout(timer);
    if (res.ok) {
      const text = await res.text();
      if (text && text.trim().length > 0) return text.trim();
    }
  } catch (err) {
    console.warn('Could not fetch raw script content, using baseline:', err.message);
  }
  return '';
}

async function toCatalog(scripts, signal) {
  const games = new Map();
  const baseline = fallbackCatalog[0]?.scripts[0];

  for (const item of scripts) {
    if (item.private || (!item.rawScript && !item.script) || !item.slug) continue;

    // Check ownership
    const isOwner =
      item.user?._id === OWNER.id ||
      item.user?.username?.toLowerCase() === OWNER.username.toLowerCase() ||
      item.title?.toLowerCase().includes('tomtamx');
    if (!isOwner) continue;

    const gameName = (item.game?.title || 'Examination').trim();
    const gameId = item.game?._id || gameName.toLowerCase().replace(/[^a-z0-9]/g, '-');

    const gameImage =
      item.game?.imgurl ||
      item.game?.imageUrl ||
      item.image ||
      item.imageUrl ||
      '';
    const gameLogo = item.game?.gameLogo || item.game?.logo || '';
    const robloxUrl =
      item.game?.gameLink ||
      item.game?.url ||
      (item.game?.placeId ? `https://www.roblox.com/games/${item.game.placeId}` : '');

    // Get real Lua code
    let code = item.script || '';
    if (!code && item.rawScript) {
      code = await fetchRawScriptCode(item.rawScript, signal);
    }
    if (!code) {
      code = baseline?.code || `loadstring(game:HttpGet("${item.rawScript}"))()`;
    }

    const script = {
      id: item._id,
      title: decode(item.title),
      description: formatDescription(item.description),
      code,
      rawScriptUrl: item.rawScript || '',
      sourceUrl: `https://rscripts.net/script/${item.slug}`,
      updatedAt: item.lastUpdated || item.createdAt || '',
      views: Number(item.views) || 0,
      likes: Number(item.likes) || 0,
      dislikes: Number(item.dislikes) || 0,
      keySystem: Boolean(item.keySystem),
      testedExecutors: Array.isArray(item.testedExecutors)
        ? item.testedExecutors
            .map((e) => (typeof e === 'string' ? e : e.title || e.name || ''))
            .filter(Boolean)
        : []
    };

    if (!games.has(gameId)) {
      games.set(gameId, {
        id: gameId,
        name: gameName,
        placeId: item.game?.placeId || '',
        image: gameImage,
        gameLogo,
        robloxUrl,
        scripts: []
      });
    }

    const current = games.get(gameId);
    if (!current.image && gameImage) current.image = gameImage;
    if (!current.robloxUrl && robloxUrl) current.robloxUrl = robloxUrl;
    current.scripts.push(script);
  }

  const result = [...games.values()].sort((a, b) => a.name.localeCompare(b.name));
  return result.length > 0 ? result : fallbackCatalog;
}

export async function fetchTomTamXScripts(signal) {
  const apiKey = getEnv('VITE_RSCRIPTS_API_KEY');
  const username = getEnv('VITE_RSCRIPTS_USERNAME', 'TomTamX');
  const apiBase = getEnv('VITE_RSCRIPTS_API_BASE', 'https://api.rscripts.net');

  // Option 1: Official Public API v1 if API key is present
  if (apiKey) {
    try {
      const loadV1Page = async (page = 1) => {
        const url = `${apiBase}/v1/scripts?username=${encodeURIComponent(username)}&includeScript=true&sort=newest&limit=48&page=${page}`;
        const response = await fetchWithTimeout(url, signal, 8000, {
          Authorization: `Bearer ${apiKey}`,
          'X-Api-Key': apiKey
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      };

      const first = await loadV1Page(1);
      if (first.success && Array.isArray(first.data)) {
        let allData = [...first.data];
        const totalPages = Math.min(
          Math.max(1, Number(first.meta?.totalPages || first.meta?.pages || (first.data.length === 48 ? 2 : 1)) || 1),
          10
        );
        if (totalPages > 1) {
          const rest = await Promise.all(
            Array.from({ length: totalPages - 1 }, (_, i) => loadV1Page(i + 2))
          );
          for (const res of rest) {
            if (res.success && Array.isArray(res.data)) {
              allData.push(...res.data);
            }
          }
        }
        const catalog = await toCatalog(allData, signal);
        saveCatalogToCache(catalog);
        return catalog;
      }
    } catch (err) {
      console.warn('Official API query failed, falling back to public endpoint:', err.message);
    }
  }

  // Option 2: Public website API v2 (No API key needed)
  const loadPublicPage = async (page, retry = 1) => {
    const url = `https://rscripts.net/api/v2/scripts?q=${encodeURIComponent(username)}&page=${page}`;
    try {
      const response = await fetchWithTimeout(url, signal, 8000);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const payload = await response.json();
      if (!Array.isArray(payload.scripts)) throw new Error('Invalid scripts format');
      return payload;
    } catch (err) {
      if (err.name === 'AbortError' && signal?.aborted) throw err;
      if (retry > 0) {
        await new Promise((resolve) => setTimeout(resolve, 400));
        return loadPublicPage(page, retry - 1);
      }
      throw err;
    }
  };

  try {
    const first = await loadPublicPage(1);
    const maxPages = Math.min(Math.max(1, Number(first.info?.maxPages) || 1), 10);
    const rest =
      maxPages > 1
        ? await Promise.all(
            Array.from({ length: maxPages - 1 }, (_, index) => loadPublicPage(index + 2))
          )
        : [];

    const allScripts = [...(first.scripts || []), ...rest.flatMap((page) => page.scripts || [])];
    const catalog = await toCatalog(allScripts, signal);
    saveCatalogToCache(catalog);
    return catalog;
  } catch (error) {
    if (error.name === 'AbortError' && signal?.aborted) throw error;
    console.warn('Public API query failed, using cached catalog:', error.message);
    return getStoredCatalog();
  }
}
