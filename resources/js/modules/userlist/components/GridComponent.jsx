define([
    'Application',
    'react',
    'jsx!./HeaderComponent'
], function(
    Application,
    React,
    ItemComponent
) {

    return  GridComponent = React.createClass({
        getInitialState: function() {

            return {
                disabled: this.props.disabled,
                serverData: this.props.serverData
            };
        },
        
        _bindEvents: function() {
        },
        
        _onGridDisable: function(state) {
            this.setState({
                disabled: state
            });
        },
        
        componentWillReceiveProps: function(nextProps) {

            this.setState({
                disabled: nextProps.disabled || false,
                serverData: nextProps.serverData || false
            });
        },

        componentDidMount: function() {
        },

        _renderTableRows: function() {
            
            var state = this.state || {};
            var serverData = state.serverData || {};
            var userList = serverData.userlist || [];
            var items = '';
            
            for (var i = 0; i < userList.length; i++) {
                var currentItem = userList[i];
                items.concat(
                    <ItemComponent
                        itemData={currentItem}
                    />    
                );
            }
            
            return items;
        },

        render: function() {

            return (
                <div className="settings-userlist">
                    <div className="userlist-table-container">
                        <table className="settings-userlist-table" cellPadding="0" cellSpacing="0">
                            <thead>
                                <tr>
                                    <td className="checkbox-cell">
                                        <input type="checkbox" className="delete-checkbox all-checkbox" />
                                    </td>
                                    <td className="login-cell">Логин пользователя</td>
                                    <td className="name-cell">Имя</td>
                                    <td className="switch-cell">Вкл.</td>
                                    <td className="controls-cell">&nbsp;</td>
                                </tr>
                            </thead>
                            <tbody>
                                {this._renderTableRows()}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        }
  });

  return GridComponent;
});
