define(["dojo/_base/declare",
        "dojo/_base/json",
        "davinci/Runtime",
        "davinci/Workbench"
        
],function(declare, json, Runtime, Workbench){
	
var ProjectTemplates = {

	create: function() {
		// Make async?
		// Need a different server call to see if template already exists (client-side check)
		// Are you sure check to see if any unsaved files
		require(["dojo/_base/json"], function(json){
			var timestamp = new Date().toISOString();
			var params = {
				projectTemplateName: 'foo', 
				projectToClone:Workbench.getProject(),
				sharingSimple:'all',
				timestamp:timestamp
			};
			var paramsJson = json.toJson(params, '\t');
			var data = Runtime.serverJSONRequest({
				url: "cmd/createProjectTemplate",
				handleAs: "json",
				content: { projectTemplateName: 'foo', projectToClone:Workbench.getProject(),
					params:paramsJson },
				sync:true
			});
			if(!data || !data.success){
				console.log("cmd/createProjectTemplate error:"+data.error);
			}
		});
	}
	
};

return dojo.setObject("davinci.ui.ProjectTemplates", ProjectTemplates);

});

