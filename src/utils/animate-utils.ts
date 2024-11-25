export function addPointClassName(className: string) {
    return ".".concat(className)
}

export function isAnimate(className: string ) {
    const loadingAnimate = document.querySelector(className)
    return loadingAnimate
}