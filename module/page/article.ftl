<#macro article post,layout,commentType,pageType>
	<#if pageType == 'index'>
      	<#include "./article_index.ftl">
    <#elseif pageType == 'content'>
    	<#include "./article_content.ftl">
	<#elseif pageType == 'category' || pageType == 'search' || pageType == 'tags'>
        <#include "./article_category.ftl">
    
    <!-- 九宫格显示-->
    <#elseif pageType == 'categorySudoku' || pageType == 'indexSudoku' || pageType == 'searchSudoku' || pageType == 'tagsSudoku'>
        <#include "./article_sudoku.ftl">
	</#if>
</#macro>