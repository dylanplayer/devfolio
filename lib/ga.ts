export const pageview = (url:string) => {
  window.gtag('config', process.env.GOOGLE_ANALYTICS, {
    page_path: url,
  })
}
