<#include "../comment/comment.ftl">
<div class="b2-single-content wrapper">
	<div id="primary-home" class="content-area">
		<div class="announcement-show-more b2-pd box"> <span>公告</span> <span><a href="https://www.dachaoka.com/announcements">所有公告</a></span></div>
		<article class="single-article b2-radius box">
			<header class="entry-header">
				<div class="">
					<div class="post-list-cat  b2-radius"></div>
				</div>
				<h1>${post.title!}</h1>
				<div id="post-meta">
					<div class="post-meta-row">
						<ul class="post-meta">
							<li class="single-date"><span><time datetime="${post.createTime!}" itemprop="datePublished" data-tid="4" class="b2timeago">${post.createTime?string('yyyy-MM-dd HH:mm:ss')}</time></span></li>
							<li class="single-like"><span><i class="b2font b2-pinglun "></i><b>${post.commentCount}</b></span></li>
							<li class="single-eye"><span><i class="b2font b2-eye "></i><b>${post.visits!}</b></span></li>
						</ul>
					</div>
				</div>
			</header>
			<div class="entry-content">${post.formatContent!}</div>
			<div class="content-footer">
				<div class="content-footer-zan-cai">
					<span style="margin-left:0">最后编辑时间&nbsp;&nbsp;|&nbsp;&nbsp;${post.editTime?string('yyyy-MM-dd HH:mm:ss')}</span>
				</div>
			</div>
		</article>
		<div class="comments-box">
			<div id="comments" class="comments-area box b2-radius">
				<div class="comments-title">
					<div class="comment-info">
						<span>${post.commentCount}条回复</span>
						<span>|</span>
						<span>若显示条数与实际不符，表明部分留言非开放</span>
					</div>
					<div class="comment-tips" style="">
						<span><i class="b2font b2-write "></i>世界以痛吻我，要我报之以歌</span>
					</div>
				</div>

				<div class="comments-area-content respond">
					<#if commentType=='post'>
						<@comment post,"post" />
						<#else>
							<@comment post,"sheet" />
					</#if>
				</div>
				<style type="text/css">
					.content-area {
						width: 804px;
					}
					.announcement-show-more {
						display: flex;
						justify-content: space-between;
						background: #f7f8fa;
						font-size: 12px;
					}
					.halo-comment .comment-form input,
					.halo-comment .comment-form textarea {
						border-radius: 0px !important;
					}

					.halo-comment .comment-buttons .button-preview-edit,
					.halo-comment .comment-buttons .button-submit {
						border-radius: 0px !important;
					}

					.halo-comment .comment-form {
						margin-left: 45px !important;
					}

					.halo-comment .avatar {
						border-radius: 3px !important;
						width: 34px !important;
						height: 34px !important;
					}
				</style>
			</div>
		</div>
	</div>
</div>
