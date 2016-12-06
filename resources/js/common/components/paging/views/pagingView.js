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
                'click .page-link'       : 'onPageLinkClick',
                'click .page-refresh'    : 'onPageRefreshClick',
                'click .page-goto'       : 'onPageGotoClick',
                'click .page-goto-button': 'onPageGotoButtonClick',
                'click .page-goto-block' : 'onPageGotoBlockClick'
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
            
            onPageGotoButtonClick: function(ev) {
                ev.preventDefault();
                var input = this.$('.page-goto-input');
                var value = parseInt(input.val());
                var eventPrefix = this._eventPrefix || 'category';
                var model = this.model;
                input.removeClass('error');
                if (isNaN(value) || value < 1 || value > model.get('_numOfPages')) {
                    input.addClass('error');
                }
                else {
                    if (value !== parseInt(model.get('_currentPage'))) {
                        Application.trigger(eventPrefix+':page:change', value);
                    }
                    this.$('.page-goto-block').hide();
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