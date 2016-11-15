define(
    [
        'backbone',
        'marionette',
        'Application',
        'text!common/components/listbar/templates/listbarTemplate.html'
    ], function(
        Backbone,
        Marionette,
        Application,
        template
    ) {
        return Backbone.Marionette.ItemView.extend({
            template : _.template(template),

            tagName: 'div',
            className: 'list-toolbar',

            events : {
                'click .sort-link' : 'onSortLinkClick'
            },

            initialize: function() {
            },
            
            onRender: function() {
            },
            
            onSortLinkClick: function(ev) {
                ev.preventDefault();
                var current = $(ev.currentTarget);
                var sortBy = current.attr('sort-name');
                var opts = this.options || {};
                var eventPrefix = opts.eventPrefix || 'category';
                Application.trigger(eventPrefix+':sort:change', {
                    sortBy: sortBy
                });
            },
            
            templateHelpers : function() {
                return this.model.toJSON();
            }
        });
    }
);