define(
    [
        'jquery',
        'backbone',
        'marionette',
        'Application',
        'text!common/components/paging/templates/pagingTemplate.html'
    ], function(
        $,
        Backbone,
        Marionette,
        Application,
        template
    ) {
        return Backbone.Marionette.ItemView.extend({
            template : _.template(template),

            tagName: 'div',
            className: 'paging-container',

            events : {
                'click .page-link'      : 'onPageLinkClick',
                'click .page-refresh'   : 'onPageRefreshClick',
                'click .page-goto'      : 'onPageGotoClick',
                'click .page-goto-block': 'onPageGotoBlockClick'
            },

            initialize: function() {
            },
            
            onRender: function() {
            },
            
            onPageLinkClick: function(ev) {
                ev.preventDefault();
                var current = $(ev.currentTarget);
                if (!current.hasClass('page-disabled')) {
                    var page = current.attr('page-num');
                    var eventPrefix = this._eventPrefix || 'category';
                    Application.trigger(eventPrefix+':page:change', page);
                }
            },
            
            onPageRefreshClick: function(ev) {
                ev.preventDefault();
                var current = $(ev.currentTarget);
                if (!current.hasClass('page-disabled')) {
                    var eventPrefix = this._eventPrefix || 'category';
                    Application.trigger(eventPrefix+':refresh');
                }
            },
            
            onPageGotoClick: function(ev) {
                ev.stopPropagation();
                var current = $(ev.currentTarget);
                if (!current.hasClass('page-disabled')) {
                    this.$('.page-goto-block').toggle();
                }
            },
            
            onPageGotoBlockClick: function(ev) {
                ev.stopPropagation();
            },
            
            templateHelpers : function() {
                return {
                    model: this.model.toJSON(),
                    cfg: {
                        numStart : this._numStart,
                        numLeft  : this._numLeft,
                        numEnd   : this._numEnd,
                        numRight : this._numRight
                    }
                };
            }
        });
    }
);