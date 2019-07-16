const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = async ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  // select only markdown
  if (node.internal.type === `MarkdownRemark`) {
    // Making type
    const makeType = () => {
      const split = node.fileAbsolutePath.split('content/')[1]
      let type = ''
      if (split.indexOf('/') > 0) {
        ;[type] = split.split('/')
      } else {
        type = 'pages'
      }
      return type
    }

    const makeSlug = () => {
      const split = node.fileAbsolutePath.split('content/')[1]
      let slug = ''
      if (split.indexOf('/') > 0) {
        ;[, slug] = split.split('/')
      } else {
        slug = split
      }
      return slug.replace('.mdx', '').replace('.md', '')
    }

    // create slugs
    await createNodeField({
      node,
      name: `slug`,
      value: makeSlug(),
    })

    // Making type
    await createNodeField({
      node,
      name: `type`,
      value: makeType(),
    })

    const basePath = `content`

    // create fullPaths
    const fullPath = createFilePath({ node, getNode, basePath })

    await createNodeField({
      node,
      name: `fullPath`,
      value: fullPath,
    })
  }
}

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  // ########
  // BLOG
  // ########

  const getBlog = () =>
    graphql(`
      query {
        allMarkdownRemark(
          filter: { fields: { type: { eq: "blog" } } }
          sort: { order: DESC, fields: frontmatter___date }
        ) {
          edges {
            node {
              html
              frontmatter {
                thumb
              }
              fields {
                type
                slug
                fullPath
              }
            }
          }
        }
      }
    `)

  const blogQl = await getBlog()

  if (blogQl.errors) throw new Error(blogQl.errors)

  // creating main blog page
  createPage({
    path: '/blog',
    component: path.resolve('src/templates/blog/blog.js'),
    context: {},
  })

  // creating each blog post
  blogQl.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.fullPath,
      component: path.resolve(`src/templates/blog/post.js`),
      context: {},
    })
  })

  // ########
  // MENUS
  // ########

  const getMenu = () =>
    graphql(`
      query {
        allMarkdownRemark(
          filter: { fields: { type: { eq: "menu" } } }
          sort: { order: DESC, fields: frontmatter___date }
        ) {
          edges {
            node {
              html
              frontmatter {
                title
                thumb
              }
              fields {
                type
                slug
                fullPath
              }
            }
          }
        }
      }
    `)

  const menuQl = await getMenu()

  if (menuQl.errors) throw new Error(menuQl.errors)

  // creating main menu page
  createPage({
    path: '/menu',
    component: path.resolve('src/templates/menu/menus.js'),
    context: {},
  })

  // creating each menu
  menuQl.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.fullPath,
      component: path.resolve(`src/templates/menu/menu.js`),
      context: {},
    })
  })

  // ########
  // HOME COMPONENTS
  // ########

  const getHome = () =>
    graphql(`
      query {
        allMarkdownRemark(
          filter: { fields: { type: { eq: "home" } } }
          sort: { order: DESC, fields: frontmatter___date }
        ) {
          edges {
            node {
              html
              frontmatter {
                type
              }
              fields {
                type
                slug
                fullPath
              }
            }
          }
        }
      }
    `)

  const homeQl = await getHome()

  if (homeQl.errors) throw new Error(homeQl.errors)

  // creating main home page
  createPage({
    path: '/',
    component: path.resolve('src/templates/home/main.js'),
    context: {},
  })

  // #########
  // PAGES
  // #########

  const getPages = () => {
    return graphql(`
      {
        allMarkdownRemark(
          filter: { fields: { type: { eq: "pages" } } }
          sort: { order: DESC, fields: frontmatter___date }
        ) {
          edges {
            node {
              html
              fields {
                type
                slug
                fullPath
              }
            }
          }
        }
      }
    `)
  }

  const pagesQl = await getPages()

  if (pagesQl.errors) throw new Error(pagesQl.errors)

  // creating main home page
  // createPage({
  //   path: '/',
  //   component: path.resolve('src/templates/home.js'),
  //   context: {},
  // })

  // creating each sub pages
  pagesQl.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.fullPath,
      component: path.resolve(`src/templates/pages/pages.js`),
      context: {},
    })
  })
}
