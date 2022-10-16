export default function typeOf(item) {
    if (item === undefined) {
        return undefined;
    }
    return (item).constructor.name;
}