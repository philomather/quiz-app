interface ApiConfig {
    headers: Headers;
    url: string;
}

export const FlashQuizApiConfig = {
    headers: new Headers({
        'Accept': 'application/json'
    }),
    url: 'https://flash-quiz.hasura.app/v1/graphql',
}