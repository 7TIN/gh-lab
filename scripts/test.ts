const url = process.env.DATABASE_URL;

if (!url) {
  throw new Error("DATABASE_URL was not provided by the preview runner");
}

const sql = new Bun.SQL(url);

try {
  const columns = (await sql`
    select column_name
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'customers'
      and column_name = 'preview_note'
  `) as Array<{ column_name: string }>;

  if (columns.length !== 1) {
    console.error("customers.preview_note is missing");
    console.log("0 pass");
    console.log("1 fail");
    process.exit(1);
  }

  console.log("customers.preview_note exists");
  console.log("1 pass");
  console.log("0 fail");
} finally {
  await sql.end();
}
