const { body, validationResult } = require("express-validator");

exports.validateReservation = [
    body("customer_name").isString().trim().escape().notEmpty(),
    body("date").isISO8601().toDate(),
    body("time").matches(/^([01]\d|2[0-3]):([0-5]\d)$/),
    body("guests").isInt({ min: 1, max: 20 }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];
