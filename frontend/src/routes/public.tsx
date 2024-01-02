import { lazyImport } from "../utils/lazyImport"

const { AuthLayout } = lazyImport(
    () => import("../features/auth/layout"),
    "AuthLayout"
)

export const PublicRoutes = () => {
    return AuthLayout
}
