<#include "module/layout.ftl">
<@layout type="tag" title="标签：${tag.name!} - ${options.blog_title!}" keywords="${options.seo_keywords!}" description="${options.seo_description!}" canonical="${context!}/tags/${tag.slugName!}">
    <#include "module/page/article_tag.ftl">
</@layout>