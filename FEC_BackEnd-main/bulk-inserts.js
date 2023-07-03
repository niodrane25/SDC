import { faker } from "@faker-js/faker";
import postgres from "postgres";
import fs from "fs";

const sql = postgres("postgress://localhost/home-depot-clone");
const writablestream = fs.createWriteStream("data.csv");

// await sqlDELETE FROM home-depot;

for (let i = 0; i < 100000; i++) {
  const name = faker.lorem.word();
  const brand = faker.lorem.word();
  const price = faker.number.int({ min: 0.99, max: 2499.99 });
  const description = faker.lorem.words(8);
  const image = faker.image.url();
  writablestream.write(
    `${name}, ${brand}, ${price}, ${description}, ${image}\n`
  );
}
writablestream.close();
sql.end();

// Generate fake data
// const records = [];
// for (let i = 0; i < 1000000; i++) {
//   const name = faker.lorem.word();
//   const brand = faker.lorem.word();
//   const price = faker.number.int({ min: 0.99, max: 2499.99 });
//   const description = faker.lorem.words(8);
//   const image = faker.image.url();

//   records.push([name, brand, price, description, image]);
// }

// console.log(records.length);
// await sql`
//   COPY item (item_name, item_brand, item_price, item_description, item_image)FROM '\Users\WEI CHEN\code\FECProject\FEC-Project\server\data.csv' WITH (FORMAT csv, DELIMITER ',');
// `;

// await sql`\copy item (item_name, item_brand, item_price, item_description, item_image) FROM 'C:\Users\WEI CHEN\code\FECProject\FEC-Project\server\data.csv' DELIMITER ',' CSV HEADER;`;

// Insert fake data into the database
// (async () => {
//   try {
//     await sql.begin(); // Begin a transaction

//     for (const record of records) {
//       await sql.query(
//         "INSERT INTO home-depot-clone (name, brand, price, description, image) VALUES ($1, $2, $3, $4, $5)",
//         record
//       );
//     }

//     await sql.commit(); // Commit the transaction
//     console.log("Data inserted successfully!");
//   } catch (error) {
//     // Rollback the transaction if an error occurs
//     console.error("Error inserting data:", error);
//   } finally {
//     sql.end(); // Close the database connection
//   }
// })();

// import { faker } from "@faker-js/faker";
// import postgres from "postgres";
// import fs from "fs";

// const sql = postgres("postgress://localhost/home-depot");
// const writablestream = fs.createWriteStream("data.csv");

// // await sqlDELETE FROM home-depot;

// for (let i = 0; i < 1000; i++) {
//   const name = faker.lorem.word();
//   const brand = faker.lorem.word();
//   const price = faker.number.int({ min: 0.99, max: 2499.99 });
//   const description = faker.lorem.words(8);
//   const image = faker.image.url();
//   writablestream.write(
//     ${name}, ${brand}, ${price}, ${description}, ${image}\n
//   );
// }
// writablestream.close();
// sql.end();
