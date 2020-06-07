var _ = require('lodash')

const dummy = (blogs) => {
    return 1;
}
  
const totalLikes = (Blog) =>{
    sum = 0;
    Blog.forEach(element => {
        sum+=element.likes
    });
    return sum;
}


const favoriteBlog = (Blog)=> {
    if (!Blog.length) return null;
    return  _.maxBy(Blog,'likes')
}

const mostBlogs = (blogs) => {
    if (!blogs.length) return null;

    const blogCountByAuthor = _.map(_.countBy(blogs, 'author'), (val, key) => ({ 'author': key, 'blogs': val }))
    const mostBlogs = Math.max.apply(Math, blogCountByAuthor.map(function(author) { return author.blogs }))
    const authorWithMostBlogs = blogCountByAuthor.find(function(author){ return author.blogs === mostBlogs })
    return authorWithMostBlogs
  }

const mostLikes = (blogs) => {
    if (!blogs.length) return null;

    const likeCountByAuthor =
    _(blogs)
      .groupBy('author')
      .map((objs, key) => ({
        'author': key,
        'likes': _.sumBy(objs, 'likes') }))
      .value()
    const mostLikes = Math.max.apply(Math, likeCountByAuthor.map(function(author) { return author.likes }))
    const authorWithMostLikes = likeCountByAuthor.find(function(author){ return author.likes === mostLikes })
    return authorWithMostLikes
  }

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }