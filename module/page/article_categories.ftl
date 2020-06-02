<#include "../fragment/article_category_tag_list.ftl">
<@categoryTag method="list">
  <#list categories as category>
    <@postTag method="listByCategoryId" categoryId="${category.id}">
		<#include "../fragment/article_categorys_tags_content.ftl">
    </@postTag>
  </#list>
</@categoryTag>

