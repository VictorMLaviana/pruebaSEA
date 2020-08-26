const unauthorized = {
  401: {
    type: 'object',
    description: 'Not authorized action',
    properties: {
      statusCode: {
        type: 'number',
        defaul: 401,
      },
      error: {
        type: 'string',
        default: 'Unauthorized',
      },
      message: {
        type: 'string',
        defualt: 'Unauthorized',
      },
    },
  },
};

const badRequest = {
  400: {
    type: 'object',
    description: 'Not authorized action',
    properties: {
      statusCode: {
        type: 'number',
        defaul: 401,
      },
      error: {
        type: 'string',
        default: 'Unauthorized',
      },
      message: {
        type: 'string',
        defualt: 'Unauthorized',
      },
    },
  },
};

export { badRequest, unauthorized };
