<#-- 快讯页面：当分类为快讯即可用（k:快讯，v:newsflashes） -->
<style>
	.content-area {
		width: 804px;
	}

	.b2-radius {
		border-radius: 0;
	}

	.box {
		background-color: #fff;
		box-shadow: 0 1px 3px rgba(26, 26, 26, .1);
	}

	.news-item-date {
		font-size: 12px;
		font-weight: 700;
		padding: 16px;
		background: #f9f9f9;
	}

	.b2-color {
		color: #0084ff;
	}

	.b2-color {
		color: #0084ff;
	}

	.news-item li {
		padding: 16px 0 0;
		position: relative;
	}

	.news-item-header {
		display: flex;
		align-items: center;
		font-size: 14px;
		position: relative;
		overflow: hidden;
	}

	.news-item-header:before {
		content: '';
		border-bottom: 1px dashed #dadada;
		position: absolute;
		top: 14px;
		width: calc(100% - 50px);
		left: 30px;
	}

	.news-item-header span {
		font-size: 12px;
		background-color: #f5f5f5;
		height: 28px;
		line-height: 28px;
		border-radius: 15px;
		font-weight: 700;
		display: inline-block;
		padding: 0 10px 0 3px;
		position: relative;
		z-index: 2;
		margin: 0 16px;
	}

	.news-item-header span a {
		display: flex;
		align-items: center;
	}

	a {
		color: inherit;
		text-decoration: none;
		vertical-align: top;
	}

	.news-item-header span:after {
		content: '';
		background-color: #fff;
		width: 10px;
		height: 27px;
		position: absolute;
		right: -10px;
		top: 0;
	}

	.news-item-header b {
		background-color: #fff;
		position: relative;
		z-index: 2;
		padding: 0 10px;
		font-size: 12px;
		font-weight: 400;
	}

	.news-item-header span.new-tag {
		background-color: #fff;
		position: absolute;
		right: 0;
		padding-left: 13px;
	}

	.news-item-header span {
		font-size: 12px;
		background-color: #f5f5f5;
		height: 28px;
		line-height: 28px;
		border-radius: 15px;
		font-weight: 700;
		display: inline-block;
		padding: 0 10px 0 3px;
		position: relative;
		z-index: 2;
		margin: 0 16px;
	}

	.news-item-header span a {
		display: flex;
		align-items: center;
	}

	a {
		color: inherit;
		text-decoration: none;
		vertical-align: top;
	}

	.news-item-header span:after {
		content: '';
		background-color: #fff;
		width: 10px;
		height: 27px;
		position: absolute;
		right: -10px;
		top: 0;
	}

	.news-item-content {
		margin: 16px 16px 0 50px;
	}

	.news-item-content h2 {
		margin-bottom: 10px;
		font-weight: 700;
		font-size: 18px;
	}

	.news-item-content p.b2-hover {
		padding-right: 10px;
	}

	.news-item-content p {
		width: 100%;
		flex: 1;
		line-height: 26px;
		color: #999;
		font-size: 14px;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		overflow: hidden;
		position: relative;
	}

	.news-item-content img {
		display: block;
		width: 120px;
		height: 70px;
	}

	.b2-radius {
		border-radius: 0;
	}

	img {
		max-width: 100%;
		height: auto;
		object-fit: cover;
		vertical-align: bottom;
	}

	.news-item-content>div {
		display: flex;
	}

	.new-meta {
		margin-top: 14px;
		display: flex;
		justify-content: space-between;
	}

	.new-meta-left {
		display: flex;
	}

	.news-item-content p {
		width: 100%;
		flex: 1;
		line-height: 26px;
		color: #999;
		font-size: 14px;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		overflow: hidden;
		position: relative;
	}

	.new-meta-left span {
		margin-right: 16px;
		color: #999;
		cursor: pointer;
	}

	.new-meta span {
		font-size: 12px;
	}

	.new-meta-left span b {
		margin-right: 3px;
		font-weight: 400;
		font-size: 13px;
	}

	.news-item-content p {
		width: 100%;
		flex: 1;
		line-height: 26px;
		color: #999;
		font-size: 14px;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		overflow: hidden;
		position: relative;
	}

	.new-meta-left span {
		margin-right: 16px;
		color: #999;
		cursor: pointer;
	}

	.new-meta span {
		font-size: 12px;
	}

	.new-meta-right {
		font-size: 12px;
		display: flex;
		align-items: center;
		margin-right: 20px;
		color: #999;
	}

	.new-meta-right span {
		margin-left: 14px;
		cursor: pointer;
	}

	.news-item-header img {
		width: 20px;
		height: 20px;
		border-radius: 100%;
		margin-right: 5px;
		border: 2px solid #fff;
	}

	.news-item li:last-child:before {
		display: none
	}

	.news-item li:before {
		content: '';
		position: absolute;
		width: 1px;
		height: 100%;
		top: 17px;
		left: 32px;
		border-left: 1px dashed #dadada;
	}
	.news-item-date span {
		margin-left: 5px;
	}
	.news-list-box .news-item+.news-item .news-item-date {
		margin-top: 10px;
	}
</style>

<div id="primary-home" class="wrapper content-area">
<main class="site-main">
	<div data-paged="1" class="news-content">
		<div class="box b2-radius">
			<div class="news-list-box">
				<div>
					<#if posts.content?? && posts.content?size gt 0>
						<#list posts.content as post>
							<div class="news-item">
								<div class="news-item-date b2-color"><span>${post.editTime?string('MM月dd日')}</span><span>星期六</span></div>
								<ul>
									<li id="news-item-36783">
										<div class="news-item-header">
											<span>
												<a href="${blog_url!}">
													<img src="${user.avatar!}">${user.nickname!}
												</a>
											</span>
											<b>${post.editTime?string('HH:mm')}</b> 
											<span class="new-tag anhover">
												<a target="_blank" href="">${category.name!}</a>
											</span>
										</div>
										<div class="news-item-content">
											<h2 class="anhover"><a href="${post.fullPath!}">${post.title!}</a></h2>
											<div>
												<p class="b2-hover">
													<span>${post.summary!}</span>
												</p>
												<#if post.thumbnail??>
													<img src="${post.thumbnail!}" class="news-item-img b2-radius">
												</#if>
											</div>
											<div class="new-meta">
												<div class="new-meta-left">
													<p class="news-vote-up">
														<span class="">
															<i class="b2font b2-pinglun"></i><b>${post.commentCount}</b>
														</span>
													</p>
													<p class="news-vote-down">
														<span class="">
															<i class="b2font b2-eye"></i><b>${post.visits!}</b>
														</span>
													</p>
												</div>
												<div class="new-meta-right">分享到<span class="new-weibo">微博</span><span class="new-weixin">微信</span><span
													 class="new-qq">QQ好友</span></div>
											</div>
										</div>
									</li>
								</ul>
							</div>
						</#list>
					</#if>
					
					<#--
					<div class="news-item">
						<div class="news-item-date b2-color"><span>03月06日</span><span>星期五</span></div>
						<ul>
							<li id="news-item-36757">
								<div class="news-item-header"><span><a href="https://www.dachaoka.com/u/auuAwtzuk"><img src="https://static.7b2.com/wp-content/uploads/2020/06/1b1d521b44e8ed_1_avatar.jpg?x-oss-process=image/resize,m_fill,h_120,w_120">春哥</a></span>
									<b>22:11</b> <span class="new-tag anhover"><a target="_blank" href="https://www.dachaoka.com/newsflashes/apple">apple</a></span></div>
								<div class="news-item-content">
									<h2 class="anhover"><a href="https://www.dachaoka.com/newsflashes/36757.html">斗鱼上线云游戏平台，用户可web端登陆不需再下载游戏</a></h2>
									<div>
										<p class="b2-hover"><span>近日，斗鱼透露已在云端部署了近20款端游和30多款手游，囊括了最受玩家喜爱的DOTA2、绝地求生、魔兽世界、星际争霸、王者荣耀、跑跑卡丁车、消消乐等等。据了解，云游戏对显卡、内存要求很低。依托斗鱼已有的联运账号体系，玩家在web端一次性登陆，也不用下载安装游戏。</span>
											<!---->
										</p> <img src="https://static.7b2.com/wp-content/uploads/2020/03/152f61957180fe.jpg?x-oss-process=image/resize,m_fill,h_84,w_144"
										 class="news-item-img b2-radius">
									</div>
									<div class="new-meta">
										<div class="new-meta-left">
											<p class="news-vote-up"><span class=""><i class="b2font b2-qushi-shangzhang "></i><b>利好</b><b>11</b></span></p>
											<p class="news-vote-down"><span class=""><i class="b2font b2-qushi-xiadie "></i><b>利空</b><b>2</b></span></p>
										</div>
										<div class="new-meta-right">分享到<span class="new-weibo">微博</span><span class="new-weixin">微信</span><span
											 class="new-qq">QQ好友</span></div>
									</div>
								</div>
							</li>
							<li id="news-item-36750">
								<div class="news-item-header"><span><a href="https://www.dachaoka.com/u/dCuxuksqq"><img src="https://static.7b2.com/wp-content/uploads/2019/11/19773c6c9d5957462.jpg?x-oss-process=image/resize,m_fill,h_120,w_120">yexu</a></span>
									<b>21:27</b> <span class="new-tag anhover"><a target="_blank" href="https://www.dachaoka.com/newsflashes/%e6%96%b0%e5%86%a0%e7%96%ab%e6%83%85">新冠疫情</a></span></div>
								<div class="news-item-content">
									<h2 class="anhover"><a href="https://www.dachaoka.com/newsflashes/36750.html">美媒称彭斯“控制”疫情信息发布，要求“统一口径”</a></h2>
									<div>
										<p class="b2-hover"><span>【环球网综合报道】对本土肺炎疫情的判断，美国疾控中心专家和白宫官员表态不一。前者曾暗示疫情向上拐点，后者则坚称疫情已得到控制。对此，美国副总统彭斯上周召集美国卫生部门官员学者开会，明确大家要“口径一致”，声明发布前需向彭斯汇总。</span><a
											 href="https://news.163.com/20/0306/17/F728AHFE000189FH.html" target="_blank" rel="nofollow" class="item-from"><i
												 class="b2font b2-link "></i>原文连接</a></p>
										<!---->
									</div>
									<div class="new-meta">
										<div class="new-meta-left">
											<p class="news-vote-up"><span class=""><i class="b2font b2-qushi-shangzhang "></i><b>利好</b><b>3</b></span></p>
											<p class="news-vote-down"><span class=""><i class="b2font b2-qushi-xiadie "></i><b>利空</b><b>0</b></span></p>
										</div>
										<div class="new-meta-right">分享到<span class="new-weibo">微博</span><span class="new-weixin">微信</span><span
											 class="new-qq">QQ好友</span></div>
									</div>
								</div>
							</li>
						</ul>
					</div>
					
					-->
				</div>
			</div>
		</div>
	</div>
</main>
</div>
