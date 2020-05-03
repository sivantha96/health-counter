export enum response_status_codes {
    success = 200,                      // Success
    mongo_error = 503,        // Internal Server Error
    unauthorized = 401,                 // Unauthorized
    invalid_user_error = 403,           // Forbidden
    not_found_error = 404,              // Not Found
    token_expired_error = 419,          // Token Expire Error
    input_error = 422,                  // Un-processable Entity
    login_expired_error = 440,
    token_still_valid_error = 441,
}

export enum gender {
    male = 'male',
    female = 'female',
    pther = 'other'
}

export enum severity {
    High = 'high',
    Moderate = 'moderate',
    Low = 'low'
}

export enum age {
    Infant = 'infant',
    Child = 'child',
    Teenager = 'teenager',
    Adult = 'adult',
    Elderly = 'elderly'
}