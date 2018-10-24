$(document).ready(function(){
		
	heart_value = 0

	//心跳值
	$('.btn-heart').click(function(){
		swal({
			title: "心跳值",
			text: heart_value,
			icon: "success"
		})

		//調整視窗
		setTimeout(function(){

			$('.swal-title').css({
				"font-size":"50px"
			})

			$('.swal-text').css({
				"font-size":"50px"
			})

			$('.swal-button').css({
				"font-size":"50px"
			})

		}, 10)
	})

	//重整
	$('.btn-reload').click(function(){
		Load() //讀取資料
	})

	Load() //讀取資料
	function Load(){
		GoogleAppScript = "https://script.google.com/macros/s/AKfycbxzyD2JwqifLL722ewZQQ4l0zFTUIuvHp_qLJkkyq77MwYH52s/exec"

		payload = {"method":"read"}
        
        $('.value').remove()
        $('.img-file').remove()
        
		$.ajax({
			url: GoogleAppScript,
			type: "POST",
			data: payload,
			success: function(response){
				result = response
				
				img_link = result[1][1]
				heart_value = result[1][0].toString()
				
				//顯示圖片
				$('.img-view').append(`<img class="img-file" src="${img_link}">`)

				//圖片點擊
				$('.img-file').click(function(){
					//open(img_link)

					//新增圖片
					$('body').append(
						`
						<div class='img-big-background'></div>
						<img class='img-big' src="${img_link}">
						`
					)

					//背景
					$('.img-big-background').css({
						"height":"100%",
						"width":"100%",
						"background-color":"black",
						"position":"fixed",
						"left":"0px",
						"top":"0px",
						"opacity":"0.8"
					})

					//放大圖片位置調整
					$('.img-big').css({
						"position":"fixed",
						"left":"0px",
						"top":"25%",
						"width":"100%",
						"height":"50%",
					})

					//退出放大圖片
					$('.img-big-background').click(function(){
						$('.img-big').remove()
						$('.img-big-background').remove()	
					})
					
				})

				//顯示心律值資料
				// $('.data').append(
				// 	`<div class='value value_heart_value'>${heart_value}</div>`
				// )

				//參考:https://forum.webflow.com/t/how-to-create-code-to-embed-a-dropbox-video/21259
				video_link = "https://www.dropbox.com/s/u6lbu8qfaw0ladv/output2.mp4?dl=0"
				video_src = video_link.replace(video_link.split("/")[2], "dl.dropboxusercontent.com")

				$('.video-js').remove() //清除舊影片

				//顯示影片
				// <!-- controls -->
				// <!-- autoplay -->
				// <!-- loop -->
				// <!-- poster="//vjs.zencdn.net/v/oceans.png" -->
				// <!-- controlslist="nodownload" -->
				$('.video').append(
					`
					<video
					    id="my-player"
					    class="video-js"
					    controls
					    preload="auto"
					    data-setup='{}'
					    style="width: 100%; height: 250px; min-width: 100%; min-height: 100%;">
					    <source class="video-source" src="${video_src}" type="video/mp4"></source>
					</video>
					`
				)

				// $('body').append(
				// 	`
				// 	<!-- video-js -->
				// 	<link href="http://vjs.zencdn.net/7.0/video-js.min.css" rel="stylesheet">
				// 	<script src="http://vjs.zencdn.net/7.0/video.min.js"><\/script>
				// 	`
				// )
			}
		})

		
	}

})
