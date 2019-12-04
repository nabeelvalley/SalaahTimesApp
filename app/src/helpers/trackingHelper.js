var dataLayer = window.dataLayer || []

const createEvent = (name, element, action, metaData = {}) => {
    dataLayer.push({
        ...metaData, event: name, element, action
    })
}

export { createEvent }