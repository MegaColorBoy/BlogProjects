//Initialize DOM Element
function init()
{
	var style = $(`
		<!-- Generated style for the web.config to .htaccess converter -->
		<style>
			.iis-to-apache
			{
				width: 100%;
				padding: 20px;
				background: white;
				height: 100%;
				box-shadow: 0 1px 4px rgba(0,0,0,.04);
				border: 1px solid rgba(0,0,0,.09);
				border-radius: 4px;
				box-sizing: border-box;
			}

			.webconfig-xml
			{
				box-sizing: border-box;
				width: 100%;
				border: 1px solid rgba(0,0,0,.09);
				border-radius: 4px;
				margin-bottom: 10px;
				height: 80px;
				outline: none;
				padding: 10px;
			}

			.bold-text
			{
				font-weight: 700;
				margin-top: 0px;
				margin-bottom: 10px;
			}

			#htaccess-code
			{
				height: 100%;
				box-shadow: none;
			}
		</style>
	`);

	//Append style in head element
	$('html > head').append(style);

	var mainElement = document.createElement("div");
	mainElement.id = "iis-to-apache";
	mainElement.className = "iis-to-apache";

	//Add button
	var button = document.createElement('button');
	button.id = "convert-webconfig";
	button.innerText = "Convert";
	button.className = "reaction_btn";

	//Add textarea
	var textarea = document.createElement("textarea");
	textarea.id = "webconfig-xml";
	textarea.className = "webconfig-xml";
	textarea.placeholder = "Place your code here";

	//Add pre tag
	var pretag = document.createElement("pre");
	pretag.id = "htaccess-code";
	pretag.className = "normal";
	pretag.style.boxShadow = "none";

	//Text nodes
	var textnode1 = document.createElement("p");
	textnode1.className = "bold-text";
	textnode1.innerHTML = "Place web.config code here:";

	var textnode2 = document.createElement("p");
	textnode2.className = "bold-text";
	textnode2.innerHTML = "View .htaccess code here:";

	//Append child elements
	mainElement.appendChild(textnode1);
	mainElement.appendChild(textarea);
	mainElement.appendChild(textnode2);
	mainElement.appendChild(pretag);
	mainElement.appendChild(button);
	
	var parent = document.getElementById("js-code");
	parent.appendChild(mainElement);
}

//web.config to .htaccess converter
function webConfigToHtaccess()
{
	//Take XML input from textarea
	var xml = $("#webconfig-xml").val(), xmlDoc = $.parseXML(xml), $xml = $(xmlDoc);

	/*
		- Inside each "rule", look for the "action" child node
		- If it contains multiple parameters, follow the 
		regular expression pattern: /{R:(\d{1})}/
		- Replace that pattern with a dollar sign and it's parameter
		- Append "RewriteRule" along with the url and it's rules
	*/
	$xml.find('rule').each(function(){
		var str = $(this).find("rule>action").attr('url');
		var regex = /{R:(\d{1})}/;
		while(regex.test(str))
		{
			str = str.replace(regex, '&#x24;' + RegExp.$1);
		}

		$("#htaccess-code").append("RewriteRule " + $(this).find("rule>match").attr('url')
			+ " &nbsp;&nbsp; " +
			str +
			"<br>"
		);
	});
}

//Convert event
$(document).on('click', '#convert-webconfig', function(e){
	webConfigToHtaccess();
});

init();