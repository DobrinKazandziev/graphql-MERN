module.exports = {
  Query: {
    totalPosts: (parent, args, { db }, info) => db.posts.length,
    allPosts: (parent, args, { db }, info) => db.posts,
  },
  Mutation: {
    createPost: (parent, { data }, { db }, info) => {
      const newPost = { id: db.posts.length, ...data };
      db.posts.push(newPost);

      return newPost;
    },
  },
}
