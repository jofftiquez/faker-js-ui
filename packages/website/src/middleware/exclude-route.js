import { abortNavigation } from '#app';

export default defineNuxtRouteMiddleware((to, from) => {
  const excludeRoutes = [];
  if (excludeRoutes.includes(to.name)) {
    return abortNavigation();
  }
  return navigateTo('/');
});
