export default async function getAllPosts(text: string) {
  return await fetch(
    `/api/search?keyword=${text}`
  ).then((res) => res.json())
}
