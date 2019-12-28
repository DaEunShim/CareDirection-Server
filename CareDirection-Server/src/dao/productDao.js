/* sql */
exports.dose = (connection) => {
  return new Promise((resolve, reject) => {
    const Query = `
        //doseDailyQuantity, doseStartDate 저장 date split 하기
        SELECT * FROM users
        `
    connection.query(Query, (err, result) => {
      err && reject(err)
      resolve(result)
    })
  })
}

// 제품 등록 dao
exports.insertProduct = (Transaction, data, next) => {
  return Transaction(async (connection) => {
    const Query1 = `
        INSERT INTO product(
        filter_category_idx, main_nutrient_name, product_name, product_cautions, product_package_type, product_company_name,
        product_is_import, product_daily_dose, product_additives, product_standard1, product_standard2, product_standard3,
        product_standard1_value, product_standard2_value, product_standard3_value, product_standard1_description,
        product_standard2_description, product_standard3_description) 
        VALUES(
        ${data.filter_category_idx},
        "${data.main_nutrient_name}",
        "${data.product_name}",
        "${data.product_cautions}",
        ${data.product_package_type},
        "${data.product_company_name}",
        ${data.product_is_import},
        "${data.product_daily_dose}",
        "${data.product_additives}",
        "${data.product_standard1}",
        "${data.product_standard2}",
        "${data.product_standard3}",
        "${data.product_standard1_value}",
        "${data.product_standard2_value}",
        "${data.product_standard3_value}",
        "${data.product_standard1_description}",
        "${data.product_standard2_description}",
        "${data.product_standard3_description}"
        )
        `
    await connection.query(Query1)
    const Query2 = `SELECT product_idx FROM product WHERE product_name = "${data.product_name}" and product_company_name = "${data.product_company_name}"`
    const product_idx = await connection.query(Query2)
    const Query3 = `INSERT INTO product_quantity(product_idx, product_quantity_count, product_quantity_price) VALUES (${product_idx[0].product_idx}, ${data.product_quantity_count}, ${data.product_quantity_price})`
    await connection.query(Query3)
    const Query4 = `INSERT INTO product_detail(product_idx, product_detail_name, product_detail_value) VALUES (${product_idx[0].product_idx}, "${data.product_detail_name}", "${data.product_detail_value}")`
    await connection.query(Query4)
    const Query5 = `SELECT product_detail_idx FROM product_detail WHERE product_idx=${product_idx[0].product_idx}`
    const product_detail_idx = await connection.query(Query5)
    const Query6 = `INSERT INTO product_detail_child(product_detail_idx, product_detail_child_name, product_detail_child_value) VALUES (${product_detail_idx[0].product_detail_idx}, "${data.product_detail_child_name}", "${data.product_detail_child_value}")`
    await connection.query(Query6)
    const Query7 = `INSERT INTO product_features(product_idx, product_features_name) VALUES (${product_idx[0].product_idx}, "${data.product_features_name}")`
    await connection.query(Query7)
    const Query8 = `INSERT INTO image(product_idx, image_key, image_original_name, image_size) VALUES(${product_idx[0].product_idx}, "${data.file.transforms[0].key}", "${data.file.originalname}", "${data.file.transforms[0].size}" )`
    await connection.query(Query8)
  }).catch(error => {
    return next(error)
  })
}