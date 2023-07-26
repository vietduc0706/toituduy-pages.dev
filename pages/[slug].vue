<script lang="ts" setup>
import he from 'he';
definePageMeta({
    middleware: 'slug'
})
const config = useRuntimeConfig();
const WP_URL: string = config.WP_URL;
const params = useRoute().params;
const apiUrl = `${WP_URL}/wp-json/wp/v2/posts/${params.slug}?_embed=1`;
const response = await fetch(apiUrl);
console.log(response)
const json = await response.json();
const post = json;
if(!post){
    throw { statusCode: 404, message: "Post not found" };
}

useHead({
  title: post?.title.rendered,
  meta: [
    {
      property: "og:locale",
      content: `${post?.yoast_head_json.og_locale}`,
    },
    {
      property: "og:type",
      content: `${post?.yoast_head_json.og_type}`,
    },
    {
      property: "og:title",
      content: `${post?.yoast_head_json.og_title}`,
    },
    {
      property: "og:description",
      content: `${he.decode(post?.yoast_head_json.og_description)}`,
    },
    {
      property: "og:url",
      content: `${post?.yoast_head_json.og_url}`,
    },
    {
      property: "og:site_name",
      content: `${post?.yoast_head_json.og_site_name}`,
    },
    {
      property: "article:published_time",
      content: `${post?.yoast_head_json.article_published_time}`,
    },
    {
      property: "article:modified_time",
      content: `${post?.yoast_head_json.article_modified_time}`,
    },
    {
      property: "og:image",
      content: `${post?.yoast_head_json.og_image[0].url}`,
    },
    {
      property: "og:image:width",
      content: `${post?.yoast_head_json.og_image[0].width}`,
    },
    {
      property: "og:image:height",
      content: `${post?.yoast_head_json.og_image[0].height}`,
    },
    {
      property: "og:image:type",
      content: `${post?.yoast_head_json.og_image[0].type}`,
    },
    {
      name: "author",
      content: `${post?.yoast_head_json.author}`,
    },
    {
      name: "twitter:card",
      content: `${post?.yoast_head_json.twitter_card}`,
    },
    {
      name: "twitter:label1",
      content: `Written by`,
    },
    {
      name: "twitter:data1",
      content: `${post?.yoast_head_json.twitter_misc['Written by']}`,
    },
    {
      name: "twitter:label2",
      content: `Est. reading time`,
    },
    {
      name: "twitter:data2",
      content: `${post?.yoast_head_json.twitter_misc['Est. reading time']}`,
    },
  ],
  
});
</script>
<template>
  <section class="container blog py-10 sm:py-16">
    <div v-if="post" class="sm:px-20">
      <h1 class="blog__title text-3xl sm:text-5xl font-bold text-center leading-snug mb-5" v-html="post.title.rendered"></h1>
      <div class="flex mb-10 justify-center gap-5">
        <span
          >
          <span class="text-primary-500">{{ new Date(post.date).toLocaleDateString() }}</span></span
        >
      </div>
      
      <div class="blog__content">
        <div v-if="post.content" v-html="post.content.rendered"></div>
      </div>
    </div>
  </section>
</template>

<style>
.blog__content {
  @apply sm:px-10;
}
.blog__content h1,
.blog__content h2,
.blog__content h3,
.blog__content h4,
.blog__content h5,
.blog__content h6,
.blog__content p {
  @apply my-5;
}
.blog__content h1,
.blog__content h2,
.blog__content h3,
.blog__content h4,
.blog__content h5,
.blog__content h6 {
  @apply font-bold;
}

.blog__content h1 {
  @apply text-2xl sm:text-4xl;
}

.blog__content h2 {
  @apply text-xl sm:text-3xl;
}

.blog__content h3 {
  @apply text-lg sm:text-2xl;
}

.blog__content h4 {
  @apply sm:text-xl;
}

.blog__content h5 {
  @apply text-sm sm:text-lg;
}
</style>
