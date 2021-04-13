export default async function getAllPosts() {
  return await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}table/${process.env.NEXT_PUBLIC_NOTION_ID}`
  ).then((res) => res.json())
}
