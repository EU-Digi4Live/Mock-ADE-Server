/**
 * Returns the jsonObject with its empty values removed.
 * @param {Type} jsonObject
 * @returns {Type}
 */
export function removeEmptyEntries<Type>(jsonObject: Type) {
    const filteredObject = Object.fromEntries(Object.entries(jsonObject).filter(
        ([_, value]) => {
        const valueType = typeof(value);
        if (value != null && valueType != undefined && (valueType != "object" || Object.values(value).length > 0)) {
            return value;
        }
        }));
    return filteredObject as Type;
}
