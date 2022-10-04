export default class modelBuilder {
    build(model, values) {
        const obj = structuredClone(model);

        for (let key in values) {
            if (key in obj) {
                obj[key] = values[key];
            }
        }

        return obj;
    }
}