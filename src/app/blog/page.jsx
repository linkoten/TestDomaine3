import GetPosts from '@/components/hygraph/getPosts'
import { GraphQLClient } from 'graphql-request'

export const metadata = {
  title: 'paleolitho/blog',
  description: 'Articles on Trilobites Shells and other fossils from France Morocco and all around the world',
}


const getPosts = async () => {
  const hygraph = new GraphQLClient(
    'https://api-eu-west-2.hygraph.com/v2/clkp6kxt31b6x01ta51b202ki/master'
  )

  const { posts } = await hygraph.request(
    `{
      posts (locales: [en, fr]) {
        localizations(includeCurrent: true) {
          title
          slug
          date
          excerpt
          id
          tag
          coverImage {
            id
            locale
            height
            size
            width
            url
          }
        }
      }
    }`
  )

  return posts
}



export default async function Page() {
  const posts = await getPosts()

  return(
    <div>
      <GetPosts  posts = {posts} />
    </div>
  )
}
