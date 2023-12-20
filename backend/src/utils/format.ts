import CustomError from "../errorHandler/customError"

export const toPascalCase = (str: string | any) => {
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
