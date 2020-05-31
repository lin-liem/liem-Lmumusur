<#include "module/layout.ftl">
<@layout type="category" title="分类：${category.name!} - ${options.blog_title!}" keywords="${options.seo_keywords!}" description="${options.seo_description!}" canonical="${context!}/categories/${category.slugName!}">
    <#include "module/page/article_category.ftl">
</@layout>