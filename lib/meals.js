import sql from "better-sqlite3"
import slugify from "slugify"
import xss from "xss"

const db = sql("meals.db")

export async function getMeals() {
  await new Promise((res) => setTimeout(res, 2000))
  return db
    .prepare(
      `
    SELECT * from meals
  `
    )
    .all()
}

export function getMeal(slug) {
  return db
    .prepare(
      `
      SELECT * from meals where slug = ?
    `
    )
    .get(slug)
}

export function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true })
  /* Sanitize the dangerously set instructions to avoid XSS Attack */
  meal.instructions = xss(meal.instructions)
}
