'use client'

import ReactDOM from 'react-dom'

export function PreloadResources() {
    // ReactDOM.preload('...', { as: '...' })
    // ReactDOM.preconnect('...', { crossOrigin: true })
    ReactDOM.preconnect('https://fonts.googleapis.com')
    ReactDOM.preconnect('https://fonts.gstatic.com')
    // ReactDOM.prefetchDNS('...')

    return null
}