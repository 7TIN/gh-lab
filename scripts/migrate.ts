const url = process.env.DATABASE_URL;

if (!url) {
  throw new Error("DATABASE_URL was not provided by the preview runner");
}

const sql = new Bun.SQL(url);

try {
  await sql`
    alter table customers add column if not exists preview_note text
  `;
  await sql`
    alter table customers add column if not exists pr_three_note text
  `;
  console.log("applied migration: customers.preview_note, customers.pr_three_note");
} finally {
  await sql.end();
}
