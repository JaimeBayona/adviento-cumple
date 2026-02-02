/* export function getOwnerToken(): string | null {
  const params = new URLSearchParams(window.location.search);
  return params.get("token");
} */

  export function getOwnerToken(): string | null {
  const params = new URLSearchParams(window.location.search)
  const token = params.get("token")

  if (!token || token.trim() === "") return null

  const ownerToken = import.meta.env.VITE_OWNER_TOKEN
  const devToken = import.meta.env.VITE_DEV_TOKEN

  if (token === ownerToken || token === devToken) {
    return token
  }

  return "INVALID"
}
