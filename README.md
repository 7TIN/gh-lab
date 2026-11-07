# gh-lab

To install dependencies:

```bash
bun install
```

To run (development, with watch mode):

```bash
bun run dev
```

To build:

```bash
bun run build
```

To start the built server:

```bash
bun run start
```

The server listens on `PORT` (default `3000`) and exposes:

- `GET /` – basic service info
- `GET /health` – health status with uptime
- `GET /health/live` – liveness probe

To type check:

```bash
bun check
```

This project was created using `bun init` in bun v1.4.3. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
