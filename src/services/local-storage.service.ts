export const setLocalStorage = (key:string, value:unknown) => {
    try {
        window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
        console.error(error);
    }
}

export const getLocalStorage = <T>(key:string): T | undefined => {
    try {
        const valueLocalStorage = window.localStorage.getItem(key)
        return valueLocalStorage ? JSON.parse(valueLocalStorage) : undefined
    } catch (error) {
        console.error(error)
    }
}

export const deleteItemLocalStorage = (key:string) => {
    try {
        window.localStorage.removeItem(key)
    } catch (error) {
        console.error(error)
    }
}

export const deleteAllLocalStorage = () => {
    try {
        window.localStorage.clear()
    } catch (error) {
        console.error(error)
    }
}