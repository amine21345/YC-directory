import { defineQuery } from "next-sanity";

export const STARTUPS_QUERY = defineQuery(`
  *[_type == "startup" && defined(slug.current) && 
  !defined($search)|| title match $search || category match $search 
  || author->name match $search] | order(_createdAt desc) {
    _id,
    _createdAt,
    title,
    slug,
    description,
    image,
    author -> {
      _id,
      name,
      image,
      bio
    },
    views,
    category,
    pitch,
  }`);

export const STARTUP_BY_ID_QUERY =
  defineQuery(`*[_type == "startup" && _id == $id][0]  {
    _id,
    _createdAt,
    title,
    slug,
    description,
    image,
    author -> {
      _id,
      name,
      username,
      image,
      bio
    },
    views,
    category,
    pitch
  }`);
export const STARTUP_VIEWS_QUERY = defineQuery(`
  *[_type == "startup" && _id == $id][0] {
    _id , views
  }`);

export const AUTHOR_BY_GITHUB_ID_QUERY = defineQuery(`
  *[_type == "author" && id == $id][0] {
    _id,
    id,
    name,
    username,
    image,
    bio,
  }`);
