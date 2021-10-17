/**
 * @desc This file is for  Success and Error response
 * @desc @Message - Description of the response 
 * @desc @Code - HTTP Response Code 
 * @desc @Data - Output data fetched from DB
 * @desc @Error - Boolean that tells the user if there is an error | Validation error returns the unaccepted inputs
 */


const Send = {
    /**
     * 
     * @param {string} message 
     * @param {number} statusCode 
     * @param {array | object} data 
     * @returns 
     */
    success: (message, statusCode, data) => {
        let validateStatusCode = /200/ && true
        if (validateStatusCode) {
            return {
                message,
                code: statusCode,
                data: data,
                error: false,
            }
            throw new Error("This is not a success status code")

        }
    },

    /**
     * 
     * @param {string} message 
     * @param {number} statusCode 
     * @codes list of common HTTP respomse codes 
     * @returns 
     */
    error: (message, statusCode) => {
        const codes = [200, 201, 400, 401, 404, 403, 422, 500];

        const findCode = codes.find((code) => code == statusCode);

        if (!findCode) statusCode = 500;
        else statusCode = findCode;

        if (statusCode === 200 || 201) {
            throw new Error(`Can't send success message using "Send.error" template`)
        }

        return {
            message,
            code: statusCode,
            data: null,
            error: true,
        };
    },

    /**
     * 
     * @param {string} errors 
     * @returns 
     */
    validation: (error) => {
        return {
            message: "Validation error",
            code: 422,
            data: null,
            error,
        }

    }
}

module.exports = Send