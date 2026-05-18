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

## Input Validation — Sign In / Sign Up

**What it does:** Checks inputs are valid before running any logic (e.g. a database call). Returns `false` early if anything fails, showing an error message.

**Email regex:** Checks for `something@something.something` format.
```tsx
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
    setError('Please enter a valid email address');
    return false;
}
```

**Password regex:** Uses lookaheads to check the whole string without consuming characters.
```tsx
const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
if (!passwordRegex.test(password)) {
    setError('Password must be at least 8 characters and include a number and special character');
    return false;
}
```
- `(?=.*[0-9])` — must contain a digit
- `(?=.*[!@#...])` — must contain a special character
- `.{8,}` — must be at least 8 characters

**Note:** `validateInputs()` returns `true` or `false`. The calling function checks it and returns early if validation fails:
```tsx
if (!validateInputs()) return;
```

## Missing Package — dayjs
**Error:** `Unable to resolve module dayjs`
**Cause:** dayjs is a third-party package and isn't built into React Native, so it needs installing.
**Fix:**
```bash
npx expo install dayjs
npx expo start --clear
```

---

## dayjs `fromNow()` is not a function
**Error:** `(0, dayjs.default)(order.created_at).fromNow is not a function (it is undefined)`
**Cause:** `fromNow()` comes from the `relativeTime` plugin which isn't included in dayjs by default.
**Fix:** Add these lines at the very top of the file before any `fromNow()` is called:
```tsx
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
```

---

## columnWrapperStyle on Single Column FlatList
**Error:** `columnWrapperStyle not supported for single column lists`
**Cause:** `columnWrapperStyle` only works when `numColumns` is 2 or more.
**Fix:** Either remove `columnWrapperStyle` if you only need a single column, or add `numColumns`:
```tsx
<FlatList
    numColumns={2}
    columnWrapperStyle={{ gap: 10 }}
/>
```