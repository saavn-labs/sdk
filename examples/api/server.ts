import { createServer } from 'http';
import { existsSync, statSync, readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join, extname } from 'path';

/**
 * Example API server demonstrating JioSaavn SDK usage patterns.
 *
 * @requires Build the SDK before running: npm run build
 * @example
 * // All methods accept object-based parameters
 * Album.getById({ albumId: '123' })
 * Song.search({ query: 'test', limit: 10 })
 * Artist.getTrending({ language: 'hindi' })
 */
import { Album, Artist, Playlist, Song, Extras } from '../../dist';
import { SDKError } from '../../dist/helpers/errors';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const PUBLIC_DIR = join(__dirname, 'public');
const PORT = 3000;
const MIME_TYPES: Record<string, string> = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

/**
 * Removes undefined and empty string values from an object.
 *
 * @param input - The input object to clean
 * @returns A new object with only defined, non-empty values
 */
function cleanParams(input: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(input).filter(
      ([, value]) => value !== undefined && value !== '',
    ),
  );
}

/**
 * Converts various boolean representations to a boolean value.
 *
 * @param value - The value to parse
 * @returns The parsed boolean value, defaults to false for invalid input
 */
function parseBoolean(value: unknown): boolean {
  if (value === true) return true;
  if (value === false) return false;
  if (value === 'true') return true;
  if (value === 'false') return false;
  return false;
}

/**
 * Parses a comma-separated string into an array of trimmed strings.
 *
 * @param value - The string to parse
 * @returns An array of non-empty strings
 */
function parseCommaSeparatedStringToArray(value: unknown): string[] {
  if (typeof value !== 'string') {
    return [];
  }
  return value
    .split(',')
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
}

/**
 * Registry of available SDK methods with their parameter mappings.
 * All methods accept a single object parameter with named properties.
 *
 * @constant
 * @type {Record<string, (params: any) => Promise<any>>}
 */
const METHODS: Record<string, (params: any) => Promise<any>> = {
  // Album Module
  'Album.getById': ({ albumId }) => Album.getById({ albumId }),

  'Album.getByPermalink': ({ permalink }) =>
    Album.getByPermalink({ permalink }),

  'Album.getRecommendations': ({ albumId }) =>
    Album.getRecommendations({ albumId }),

  'Album.getTrending': ({ language }) => Album.getTrending({ language }),

  'Album.search': ({ query, limit, offset }) =>
    Album.search({ query, limit, offset }),

  // Artist Module
  'Artist.getById': ({ artistId }) => Artist.getById({ artistId }),

  'Artist.getByPermalink': ({ permalink }) =>
    Artist.getByPermalink({ permalink }),

  'Artist.search': ({ query, limit, offset }) =>
    Artist.search({ query, limit, offset }),

  // Playlist Module
  'Playlist.getById': ({ playlistId }) => Playlist.getById({ playlistId }),

  'Playlist.getByPermalink': ({ permalink }) =>
    Playlist.getByPermalink({ permalink }),

  'Playlist.getRecommendations': ({ playlistId }) =>
    Playlist.getRecommendations({ playlistId }),

  'Playlist.getTrending': ({ language }) => Playlist.getTrending({ language }),

  'Playlist.search': ({ query, limit, offset }) =>
    Playlist.search({ query, limit, offset }),

  // Song Module
  'Song.getById': ({ songIds }) => Song.getById({ songIds }),

  'Song.getByPermalink': ({ permalink }) => Song.getByPermalink({ permalink }),

  'Song.getByStationId': ({ stationId, limit, next }) =>
    Song.getByStationId({ stationId, limit, next }),

  'Song.getRecommendations': ({ songId }) =>
    Song.getRecommendations({ songId }),

  'Song.getTrending': ({ language }) => Song.getTrending({ language }),

  'Song.search': ({ query, limit, offset }) =>
    Song.search({ query, limit, offset }),

  'Song.experimental.fetchStreamUrls': ({
    encryptedUrl,
    runtime,
    acknowledge,
  }) =>
    Song.experimental.fetchStreamUrls(
      encryptedUrl,
      runtime,
      parseBoolean(acknowledge),
    ),

  // Extras Module
  'Extras.searchAll': ({ query }) => Extras.searchAll({ query }),

  'Extras.getTrendingAll': () => Extras.getTrendingAll(),

  'Extras.createEntityStation': ({ songIds }) =>
    Extras.createEntityStation({
      songIds: parseCommaSeparatedStringToArray(songIds),
    }),

  'Extras.createFeaturedStation': ({ language, name }) =>
    Extras.createFeaturedStation({ language, name }),
};

/**
 * HTTP server handling API requests and serving static files.
 *
 * Routes:
 * - GET / or /index.html - Serves the HTML documentation page
 * - GET /api/test - Executes SDK methods with provided parameters
 * - OPTIONS * - CORS preflight support
 *
 * @listens {number} PORT - The port number to listen on
 */
const server = createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  const url = new URL(req.url ?? '/', `http://${req.headers.host}`);

  if (!url.pathname.startsWith('/api')) {
    try {
      const safePath = join(PUBLIC_DIR, decodeURIComponent(url.pathname));
      if (!safePath.startsWith(PUBLIC_DIR)) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
      }

      let filePath = safePath;

      if (existsSync(filePath) && statSync(filePath).isDirectory()) {
        filePath = join(filePath, 'index.html');
      }

      if (!existsSync(filePath)) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
        return;
      }

      const ext = extname(filePath);
      const contentType = MIME_TYPES[ext] ?? 'application/octet-stream';

      res.writeHead(200, { 'Content-Type': contentType });
      res.end(readFileSync(filePath));
      return;
    } catch {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
      return;
    }
  }

  /**
   * API endpoint for SDK methods.
   * Accepts query parameters directly without nested JSON encoding.
   *
   * @param {string} method - The SDK method to call (e.g., 'Album.getById')
   * @param {string} [albumId] - Album ID for Album methods
   * @param {string} [artistId] - Artist ID for Artist methods
   * @param {string} [playlistId] - Playlist ID for Playlist methods
   * @param {string} [songId] - Song ID for Song methods
   * @param {string} [songIds] - Comma-separated song IDs or single ID
   * @param {string} [stationId] - Station ID for station methods
   * @param {string} [permalink] - Permalink for any entity
   * @param {string} [query] - Search query string
   * @param {string} [language] - Language code (hindi, english, etc.)
   * @param {string} [name] - Name for featured stations
   * @param {number} [limit] - Result limit for pagination
   * @param {number} [offset] - Result offset for pagination
   * @param {string} [next] - Next page token
   * @param {string} [encryptedUrl] - Encrypted media URL
   * @param {string} [runtime] - Runtime parameter
   * @param {string} [acknowledge] - Acknowledgment flag (true/false)
   *
   * @returns {Object} Success response with data and metadata
   * @returns {Object} Error response with error details and metadata
   */
  if (url.pathname === '/api/test') {
    const startTime = Date.now();

    try {
      const method = url.searchParams.get('method');

      const rawParams: Record<string, unknown> = {};
      url.searchParams.forEach((value, key) => {
        if (key !== 'method') {
          if (key === 'limit' || key === 'offset') {
            rawParams[key] = parseInt(value, 10);
          } else {
            rawParams[key] = value;
          }
        }
      });

      const params = cleanParams(rawParams);

      if (!method || !(method in METHODS)) {
        throw new Error(
          `Unknown method: ${method}. Available methods: ${Object.keys(METHODS).join(', ')}`,
        );
      }

      console.log(`\nAPI Request`);
      console.log(`   Method: ${method}`);
      console.log(`   Params:`, params);

      const result = await METHODS[method](params);
      const duration = Date.now() - startTime;

      console.log(`Success (${duration}ms)`);

      const response = {
        success: true,
        method,
        params,
        data: result,
        meta: {
          timestamp: new Date().toISOString(),
          duration: `${duration}ms`,
          sdk: 'JioSaavn SDK',
        },
      };

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(response, null, 2));
    } catch (error) {
      const duration = Date.now() - startTime;

      console.error(`Error (${duration}ms):`, error);

      res.writeHead(500, { 'Content-Type': 'application/json' });

      if (error instanceof SDKError) {
        res.end(
          JSON.stringify(
            {
              success: false,
              error: {
                name: error.name,
                code: error.code,
                message: error.message,
                details: error.details,
              },
              meta: {
                timestamp: new Date().toISOString(),
                duration: `${duration}ms`,
              },
            },
            null,
            2,
          ),
        );
        return;
      }

      res.end(
        JSON.stringify(
          {
            success: false,
            error: {
              name: 'Error',
              message: (error as Error).message,
              stack:
                process.env.NODE_ENV === 'development'
                  ? (error as Error).stack
                  : undefined,
            },
            meta: {
              timestamp: new Date().toISOString(),
              duration: `${duration}ms`,
            },
          },
          null,
          2,
        ),
      );
    }
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not Found');
});

server.listen(PORT, () => {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`JioSaavn SDK - Example API Server`);
  console.log(`${'='.repeat(60)}`);
  console.log(`\nPurpose: Demonstrates proper SDK method usage`);
  console.log(`   - All methods use object-based parameters`);
  console.log(`   - Enhanced error handling and logging`);
  console.log(`   - Production-ready patterns\n`);
  console.log(`Server: http://localhost:${PORT}`);
  console.log(`Docs:   http://localhost:${PORT}/index.html\n`);
  console.log(`${'='.repeat(60)}`);
  console.log(`\nExample Usage:`);
  console.log(`   Album.getById({ albumId: "123" })`);
  console.log(`   Song.search({ query: "test", limit: 10 })`);
  console.log(`   Artist.getTrending({ language: "hindi" })\n`);
  console.log(`Available Methods: ${Object.keys(METHODS).length} total`);
  console.log(`Ready to accept requests...\n`);
});
