import fs from "node:fs"
import slugify from "slugify"
import xss from "xss"
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

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true })
  /* Sanitize the dangerously set instructions to avoid XSS Attack */
  meal.instructions = xss(meal.instructions)

  const extension = meal.image.name.split(".").pop()

  const fileName = `${meal.slug}.${extension}`

  const stream = fs.createWriteStream(`/public/images/${fileName}`)
  const bufferedImage = await meal.image.arrayBuffer()

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) throw new Error("Saving image failed!", { wow: error.message })
  })

  meal.image = `/images/${fileName}`

  /* Storing Data in DB */
  /* NOTE: order in values should be same as above */
  db.prepare(
    `
      INSERT INTO meals
      (title, summary, instructions, creator, creator_email, image, slug)
      VALUES (
        @title,
        @summary,
        @instructions,
        @creator,
        @creator_email,
        @image,
        @slug
      )
    `
  ).run(meal)
}
