import { badRequest } from '../../utils/api/responses';

const GET_USERS_SCHEMA = {
  tags: ['users'],
  querystring: {
    type: 'object',
    properties: {
      limit: {
        default: 10,
        type: 'number',
        maximum: 100,
        minimum: 1,
      },
      offset: {
        default: 0,
        type: 'number',
      },
    },
    additionalProperties: false,
  },
  response: {
    200: {
      description: 'Succesful response',
      type: 'object',
      properties: {
        users: {
          type: 'array',
          items: {
            $ref: 'UserWithRoles#',
          },
        },
        count: {
          type: 'number',
        },
      },
    },
    ...badRequest,
  },
};

const GET_USER_SCHEMA = {
  tags: ['users'],
  params: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
    },
    additionalProperties: false,
    required: ['id'],
  },
  response: {
    200: {
      description: 'Succesful response',
      type: 'object',
      properties: {
        user: {
          $ref: 'UserWithRoles#',
        },
      },
    },
    ...badRequest,
  },
};

const DELETE_USER_SCHEMA = {
  tags: ['users'],
  params: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
    },
    additionalProperties: false,
    required: ['id'],
  },
  response: {
    201: {
      description: 'Succesful response',
      type: 'object',
      properties: {},
    },
    ...badRequest,
  },
};

const UPDATE_USER_SCHEMA = {
  tags: ['users'],
  body: {
    type: 'object',
    properties: {
      first_name: {
        type: 'string',
        minLength: 2,
      },
      last_name: {
        type: 'string',
        minLength: 2,
      },
      roles: {
        type: 'array',
        items: {
          type: 'string',
        },
      },
    },
    additionalProperties: false,
  },
  params: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
    },
    required: ['id'],
    additionalProperties: false,
  },
  response: {
    200: {
      description: 'Succesful response',
      type: 'object',
      properties: {
        user: {
          $ref: 'UserWithRoles#',
        },
      },
    },
    ...badRequest,
  },
};

const CREATE_USER_SCHEMA = {
  tags: ['users'],
  body: {
    type: 'object',
    properties: {
      first_name: {
        type: 'string',
        minLength: 2,
      },
      last_name: {
        type: 'string',
        minLength: 2,
      },
      email: {
        type: 'string',
        format: 'email',
      },
      roles: {
        type: 'array',
        items: {
          type: 'string',
        },
        minItems: 1,
      },
    },
    required: ['first_name', 'email', 'roles'],
    additionalProperties: false,
  },
  response: {
    200: {
      description: 'Succesful response',
      type: 'object',
      properties: {
        user: {
          $ref: 'UserWithRoles#',
        },
      },
    },
    ...badRequest,
  },
};

const GET_ROLES = {
  tags: ['roles'],
  querystring: {
    type: 'object',
    properties: {
      limit: {
        default: 10,
        type: 'number',
        maximum: 100,
        minimum: 1,
      },
      offset: {
        default: 0,
        type: 'number',
      },
    },
    additionalProperties: false,
  },
  response: {
    200: {
      description: 'Succesful response',
      type: 'object',
      properties: {
        roles: {
          type: 'array',
          items: {
            $ref: 'Role#',
          },
        },
      },
    },
    ...badRequest,
  },
};

export { GET_USERS_SCHEMA, GET_USER_SCHEMA, UPDATE_USER_SCHEMA, CREATE_USER_SCHEMA, GET_ROLES, DELETE_USER_SCHEMA };
