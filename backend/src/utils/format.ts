import CustomError from "./cusromError"

export const toPascalCase = (str: string) => {
    try {
        return str
            .toLowerCase()
            .replace(
                /\w\S*/g,
                (match: string) =>
                    match.charAt(0).toUpperCase() +
                    match.substring(1, match.length).toLocaleLowerCase()
            )
    } catch (error: any) {
        throw new CustomError(
            "Error in convering the string to pastcal case.",
            500
        )
    }
}

