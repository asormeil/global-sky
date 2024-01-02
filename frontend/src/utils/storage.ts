const storageKey = "global_sky_user_token"

export class AppStorage {
    getToken(): string {
        return JSON.stringify(
            window.localStorage.getItam(`${storageKey}`) as string
        )
    }
    setToken(token: string) {
        window.localStorage.setItem(storageKey, JSON.stringify(token))
    }

    clearToken() {
        window.localStorage.removeItem(storageKey)
    }
}
