import express from "express";
import postgres from "postgres";
import dotenv from "dotenv";
import pg from "pg";
import cors from "cors";

console.log("before", process.env.DATABASE_URL);
dotenv.config();
console.log("after", process.env.DATABASE_URL);
const PORT = process.env.PORT;
const sql = postgres(process.env.DATABASE_URL);
const app = express();
app.use(express.json());
app.use(cors());
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

app.get("/post", (req, res) => {
  db.query("SELECT * FROM category", []).then((result) => {
    res.send(result.rows);
  });
});
/*====routs====*/
//get category
//get items
//get site_users
//get item by category
//get item by brand
//post items
/*===get rout====*/
//get category
app.get("/category", (req, res) => {
  sql`SELECT * FROM category`
    .then((rows) => {
      res.send(rows).status(200);
    })
    .catch((err) => {
      console.error("faild to retrive categories", err);
      res.sendStatus(500);
    });
});

// //get items
app.get("/item", (req, res) => {
  sql`SELECT * FROM item`
    .then((rows) => {
      res.send(rows).status(200);
    })
    .catch((err) => {
      console.error("faild to retrive items", err);
      res.sendStatus(500);
    });
});

// //get user
// app.get("/user", (req, res) => {
//   sql`SELECT * FROM site_user`
//     .then((rows) => {
//       res.send(rows).status(200);
//     })
//     .catch((err) => {
//       console.error("failed to retrive users", err);
//       res.sendStatus(500);
//     });
// });

//get items by category
// app.get("/item_category/:id", (req, res) => {
//   const { id } = req.params;
//   console.log(id);
//   sql`SELECT item. *, category.category_name
//   FROM item JOIN category ON item.item_category = category.category_id
//   WHERE item.item_category = ${id}`
//     .then((rows) => {
//       res.send(rows[0]).status(200);
//     })
//     .catch((err) => {
//       console.error("failed to rerive item by category", err);
//       res.sendStatus(500);
//     });
// });

// //get item by brand
// app.get("/item/brand", (req, res) => {
//   const { brand } = req.body;
//   console.log(brand);
//   sql`SELECT * FROM item WHERE brand = ${brand}`
//     .then((rows) => {
//       res.send(rows[0]).status(200);
//     })
//     .catch((err) => {
//       console.error("was not able to retrieve by brand", err);
//       res.sendStatus(500);
//     });
// });

// /*======post routes =========*/
// //post item
app.post("/item/post", (req, res) => {
  const {
    item_name,
    item_brand,
    item_image,
    item_category,
    item_price,
    item_type,
    item_description,
  } = req.body;
  const processedItemImage = item_image !== undefined ? item_image : "";
  sql`INSERT INTO item (item_name, item_brand, item_image, item_category, item_price, item_type, item_description) VALUES ( ${item_name}, ${item_brand}, COALESCE(${processedItemImage}, ''), ${item_category}, ${item_price}, ${item_type}, ${item_description}) RETURNING *`
    .then((rows) => {
      res.send(rows[0]).status(200);
    })
    .catch((err) => {
      console.error("did not create new item", err);
      res.sendStatus(500);
    });
});

// //post site user
// app.post("/user/post", (req, res) => {
//   const { username, password } = req.body;
//   sql`INSERT INTO site_user (username, password) VALUES (${username},${password}) RETURNING *`
//     .then((rows) => {
//       res.send(rows[0]).status(200);
//     })
//     .catch((err) => {
//       console.error("failed to create user", err);
//       res.sendStatus(500);
//     });
// });

// //post category
// app.post("/category/post", (req, res) => {
//   const { category_name } = req.body;
//   sql`INSERT INTO category (category_name) VALUES (${category_name}) RETURNING *`
//     .then((rows) => {
//       res.send(rows[0]).status(200);
//     })
//     .catch((err) => {
//       console.error("did not create new category", err);
//       res.sendStatus(500);
//     });
// });

// /*===== patch routs =====*/
// //patch items
// app.patch("/items/patch/:id", (req, res) => {
//   const { id } = req.params;
//   const {
//     item_name,
//     item_brand,
//     item_image,
//     item_category,
//     item_price,
//     item_type,
//     item_description,
//   } = req.body;
//   const processedName = item_name !== undefined ? item_name : null;
//   const processedBrand = item_brand !== undefined ? item_brand : null;
//   const processedImage = item_image !== undefined ? item_image : null;
//   const processedCategory = item_category !== undefined ? item_category : null;
//   const processedPrice = item_price !== undefined ? item_price : null;
//   const processedType = item_type !== undefined ? item_type : null;
//   const processedDescription =
//     item_description !== undefined ? item_description : null;
//   sql`UPDATE item
//   SET item_name = COALESCE(${processedName}, item_name),
//   item_brand = COALESCE(${processedBrand}, item_brand),
//   item_image = COALESCE(${processedImage}, item_image),
//   item_category = COALESCE(${processedCategory}, item_category),
//   item_price = COALESCE(${processedPrice}, item_price),
//   item_type = COALESCE(${processedType}, item_type),
//   item_description = COALESCE(${processedDescription}, item_description)
//    WHERE item_id = ${id} RETURNING *`
//     .then((rows) => {
//       res.send(rows[0]).status(200);
//     })
//     .catch((err) => {
//       console.error("item was not updated", err);
//       res.sendStatus(501);
//     });
// });
// //patch site user
// app.patch("/user/patch/:id", (req, res) => {
//   const { id } = req.params;
//   const { username, password } = req.body;
//   const processedUsername = username !== undefined ? username : null;
//   const processedPassword = password !== undefined ? password : null;

//   sql`UPDATE site_user SET
//   username = COALESCE(${processedUsername}, username),
//   password = COALESCE(${processedPassword}, password)
//   WHERE user_id = ${id} RETURNING *`
//     .then((rows) => {
//       res.send(rows[0]).status(200);
//     })
//     .catch((err) => {
//       console.error("user failed to update", err);
//       res.sendStatus(501);
//     });
// });
// //patch catgory
// app.patch("/category/patch/:id", (req, res) => {
//   const { id } = req.params;
//   const { category_name } = req.body;
//   const processeName = category_name !== undefined ? category_name : null;

//   sql`UPDATE category SET
//   category_name = COALESCE(${processeName}, category_name)
//   WHERE category_id = ${id} RETURNING *`
//     .then((rows) => {
//       res.send(rows[0]).status(200);
//     })
//     .catch((err) => {
//       console.error("failed to update category", err);
//       res.sendStatus(501);
//     });
// });

// /*=======DELETE ROUT ==========*/
// //delete item
// app.delete("/item/delete/:id", (req, res) => {
//   const { id } = req.params;
//   sql`DELETE FROM item WHERE item_id = ${id} RETURNING *`
//     .then((rows) => {
//       res.send(rows[0]).status(200);
//     })
//     .catch((err) => {
//       console.error("failed to delete item", err);
//       res.sendStatus(500);
//     });
// });

// //delete category
// app.delete("/category/delete/:id", (req, res) => {
//   const { id } = req.params;
//   sql`DELETE FROM category WHERE category_id = ${id} RETURNING *`
//     .then((rows) => {
//       res.send(rows[0]).status(200);
//     })
//     .catch((err) => {
//       console.error("failed to delete category", err);
//       res.sendStatus(500);
//     });
// });

// //delete site_user
// app.delete("/user/delete/:id", (req, res) => {
//   const { id } = req.params;
//   sql`DELETE FROM site_user WHERE user_id = ${id} RETURNING *`
//     .then((rows) => {
//       res.send(rows[0]).status(200);
//     })
//     .catch((err) => {
//       console.error("failed to delete user", err);
//       res.sendStatus(500);
//     });
// });

/*=======listen =========*/
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
