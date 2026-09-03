# 📘 Supabase Notes — supabase-client.js

## 1. Import createClient

```js
import { createClient } from "@supabase/supabase-js";
111

- createClient() creates the Supabase client that our React application will use to communicate with Supabase.
```

## 2. Get Supabase URL from Environment Variables

```js
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
```

- The Supabase project URL is stored in an environment variable.

```js
VITE_SUPABASE_URL
        ↓
Supabase Project URL
```

## Why environment variables?

- Instead of directly writing configuration values into our source code, we keep them in the .env file.

## 3. Get Supabase Key

```js
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
```

- This retrieves the Supabase anon key from the environment.

- For your current learning setup:

```js
.env
 ├── VITE_SUPABASE_URL
 └── VITE_SUPABASE_ANON_KEY
 ```

## Important security point

- The anon/publishable key is designed to be used by the frontend.

- But a service-role/secret key must NEVER be placed in React frontend code or exposed to users.

## 4. Create the Supabase Client

```js
export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);
```

- This creates and exports the Supabase client.

- Then anywhere in your application:

```js
import { supabase } from "./supabse-client.js";
```

- you can use:

```js
supabase.auth
supabase.from(...)
supabase.storage
```

- So conceptually:

```js
.env
 │
 ├── Supabase URL
 └── Supabase Key
       ↓
createClient()
       ↓
supabase client
       ↓
┌───────────────┬──────────────┬──────────────┐
│     Auth      │   Database   │   Storage    │
└───────────────┴──────────────┴──────────────┘
```

## ⭐ Notebook Version

- supabase-client.js

```js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);
```

## Remember:

- createClient(URL, KEY) creates the Supabase client used by the application.

- import.meta.env.VITE_* reads environment variables in a Vite React application.

- Frontend: Supabase URL + anon/publishable key

- Backend only: service-role/secret keys

## 🔑 APIs/concepts from this file

| Concept                  | Purpose                             |
| ------------------------ | ----------------------------------- |
| `createClient()`         | Creates Supabase client             |
| `import.meta.env`        | Accesses Vite environment variables |
| `VITE_SUPABASE_URL`      | Supabase project URL                |
| `VITE_SUPABASE_ANON_KEY` | Frontend Supabase key               |
| `supabase`               | Reusable client throughout the app  |
