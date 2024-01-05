import randomAtBuildTime from '@/macros/test' with { type: 'macro' };

interface CatFactResponse
{
    status: {
        verified: boolean
        sentCount: number
    }
    text: string
    user: string
    source: string
    updatedAt: string
    type: string
    createdAt: string
    deleted: boolean
    used: boolean
};

export default async function useCatFact()
{
    const data: CatFactResponse[] = await (
        await fetch('https://cat-fact.herokuapp.com/facts/')
    ).json();

    const index = Math.round(data.length * randomAtBuildTime());

    return data[index];
}
