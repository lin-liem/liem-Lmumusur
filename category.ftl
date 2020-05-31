<#include "module/layout.ftl">
<#include "module/page/article.ftl">
<@layout type="category" title="分类：${category.name!} - ${options.blog_title!}" keywords="${options.seo_keywords!}" description="${options.seo_description!}" canonical="${context!}/categories/${category.slugName!}">
    <@article post,'page',"post", 'content' />
</@layout>