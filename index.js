var fs = require('fs');
var swig = require('swig');
var _ = require('lodash');

function readJsonFile(path) {
	return JSON.parse(fs.readFileSync(path, {encoding: "utf-8"}));
}

var apiData = readJsonFile("/home/chin/dev/vndirect/noti-service/docs/api/api_data.json");
var apiProject = readJsonFile("/home/chin/dev/vndirect/noti-service/docs/api/api_project.json");


var endpointsByGroup = _.groupBy(apiData, "group");

var groups = _.map(endpointsByGroup, function(endpoints, groupId) {
	return {
		id: groupId,
		title: endpoints[0].groupTitle,
		description: endpoints[0].groupDescription,
	};
});

var template = swig.compileFile("template.txt");
console.log(template({
	project: apiProject,
	groups: groups,
	endpointsByGroup: endpointsByGroup,
}));
