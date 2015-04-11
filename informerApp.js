// simple-todos.js
Tasks = new Mongo.Collection("tasks");
Images = new Mongo.Collection("images");
if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    tasks: function () {
      return Tasks.find({});
    },
    images: function() {
	return Images.find({});
  }
  });
}



if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
