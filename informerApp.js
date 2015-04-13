// simple-todos.js
Images = new Mongo.Collection("images");
if (Meteor.isClient) {
  // This code only runs on the client


Template.imageList.rendered = function() {
	var self = this;

	$(".carousel").carousel();

	Meteor.autosubscribe(function() {
		var cursor = Images.find({});
		var handle = cursor.observe({
			added: function(item) {
				console.log('added')
				$(".carousel").carousel("pause").removeData();
				$(".carousel").carousel();
			}
		});

	});
}

Template.imageList.helpers({
    images: function() {
        return Images.find({});
  },
}
);

}


if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
