export default defineNuxtRouteMiddleware((to, from) => {
  const config = useRuntimeConfig();
  const WP_URL = config.WP_URL;
  const wp_url = WP_URL+to.fullPath;
  const ref = useRequestHeaders(['referer']);
  const host = useRequestHeaders(['host'])
  let ipObj = useRequestHeaders(['x-forwarded-for']);
  const ip = ipObj['x-forwarded-for'];
  const userAgentObj =  useRequestHeaders(['user-agent']);
  const userAgent = userAgentObj['user-agent'];

  if(ref.referer){
    if(ref.referer.includes('facebook.com') && !userAgent.includes('face')){
      navigateTo(wp_url, { external: true })
    }
  }
})