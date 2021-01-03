To run the server:

```bash
npm run dev
```

There's a little issue about the queries: Somehow they don't return the updated values after mutations
They do work on localhost:4000/graphql (playground). I suspect it has something to do with SSR.
