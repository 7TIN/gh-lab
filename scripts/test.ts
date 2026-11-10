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
      and column_name in ('preview_note', 'pr_three_note')
    order by column_name
  `) as Array<{ column_name: string }>;

  const names = columns.map((entry) => entry.column_name);

  if (names.length !== 2 || !names.includes("pr_three_note")) {
    console.error(`expected preview_note and pr_three_note, got ${names.join(", ") || "none"}`);
    console.log("0 pass");
    console.log("1 fail");
    process.exit(1);
  }

  console.log("customers.preview_note exists");
  console.log("customers.pr_three_note exists");
  console.log("2 pass");
  console.log("0 fail");
} finally {
  await sql.end();
}
