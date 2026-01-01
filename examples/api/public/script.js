/**
 * JioSaavn API Tester - Optimized JavaScript
 * Parameter Definitions & Endpoint Configuration
 */

const PARAM_DEFINITIONS = {
  albumId: { type: 'string' },
  artistId: { type: 'string' },
  playlistId: { type: 'string' },
  songId: { type: 'string' },
  songIds: {
    type: 'string[]',
    parse: (value) => {
      if (Array.isArray(value)) return value.length > 0 ? value : undefined;
      if (typeof value !== 'string') return undefined;
      const arr = value
        .split(',')
        .map((s) => s.trim())
        .filter((s) => s.length > 0);
      return arr.length > 0 ? arr : undefined;
    },
  },
  stationId: { type: 'string' },
  permalink: { type: 'string' },
  query: { type: 'string' },
  language: { type: 'string' },
  name: { type: 'string' },
  limit: {
    type: 'number',
    parse: (value) => {
      const num = Number(value);
      return isNaN(num) || value === '' ? undefined : num;
    },
  },
  offset: {
    type: 'number',
    parse: (value) => {
      const num = Number(value);
      return isNaN(num) || value === '' ? undefined : num;
    },
  },
  next: {
    type: 'boolean',
    parse: (value) => {
      if (value === true || value === 'true') return true;
      if (value === false || value === 'false') return false;
      return undefined;
    },
  },
  encryptedUrl: { type: 'string' },
  runtime: { type: 'string' },
  acknowledge: {
    type: 'boolean',
    parse: (value) => {
      if (value === true || value === 'true') return true;
      if (value === false || value === 'false') return false;
      return undefined;
    },
  },
};

const API_ENDPOINTS = {
  'Album-getById': {
    title: 'Get Album by ID',
    description: 'Fetch an album by Saavn ID.',
    method: 'Album.getById',
    group: 'Album',
    params: [
      {
        key: 'albumId',
        value: '1134601',
        required: true,
        description: 'Saavn album ID',
      },
    ],
  },
  'Album-getByPermalink': {
    title: 'Get Album by Permalink',
    description: 'Fetch an album by permalink.',
    method: 'Album.getByPermalink',
    group: 'Album',
    params: [
      {
        key: 'permalink',
        value: 'https://www.jiosaavn.com/album/vedas-yajurveda/BvKmXHhUzOg_',
        required: true,
        description: 'Album permalink string',
      },
    ],
  },
  'Album-getRecommendations': {
    title: 'Album Recommendations',
    description: 'Fetch album recommendations by Saavn ID.',
    method: 'Album.getRecommendations',
    group: 'Album',
    params: [
      {
        key: 'albumId',
        value: '1134601',
        required: true,
        description: 'Saavn album ID',
      },
    ],
  },
  'Album-getTrending': {
    title: 'Trending Albums',
    description: 'Get trending albums by language.',
    method: 'Album.getTrending',
    group: 'Album',
    params: [
      {
        key: 'language',
        value: 'hindi',
        required: true,
        description: 'Language code',
      },
    ],
  },
  'Album-search': {
    title: 'Search Albums',
    description: 'Search for albums by query.',
    method: 'Album.search',
    group: 'Album',
    params: [
      {
        key: 'query',
        value: 'future nostalgia',
        required: true,
        description: 'Search query string',
      },
      {
        key: 'limit',
        value: '10',
        required: false,
        description: 'Result limit (optional)',
      },
      {
        key: 'offset',
        value: '0',
        required: false,
        description: 'Result offset (optional)',
      },
    ],
  },
  'Artist-getById': {
    title: 'Get Artist by ID',
    description: 'Fetch an artist by Saavn ID.',
    method: 'Artist.getById',
    group: 'Artist',
    params: [
      {
        key: 'artistId',
        value: '459320',
        required: true,
        description: 'Saavn artist ID',
      },
    ],
  },
  'Artist-getByPermalink': {
    title: 'Get Artist by Permalink',
    description: 'Fetch an artist by permalink.',
    method: 'Artist.getByPermalink',
    group: 'Artist',
    params: [
      {
        key: 'permalink',
        value:
          'https://www.jiosaavn.com/artist/arijit-singh-songs/LlRWpHzy3Hk_',
        required: true,
        description: 'Artist permalink string',
      },
    ],
  },
  'Artist-search': {
    title: 'Search Artists',
    description: 'Search for artists by query.',
    method: 'Artist.search',
    group: 'Artist',
    params: [
      {
        key: 'query',
        value: 'arijit singh',
        required: true,
        description: 'Search query string',
      },
      {
        key: 'limit',
        value: '10',
        required: false,
        description: 'Result limit (optional)',
      },
      {
        key: 'offset',
        value: '0',
        required: false,
        description: 'Result offset (optional)',
      },
    ],
  },
  'Playlist-getById': {
    title: 'Get Playlist by ID',
    description: 'Fetch a playlist by Saavn ID.',
    method: 'Playlist.getById',
    group: 'Playlist',
    params: [
      {
        key: 'playlistId',
        value: '110858205',
        required: true,
        description: 'Saavn playlist ID',
      },
    ],
  },
  'Playlist-getByPermalink': {
    title: 'Get Playlist by Permalink',
    description: 'Fetch a playlist by permalink.',
    method: 'Playlist.getByPermalink',
    group: 'Playlist',
    params: [
      {
        key: 'permalink',
        value:
          'https://www.jiosaavn.com/featured/trending-today/I3kvhipIy73uCJW60TJk1Q__',
        required: true,
        description: 'Playlist permalink string',
      },
    ],
  },
  'Playlist-getRecommendations': {
    title: 'Playlist Recommendations',
    description: 'Fetch playlist recommendations by Saavn ID.',
    method: 'Playlist.getRecommendations',
    group: 'Playlist',
    params: [
      {
        key: 'playlistId',
        value: '110858205',
        required: true,
        description: 'Saavn playlist ID',
      },
    ],
  },
  'Playlist-getTrending': {
    title: 'Trending Playlists',
    description: 'Get trending playlists by language.',
    method: 'Playlist.getTrending',
    group: 'Playlist',
    params: [
      {
        key: 'language',
        value: 'hindi',
        required: true,
        description: 'Language code',
      },
    ],
  },
  'Playlist-search': {
    title: 'Search Playlists',
    description: 'Search for playlists by query.',
    method: 'Playlist.search',
    group: 'Playlist',
    params: [
      {
        key: 'query',
        value: 'bollywood',
        required: true,
        description: 'Search query string',
      },
      {
        key: 'limit',
        value: '10',
        required: false,
        description: 'Result limit (optional)',
      },
      {
        key: 'offset',
        value: '0',
        required: false,
        description: 'Result offset (optional)',
      },
    ],
  },
  'Song-getById': {
    title: 'Get Song(s) by ID',
    description: 'Fetch a song or songs by Saavn ID(s).',
    method: 'Song.getById',
    group: 'Song',
    params: [
      {
        key: 'songIds',
        value: '3IoDK8qI',
        required: true,
        description: 'Saavn song ID or Comma-separated list',
      },
    ],
  },
  'Song-getByPermalink': {
    title: 'Get Song by Permalink',
    description: 'Fetch a song by permalink.',
    method: 'Song.getByPermalink',
    group: 'Song',
    params: [
      {
        key: 'permalink',
        value: 'https://www.jiosaavn.com/song/levitating/QyEEdT8IRno',
        required: true,
        description: 'Song permalink string',
      },
    ],
  },
  'Song-getByStationId': {
    title: 'Get Songs by Station ID',
    description: 'Fetch songs by station ID.',
    method: 'Song.getByStationId',
    group: 'Song',
    params: [
      {
        key: 'stationId',
        value: 'station123',
        required: true,
        description: 'Station ID',
      },
      {
        key: 'limit',
        value: '10',
        required: false,
        description: 'Result limit (optional)',
      },
      {
        key: 'next',
        value: 'false',
        required: false,
        description: 'Get next set (boolean)',
      },
    ],
  },
  'Song-getRecommendations': {
    title: 'Song Recommendations',
    description: 'Fetch song recommendations by Saavn ID.',
    method: 'Song.getRecommendations',
    group: 'Song',
    params: [
      {
        key: 'songId',
        value: '3IoDK8qI',
        required: true,
        description: 'Saavn song ID',
      },
    ],
  },
  'Song-getTrending': {
    title: 'Trending Songs',
    description: 'Get trending songs by language.',
    method: 'Song.getTrending',
    group: 'Song',
    params: [
      {
        key: 'language',
        value: 'hindi',
        required: true,
        description: 'Language code',
      },
    ],
  },
  'Song-search': {
    title: 'Search Songs',
    description: 'Search for songs by query.',
    method: 'Song.search',
    group: 'Song',
    params: [
      {
        key: 'query',
        value: 'levitating',
        required: true,
        description: 'Search query string',
      },
      {
        key: 'limit',
        value: '10',
        required: false,
        description: 'Result limit (optional)',
      },
      {
        key: 'offset',
        value: '0',
        required: false,
        description: 'Result offset (optional)',
      },
    ],
  },
  'Song-experimental-fetchStreamUrls': {
    title: 'Fetch Stream URLs (Experimental)',
    description: 'Generate direct download links.',
    method: 'Song.experimental.fetchStreamUrls',
    group: 'Song',
    params: [
      {
        key: 'encryptedUrl',
        value: '',
        required: true,
        description: 'Encrypted media URL',
      },
      {
        key: 'runtime',
        value: 'node',
        required: true,
        description: "Runtime ('node' or 'edge')",
      },
      {
        key: 'acknowledge',
        value: 'true',
        required: true,
        description: "Must be 'true'",
      },
    ],
  },
  'Extras-searchAll': {
    title: 'Search All Entities',
    description: 'Search all entities by query.',
    method: 'Extras.searchAll',
    group: 'Extras',
    params: [
      {
        key: 'query',
        value: 'levitating',
        required: true,
        description: 'Search query string',
      },
    ],
  },
  'Extras-getTrendingAll': {
    title: 'Trending All Entities',
    description: 'Get trending entities.',
    method: 'Extras.getTrendingAll',
    group: 'Extras',
    params: [],
  },
  'Extras-createEntityStation': {
    title: 'Create Entity Station',
    description: 'Create a station for an entity.',
    method: 'Extras.createEntityStation',
    group: 'Extras',
    params: [
      {
        key: 'songIds',
        value: '3IoDK8qI',
        required: true,
        description: 'Comma-separated list of song IDs',
      },
    ],
  },
  'Extras-createFeaturedStation': {
    title: 'Create Featured Station',
    description: 'Create a featured station.',
    method: 'Extras.createFeaturedStation',
    group: 'Extras',
    params: [
      {
        key: 'language',
        value: 'hindi',
        required: true,
        description: 'Language code',
      },
      {
        key: 'name',
        value: 'Hindi Superhits',
        required: true,
        description: 'Station name',
      },
    ],
  },
};

let currentEndpoint = null;
let currentResponse = null;

// Initialize app on DOM ready
document.addEventListener('DOMContentLoaded', initializeApp);

function initializeApp() {
  renderEndpoints();
  setupEventListeners();
  setupMobileTabs();
  handleRouting();
  window.addEventListener('popstate', handleRouting);
}

// Parameter parsing with type conversion
function parseParamValue(key, rawValue) {
  const def = PARAM_DEFINITIONS[key];
  if (!def) return rawValue;
  if (def.parse) return def.parse(rawValue);
  return rawValue === '' || rawValue === undefined ? undefined : rawValue;
}

// Get active parameters from UI
function getActiveParams() {
  if (!currentEndpoint) return {};
  const params = {};
  currentEndpoint.params.forEach((param, index) => {
    const checkbox = document.querySelector(
      `.param-checkbox[data-index="${index}"]`,
    );
    const input = document.querySelector(`.param-value[data-index="${index}"]`);
    if (checkbox?.checked && input?.value) {
      const parsedValue = parseParamValue(param.key, input.value);
      if (parsedValue !== undefined) params[param.key] = parsedValue;
    }
  });
  return params;
}

// Render JavaScript value with proper syntax highlighting
function renderJsValue(value) {
  if (typeof value === 'string') {
    return `<span class="syntax-string">"${escapeHtml(value)}"</span>`;
  }
  if (typeof value === 'number') {
    return `<span class="syntax-number">${value}</span>`;
  }
  if (typeof value === 'boolean') {
    return `<span class="syntax-boolean">${value}</span>`;
  }
  if (Array.isArray(value)) {
    if (value.length === 0) return '<span class="syntax-bracket">[]</span>';
    return (
      '<span class="syntax-bracket">[</span>' +
      value
        .map((v) => renderJsValue(v))
        .join('<span class="syntax-paren">, </span>') +
      '<span class="syntax-bracket">]</span>'
    );
  }
  if (value === null) {
    return '<span class="syntax-null">null</span>';
  }
  if (value === undefined) {
    return '<span class="syntax-undefined">undefined</span>';
  }
  return `<span class="syntax-string">"${escapeHtml(String(value))}"</span>`;
}

// Update URL display and SDK preview
function updateUrlDisplay(method, params) {
  const urlDisplay = document.getElementById('urlDisplay');
  const sdkPreview = document.getElementById('sdkPreview');

  const queryParams = new URLSearchParams();
  queryParams.set('method', method);
  Object.entries(params).forEach(([key, value]) => {
    queryParams.set(
      key,
      Array.isArray(value) ? value.join(',') : String(value),
    );
  });
  urlDisplay.textContent = `/api/test?${queryParams.toString()}`;

  const parts = method.split('.');
  const methodName = parts.pop();
  const module = parts.join('.');

  let sdkHtml = 'SDK: ';
  if (module) {
    sdkHtml += module
      .split('.')
      .map((p) => `<span class="syntax-module">${escapeHtml(p)}</span>`)
      .join('<span class="syntax-dot">.</span>');
    sdkHtml += '<span class="syntax-dot">.</span>';
  }
  sdkHtml += `<span class="syntax-method">${escapeHtml(methodName)}</span>`;
  sdkHtml += '<span class="syntax-paren">(</span>';

  const paramKeys = Object.keys(params);
  if (paramKeys.length > 0) {
    sdkHtml += '<span class="syntax-brace">{ </span>';
    sdkHtml += paramKeys
      .map((key) => {
        return `<span class="syntax-key">${escapeHtml(key)}</span><span class="syntax-paren">: </span>${renderJsValue(params[key])}`;
      })
      .join('<span class="syntax-paren">, </span>');
    sdkHtml += '<span class="syntax-brace"> }</span>';
  }
  sdkHtml += '<span class="syntax-paren">)</span>';
  sdkPreview.innerHTML = sdkHtml;
}

// Update URL from current parameters
function updateUrlFromParams() {
  if (!currentEndpoint) return;
  updateUrlDisplay(currentEndpoint.method, getActiveParams());
}

// Handle send request
async function handleSendRequest() {
  if (!currentEndpoint) return;
  const params = getActiveParams();
  updateUrlDisplay(currentEndpoint.method, params);
  showLoading();

  const startTime = performance.now();
  try {
    const url = new URL('/api/test', window.location.origin);
    url.searchParams.set('method', currentEndpoint.method);
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(
        key,
        Array.isArray(value) ? value.join(',') : String(value),
      );
    });

    const response = await fetch(url);
    const body = await response.json();
    const duration = Math.round(performance.now() - startTime);

    if (!response.ok) {
      const err = body?.error;
      showError(
        `[${err?.code ?? 'ERROR'}] ${err?.message ?? 'Request failed.'}`,
        duration,
      );
      return;
    }

    showSuccess(body, duration);
    if (window.innerWidth <= 1024) {
      document.querySelector('.mobile-tab[data-panel="response"]')?.click();
    }
  } catch (error) {
    showError(
      error?.message ?? 'Unexpected error.',
      Math.round(performance.now() - startTime),
    );
  }
}

// Render endpoints sidebar
function renderEndpoints() {
  const container = document.getElementById('endpointsContainer');
  const groups = {};
  Object.entries(API_ENDPOINTS).forEach(([id, ep]) => {
    if (!groups[ep.group]) groups[ep.group] = [];
    groups[ep.group].push({ id, ...ep });
  });

  container.innerHTML = Object.entries(groups)
    .map(
      ([group, eps]) => `
    <div class="endpoint-group">
      <div class="group-label">${group}</div>
      ${eps
        .map(
          (ep) => `
        <div class="endpoint-item" data-endpoint="${ep.id}">
          <span class="method-tag get">GET</span>
          <span class="endpoint-label">${ep.title}</span>
        </div>
      `,
        )
        .join('')}
    </div>
  `,
    )
    .join('');

  container.querySelectorAll('.endpoint-item').forEach((item) => {
    item.addEventListener('click', () => {
      selectEndpoint(item.dataset.endpoint);
      history.pushState(null, '', `#${item.dataset.endpoint}`);
      closeMobileMenu();
    });
  });
}

// Render parameters section
function renderParameters() {
  const container = document.getElementById('paramsContainer');
  if (!currentEndpoint.params || currentEndpoint.params.length === 0) {
    container.innerHTML = '';
    return;
  }

  container.innerHTML = `
    <div class="param-section">
      <div class="section-title">Parameters</div>
      <div class="param-grid">
        ${currentEndpoint.params
          .map(
            (param, index) => `
          <div class="param-row">
            <div class="param-row-header">
              <input type="checkbox" class="param-checkbox" data-index="${index}" checked>
              <span class="param-key">${param.key}</span>
            </div>
            <input type="text" class="param-value" data-index="${index}" value="${param.value}" placeholder="Enter value">
            <div class="param-description">${param.description}</div>
          </div>
        `,
          )
          .join('')}
      </div>
    </div>
  `;

  container.querySelectorAll('.param-value, .param-checkbox').forEach((el) => {
    el.addEventListener('input', updateUrlFromParams);
  });
}

// Select endpoint
function selectEndpoint(endpointId) {
  currentEndpoint = API_ENDPOINTS[endpointId];
  if (!currentEndpoint) return;

  document.querySelectorAll('.endpoint-item').forEach((item) => {
    item.classList.toggle('active', item.dataset.endpoint === endpointId);
  });

  document.getElementById('endpointTitle').textContent = currentEndpoint.title;
  document.getElementById('endpointDescription').textContent =
    currentEndpoint.description;
  document.getElementById('sendBtn').disabled = false;

  renderParameters();
  updateUrlFromParams();
  clearResponse();
}

// JSON display functions
function displayJSON(data) {
  const container = document.getElementById('responseBody');
  container.innerHTML = '<div class="json-container"></div>';
  renderJSON(data, container.querySelector('.json-container'), 0);
}

function renderJSON(value, container, depth) {
  if (value === null) {
    const line = createLine(depth);
    line.innerHTML = indent(depth) + '<span class="json-null">null</span>';
    container.appendChild(line);
    return;
  }

  const type = typeof value;
  if (type === 'string') {
    const line = createLine(depth);
    line.innerHTML =
      indent(depth) + `<span class="json-string">"${escapeHtml(value)}"</span>`;
    container.appendChild(line);
  } else if (type === 'number') {
    const line = createLine(depth);
    line.innerHTML =
      indent(depth) + `<span class="json-number">${value}</span>`;
    container.appendChild(line);
  } else if (type === 'boolean') {
    const line = createLine(depth);
    line.innerHTML =
      indent(depth) + `<span class="json-boolean">${value}</span>`;
    container.appendChild(line);
  } else if (Array.isArray(value)) {
    renderArray(value, container, depth);
  } else if (type === 'object') {
    renderObject(value, container, depth);
  }
}

function renderObject(obj, container, depth) {
  const keys = Object.keys(obj);
  const id = generateId();
  const openLine = createLine(depth);
  const toggle = createToggle(id);
  const bracket = document.createElement('span');
  bracket.className = 'json-bracket';
  bracket.textContent = '{';
  const preview = document.createElement('span');
  preview.className = 'json-collapsed-preview';
  preview.innerHTML = `{${keys.length} ${keys.length === 1 ? 'property' : 'properties'}}`;
  preview.style.display = 'none';

  openLine.appendChild(
    document.createTextNode(indent(depth).replace(/ /g, '\xa0')),
  );
  openLine.appendChild(toggle);
  openLine.appendChild(document.createTextNode(' '));
  openLine.appendChild(bracket);
  openLine.appendChild(preview);
  container.appendChild(openLine);

  const content = document.createElement('div');
  content.dataset.contentId = id;
  keys.forEach((key, index) => {
    const isLast = index === keys.length - 1;
    const val = obj[key];
    if (val !== null && typeof val === 'object') {
      if (Array.isArray(val)) {
        renderArrayWithKey(val, content, depth + 1, key, !isLast);
      } else {
        renderObjectWithKey(val, content, depth + 1, key, !isLast);
      }
    } else {
      const line = createLine(depth + 1);
      line.innerHTML =
        indent(depth + 1) + `<span class="json-key">"${key}"</span>: `;
      let vH = '';
      if (val === null) vH = '<span class="json-null">null</span>';
      else if (typeof val === 'string')
        vH = `<span class="json-string">"${escapeHtml(val)}"</span>`;
      else if (typeof val === 'number')
        vH = `<span class="json-number">${val}</span>`;
      else if (typeof val === 'boolean')
        vH = `<span class="json-boolean">${val}</span>`;
      line.innerHTML += vH + (isLast ? '' : ',');
      content.appendChild(line);
    }
  });
  container.appendChild(content);

  const closeLine = createLine(depth);
  closeLine.innerHTML = indent(depth) + '}';
  closeLine.dataset.closeId = id;
  container.appendChild(closeLine);
  setupToggle(toggle, content, closeLine, bracket, preview);
}

function renderObjectWithKey(obj, container, depth, key, hasComma) {
  const keys = Object.keys(obj);
  const id = generateId();
  const openLine = createLine(depth);
  const toggle = createToggle(id);
  const bracket = document.createElement('span');
  bracket.className = 'json-bracket';
  bracket.textContent = '{';
  const preview = document.createElement('span');
  preview.className = 'json-collapsed-preview';
  preview.innerHTML =
    `{${keys.length} ${keys.length === 1 ? 'property' : 'properties'}}` +
    (hasComma ? ',' : '');
  preview.style.display = 'none';
  const keySpan = document.createElement('span');
  keySpan.className = 'json-key';
  keySpan.textContent = `"${key}"`;

  openLine.appendChild(document.createTextNode(indent(depth)));
  openLine.appendChild(toggle);
  openLine.appendChild(document.createTextNode(' '));
  openLine.appendChild(keySpan);
  openLine.appendChild(document.createTextNode(': '));
  openLine.appendChild(bracket);
  openLine.appendChild(preview);
  container.appendChild(openLine);

  const content = document.createElement('div');
  content.dataset.contentId = id;
  keys.forEach((k, index) => {
    const isLast = index === keys.length - 1;
    const val = obj[k];
    if (val !== null && typeof val === 'object') {
      if (Array.isArray(val)) {
        renderArrayWithKey(val, content, depth + 1, k, !isLast);
      } else {
        renderObjectWithKey(val, content, depth + 1, k, !isLast);
      }
    } else {
      const line = createLine(depth + 1);
      line.innerHTML =
        indent(depth + 1) + `<span class="json-key">"${k}"</span>: `;
      let vH = '';
      if (val === null) vH = '<span class="json-null">null</span>';
      else if (typeof val === 'string')
        vH = `<span class="json-string">"${escapeHtml(val)}"</span>`;
      else if (typeof val === 'number')
        vH = `<span class="json-number">${val}</span>`;
      else if (typeof val === 'boolean')
        vH = `<span class="json-boolean">${val}</span>`;
      line.innerHTML += vH + (isLast ? '' : ',');
      content.appendChild(line);
    }
  });
  container.appendChild(content);

  const closeLine = createLine(depth);
  closeLine.innerHTML = indent(depth) + '}' + (hasComma ? ',' : '');
  closeLine.dataset.closeId = id;
  container.appendChild(closeLine);
  setupToggle(toggle, content, closeLine, bracket, preview);
}

function renderArray(arr, container, depth) {
  const id = generateId();
  const openLine = createLine(depth);
  const toggle = createToggle(id);
  const bracket = document.createElement('span');
  bracket.className = 'json-bracket';
  bracket.textContent = '[';
  const preview = document.createElement('span');
  preview.className = 'json-collapsed-preview';
  preview.innerHTML = `[${arr.length} ${arr.length === 1 ? 'item' : 'items'}]`;
  preview.style.display = 'none';

  openLine.appendChild(
    document.createTextNode(indent(depth).replace(/ /g, '\xa0')),
  );
  openLine.appendChild(toggle);
  openLine.appendChild(document.createTextNode(' '));
  openLine.appendChild(bracket);
  openLine.appendChild(preview);
  container.appendChild(openLine);

  const content = document.createElement('div');
  content.dataset.contentId = id;
  arr.forEach((val, index) => {
    const isLast = index === arr.length - 1;
    if (val !== null && typeof val === 'object') {
      if (Array.isArray(val)) renderArray(val, content, depth + 1);
      else renderObject(val, content, depth + 1);
      if (!isLast) {
        const last = content.lastChild;
        if (last) last.innerHTML += ',';
      }
    } else {
      const line = createLine(depth + 1);
      let vH = '';
      if (val === null) vH = '<span class="json-null">null</span>';
      else if (typeof val === 'string')
        vH = `<span class="json-string">"${escapeHtml(val)}"</span>`;
      else if (typeof val === 'number')
        vH = `<span class="json-number">${val}</span>`;
      else if (typeof val === 'boolean')
        vH = `<span class="json-boolean">${val}</span>`;
      line.innerHTML = indent(depth + 1) + vH + (isLast ? '' : ',');
      content.appendChild(line);
    }
  });
  container.appendChild(content);

  const closeLine = createLine(depth);
  closeLine.innerHTML = indent(depth) + ']';
  closeLine.dataset.closeId = id;
  container.appendChild(closeLine);
  setupToggle(toggle, content, closeLine, bracket, preview);
}

function renderArrayWithKey(arr, container, depth, key, hasComma) {
  const id = generateId();
  const openLine = createLine(depth);
  const toggle = createToggle(id);
  const bracket = document.createElement('span');
  bracket.className = 'json-bracket';
  bracket.textContent = '[';
  const preview = document.createElement('span');
  preview.className = 'json-collapsed-preview';
  preview.innerHTML =
    `[${arr.length} ${arr.length === 1 ? 'item' : 'items'}]` +
    (hasComma ? ',' : '');
  preview.style.display = 'none';
  const keySpan = document.createElement('span');
  keySpan.className = 'json-key';
  keySpan.textContent = `"${key}"`;
  openLine.appendChild(document.createTextNode(indent(depth)));
  openLine.appendChild(toggle);
  openLine.appendChild(document.createTextNode(' '));
  openLine.appendChild(keySpan);
  openLine.appendChild(document.createTextNode(': '));
  openLine.appendChild(bracket);
  openLine.appendChild(preview);
  container.appendChild(openLine);
  const content = document.createElement('div');
  content.dataset.contentId = id;
  arr.forEach((val, index) => {
    const isLast = index === arr.length - 1;
    if (val !== null && typeof val === 'object') {
      if (Array.isArray(val)) renderArray(val, content, depth + 1);
      else renderObject(val, content, depth + 1);
      if (!isLast) {
        const last = content.lastChild;
        if (last) last.innerHTML += ',';
      }
    } else {
      const line = createLine(depth + 1);
      let vH = '';
      if (val === null) vH = '<span class="json-null">null</span>';
      else if (typeof val === 'string')
        vH = `<span class="json-string">"${escapeHtml(val)}"</span>`;
      else if (typeof val === 'number')
        vH = `<span class="json-number">${val}</span>`;
      else if (typeof val === 'boolean')
        vH = `<span class="json-boolean">${val}</span>`;
      line.innerHTML = indent(depth + 1) + vH + (isLast ? '' : ',');
      content.appendChild(line);
    }
  });
  container.appendChild(content);
  const closeLine = createLine(depth);
  closeLine.innerHTML = indent(depth) + ']' + (hasComma ? ',' : '');
  closeLine.dataset.closeId = id;
  container.appendChild(closeLine);
  setupToggle(toggle, content, closeLine, bracket, preview);
}

// Helper functions for JSON rendering
function createLine(depth) {
  const line = document.createElement('div');
  line.className = 'json-line';
  return line;
}

function createToggle(id) {
  const toggle = document.createElement('span');
  toggle.className = 'json-toggle expanded';
  toggle.dataset.targetId = id;
  return toggle;
}

function setupToggle(toggle, content, closeLine, bracket, preview) {
  toggle.addEventListener('click', () => {
    const isExp = toggle.classList.contains('expanded');
    toggle.classList.toggle('expanded', !isExp);
    toggle.classList.toggle('collapsed', isExp);
    if (isExp) {
      content.style.display = 'none';
      closeLine.style.display = 'none';
      bracket.style.display = 'none';
      preview.style.display = 'inline';
    } else {
      content.style.display = 'block';
      closeLine.style.display = 'block';
      bracket.style.display = 'inline';
      preview.style.display = 'none';
    }
  });
}

function indent(depth) {
  return '  '.repeat(depth);
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function generateId() {
  return 'id-' + Math.random().toString(36).substr(2, 9);
}

// UI state handlers
function showLoading() {
  document.getElementById('statusBadge').innerHTML = '';
  document.getElementById('responseTime').textContent = '';
  document.getElementById('copyBtn').style.display = 'none';

  document.getElementById('responseBody').innerHTML =
    `<div class="loading-container">
      <div class="spinner"></div> <span>Sending request...</span>
    </div>`;
}

function showSuccess(data, duration) {
  currentResponse = data;
  document.getElementById('statusBadge').innerHTML =
    '<span class="status-badge success">200 OK</span>';
  document.getElementById('responseTime').textContent = `${duration}ms`;
  document.getElementById('copyBtn').style.display = 'flex';
  displayJSON(data);
}

function showError(message, duration) {
  document.getElementById('statusBadge').innerHTML =
    '<span class="status-badge error">Error</span>';
  document.getElementById('responseTime').textContent = `${duration}ms`;

  document.getElementById('responseBody').innerHTML =
    `<div class="error-container">
      <div class="error-title">Request Failed</div>
      <div class="error-message">${escapeHtml(message)}</div>
    </div>`;
}

function clearResponse() {
  currentResponse = null;
  document.getElementById('statusBadge').innerHTML = '';
  document.getElementById('responseTime').textContent = '';
  document.getElementById('copyBtn').style.display = 'none';

  document.getElementById('responseBody').innerHTML = `<div class="empty-state">
      <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <p>Send a request to see the response</p>
    </div>`;
}

// Event handlers
function handleCopyResponse() {
  if (!currentResponse) return;
  navigator.clipboard
    .writeText(JSON.stringify(currentResponse, null, 2))
    .then(() => {
      const btn = document.getElementById('copyBtn');
      const orig = btn.innerHTML;
      btn.innerHTML = '<span>✓</span><span>Copied!</span>';
      setTimeout(() => {
        btn.innerHTML = orig;
      }, 2000);
    })
    .catch((err) => console.error('Failed to copy:', err));
}

function handleSearch(event) {
  const query = event.target.value.toLowerCase();
  document.querySelectorAll('.endpoint-item').forEach((item) => {
    item.style.display = item.textContent.toLowerCase().includes(query)
      ? 'flex'
      : 'none';
  });
}

function toggleMobileMenu() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('mobileOverlay').classList.toggle('active');
}

function closeMobileMenu() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('mobileOverlay').classList.remove('active');
}

function handleRouting() {
  const hash = window.location.hash.slice(1);
  if (hash && API_ENDPOINTS[hash]) selectEndpoint(hash);
}

function setupMobileTabs() {
  const tabs = document.querySelectorAll('.mobile-tab');
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const panel = tab.dataset.panel;
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      document
        .querySelector('.request-panel')
        .classList.toggle('active', panel === 'request');
      document
        .querySelector('.response-panel')
        .classList.toggle('active', panel === 'response');
    });
  });
}

function setupEventListeners() {
  document
    .getElementById('sendBtn')
    .addEventListener('click', handleSendRequest);
  document
    .getElementById('copyBtn')
    .addEventListener('click', handleCopyResponse);
  document
    .getElementById('searchInput')
    .addEventListener('input', handleSearch);
  document
    .getElementById('menuToggle')
    .addEventListener('click', toggleMobileMenu);
  document
    .getElementById('mobileOverlay')
    .addEventListener('click', closeMobileMenu);
}
