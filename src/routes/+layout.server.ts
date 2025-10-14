import type { LayoutServerLoad } from "../$types"

export const load: LayoutServerLoad = async (event) => {
  console.log(`call me`)
  const session = await event.locals.auth()

  return {
    session,
  }
}