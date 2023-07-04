export const convertJsonToFormData = (
  json: Record<string, any>,
  formData = new FormData(),
  parentKey = ''
): FormData => {
  for (const key in json) {
    if (json[key]) {
      const propName = parentKey ? `${parentKey}[${key}]` : key;
      const value = json[key];

      if (typeof value === 'object' && !(value instanceof File)) {
        if (Array.isArray(value)) {
          value.forEach((item: Record<string, any>, index: number) => {
            const nestedPropName = `${propName}[${index}]`;
            convertJsonToFormData(item, formData, nestedPropName); // Recursively convert nested array item
          });
        } else {
          convertJsonToFormData(value, formData, propName); // Recursively convert nested object
        }
      } else {
        formData.append(propName, value);
      }
    }
  }

  return formData;
};

export const parseDataForm = (data: Record<string, any>) => {
  for (const key of Object.keys(data)) {
    if (typeof data[key] === 'string') {
      data[key] = JSON.parse(data[key]);
    } else if (typeof data[key] === 'object') {
      parseDataForm(data);
    }
  }

  return data;
};

export const cleanObject = (obj: Record<string, any>) => {
  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      cleanObject(obj[key]);
    }
    if ([undefined, null].includes(obj[key])) {
      delete obj[key];
    }
  }
  return obj;
};
