# AI Chat — Backend

Node.js + Express + Socket.IO API for the AI Chat app. It handles Google
authentication, real-time chat, Gemini reply suggestions, and Razorpay
payments.

The frontend (Next.js) lives in a **separate repository** and talks to this
server over HTTP and WebSocket.

## Tech stack

- Node.js + Express
- Socket.IO (real-time messaging)
- google-auth-library (verifies Google login tokens)
- jsonwebtoken (app session tokens)
- @google/generative-ai (Gemini)
- Razorpay (payments)

## Project structure

```
server.js          entry point
app.js             App class – express, socket.io, routes
config/env.js      environment variables
models/User.js     user shape built from the Google profile
services/          auth, gemini and payment logic
controllers/       request handlers
routes/            route definitions
sockets/           socket.io events
```

MVC layout: routes map URLs to controllers, controllers handle the
request/response, and services hold the actual logic (Google, Gemini,
Razorpay).

## Setup

1. Install dependencies:

   ```
   npm install
   ```

2. Create a `.env` file in the project root:

   ```
   PORT=5000
   GOOGLE_CLIENT_ID=your-google-oauth-client-id
   JWT_SECRET=any-long-random-string
   GEMINI_API_KEY=your-gemini-api-key
   RAZORPAY_KEY_ID=rzp_test_xxxxxxxx
   RAZORPAY_KEY_SECRET=your-razorpay-secret
   ```

   - Google client ID — Google Cloud Console → Credentials (OAuth Web client)
   - Gemini key — Google AI Studio
   - Razorpay keys — Razorpay Dashboard → API Keys (test mode)

3. Run:

   ```
   npm run dev     # development (nodemon)
   npm start       # production
   ```

   The server starts on `http://localhost:5000`.

## API

**Auth**

`POST /auth/google` — body `{ credential }` (Google ID token). Verifies the
token and returns `{ token, user }`.

**AI**

`POST /suggest-reply` — body `{ message }`. Returns `{ success, reply }` with a
Gemini-generated reply.

**Payments**

`POST /payment/order` — creates a Razorpay order (₹499) and returns it.

`POST /payment/verify` — body `{ orderId, paymentId, signature, userId }`.
Verifies the Razorpay signature server-side; on success emits
`premium_unlocked` over Socket.IO and returns `{ success: true }`.

## Socket.IO events

| Event | Direction | Payload | Purpose |
|-------|-----------|---------|---------|
| `send_message` | client → server | `{ id, text, senderId, senderName, senderPicture, time }` | send a chat message |
| `receive_message` | server → everyone | same as above | broadcast to the room |
| `premium_unlocked` | server → everyone | `{ userId }` | sent after a verified payment so that user's UI unlocks instantly |
