# Look over the providers and consumers again - more concise notes

## Expo Router Dynamic Route Type Error
**Error:** Type '`/${string}/menu/${number}`' is not assignable to type 'RelativePathString | ExternalPathString...'
**Cause:** TypeScript cannot validate dynamically constructed URLs at compile time. 
Expo Router generates a strict list of valid routes and rejects anything it can't verify.
**Fix:** Add `as any` to the dynamic href:
```tsx
<Link href={`/${segments[0]}/menu/${product.id}` as any} asChild>
```
**Note:** `as any` is acceptable here — you know the path is valid at runtime even 
if TypeScript can't verify it at compile time. Avoid `as any` for actual data and logic.