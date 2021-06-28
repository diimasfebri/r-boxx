export default async ({ redirect, store }) => {
  const id = store.getters.idUser
  if (!id) {
    // akan kembali ke halaman login, jika tidak login terlebih dahulu.
    await store.dispatch('logout')
    return redirect(`/login`)
  }
}
// export default ({ redirect, store }) => {
//   const { name, type, 'users/token': token } = store.getters
//   if (!name || !type) {
//     return redirect('/generate')
//   } else if (!token) {
//     return redirect('/login')
//   }
// }
