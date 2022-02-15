/**
 * @description gets the subRoute path for the given route name
 * @param route parent route
 * @param name name of the sub route
 * @returns {string} path
 */
export const useGetSubPath = (route, name) => {
  return route.subRoutes.find(r => r.name.toLowerCase() === name.toLowerCase())?.path
}