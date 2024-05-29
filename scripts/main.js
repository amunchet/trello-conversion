var Showdown = require(["showdown"], function(util){
	});
function displayJSON(){

	var converter = new Showdown.converter();

	var jin = $("#input-text").val();
	var jsonStr = jin;
	var jsonObj = JSON.parse(jsonStr);

	var desc = jsonObj["desc"];
	var dueDate = jsonObj["due"];
	var labels = jsonObj["labels"]; //Sub items: color, name
	var cardName = jsonObj["name"];
	var url = jsonObj["shortUrl"];
	var checklists = jsonObj["checklists"];
	var actions = jsonObj["actions"];
	// Comments: lots of them, [type] == commentCard
	// Attachments: lots of them, type == addAttachmentToCard, [attachment][url]

	var comments = "<table class='comments'>";
	var checklist = "";
	//var attachments = "<table class='attachments'>";
	var attachments = "<div>";
	actions.forEach(function(entry){
		if(entry["type"] == "commentCard"){
			//alert(JSON.stringify(entry["data"]["text"]));
			comments += "<tr><td>" + converter.makeHtml(entry['data']['text']) + "</td></tr>";
		}else if(entry["type"] == "addAttachmentToCard"){
			try{
				if(entry['data'] != null && entry['data']['attachment'] != null && entry['data']['attachment']['url'] != null && entry['data']['attachment']['url'].indexOf("png") != -1 || entry['data']['attachment']['url'].indexOf(".jpg") != -1 || entry['data']['attachment']['url'].indexOf(".jpeg") != -1){
						
						//attachments += "<tr><td><a href='" + entry['data']['attachment']['url'] + "'><img src='"  + entry['data']['attachment']['url'] + "' /></a></td></tr>";
						attachments += "<a href='" + entry['data']['attachment']['url'] + "'><img src='"  + entry['data']['attachment']['url'] + "' /></a><br />";
				}else{
					
					attachments += "<tr><td><a href='" + entry['data']['attachment']['url'] + "'>"  + entry['data']['attachment']['name'] + "</a></td></tr>";
				}
			}catch(err){
				alert(err.message);
			}
		}

	});
	//attachments += "</table>";
	attachments += "</div>";
	var count = 0;
		checklists.forEach(function(entry){
			checklist += "<h2>" + entry["name"] + "</h2>";  // This was changed so we can copy and paste in without getting random bolds everywhere
			checklist += "<table>";
			entry["checkItems"].forEach(function(entry2){
				checklist += "<tr><td class='" + entry2["state"]  + "'>" + entry2["name"] + "</td></tr>";
				});
			checklist += "</table>";
			count += 1;
		});
	comments += "</table>";
	

	$("div#output div#description").html("<table><tr><td style='border:1px solid black;padding:5px;'>" + converter.makeHtml(desc) + "</td></tr></table>");

	$("div#output div#label").html(labels["name"]);
	$("div#output div#label").css({"color" : labels["color"]});

	$("div#output h1").html(cardName);
	$("div#output div#comments").html(comments);
	$("div#attachments").html(attachments);
	$("div#checklists").html(checklist);
	//var jsonPretty = JSON.stringify(jsonObj, null, '\t');
	//$("div#output").text(jsonPretty);
}

