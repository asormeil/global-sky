const storageKey = "global_sky_user_token"

export class AppStorage {
    getToken(): string | null {
        const key = localStorage.getItem(storageKey)
        if (key) {
            return JSON.stringify(key as string)
        }
        return null
    }
    setToken(token: string) {
        localStorage.setItem(storageKey, JSON.stringify(token))
    }

    clearToken() {
        localStorage.removeItem(storageKey)
    }
}
