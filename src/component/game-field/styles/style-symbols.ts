interface IStyleSymbol {
    [key: string]: string
}

export const styleSymbol: IStyleSymbol = {
    default: "bg-slate-600",
    onSite: "bg-green-500",
    inWord: "bg-yellow-500",
    noSymbol: "bg-slate-600 opacity-50"
}