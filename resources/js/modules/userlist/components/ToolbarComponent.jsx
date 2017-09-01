define([
    'Application',
    'react'
], function(
    Application,
    React
) {

    var ToolbarComponent = React.createClass({
        getInitialState: function() {
            
            this._bindEvents();
            return {
                disabled: false
            };
        },
        
        _bindEvents: function() {
            Application.on('userlist:toolbar:disable', this._onToolbarDisable);
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
            
            return (
                <div className="grid-toolbar">
                    <div
                        onClick={this._onAddUserClick}
                        title="Добавить пользователя"
                        className={'tbar-button button-add toolbar-for-disabled' + (isDisabled ? ' toolbar-disabled' : '')}
                    >
                        <span className="image add"></span>
                        <span className="text">Добавить</span>
                    </div>
                    <div
                        onClick={this._onDeleteUsersClick}
                        title="Удалить выделенное"
                        className={'tbar-button button-delete toolbar-for-disabled' + (isDisabled ? ' toolbar-disabled' : '')}
                    >
                        <span className="image delete"></span>
                        <span className="text">Удалить</span>
                    </div>
                </div>
            );
        }
  });

  return ToolbarComponent;
});
