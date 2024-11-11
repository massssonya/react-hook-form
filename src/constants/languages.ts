export enum Languages {
    RU = "RU",
    EN = "EN"
}

export const LANG_REGEX = {
    [Languages.RU]: /^[а-яА-Я]+$/,
    [Languages.EN]: /^[a-zA-Z]+$/
}