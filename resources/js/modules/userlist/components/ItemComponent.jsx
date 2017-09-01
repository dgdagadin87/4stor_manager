define([
    'Application',
    'react'
], function(
    Application,
    React
) {

    var ItemComponent = React.createClass({
        getInitialState: function() {
            
            this._bindEvents();
            return {
                disabled: false
            };
        },
        
        _bindEvents: function() {
        },
        
        _onToolbarDisable: function(state) {
            this.setState({
                disabled: state
            });
        },

        componentDidMount: function() {
        },
        
        _onAddUserClick: function(event) {
            Application.trigger('userlist:add', event);
        },
        
        _onDeleteUsersClick: function(event) {
            Application.trigger('userlist:delete:checked', event);
        },

        render: function() {
            
            var isDisabled = this.state.disabled;
            var classNameAdd = 'tbar-button button-add toolbar-for-disabled';
            var classNameDelete = 'tbar-button button-delete toolbar-for-disabled';
            var disabledClass = isDisabled ? ' toolbar-disabled' : '';
            classNameAdd += disabledClass;
            classNameDelete += disabledClass;
            
            return (
                <div className="grid-toolbar">
                    <div
                        onClick={this._onAddUserClick}
                        title="Добавить пользователя"
                        className={classNameAdd}
                    >
                        <span className="image add"></span>
                        <span className="text">Добавить</span>
                    </div>
                    <div
                        onClick={this._onDeleteUsersClick}
                        title="Удалить выделенное"
                        className={classNameDelete}
                    >
                        <span className="image delete"></span>
                        <span className="text">Удалить</span>
                    </div>
                </div>
            );
        }
  });

  return ItemComponent;
});
