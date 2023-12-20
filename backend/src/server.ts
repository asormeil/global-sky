import app from "./app"
import { PORT } from "./configs/appConfig"

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})
