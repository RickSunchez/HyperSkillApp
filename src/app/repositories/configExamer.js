import typeOf from "../common/typeOf";
import { common } from "../params/common";

const configKeys = ['toolbars', 'tools'];
const toolbarKeys = ['append', 'new'];

export default function configExamer(config) {
    if (!examType(config, common.types.typeObject)) return false;
    if (!keysExists(config, configKeys, true)) return false;

    for (let key of configKeys) {
        if (!examType(config[key], common.types.typeObject)) return false;
    }

    if (!keysExists(config['toolbars'], toolbarKeys)) return false;
    
    var valuableKeys = keysNotEmpty(config['toolbars'], toolbarKeys);
    if (!valuableKeys) return false;

    for (let modeKey of valuableKeys) {
        let modeObject = config['toolbars'][modeKey];
        if (!examType(modeObject, common.types.typeObject)) return false;

        for (let toolbarName in modeObject) {
            let toolbarObject = modeObject[toolbarName];
            if (!examType(toolbarObject, common.types.typeArray)) return false;

            for (let toolGroup of toolbarObject) {
                if (!examType(toolGroup, common.types.typeObject)) return false;
                if (!keysExists(toolGroup, ['name'], true)) return false;

                if (!(toolGroup['name'] in config['tools'])) {
                    console.error(`Toolgroup ${toolGroup['name']} not found at config["tools"]: ${config['tools']}`);
                    return false;
                }

                if ('items' in toolGroup) {
                    if (!examType(toolGroup['items'], common.types.typeArray)) return false;

                    for (let item of toolGroup['items']) {
                        if (!(item in config['tools'][toolGroup['name']])) {
                            console.error(`Tool "${item}" not defined at ${config['tools'][toolGroup['name']]}`);
                            return false;
                        }

                        // @TODO add toll examer
                    }
                }
            }
        }
    }

    console.log('Config: OK');
    return true;
}

function examType(item, expectedType) {
    if (typeOf(item) != expectedType) {
        console.error(`Mismatch type: "${expectedType}" is expected, "${typeOf(item)}" is given`);
        return false;
    }

    return true;
}

function keysExists(item, keys, strict=false) {
    for (let key of keys) {
        if ((key in item) && !strict) {
            return true;
        } 
        if (!(key in item) && strict) {
            console.error(`Missing key: ${key} at ${item}`);
            return false;
        }
    }

    if (strict) {
        return true;
    } else {
        console.error(`Keys: ${keys} not found at ${item}`);
        return false;
    }
}

function keysNotEmpty(object, keys=[], strict=false) {
    if (keys.length == 0) {
        keys = Object(object).keys;
    }

    var valuableKeys = [];

    for (let key of keys) {
        let length = 0;
        switch (typeOf(object[key])) {
            case common.types.typeArray:
                length = object[key].length;
                break;
            case common.types.typeObject:
                length = Object.keys(object[key]).length;
                break;
            default:
                continue;
        }

        if (length > 0 && !strict) {
            valuableKeys.push(key);
        }
        if (length == 0 && strict) {
            console.error(`Key "${key}" is empty in ${object}`);
            return false;
        }
    }

    if (strict) {
        return keys;
    } else {
        if (valuableKeys.length > 0) {
            return valuableKeys;
        }
        console.error(`Keys: ${keys} are empty in ${object}`);
        return false;
    }
}