$(document).ready(function(){

    // Grab the data
    var labels = [],
    	data = [];
    $("#data thead td").each(function () {
    	labels.push($(this).html());
    });
    $("#data tbody tr").each(function () {
    	row=[];
    	$(this).children("td").each(function() {
        row.push($(this).html());
        });
        data.push(row);
    });
    // hide the raw data
    
    $("#data").css({
        position: "absolute",
        left: "-9999em",
        top: "-9999em"
    });

    var seenBoundingBoxes = [];
    function collides(box) {
        for (var i = 0, il = seenBoundingBoxes.length; i < il; i++) {
    		seen = seenBoundingBoxes[i];
    		if (!(box.x > seen.x + seen.w || box.y > seen.y + seen.h || box.x + box.w < seen.x ||	box.y + box.h < seen.y)) return true; 
        }
        seenBoundingBoxes.push(box);
        return false;
    }
	
    // Draw
    var width = 500, // make dynamic
        height = 950, // make dynamic
        r = Raphael("holder", width, height),
        txtL = { 'text-anchor':'end', font: '12px Hoefler Text, Palatino, Georgia, Serif', fill: "#000"},
        txtR = { 'text-anchor':'start', font: '12px Hoefler Text, Palatino, Georgia, Serif', fill: "#000"},
        labelwidth = 90, // TODO calculate this
        numberwidth = 25, //TODO calculate this too
        max = 60.0, // TODO Math.max.apply(Math, data),
        min = 20.0, // calc too
        scale = height/(max-min),
    	t = r.text(labelwidth + numberwidth,10,labels[1]).attr(txtL);
    	t = r.text(width-labelwidth - numberwidth,10,labels[2]).attr(txtR);
    	for (var i = 0, il = data.length; i < il; i++) {
    		var country = data[i] [0],
    			startVal= data[i] [1],
    			endVal  = data[i] [2],
    			startY  = height-scale*(startVal-min);
    			endY    = height-scale*(endVal-min);
    		while (collides({x:0,y:startY,w:labelwidth,h:12})) startY++;	
    		while (collides({x:width-labelwidth,y:endY,w:labelwidth,h:12})) endY++;
    		t = r.text(labelwidth,startY,country).attr(txtL);
    		t = r.text(labelwidth + numberwidth,startY,startVal).attr(txtL);
    		t = r.text(width-labelwidth,endY,country).attr(txtR);
    		t = r.text(width-labelwidth - numberwidth,endY,endVal).attr(txtR);
    		var line = ["M",labelwidth+numberwidth," ",startY,"L",width-labelwidth - numberwidth," ", endY].join("");
    		var p = r.path(line);
    		
    	}
        
 });
