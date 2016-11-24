define(
    [
        'backbone',
        'marionette',
        'Application',
        'text!modules/search/components/categories/templates/categoriesTemplate.html'
    ], function(
        Backbone,
        Marionette,
        Application,
        template
    ) {
        return Backbone.Marionette.ItemView.extend({
            template : _.template(template),

            tagName: 'div',
            className: 'category-choose',

            events : {
                'click .category-choose-set-all'   : 'onSetAllClick',
                'click .category-choose-unset-all' : 'onUnSetAllClick'
            },

            initialize: function() {
            },
            
            onRender: function() {
            },
            
            onSetAllClick: function(ev) {
                ev.preventDefault();
                console.log('set');
            },
            
            onUnSetAllClick: function(ev) {
                ev.preventDefault();
                console.log('unset');
            },
            
            templateHelpers : function() {
                var mainLayout = Application.getMainLayout();
                var commonData = mainLayout.getCommonData();
                var categories = commonData.categories || [];
                return {
                    categories: categories,
                    checkedCategories: this.model.get('checkedCategories')
                };
            }
        });
    }
);