export class RequestError extends Error {
    constructor(
        public statusCode: number,
        message: string,
        public errors?: Record<string, string[]>
    ) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
        this.name = "Request Error";
    }
}

export class ValidationError extends RequestError {
    constructor(fieldErrors: Record<string, string[]>) {
        const message = ValidationError.formatMessage(fieldErrors);
        super(400, message, fieldErrors);
        this.name = "Validation Error";
        this.errors = fieldErrors;
    }
    static formatMessage(errors: Record<string, string[]>): string {
        const formattedMessage = Object.entries(errors).map(
            ([field, messages]) => {
                const fieldName =
                    field.charAt(0).toUpperCase() + field.slice(1);
                if (messages[0] === "Required") {
                    return `${fieldName} is required.`;
                } else {
                    return messages.join(" and ");
                }
            }
        );
        return formattedMessage.join(", ");
    }
}

export class NotFoundError extends RequestError {
    constructor(resource: string) {
        super(404, `${resource} not found.`);
        this.name = "not Found Error";
    }
}

export class ForbiddenError extends RequestError {
    constructor(message: string = "Forbidden") {
        super(403, message);
        this.name = "Forbidden";
    }
}
export class UnauthorizedError extends RequestError {
    constructor(message: string = "Unauthorized") {
        super(401, message);
        this.name = "Unauthorized";
    }
}
