# App ideas & personal portfolio

## Pages

- `/ideas`: visitor form and up to 30 newest approved ideas, with category filters.
- `/admin/ideas`: private owner review queue. Publish, reject/unpublish, or permanently delete submissions. Each status tab displays up to 100 newest ideas.
- `/portfolio`: the personal portfolio with the main web stack, introductory technologies, six website experiments, and existing apps. Edit `lib/portfolio.js` for skills and website projects, or `pages/portfolio.js` for the profile copy.
- The home page, navigation, and footer link to both public pages.

Visitors do not need accounts. Every submission is pending until the owner approves it. No fake community ideas are seeded. Submission does not promise development.

## Configuration

Copy `.env.example` to `.env.local` (Next.js also accepts `.env`). All real environment files are Git-ignored. Keep credentials out of chat and source code.

1. **MongoDB:** set `MONGODB_URI` and optionally `MONGODB_DB` (default `kefcore`). For Atlas, create a database user with read/write access only to this database and configure network access so the deployed server can connect. Credentials remain server-side; never prefix them with `NEXT_PUBLIC_`.
2. **Turnstile:** create a Managed widget in [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/get-started/). Allow your production hostname and localhost if testing locally. Set its site key as `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and its secret as `TURNSTILE_SECRET_KEY`. The widget sends the `submit-idea` action; the server checks success, action, and the canonical hostname. There is no production bypass.
3. **Secrets:** generate two different random values, each at least 32 characters, for `IDEAS_IP_HASH_SECRET` and `NEXTAUTH_SECRET`. For example, run `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` twice. Rotating the IP secret resets the effective quota; rotating the auth secret invalidates sessions.
4. **Canonical URL:** set `NEXTAUTH_URL=http://localhost:3000` locally and `https://kefka.vercel.app` in production (or the actual canonical domain). Submit from that hostname. Preview deployments need their own matching configuration.
5. **Owner GitHub sign-in:** create a [GitHub OAuth app](https://github.com/settings/developers). Set callback URL to `http://localhost:3000/api/auth/callback/github` locally or `https://kefka.vercel.app/api/auth/callback/github` in production. GitHub permits one callback URL per OAuth app, so use separate apps for local and production. Put the client ID/secret in `GITHUB_ID` and `GITHUB_SECRET`. Set `IDEAS_ADMIN_GITHUB_ID` to your numeric GitHub ID (the `id` field at `https://api.github.com/users/YOUR_USERNAME`). Usernames and emails do not grant access.
6. Add the same production values to Vercel environment settings and redeploy. Next.js embeds the public widget key at build time; changing it requires a rebuild.

The form stays closed until the database, bot check, secrets, and owner sign-in are all configured. This prevents accepting unreviewable or unprotected submissions. Missing MongoDB credentials do not prevent the site from building.

## Spam protection and review

- Server-side Turnstile verification; failed verification does not save an idea.
- Maximum three valid submission attempts per IP per UTC calendar day and six form attempts per minute. Limits are atomic MongoDB counters, shared across deployments/instances rather than process memory. Duplicates count toward the daily quota.
- Raw IP addresses are never persisted by this feature. A secret-keyed HMAC identifies the rate-limit bucket. IPv6 addresses are grouped by /64. Shared Wi-Fi connections share a quota, and determined attackers can change networks; rate limits alone are not absolute protection.
- Vercel's trusted `x-vercel-forwarded-for` header is used only on Vercel. Local/self-hosted deployments use the socket address and ignore untrusted forwarded headers. If you later self-host behind a proxy, configure trusted proxy handling explicitly rather than trusting arbitrary headers.
- Rate-limit records expire automatically roughly 24–48 hours after creation via a TTL index.
- Honeypot, same-origin writes, small request body limits, strict input validation, no links/HTML, and normalized duplicate detection.
- Pending/rejected ideas never appear in the public API. No raw moderation data or security hashes appear in the public board.
- Explicit rules prohibit adult content, hate, harassment, offensive content, spam, ads, links, and private information. Human review enforces content rules before publication; there is no unreliable claim of automatic content classification.
- NextAuth GitHub sign-in is restricted to the configured owner's stable ID. Every moderation request rechecks the session and current owner configuration. Mutations also enforce same-origin requests.
- No IP hash is kept with the idea itself. Published titles, text, categories, nicknames, and dates are public. Deletion requests can be handled through the contact email and the private review page. Website privacy disclosures are in `/privacy#website`.

## Storage

On first connection, the application creates `ideas` (unique content digest and status/date indexes) and `idea_limits` (TTL expiry index). Ensure the database user can create indexes.

Ideas are retained until deleted. Rejection hides an idea but retains it in the private queue. Permanent deletion removes the record and its duplicate digest.

## Verification

Run `npm run test:ideas` for server security and database concurrency checks. Tests use an isolated temporary MongoDB via `mongodb-memory-server` (first run downloads MongoDB), not your configured database. They mock Turnstile responses rather than bypassing the real server check. Run `npm run build` for the production build.

After adding real credentials: submit an idea, check it is absent from the public board, sign into `/admin/ideas`, publish it, check the board, unpublish/delete it, and confirm that another GitHub account cannot sign in. Live Atlas, Cloudflare, and GitHub connections require your keys and are not covered by the isolated tests.

The project was updated from Next.js 14 to the patched 15.5 line because the dependency audit found critical framework vulnerabilities. React 18 and the Pages Router are retained. Restart any running development server after installing updated dependencies. Existing CSS/tooling audit advisories remain; this is not a zero-vulnerability dependency audit.
