import sql from "better-sqlite3"

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
