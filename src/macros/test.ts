export default function randomAtBuildTime() {
    return Math.random();
}

interface Test {
    id: number
    user: string
    content: string
    lastUpdated?: Date
};

enum Test2 {
    one = 'one',
    two = 'two',
    three = 3,
}
