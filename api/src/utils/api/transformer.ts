import { pick, curry } from '../../libs/toolkits';

function camelize(str: string): string {
  return str.replace(/(?:^\W|\_[a-z]|\b\w)/g, function(char, index) {
    if (index === 0) {
      return char.toLowerCase();
    }
    return char.includes('_') ? char[1].toUpperCase() : char.toUpperCase();
  });
}

function snake(str: string): string {
  return str.replace(/([A-Z])/g, function(char, index) {
    if (index === 0) {
      return char.toLowerCase();
    }
    return `_${char.toLowerCase()}`;
  });
}

function toSnakeCase(object: Object = {}): Object {
  let objectCamelize = {};
  for (let key in object) {
    objectCamelize[snake(key)] = object[key];
  }
  return objectCamelize;
}
/*
  ## TODO: ELIMINAR. esta funcion no tiene sentido definiendo el schema en la api 
*/
const transformEntityWhiteList = curry(
  <P>(whiteList: string[], entity: P): Object => {
    return toSnakeCase(pick(whiteList, entity));
  }
);

const isTransformableObject = (obj) =>
  typeof obj === 'object' && !Array.isArray(obj) && obj !== null && !(obj instanceof Date);

const needToParseToDate = (key, value) => /date/i.test(key) && typeof value === 'string';

const transformOjectKeys = curry(
  (func: (key: string) => string, obj: Object = {}): Object => {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      let val = value;
      if (Array.isArray(val)) {
        val = val.map((v) => (isTransformableObject(v) ? transformOjectKeys(func, v) : v));
      }
      if (isTransformableObject(val)) {
        val = transformOjectKeys(func, val);
      }
      const newKey = func(key);
      return {
        ...acc,
        [newKey]: needToParseToDate(newKey, val) ? new Date(val) : val,
      };
    }, {});
  }
);

const transformEntity = <P>(entity: P): Object => {
  return transformOjectKeys(snake, entity);
};

const normalize = curry(
  (mapper: Object = {}, params: Object = {}): Object => {
    const transformKey = (key) => (mapper.hasOwnProperty(key) ? mapper[key] : camelize(key));
    return transformOjectKeys(transformKey, params);
  }
);

export { normalize, transformEntityWhiteList, transformEntity, snake };
