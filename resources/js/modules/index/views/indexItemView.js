define(
    [
        'underscore',
        'backbone',
        'marionette',
        './storItemView',
        '../collections/storCollection',
        'text!modules/index/templates/indexItemTemplate.html'
    ], function (
        _,
        Backbone,
        Marionette,
        storItemView,
        collection,
        template
    ) {
        return Backbone.Marionette.CompositeView.extend({
            tagName: "div",
            className: 'index-category-item',
            collection: new collection(),
            childView: storItemView,
            childContainerView: '.index-category-stors',
            template: _.template(template),
            templateHelpers: function(){
                var model = this.model.toJSON();
                return {
                    categoryId    : model.categoryId,
                    categoryName  : model.categoryName,
                    categoryUrl   : model.categoryUrl,
                    categoryStors : model.categoryStors
                };
            }
        });
    }
);