// ...all other queries
import { defineQuery } from "next-sanity";

export const PAGE_QUERY =
    defineQuery(`*[_type == "page" && slug.current == $slug][0]{
  ...,
  content[]{
    ...,
    _type == "faqs" => {
      ...,
      faqs[]->
    }
  }
}`);
// ...all other queries

export const HOME_PAGE_QUERY = defineQuery(`*[_id == "siteSettings"][0]{
    homePage->{
      ...,
      content[]{
        ...,
        _type == "faqs" => {
          ...,
          faqs[]->
        }
      }      
    }
  }`);