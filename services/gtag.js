export const { GA_TRACKING_ID } = process.env

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
  if (typeof window.gtag !== 'function') return
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
  if (typeof window.gtag !== 'function') return
  window.gtag('event', action, {
    value,
    event_category: category,
    event_label: label,
  })
}
