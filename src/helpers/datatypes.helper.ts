import humps from "humps";

export const randomStr = (length: number = 10): string => {
  var result = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const isString = (str: any): boolean => {
  return Boolean(str && typeof str === "string");
};

export const isJsonString = (str: any): boolean => {
  try {
    JSON.parse(str);
    return true;
  } catch (error) {
    return false;
  }
};

export const capitalize = (str: any, isCapitalizeEachWorld: boolean = true): string => {
  if (typeof str === "string") {
    if (isCapitalizeEachWorld) {
      let array = str.split(" ");
      return array.map(world => world.slice(0, 1).toUpperCase() + world.slice(1)).join(" ");
    }
    return str.slice(0, 1).toUpperCase() + str.slice(1);
  } else {
    console.error("Input must be string");
    return "";
  }
};

export const uuid = (): string => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
    .replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    })
    .replace(/-/g, "");
};

export const removeVietnameseTones = (str: any): string => {
  if (!str) return "";
  if (!isString(str)) return "";
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, "");
  str = str.replace(/\u02C6|\u0306|\u031B/g, "");
  str = str.replace(/ + /g, " ");
  str = str.trim();
  str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
  return str;
};

export const slug = (str: string, specialIdentify: string = ""): string => {
  if (isString(str)) {
    str = str.toLowerCase();
    str = removeVietnameseTones(str);
    return (
      str.replaceAll(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\|\s/g, "-") +
      "-" +
      Date.now() +
      specialIdentify
    );
  }
  return "";
};

export const isNumber = (num: any): boolean => {
  return Boolean(num && typeof num === "number" && !Number.isNaN(num));
};

export const isArray = (arr: any): boolean => {
  return Boolean(arr && typeof arr === "object" && Array.isArray(arr));
};

export const isObj = (obj: any) => {
  return Boolean(obj && typeof obj === "object" && !Array.isArray(obj));
};

export const convertFileSizeUnit = (size: number = 0, unit: number = 1000) => {
  let result = "";
  if (size >= unit * unit * unit) {
    let gb = (size / (unit * unit * unit)).toFixed(3);
    result = `${gb} GB`;
  } else if (size >= unit * unit) {
    let mb = (size / (unit * unit)).toFixed(3);
    result = `${mb} MB`;
  } else if (size >= unit) {
    let kb = (size / unit).toFixed(3);
    result = `${kb} KB`;
  } else if (size > 0) {
    result = `${size} byte`;
  } else {
    result = "0 byte";
  }
  return result;
};

export const camelToSnake = (data: any) => {
  if (typeof data === "object") {
    return humps.decamelizeKeys(data);
  }
  return humps.decamelize(data);
};

export const snakeToCamel = (data: any) => {
  if (typeof data === "object") {
    return humps.camelizeKeys(data);
  }
  return humps.camelize(data);
};
