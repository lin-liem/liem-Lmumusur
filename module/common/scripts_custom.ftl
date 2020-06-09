<#if post??>
<script type="text/javascript">
	var $config = {
		title               : '${post.title!}',  
		description         : '${post.summary!}',  
		image               : '${post.thumbnail!}',  
	};
	socialShare('.social-share', $config);
</script> 
</#if>