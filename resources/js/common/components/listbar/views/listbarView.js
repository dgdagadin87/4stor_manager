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
                if (!current.hasClass('listbar-disabled')) {
                    var eventPrefix = this.eventPrefix || 'category';
                    var curSortType = current.hasClass('sort-desc') || (!current.hasClass('sort-desc') && !current.hasClass('sort-asc')) ? 'DESC' : 'ASC';
                    var sortType = curSortType === 'DESC' ? 'ASC' : 'DESC';
                    if (!current.hasClass('sort-desc') && !current.hasClass('sort-asc')) {
                        sortType = 'DESC';
                    }
                    Application.trigger(eventPrefix+':sort:change', {
                        sortBy: sortBy,
                        sortType: sortType
                    });
                }
            },
            
            templateHelpers : function() {
                return this.model.toJSON();
            }
        });
    }
);