const Joi = require('@hapi/joi')
const productService = require('../service/productService')
const response = require('../lib/response')
const message = require('../lib/responseMessage')
const statusCode = require('../lib/statusCode')


// 사용자가 최초로 채팅방에 들어올 때 키보드 영역에 표시될 자동 응답 명령어 목록 호출
exports.dose = async (req, res, next) => {
  const { doseDailyQuantity, doseStartDate } = req.body
  const validationData = { doseDailyQuantity, doseStartDate }
  const scheme = {
    doseDailyQuantity: Joi.int().required(),
    doseStartDate: Joi.string().required(),
  }

  try {
    // 입력 값의 유효성 확인 (not null, 유효한 형태)
    const QuantityDateValidation = Joi.validate(validationData, scheme)

    // 유효하지 않은 경우
    if (QuantityDateValidation.error) {
      throw new Error(403)
    }
    //
    // const result = await productService.dose(next)
    const result = {}
    response.respondJson('successfully ', result, res, 200)
  } catch (e) {
    response.respondOnError(e.message, res, 500)
  }
}


exports.insertProduct = async (req, res, next) => {
  const {
    filter_category_idx,
    main_nutrient_name,
    product_name,
    product_cautions,
    product_package_type,
    product_company_name,
    product_is_import,
    product_daily_dose,
    product_additives,
    product_standard1,
    product_standard2,
    product_standard3,
    product_standard1_value,
    product_standard2_value,
    product_standard3_value,
    product_standard1_description,
    product_standard2_description,
    product_standard3_description,
    product_detail_name,
    product_detail_value,
    product_detail_child_name,
    product_detail_child_value,
    product_quantity_count,
    product_quantity_price,
    product_features_name,
    product_has_nutrients,
  } = req.body

  const validationData = {
    filter_category_idx,
    main_nutrient_name,
    product_name,
    product_cautions,
    product_package_type,
    product_company_name,
    product_is_import,
    product_daily_dose,
    product_additives,
    product_standard1,
    product_standard2,
    product_standard3,
    product_standard1_value,
    product_standard2_value,
    product_standard3_value,
    product_standard1_description,
    product_standard2_description,
    product_standard3_description,
    product_detail_name,
    product_detail_value,
    product_detail_child_name,
    product_detail_child_value,
    product_quantity_count,
    product_quantity_price,
    product_features_name,
    product_has_nutrients,
  }

  const schema = Joi.object({
    filter_category_idx: Joi.number().required(),
    main_nutrient_name: Joi.string().required(),
    product_name: Joi.string().required(),
    product_cautions: Joi.string().required(),
    product_package_type: Joi.number().required(),
    product_company_name: Joi.string().required(),
    product_is_import: Joi.number().required(),
    product_daily_dose: Joi.string().required(),
    product_additives: Joi.string().required(),
    product_standard1: Joi.string().required(),
    product_standard2: Joi.string().required(),
    product_standard3: Joi.string().required(),
    product_standard1_value: Joi.string().required(),
    product_standard2_value: Joi.string().required(),
    product_standard3_value: Joi.string().required(),
    product_standard1_description: Joi.string().required(),
    product_standard2_description: Joi.string().required(),
    product_standard3_description: Joi.string().required(),
    product_detail_name: Joi.string().required(),
    product_detail_value: Joi.string().required(),
    product_detail_child_name: Joi.string().required(),
    product_detail_child_value: Joi.string().required(),
    product_quantity_count: Joi.number().required(),
    product_quantity_price: Joi.number().required(),
    product_features_name: Joi.string().required(),
    product_has_nutrients: Joi.string().required(),
  })

  try {
    const { error } = await schema.validateAsync(validationData)
    if (error) {
      response.respondOnError(message.NULL_VALUE, res, statusCode.FORBIDDEN)
    }
    validationData.file = req.file
    await productService.insertProduct(next, validationData)
    response.respondJsonWithoutData(message.PRODUCT_INSERT_SUCCESS, res, statusCode.CREATED)
  } catch (e) {
    response.respondOnError(e.message, res, statusCode.INTERNAL_SERVER_ERROR)
  }
}