<#include "module/layout.ftl">
<@layout type="categories" title="分类 - ${options.blog_title!}" keywords="${options.seo_keywords!}" description="${options.seo_description!}" canonical="${context!}/categories">
    <#include "module/page/article_categories.ftl">
</@layout>
