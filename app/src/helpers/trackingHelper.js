const isBrowser = typeof window !== `undefined`

var dataLayer = isBrowser ? window.dataLayer || [] : []

const createEvent = (name, element, action, metaData = {}) => {
    try {
        dataLayer.push({
            ...metaData, event: name, element, action
        })
    } catch (err) {
        console.error(err)
    }
}

export { createEvent }