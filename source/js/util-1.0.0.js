function parseDomHTML(html){
	let dom = parseDom(html);
	var fragment = document.createDocumentFragment();
	
	let items = [];
	dom.forEach(element => {
	  if(element.tagName == 'DIV'){
		  fragment.appendChild(element );
		  items.push(element)
	  }
	});
	
	var contentHtml = items[0].getElementsByClassName('b2_gap')
	
	// 如果没有内容则调出
	if(contentHtml == null || contentHtml.length == 0){
		 box.innerHTML = b2_global.empty_page; 
	}else{
		// 获取所需文本          					
		var htmlItem = contentHtml[0].innerHTML;
		var dataResult = contentHtml[0].getElementsByClassName('post-list-item');
		
		//如果内容为空，加载提示
		if(dataResult.length == 0 && htmlItem.trim() == ''){
			box.innerHTML = b2_global.empty_page; 
			//隐藏按钮
			hiddenButton(button,false)
				  
		//如果内容不为空，并且只有一页，隐藏加载更多按钮
		}else if(dataResult.length < 12 ){
			
			// 追加内容
			box.innerHTML = htmlItem
		
			//增加渐变效果
			listFadein(box.childNodes,20)
		
			hiddenButton(button,true)
			//按钮提示没有更多
			if(button){
				buttonDisabledNone(button,true,button.getAttribute('data-none'))
			}
			
		}else{
			// 追加内容
			box.innerHTML = htmlItem
		
			//增加渐变效果
			listFadein(box.childNodes,20)
		
			//显示加载按钮
			hiddenButton(button,true)
			buttonDisabledLoad(button,false)
			buttonDisabledNone(button,false,button.getAttribute('data-text'))
		}
	}
}