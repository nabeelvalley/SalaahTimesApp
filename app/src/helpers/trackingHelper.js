var dataLayer = window.dataLayer || []

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