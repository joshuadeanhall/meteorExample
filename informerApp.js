// simple-todos.js
Images = new Mongo.Collection("images");
if (Meteor.isClient) {
  // This code only runs on the client


Template.imageList.rendered = function() {
	var self = this;
	$(".carousel").carousel("pause").removeData();
	$(".carousel").carousel();
	console.log('renderingImageList');

	Meteor.subscribe("imageChanged", function() {
		console.log("real change event");
	});
	self.autorun(function() {
		self.subscribe("imageChanged", function() {
			console.log('imageChanged event');
			Tracker.autorun(function() {
				var query = Images.find({});
				updateCarousel();
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

function updateCarousel() {
	//alert('updateit');
	console.log('updating carousel');

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
