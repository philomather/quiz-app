import axios from 'axios';
import { FlashQuizApiConfig } from './config'

function getAllQuizzes() {
    return axios.post(
        FlashQuizApiConfig.url, {
            headers: FlashQuizApiConfig.headers,
            query: `
        {
            quizzes {
                id
                name
                questions {
                    id
                }
            }
        }
    `
        })
}

export { getAllQuizzes }