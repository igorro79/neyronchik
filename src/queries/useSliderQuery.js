import { graphql, useStaticQuery } from "gatsby";

export default function useSliderQuery() {
  const images = useStaticQuery(graphql`
    query HeroSliderQuery {
      allFile(
        filter: {
          sourceInstanceName: { eq: "images" }
          extension: { nin: "svg" }
        }
      ) {
        edges {
          node {
            id
            name
            relativeDirectory
          }
        }
      }
      hero: allFile(
        filter: { sourceInstanceName: {}, relativeDirectory: { in: "hero" } }
      ) {
        edges {
          node {
            id
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED)
            }
            name
            relativeDirectory
            sourceInstanceName
          }
        }
      }
      gallery: allMarkdownRemark(
        filter: { frontmatter: { gallery_identifier: { eq: "gallery" } } }
      ) {
        edges {
          node {
            frontmatter {
              en_gallery_item_alt
              uk_gallery_item_alt
              gallery_identifier
              gallery_item {
                childImageSharp {
                  gatsbyImageData(placeholder: BLURRED)
                  id
                }
              }
            }
            id
          }
        }
      }
    }
  `);
  return images;
}
