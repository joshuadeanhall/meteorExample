// simple-todos.js
Images = new Mongo.Collection("images");
if (Meteor.isClient) {
  // This code only runs on the client


Template.imageList.rendered = function() {
	var self = this;

	$(".carousel").carousel();
	Meteor.subscribe("imageChanged", function() {
		console.log("real change event");
	});

	Meteor.autosubscribe(function() {


	var cursor = Images.find({});

	var handle = cursor.observe({
		added: function(item) {
			alert('added');	
			$(".carousel").carousel("pause").removeData();
			$(".carousel").carousel();
		},
		changed: function(item) {
			alert('changednew');
		}
	});

	});

	self.autorun(function() {
		self.subscribe("imageChanged", function() {
			console.log('imageChanged event');
			Tracker.autorun(function() {
				var query = Images.find({});
				updateFunction();
			});
		});
	});
}

Template.imageList.helpers({
    images: function() {
        return Images.find({});
  },
}
);

function updateFunction() {
	console.log('updating');

}

}


if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });

Meteor.publish("imageChanged", function() {
	return Images.find({});
});

}
