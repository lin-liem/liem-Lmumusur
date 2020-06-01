<#macro layout type,title,keywords,description,canonical>
<#include "common/navbar.ftl">
<#include "common/header.ftl">
<!doctype html>
<html lang="zh-CN" class="avgrund-ready">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
		<meta http-equiv="Cache-Control" content="no-transform">
		<meta http-equiv="Cache-Control" content="no-siteapp">
		<meta name="renderer" content="webkit">
		<meta name="force-rendering" content="webkit">
		<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
		<title>${title!}</title>
		<meta property="wb:webmaster" content="3862de00f8888c99">
		<meta name="baidu-site-verification" content="IFs0BtfI1Q">
		<meta property="og:locale" content="zh_CN">
		<meta property="og:type" content="website">
		<meta property="og:site_name" content="${title!}">
		<meta property="og:title" content="${title!}">
		<meta property="og:url" content="${canonical}">
		<meta name="keywords" content="${meta_keywords!}">
		<meta name="description" content="${meta_description!}">
		<meta property="og:image" content="${user.avatar!}">
		<meta name="generator" content="WordPress 5.4.1">
		<meta name="twitter:card" content="summary">
		<meta name="twitter:title" content="${title!}">
		<meta name="twitter:description" content="${meta_description!}">
		<meta name="twitter:image" content="${user.avatar!}">
		<meta name="msapplication-TileImage" content="https://static.7b2.com/wp-content/uploads/2018/04/资源-19.png">
		<link rel="alternative" href="${atom_url!}" title="${blog_title!}" type="application/atom+xml">
		<link rel="canonical" href="${canonical!}" />
		<link rel="profile" href="http://gmpg.org/xfn/11">
		<#include "common/style.ftl">
	</head>

	<body class="blog">
		<div id="page" class="site">
			<div class="site-header mg-b">
				<div class="site-header-in">
					<@header 'page' />
					<@navbar 'page' />
				</div>
			</div>
			<div id="content" class="site-content">
				<#nested />
			</div>
		</div>
		
		<#include "common/footer.ftl">
		<#include "common/navbar_tool.ftl">
		<#include "common/scripts.ftl">
	</body>
</html>
</#macro>