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
                'change .category-item-checkbox'   : 'onCatCheckboxChange',
                'click .category-choose-set-all'   : 'onSetAllClick',
                'click .category-choose-unset-all' : 'onUnSetAllClick',
                'click .categories-apply'          : 'onCategoriesApplyClick',
                'click .categories-cancel'         : 'onCategoriesCancelClick'
            },

            initialize: function() {
            },
            
            onRender: function() {
            },
            
            onCatCheckboxChange: function(ev) {
                var current = this.$(ev.currentTarget);
                if (current.attr('checked')) {
                    current.removeAttr('checked');
                }
                else {
                    current.attr('checked', 'checked');
                }
            },
            
            onCategoriesApplyClick: function(ev) {
                ev.preventDefault();
                var me = this;
                var checked = me.model.get('checkedCategories');
                _.each(this.$('.category-item-checkbox'), function(item){
                    var current = me.$(item);
                    var isChecked = current.attr('checked');
                    var catId = current.attr('data-cat-id');
                    var indexOf = checked.indexOf(catId);
                    if (isChecked) {
                        if (indexOf === -1) {
                            checked.push(catId);
                        }
                    }
                    else {
                        if (indexOf !== -1) {
                            checked.splice(indexOf, 1);
                        }
                    }
                    me.model.set('checkedCategories', checked);
                });
                this.trigger('dialog:close');
            },
            
            onCategoriesCancelClick: function(ev) {
                ev.preventDefault();
                this.trigger('dialog:close');
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